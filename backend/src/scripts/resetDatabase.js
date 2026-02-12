/**
 * Database Reset Script — Pristine Production Build
 * 
 * Drops ALL collections and re-seeds:
 *   - 3 user accounts (admin, user, partner)
 *   - 1 test parcel (linked to partner)
 * 
 * Usage: node src/scripts/resetDatabase.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

import User from '../models/User.js';
import Parcel from '../models/Parcel.js';

const ACCOUNTS = [
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

async function resetDatabase() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected\n');

        // Step 1: Drop ALL collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`🗑️  Dropping ${collections.length} collections...`);
        for (const col of collections) {
            await mongoose.connection.db.dropCollection(col.name);
            console.log(`   ✗ ${col.name}`);
        }
        console.log('');

        // Step 2: Create 3 user accounts
        console.log('👤 Creating accounts...');
        const createdUsers = {};
        for (const account of ACCOUNTS) {
            const user = await User.create(account);
            createdUsers[account.role] = user;
            console.log(`   ✓ ${account.role}: ${account.email} / ${account.password}`);
        }
        console.log('');

        // Step 3: Create 1 test parcel linked to partner
        console.log('📦 Creating test parcel...');
        const partner = createdUsers['shipment_partner'];
        const parcel = await Parcel.create({
            barcode: 'FF-DEMO-001',
            orderId: 'ORD-000001',
            awb: 'AWB0000000001',
            packageName: 'Demo Shipment',
            packageDescription: 'Test parcel for system verification',
            contentType: 'Electronics',
            weight: 1.5,
            quantity: 1,
            sender: {
                name: 'FastFare Warehouse',
                phone: '0000000000',
                address: 'FastFare Hub, Andheri East',
                city: 'Mumbai',
                pincode: '400093'
            },
            receiver: {
                name: 'Test Recipient',
                phone: '9999999999',
                address: 'Green Park, Sector 21',
                city: 'Delhi',
                pincode: '110022'
            },
            status: 'scanned',
            scannedBy: {
                partnerId: partner._id,
                name: partner.contactPerson
            },
            scannedAt: new Date()
        });
        console.log(`   ✓ ${parcel.parcelId}: ${parcel.packageName} (AWB: ${parcel.awb})`);

        // Step 4: Verify
        console.log('\n═══════════════════════════════════════');
        console.log('✅ DATABASE RESET COMPLETE');
        console.log('═══════════════════════════════════════');
        console.log(`Users: ${await User.countDocuments()}`);
        console.log(`Parcels: ${await Parcel.countDocuments()}`);
        console.log('═══════════════════════════════════════\n');

        console.log('Login credentials:');
        console.log('  Admin:   admin@fastfare.com   / Admin@123');
        console.log('  User:    user@fastfare.com    / User@123');
        console.log('  Partner: partner@fastfare.com / Partner@123');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Reset failed:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

resetDatabase();
