import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  Calendar,
  Clock,
  Phone,
  Copy,
  Download,
  Share2,
  Edit,
  XCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast, useToast } from "@/hooks/use-toast";

const ShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`http://localhost:3000/api/shipments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch shipment details");
        }

        const data = await response.json();
        setShipment(data.shipment);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id, navigate]);

  const handleCopyAwb = () => {
    if (shipment?.awb) {
      navigator.clipboard.writeText(shipment.awb);
      toast({
        title: "Copied!",
        description: "AWB number copied to clipboard",
      });
    }
  };

  const handlePrintLabel = () => {
    window.print();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/tracking/${shipment.awb}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Tracking link copied to clipboard",
    });
  };

  const handleCancelShipment = async () => {
    if (!confirm("Are you sure you want to cancel this shipment?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/shipments/${id}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to cancel");

      setShipment({ ...shipment, status: 'cancelled' });
      toast({ title: "Shipment Cancelled" });
    } catch (err) {
      toast({ title: "Error", description: "Could not cancel shipment", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-destructive font-medium">{error || "Shipment not found"}</p>
        <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    "in_transit": "bg-blue-100 text-blue-700",
    "picked_up": "bg-purple-100 text-purple-700",
    "delivered": "bg-green-100 text-green-700",
    "pending": "bg-yellow-100 text-yellow-700",
    "cancelled": "bg-red-100 text-red-700",
    "out_for_delivery": "bg-orange-100 text-orange-700",
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-1 py-8 print:p-0">
        <div className="container mx-auto px-4 print:max-w-none">

          {/* Print specific header for label */}
          <div className="hidden print:block mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold mb-2">Shipment Label</h1>
            <p className="text-lg">AWB: {shipment.awb}</p>
          </div>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 print:hidden">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">Shipment Details</h1>
                  <Badge className={statusColors[shipment.status] || "bg-gray-100 text-gray-700"}>
                    {formatStatus(shipment.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono">AWB: {shipment.awb}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleCopyAwb}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrintLabel}>
                <Download className="h-4 w-4 mr-2" /> Print Label
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate(`/returns/create?shipmentId=${id}`)}>
                <RefreshCw className="h-4 w-4 mr-2" /> Create Return
              </Button>
              {['pending', 'pickup_scheduled'].includes(shipment.status) && (
                <Button variant="destructive" size="sm" onClick={handleCancelShipment}>
                  <XCircle className="h-4 w-4 mr-2" /> Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Addresses */}
              <Card className="print:shadow-none print:border-2">
                <CardHeader>
                  <CardTitle className="text-base">Shipping Route</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pickup */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-lg print:hidden">
                          <MapPin className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">Pickup (From)</span>
                      </div>
                      <div className="ml-10 space-y-1 text-sm print:ml-2">
                        <p className="font-medium text-base">{shipment.pickup.name}</p>
                        <p className="text-muted-foreground print:text-black">
                          {shipment.pickup.address}
                        </p>
                        <p className="text-muted-foreground print:text-black">
                          {shipment.pickup.city}, {shipment.pickup.state} - {shipment.pickup.pincode}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                          <span className="flex items-center gap-1 text-muted-foreground print:text-black">
                            <Phone className="h-3 w-3" />
                            {shipment.pickup.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-red-100 rounded-lg print:hidden">
                          <MapPin className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="font-medium">Delivery (To)</span>
                      </div>
                      <div className="ml-10 space-y-1 text-sm print:ml-2">
                        <p className="font-medium text-base">{shipment.delivery.name}</p>
                        <p className="text-muted-foreground print:text-black">
                          {shipment.delivery.address}
                        </p>
                        <p className="text-muted-foreground print:text-black">
                          {shipment.delivery.city}, {shipment.delivery.state} - {shipment.delivery.pincode}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                          <span className="flex items-center gap-1 text-muted-foreground print:text-black">
                            <Phone className="h-3 w-3" />
                            {shipment.delivery.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Package Details */}
              <Card className="print:shadow-none print:border-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shipment.packages.map((pkg: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg print:bg-transparent print:border"
                      >
                        <div>
                          <p className="font-medium">{pkg.name}</p>
                          <p className="text-sm text-muted-foreground print:text-black">
                            Qty: {pkg.quantity} | Weight: {pkg.weight} kg | Dims: {pkg.length}x{pkg.width}x{pkg.height} cm
                          </p>
                        </div>
                        <p className="font-medium">₹{pkg.value.toLocaleString()}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Weight</p>
                        <p className="font-medium">{shipment.packages.reduce((sum: number, p: any) => sum + (p.weight * p.quantity), 0).toFixed(2)} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Content Type</p>
                        <p className="font-medium capitalize">{shipment.contentType}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment Mode</p>
                        <p className="font-medium uppercase">{shipment.paymentMode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Shipping Cost</p>
                        <p className="font-medium text-primary">
                          ₹{shipment.shippingCost || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="print:hidden">
                <CardHeader>
                  <CardTitle className="text-base">Tracking Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {shipment.trackingHistory && shipment.trackingHistory.length > 0 ? (
                      [...shipment.trackingHistory].reverse().map((event: any, index: number) => (
                        <div key={index} className="flex gap-4 pb-8 last:pb-0">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0
                                ? "bg-primary text-primary-foreground"
                                : "bg-green-100 text-green-600"
                                }`}
                            >
                              {index === 0 ? <Truck className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                            </div>
                            {index < shipment.trackingHistory.length - 1 && (
                              <div className="absolute top-10 w-0.5 h-full bg-green-200" />
                            )}
                          </div>
                          <div className="flex-1 pt-1.5">
                            <div className="flex items-center gap-2">
                              <p className={`font-medium ${index === 0 ? "text-primary" : ""}`}>
                                {formatStatus(event.status)}
                              </p>
                              {index === 0 && <Badge className="text-xs">Current</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {event.timestamp ? new Date(event.timestamp).toLocaleString() : "Date N/A"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {event.location} - {event.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">No tracking history available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6 print:hidden">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Shipment Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Carrier</p>
                      <p className="font-medium">{shipment.carrier}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Service</p>
                      <p className="font-medium max-w-[150px] truncate" title={shipment.serviceType}>{shipment.serviceType}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">{new Date(shipment.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Expected Delivery
                      </p>
                      <p className="font-medium">
                        {shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Need Help?
                    </p>
                    <p className="font-medium">Contact Support</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" /> Call Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default ShipmentDetails;
