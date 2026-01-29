import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Shipment from '../src/models/Shipment.js';
import Transaction from '../src/models/Transaction.js';

dotenv.config();

const resetDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear all data
        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await Shipment.deleteMany({});
        await Transaction.deleteMany({});
        console.log('✅ Data cleared');

        // Create Admin User
        console.log('👤 Creating Admin User...');
        const adminUser = new User({
            businessName: "FastFare Admin",
            gstin: "22AAAAA0000A1Z5", // Dummy GSTIN
            businessType: "logistics",
            contactPerson: "System Admin",
            email: "admin@fastfare.com",
            phone: "9999999999",
            password: "admin123", // Will be hashed by pre-save hook
            role: "admin",
            isVerified: true
        });
        await adminUser.save();
        console.log('✅ Admin created: admin@fastfare.com / admin123');

        // Create Standard User
        console.log('👤 Creating Standard User...');
        const standardUser = new User({
            businessName: "Demo Logistics Pvt Ltd",
            gstin: "27ABCDE1234F1Z5", // Dummy GSTIN
            businessType: "distributor",
            contactPerson: "Demo User",
            email: "user@fastfare.com",
            phone: "8888888888",
            password: "user123", // Will be hashed by pre-save hook
            role: "user",
            isVerified: true,
            walletBalance: 5000 // Give some balance for testing
        });
        await standardUser.save();
        console.log('✅ User created: user@fastfare.com / user123');

        console.log('✨ Database reset and seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
};

resetDB();
