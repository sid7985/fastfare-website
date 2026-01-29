import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { businessName, gstin, businessType, contactPerson, email, phone, password, role } = req.body;

        // Validate role - only user and shipment_partner allowed through registration
        const validRoles = ['user', 'shipment_partner'];
        const userRole = role && validRoles.includes(role) ? role : 'user';

        // Block admin registration through this endpoint
        if (role === 'admin') {
            return res.status(403).json({ error: 'Admin accounts cannot be created through registration' });
        }

        // Check if user exists (email, gstin, or phone)
        const userExists = await User.findOne({
            $or: [
                { email },
                { gstin },
                { phone }
            ]
        });

        if (userExists) {
            let errorMsg = 'User already exists';
            if (userExists.email === email) errorMsg = 'Email already registered';
            if (userExists.gstin === gstin) errorMsg = 'GSTIN already registered';
            if (userExists.phone === phone) errorMsg = 'Phone number already registered';

            return res.status(400).json({ error: errorMsg });
        }

        // Create user with role
        const user = await User.create({
            businessName,
            gstin,
            businessType,
            contactPerson,
            email,
            phone,
            password,
            role: userRole
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                businessName: user.businessName,
                email: user.email,
                phone: user.phone,
                businessType: user.businessType,
                gstin: user.gstin,
                contactPerson: user.contactPerson,
                role: user.role,
                kyc: user.kyc
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email or phone
        const user = await User.findOne({
            $or: [{ email: email }, { phone: email }]
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            user: {
                id: user._id,
                businessName: user.businessName,
                email: user.email,
                phone: user.phone,
                businessType: user.businessType,
                gstin: user.gstin,
                contactPerson: user.contactPerson,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get current user
router.get('/me', protect, async (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            businessName: req.user.businessName,
            email: req.user.email,
            phone: req.user.phone,
            businessType: req.user.businessType,
            gstin: req.user.gstin,
            contactPerson: req.user.contactPerson,
            role: req.user.role,
            savedAddresses: req.user.savedAddresses
        }
    });
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
});

// Phone verification storage (tracks phone numbers being verified)
const phoneVerificationStore = new Map();

// Send OTP using Didit.me Phone Verification API
router.post('/send-otp', async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone || phone.length < 10) {
            return res.status(400).json({ error: 'Valid phone number is required' });
        }

        // Format phone number (add country code if not present)
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

        // Call Didit.me Send Phone Code API (v3)
        const diditResponse = await fetch('https://verification.didit.me/v3/phone/send/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.DIDIT_API_KEY
            },
            body: JSON.stringify({
                phone_number: formattedPhone,
                options: {
                    preferred_channel: 'sms',
                    locale: 'en'
                }
            })
        });

        const diditData = await diditResponse.json();

        if (!diditResponse.ok) {
            console.error('Didit Send OTP Error:', diditData);
            throw new Error(diditData.error || diditData.detail || 'Failed to send verification code');
        }

        // Store phone verification session
        phoneVerificationStore.set(phone, {
            formattedPhone,
            sentAt: Date.now(),
            attempts: 0
        });

        console.log(`[Didit] OTP sent to ${formattedPhone}`);

        res.json({
            success: true,
            message: 'Verification code sent successfully',
            phone: formattedPhone
        });
    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ error: error.message || 'Failed to send OTP' });
    }
});


// Verify OTP using Didit.me Check Phone Code API
router.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ error: 'Phone and OTP are required' });
        }

        // Format phone number (add country code if not present)
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

        // Call Didit.me Check Phone Code API (v3)
        const diditResponse = await fetch('https://verification.didit.me/v3/phone/check/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.DIDIT_API_KEY
            },
            body: JSON.stringify({
                phone_number: formattedPhone,
                code: otp
            })
        });

        const diditData = await diditResponse.json();

        if (!diditResponse.ok) {
            console.error('Didit Verify OTP Error:', diditData);
            throw new Error(diditData.error || diditData.detail || 'Invalid OTP');
        }

        // OTP verified successfully
        console.log(`[Didit] Phone ${formattedPhone} verified successfully`);

        // Clean up verification store
        phoneVerificationStore.delete(phone);

        // Find user by phone number
        let user = await User.findOne({ phone });

        if (!user) {
            // Also check with formatted phone
            user = await User.findOne({ phone: formattedPhone });
        }

        if (!user) {
            // User doesn't exist - return success but indicate registration needed
            return res.json({
                success: true,
                verified: true,
                userExists: false,
                message: 'Phone verified. Please complete registration.',
                phoneData: diditData
            });
        }

        // Update user's phone verification status
        if (user.kyc) {
            user.kyc.phoneVerified = true;
            await user.save();
        }

        // User exists - generate token and login
        const token = generateToken(user._id);

        res.json({
            success: true,
            verified: true,
            userExists: true,
            user: {
                id: user._id,
                businessName: user.businessName,
                email: user.email,
                phone: user.phone,
                businessType: user.businessType,
                gstin: user.gstin,
                contactPerson: user.contactPerson,
                role: user.role
            },
            token,
            phoneData: diditData
        });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(400).json({ error: error.message || 'OTP verification failed' });
    }
});


export default router;

