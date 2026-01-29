import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Package,
  MapPin,
  Truck,
  Copy,
  Download,
  Share2,
  Home,
  Plus,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import SchedulePickupModal from "@/components/shipment/SchedulePickupModal";

import { createRoot } from "react-dom/client";
import ShippingLabel, { LabelData } from "./ShippingLabel";

const ShipmentSuccess = () => {
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Mock Data - In real app, this would come from props/context/api
  const orderDetails = {
    orderId: "FF" + Date.now().toString().slice(-8),
    awbNumber: "AWB" + Math.random().toString(36).substring(2, 12).toUpperCase(),
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    carrier: "Delhivery",
    routingCode: "DEL/NCR/001",
    serviceType: "Express Delivery",
    totalAmount: 234,
    paymentMode: "prepaid",
    totalWeight: 0.5,
    dimensions: "10x10x5 (cm)",
    pickup: {
      name: "FastFare Warehouse",
      address: "123 Industrial Hub, Andheri East, Mumbai, Maharashtra - 400093",
      phone: "9876543210",
      pincode: "400093"
    },
    delivery: {
      name: "Aditya Yadav",
      address: "Mlara Sarai, Mahendragarh, Haryana, India",
      phone: "8307572352",
      pincode: "123029"
    },
    products: [
      { name: "Laser Machine", sku: "WF6Y1769625", qty: 1, price: 10.00 }
    ]
  };

  useEffect(() => {
    // Show modal automatically after a short delay
    const timer = setTimeout(() => {
      setShowScheduleModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(orderDetails.awbNumber);
    toast({
      title: "Copied!",
      description: "AWB number copied to clipboard",
    });
  };

  const handleDownloadLabel = () => {
    // Create a hidden iframe or new window for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    // Write the HTML structure
    printWindow.document.write('<html><head><title>Shipping Label</title>');
    // Add Tailwind CDN for styling in the new window (simplified for demo)
    printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
    printWindow.document.write('</head><body><div id="print-root"></div></body></html>');

    printWindow.document.close();

    // Render the ShippingLabel component into the new window
    printWindow.onload = () => {
      const rootElement = printWindow.document.getElementById('print-root');
      if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<ShippingLabel data={orderDetails as LabelData} />);

        // Wait for styles/images to load then print
        setTimeout(() => {
          printWindow.print();
          // printWindow.close(); // Optional: Close after print
        }, 1000);
      }
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-2xl mx-auto px-4">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-foreground mb-2"
            >
              Shipment Booked Successfully!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground"
            >
              Your shipment has been confirmed and is ready for pickup.
            </motion.p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6">
              <CardContent className="pt-6">
                {/* Order ID and AWB */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="text-lg font-semibold">{orderDetails.orderId}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground">AWB Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold font-mono">
                        {orderDetails.awbNumber}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleCopyAwb}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid md:grid-cols-2 gap-6 py-6 border-b">
                  <div className="flex gap-3">
                    <div className="p-2 bg-green-100 rounded-lg h-fit">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup From</p>
                      <p className="font-medium">{orderDetails.pickup.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.pickup.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-2 bg-red-100 rounded-lg h-fit">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deliver To</p>
                      <p className="font-medium">{orderDetails.delivery.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.delivery.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Carrier</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="font-medium">{orderDetails.carrier}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <Badge variant="secondary" className="mt-1">
                      {orderDetails.serviceType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Delivery</p>
                    <p className="font-medium mt-1">
                      {orderDetails.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                    <p className="font-semibold text-primary mt-1">
                      ₹{orderDetails.totalAmount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            <Button
              variant="outline"
              className="flex-col h-auto py-4 gap-2"
              onClick={handleDownloadLabel}
            >
              <Download className="h-5 w-5" />
              <span className="text-xs">Download Label</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-4 gap-2"
              onClick={() => navigate(`/shipment/${orderDetails.orderId}`)}
            >
              <Package className="h-5 w-5" />
              <span className="text-xs">View Details</span>
            </Button>
            <Button variant="outline" className="flex-col h-auto py-4 gap-2">
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Share Tracking</span>
            </Button>
            <Button
              variant="outline"
              className="flex-col h-auto py-4 gap-2"
              onClick={() => navigate(`/tracking/${orderDetails.awbNumber}`)}
            >
              <MapPin className="h-5 w-5" />
              <span className="text-xs">Track Shipment</span>
            </Button>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/dashboard")}
            >
              <Home className="h-4 w-4 mr-2" /> Go to Dashboard
            </Button>
            <Button
              className="flex-1 gradient-primary"
              onClick={() => navigate("/shipment/new")}
            >
              <Plus className="h-4 w-4 mr-2" /> Create Another Shipment
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />

      <SchedulePickupModal
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
        awb={orderDetails.awbNumber}
      />
    </div>
  );
};

export default ShipmentSuccess;
