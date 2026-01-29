import express from 'express';

const router = express.Router();

// Verify GSTIN (mock for now, can integrate real API later)
router.post('/verify', async (req, res) => {
    try {
        const { gstin } = req.body;

        // Basic GSTIN validation format: 22AAAAA0000A1Z5
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

        if (!gstinRegex.test(gstin)) {
            return res.status(400).json({
                valid: false,
                error: 'Invalid GSTIN format'
            });
        }

        // Mock response - in production, call actual GSTIN API
        // Using process.env.GSTIN_VERIFY_API_KEY

        const mockBusinessData = {
            valid: true,
            gstin: gstin,
            businessName: 'Sample Business Pvt Ltd',
            tradeName: 'Sample Trade Name',
            registrationType: 'Regular',
            status: 'Active',
            address: {
                building: '123, Sample Building',
                street: 'Sample Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001'
            }
        };

        res.json(mockBusinessData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
