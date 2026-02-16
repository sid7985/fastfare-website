import express from 'express';
import jwt from 'jsonwebtoken';
import ScanPartner from '../models/ScanPartner.js';
import Parcel from '../models/Parcel.js';

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id, role: 'scan_partner' }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/scan-partner-auth/login
router.post('/login', async (req, res) => {
    try {
        const { scanPartnerId, password } = req.body;

        if (!scanPartnerId || !password) {
            return res.status(400).json({ success: false, message: 'Scan Partner ID and password are required' });
        }

        const scanPartner = await ScanPartner.findOne({
            scanPartnerId: scanPartnerId.toUpperCase(),
            status: 'active'
        });

        if (!scanPartner) {
            return res.status(401).json({ success: false, message: 'Invalid credentials or account inactive' });
        }

        const isMatch = await scanPartner.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(scanPartner._id);

        // Get total scans
        const totalScans = await Parcel.countDocuments({ 'scannedBy.partnerId': scanPartner._id });

        res.json({
            success: true,
            token,
            partner: {
                id: scanPartner._id,
                partnerId: scanPartner.scanPartnerId,
                name: scanPartner.name,
                phone: scanPartner.phone,
                status: scanPartner.status,
                totalScans
            }
        });
    } catch (error) {
        console.error('Scan partner login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/scan-partner-auth/me
router.get('/me', async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const scanPartner = await ScanPartner.findById(decoded.id).select('-password');

            if (!scanPartner) {
                return res.status(404).json({ success: false, message: 'Scan partner not found' });
            }

            const totalScans = await Parcel.countDocuments({ 'scannedBy.partnerId': scanPartner._id });

            res.json({
                success: true,
                partner: {
                    id: scanPartner._id,
                    partnerId: scanPartner.scanPartnerId,
                    name: scanPartner.name,
                    phone: scanPartner.phone,
                    status: scanPartner.status,
                    totalScans
                }
            });
        } catch (error) {
            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ success: false, message: 'No token' });
    }
});

export default router;
