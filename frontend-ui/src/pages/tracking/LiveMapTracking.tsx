import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Truck,
  Clock,
  Phone,
  Navigation,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LiveMapTracking = () => {
  const { awb } = useParams();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const trackingData = {
    awb: awb || "AWB1234567890",
    status: "out-for-delivery",
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      vehicle: "MH-12-AB-1234",
    },
    currentLocation: {
      lat: 28.6139,
      lng: 77.209,
      address: "Near Connaught Place, New Delhi",
      lastUpdated: "2 minutes ago",
    },
    delivery: {
      address: "456 Green Park, Sector 21, Delhi - 110022",
      eta: "25 minutes",
      distance: "8.2 km",
    },
    stops: [
      { type: "completed", address: "Stop 1 - Karol Bagh", time: "10:30 AM" },
      { type: "completed", address: "Stop 2 - Rajouri Garden", time: "11:15 AM" },
      { type: "current", address: "Stop 3 - Connaught Place", time: "11:45 AM" },
      { type: "pending", address: "Stop 4 - Green Park (Your Location)", time: "~12:15 PM" },
    ],
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/track/${awb}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Live Tracking</h1>
                <p className="text-sm text-muted-foreground font-mono">{awb}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <Card className="h-[500px] overflow-hidden">
                <div className="relative w-full h-full bg-muted flex items-center justify-center">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50" />
                  
                  {/* Map Grid Lines */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-muted-foreground"
                        style={{ top: `${i * 10}%` }}
                      />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute h-full w-px bg-muted-foreground"
                        style={{ left: `${i * 10}%` }}
                      />
                    ))}
                  </div>

                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 100,400 Q 200,300 300,250 T 500,150"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeDasharray="10,5"
                      fill="none"
                    />
                  </svg>

                  {/* Markers */}
                  <div className="absolute top-[60%] left-[15%]">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1 block">
                      Pickup
                    </span>
                  </div>

                  <div className="absolute top-[35%] left-[45%] animate-pulse">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded shadow mt-1 block">
                      Driver
                    </span>
                  </div>

                  <div className="absolute top-[20%] right-[20%]">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1 block">
                      Delivery
                    </span>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="secondary">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Delivery Status</CardTitle>
                    <Badge className="bg-orange-100 text-orange-700">
                      Out for Delivery
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="font-semibold text-lg">
                          {trackingData.delivery.eta}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Distance Remaining
                        </p>
                        <p className="font-semibold">
                          {trackingData.delivery.distance}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Delivery Partner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{trackingData.driver.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {trackingData.driver.vehicle}
                      </p>
                    </div>
                    <Button size="icon" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Current Location
                    </p>
                    <p className="text-sm font-medium">
                      {trackingData.currentLocation.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {trackingData.currentLocation.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Stops */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Delivery Route</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trackingData.stops.map((stop, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-3 h-3 rounded-full mt-1.5 ${
                            stop.type === "completed"
                              ? "bg-green-500"
                              : stop.type === "current"
                              ? "bg-primary animate-pulse"
                              : "bg-muted"
                          }`}
                        />
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              stop.type === "current" ? "font-medium" : ""
                            }`}
                          >
                            {stop.address}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stop.time}
                          </p>
                        </div>
                        {stop.type === "current" && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiveMapTracking;
