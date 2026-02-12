import User from '../models/User.js';

const TEST_ACCOUNTS = [
    {
        businessName: 'FastFare Admin',
        gstin: 'ADMIN000000000',
        businessType: 'logistics',
        contactPerson: 'System Admin',
        email: 'admin@fastfare.com',
        phone: '0000000000',
        password: 'Admin@123',
        role: 'admin',
        isVerified: true
    },
    {
        businessName: 'FastFare Test User',
        gstin: 'USER0000000000',
        businessType: 'ecommerce',
        contactPerson: 'Test User',
        email: 'user@fastfare.com',
        phone: '1111111111',
        password: 'User@123',
        role: 'user',
        isVerified: true
    },
    {
        businessName: 'FastFare Test Partner',
        gstin: 'PARTNER00000000',
        businessType: 'logistics',
        contactPerson: 'Test Partner',
        email: 'partner@fastfare.com',
        phone: '2222222222',
        password: 'Partner@123',
        role: 'shipment_partner',
        isVerified: true
    }
];

export const seedAdmin = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            // In production, only seed admin if env vars are set
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPassword = process.env.ADMIN_PASSWORD;
            if (!adminEmail || !adminPassword) {
                console.warn('⚠️  ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping seed in production');
                return;
            }
            const exists = await User.findOne({ email: adminEmail });
            if (!exists) {
                await User.create({
                    ...TEST_ACCOUNTS[0],
                    email: adminEmail,
                    password: adminPassword
                });
                console.log(`✅ Admin created: ${adminEmail}`);
            }
            return;
        }

        // Development — seed all 3 test accounts
        for (const account of TEST_ACCOUNTS) {
            const exists = await User.findOne({ email: account.email });
            if (!exists) {
                await User.create(account);
                console.log(`✅ ${account.role} created: ${account.email}`);
            }
        }
    } catch (error) {
        console.error('❌ Seed error:', error.message);
    }
};

export default seedAdmin;
