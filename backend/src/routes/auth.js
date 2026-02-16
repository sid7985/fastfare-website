import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
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


// ============= Email Configuration =============

// Create email transporter (configure via env vars)
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// Send email helper
const sendEmail = async ({ to, subject, html }) => {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: `"FastFare" <${process.env.SMTP_USER || 'noreply@fastfare.org'}>`,
        to,
        subject,
        html,
    });
};


// ============= Forgot Password =============

// Request password reset (sends email with reset link)
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Don't reveal if email exists — always return success
            return res.json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.',
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save({ validateBeforeSave: false });

        // Build reset URL
        const frontendUrl = process.env.FRONTEND_URL || 'https://fastfare.org';
        const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

        // Send email
        await sendEmail({
            to: user.email,
            subject: 'FastFare — Reset Your Password',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #011E41; font-size: 28px; margin: 0;">FastFare</h1>
                    </div>
                    <h2 style="color: #333; font-size: 20px;">Reset Your Password</h2>
                    <p style="color: #666; line-height: 1.6;">
                        Hello ${user.contactPerson || user.businessName},
                    </p>
                    <p style="color: #666; line-height: 1.6;">
                        We received a request to reset your password. Click the button below to create a new password:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="display: inline-block; background: #011E41; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #999; font-size: 13px; line-height: 1.5;">
                        This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} FastFare. All rights reserved.
                    </p>
                </div>
            `,
        });

        res.json({
            success: true,
            message: 'If an account with that email exists, a password reset link has been sent.',
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to process password reset request' });
    }
});


// Reset password (using token from email)
router.post('/reset-password', async (req, res) => {
    try {
        const { token, email, newPassword } = req.body;

        if (!token || !email || !newPassword) {
            return res.status(400).json({ error: 'Token, email, and new password are required' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            email: email.toLowerCase(),
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Send confirmation email
        await sendEmail({
            to: user.email,
            subject: 'FastFare — Password Changed Successfully',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #011E41; font-size: 28px; margin: 0;">FastFare</h1>
                    </div>
                    <h2 style="color: #333; font-size: 20px;">Password Changed</h2>
                    <p style="color: #666; line-height: 1.6;">
                        Hello ${user.contactPerson || user.businessName},
                    </p>
                    <p style="color: #666; line-height: 1.6;">
                        Your password has been changed successfully. If you did not make this change, please contact our support team immediately.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} FastFare. All rights reserved.
                    </p>
                </div>
            `,
        });

        res.json({
            success: true,
            message: 'Password has been reset successfully. You can now log in.',
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});


// ============= Notification Email Preferences =============

// Get notification preferences
router.get('/notification-preferences', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            success: true,
            preferences: user.notificationPreferences || {
                emailShipmentUpdates: true,
                emailBilling: true,
                emailMarketing: false,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notification preferences' });
    }
});

// Update notification preferences
router.put('/notification-preferences', protect, async (req, res) => {
    try {
        const { emailShipmentUpdates, emailBilling, emailMarketing } = req.body;
        const user = await User.findById(req.user._id);

        user.notificationPreferences = {
            emailShipmentUpdates: emailShipmentUpdates ?? user.notificationPreferences?.emailShipmentUpdates ?? true,
            emailBilling: emailBilling ?? user.notificationPreferences?.emailBilling ?? true,
            emailMarketing: emailMarketing ?? user.notificationPreferences?.emailMarketing ?? false,
        };

        await user.save({ validateBeforeSave: false });

        res.json({
            success: true,
            message: 'Notification preferences updated',
            preferences: user.notificationPreferences,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notification preferences' });
    }
});


// ============= Send Notification Email (Internal Use) =============

// Send a notification email to a user (e.g., shipment update, billing)
router.post('/send-notification', protect, async (req, res) => {
    try {
        const { subject, message, type } = req.body;

        if (!subject || !message) {
            return res.status(400).json({ error: 'Subject and message are required' });
        }

        const user = await User.findById(req.user._id);

        // Check notification preferences
        if (type === 'shipment' && !user.notificationPreferences?.emailShipmentUpdates) {
            return res.json({ success: true, message: 'User has disabled shipment email notifications' });
        }
        if (type === 'billing' && !user.notificationPreferences?.emailBilling) {
            return res.json({ success: true, message: 'User has disabled billing email notifications' });
        }

        await sendEmail({
            to: user.email,
            subject: `FastFare — ${subject}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #011E41; font-size: 28px; margin: 0;">FastFare</h1>
                    </div>
                    <h2 style="color: #333; font-size: 20px;">${subject}</h2>
                    <p style="color: #666; line-height: 1.6;">
                        Hello ${user.contactPerson || user.businessName},
                    </p>
                    <div style="color: #666; line-height: 1.6;">
                        ${message}
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} FastFare. All rights reserved.<br/>
                        <a href="${process.env.FRONTEND_URL || 'https://fastfare.org'}/settings" style="color: #999;">Manage notification preferences</a>
                    </p>
                </div>
            `,
        });

        res.json({ success: true, message: 'Notification email sent' });

    } catch (error) {
        console.error('Send notification error:', error);
        res.status(500).json({ error: 'Failed to send notification email' });
    }
});


export default router;
