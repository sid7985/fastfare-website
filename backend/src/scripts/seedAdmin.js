import User from '../models/User.js';

export const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@fastfare.com';
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            if (process.env.NODE_ENV === 'production') {
                console.warn('⚠️  ADMIN_PASSWORD not set — skipping admin seed in production');
                return;
            }
            // Only use default password in development
            console.warn('⚠️  Using default admin password — set ADMIN_PASSWORD in .env for production');
        }

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) return;

        await User.create({
            businessName: 'FastFare Admin',
            gstin: 'ADMIN000000000',
            businessType: 'logistics',
            contactPerson: 'System Admin',
            email: adminEmail,
            phone: '0000000000',
            password: adminPassword || 'Admin@123',
            role: 'admin',
            isVerified: true
        });

        console.log(`✅ Admin user created: ${adminEmail}`);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
    }
};

export default seedAdmin;
