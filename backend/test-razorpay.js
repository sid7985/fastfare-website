import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

console.log(`Testing Razorpay with Key ID: ${key_id}`);

if (!key_id || !key_secret) {
    console.error("❌ Stats: Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in .env");
    process.exit(1);
}

const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
});

async function testConnection() {
    try {
        console.log("Attempting to create a test order...");
        const order = await razorpay.orders.create({
            amount: 100, // 1 Rupee
            currency: "INR",
            receipt: "test_receipt_" + Date.now()
        });
        console.log("✅ SUCCESS! Razorpay API is working.");
        console.log("Order Created:", order.id);
    } catch (error) {
        console.error("❌ FAILED! Razorpay API Error:");
        if (error.statusCode) {
            console.error(`Status Code: ${error.statusCode}`);
        }
        if (error.error) {
            console.error("Error Details:", JSON.stringify(error.error, null, 2));
        } else {
            console.error(error);
        }
    }
}

testConnection();
