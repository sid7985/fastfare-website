import User from '../models/User.js';

// Default admin credentials
const ADMIN_EMAIL = 'admin@fastfare.com';
const ADMIN_PASSWORD = 'Admin@123';

export const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log('✅ Admin user already exists');
            return;
        }

        // Create admin user
        const admin = await User.create({
            businessName: 'FastFare Admin',
            gstin: 'ADMIN000000000',
            businessType: 'logistics',
            contactPerson: 'System Admin',
            email: ADMIN_EMAIL,
            phone: '0000000000',
            password: ADMIN_PASSWORD,
            role: 'admin',
            isVerified: true
        });

        console.log('✅ Admin user created successfully');
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Password: ${ADMIN_PASSWORD}`);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
    }
};

export default seedAdmin;
