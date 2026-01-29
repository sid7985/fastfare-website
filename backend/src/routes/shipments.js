import express from 'express';
import Shipment from '../models/Shipment.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Calculate shipping cost
const calculateShippingCost = (shipment) => {
    const baseRate = 50;
    const weightRate = 20; // per kg
    const expressMultiplier = shipment.serviceType === 'express' ? 1.5 :
        shipment.serviceType === 'overnight' ? 2 : 1;

    const weight = shipment.packages?.reduce((sum, pkg) => sum + (pkg.weight * pkg.quantity), 0) || 0.5;
    const insuranceCost = shipment.insurance ? 50 : 0;
    const fragileCost = shipment.fragileHandling ? 30 : 0;

    return Math.round((baseRate + (weight * weightRate)) * expressMultiplier + insuranceCost + fragileCost);
};

// Create shipment
router.post('/', protect, async (req, res) => {
    try {
        const { pickup, delivery, packages, contentType, description, paymentMode, codAmount,
            serviceType, carrier, insurance, fragileHandling, signatureRequired,
            scheduledPickup, pickupDate, pickupSlot } = req.body;

        const shipmentData = {
            user: req.user._id,
            pickup,
            delivery,
            packages,
            contentType,
            description,
            paymentMode,
            codAmount: paymentMode === 'cod' ? codAmount : 0,
            serviceType,
            carrier,
            insurance,
            fragileHandling,
            signatureRequired,
            scheduledPickup,
            pickupDate,
            pickupSlot,
            trackingHistory: [{
                status: 'pending',
                location: pickup.city || 'Origin',
                description: 'Shipment created'
            }]
        };

        const shipment = await Shipment.create(shipmentData);
        shipment.shippingCost = calculateShippingCost(shipment);

        // Set estimated delivery (3-7 days based on service)
        const days = serviceType === 'overnight' ? 1 : serviceType === 'express' ? 3 : 7;
        shipment.estimatedDelivery = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

        await shipment.save();

        res.status(201).json({
            success: true,
            shipment: {
                id: shipment._id,
                awb: shipment.awb,
                status: shipment.status,
                shippingCost: shipment.shippingCost,
                estimatedDelivery: shipment.estimatedDelivery
            }
        });
    } catch (error) {
        console.error('Create shipment error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all shipments for user
router.get('/', protect, async (req, res) => {
    try {
        const { status, page = 1, limit = 10, search } = req.query;

        const query = { user: req.user._id };
        if (status && status !== 'all') {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { awb: { $regex: search, $options: 'i' } },
                { 'delivery.name': { $regex: search, $options: 'i' } },
                { 'delivery.city': { $regex: search, $options: 'i' } }
            ];
        }

        const shipments = await Shipment.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Shipment.countDocuments(query);

        res.json({
            success: true,
            shipments,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single shipment
router.get('/:id', protect, async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }

        res.json({ success: true, shipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update shipment
router.put('/:id', protect, async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }

        // Only allow updates if not yet picked up
        if (!['pending', 'pickup_scheduled'].includes(shipment.status)) {
            return res.status(400).json({ error: 'Cannot update shipment after pickup' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            if (key !== '_id' && key !== 'user' && key !== 'awb') {
                shipment[key] = updates[key];
            }
        });

        await shipment.save();
        res.json({ success: true, shipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel shipment
router.post('/:id/cancel', protect, async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }

        if (!['pending', 'pickup_scheduled'].includes(shipment.status)) {
            return res.status(400).json({ error: 'Cannot cancel shipment after pickup' });
        }

        shipment.status = 'cancelled';
        shipment.trackingHistory.push({
            status: 'cancelled',
            description: 'Shipment cancelled by user'
        });

        await shipment.save();
        res.json({ success: true, message: 'Shipment cancelled' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get dashboard stats
router.get('/stats/dashboard', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        const [total, pending, inTransit, delivered] = await Promise.all([
            Shipment.countDocuments({ user: userId }),
            Shipment.countDocuments({ user: userId, status: { $in: ['pending', 'pickup_scheduled'] } }),
            Shipment.countDocuments({ user: userId, status: { $in: ['picked_up', 'in_transit', 'out_for_delivery'] } }),
            Shipment.countDocuments({ user: userId, status: 'delivered' })
        ]);

        const recentShipments = await Shipment.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('awb status delivery.name delivery.city createdAt estimatedDelivery');

        res.json({
            success: true,
            stats: {
                total,
                pending,
                inTransit,
                delivered
            },
            recentShipments
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
