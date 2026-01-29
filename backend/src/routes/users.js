import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Update profile
router.put('/profile', protect, async (req, res) => {
    try {
        const { businessName, contactPerson, phone } = req.body;

        const user = await User.findById(req.user._id);

        if (businessName) user.businessName = businessName;
        if (contactPerson) user.contactPerson = contactPerson;
        if (phone) user.phone = phone;

        await user.save();

        res.json({
            success: true,
            user: {
                id: user._id,
                businessName: user.businessName,
                email: user.email,
                phone: user.phone,
                businessType: user.businessType,
                gstin: user.gstin,
                contactPerson: user.contactPerson
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add saved address
router.post('/addresses', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.savedAddresses.push(req.body);
        await user.save();

        res.json({
            success: true,
            addresses: user.savedAddresses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get saved addresses
router.get('/addresses', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('savedAddresses');
        res.json({
            success: true,
            addresses: user.savedAddresses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete saved address
router.delete('/addresses/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.savedAddresses = user.savedAddresses.filter(
            addr => addr._id.toString() !== req.params.id
        );
        await user.save();

        res.json({
            success: true,
            addresses: user.savedAddresses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Change password
router.put('/password', protect, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
