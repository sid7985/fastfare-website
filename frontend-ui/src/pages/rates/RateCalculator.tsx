import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Calculator,
  MapPin,
  Package,
  Truck,
  Zap,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RateCalculator = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    pickupPincode: "",
    deliveryPincode: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    paymentMode: "prepaid",
    codAmount: "",
    promoCode: "",
  });

  const carriers = [
    {
      id: "bluedart",
      name: "BlueDart",
      logo: "🔵",
      rating: 4.5,
      reviews: 2345,
      standardPrice: 149,
      standardEta: "3-4 days",
      expressPrice: 229,
      expressEta: "1-2 days",
      features: ["Real-time tracking", "Insurance included", "SMS alerts"],
      recommended: true,
    },
    {
      id: "delhivery",
      name: "Delhivery",
      logo: "🔴",
      rating: 4.3,
      reviews: 1876,
      standardPrice: 129,
      standardEta: "4-5 days",
      expressPrice: 199,
      expressEta: "2-3 days",
      features: ["Wide coverage", "COD available", "Easy returns"],
      recommended: false,
    },
    {
      id: "fedex",
      name: "FedEx",
      logo: "🟣",
      rating: 4.7,
      reviews: 3210,
      standardPrice: 189,
      standardEta: "2-3 days",
      expressPrice: 289,
      expressEta: "Next day",
      features: ["Global network", "Priority handling", "Signature required"],
      recommended: false,
    },
    {
      id: "dtdc",
      name: "DTDC",
      logo: "🟠",
      rating: 4.1,
      reviews: 1543,
      standardPrice: 99,
      standardEta: "5-6 days",
      expressPrice: 159,
      expressEta: "3-4 days",
      features: ["Budget friendly", "Good for bulk", "Cash pickup"],
      recommended: false,
    },
  ];

  // Mock Distance Calculation (Simplified for demo)
  // In a real app, this would come from the backend or a Distance Matrix API
  const getDistance = (p1: string, p2: string) => {
    // Mock: If pincodes start with same digit, assume < 300km (Intra-state/region)
    if (p1 && p2 && p1[0] === p2[0]) return 250;
    return 500;
  };

  const calculatePrice = (basePrice: number, type: "STANDARD" | "EXPRESS") => {
    const distance = getDistance(formData.pickupPincode, formData.deliveryPincode);
    const promoApplied = formData.promoCode.toUpperCase() === "WELCOME500"; // Trigger promo

    if (promoApplied && type === "STANDARD" && distance <= 300) {
      return 500;
    }
    return basePrice;
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Shipping Rate Calculator</h1>
            <p className="text-muted-foreground">
              Compare rates from multiple carriers and choose the best option
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-base">Shipment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Route */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        Pickup PIN Code
                      </Label>
                      <Input
                        placeholder="e.g., 400001"
                        value={formData.pickupPincode}
                        onChange={(e) =>
                          handleChange("pickupPincode", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        Delivery PIN Code
                      </Label>
                      <Input
                        placeholder="e.g., 110001"
                        value={formData.deliveryPincode}
                        onChange={(e) =>
                          handleChange("deliveryPincode", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Weight (kg)
                    </Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2.5"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-2">
                    <Label>Dimensions (cm)</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        placeholder="L"
                        value={formData.length}
                        onChange={(e) => handleChange("length", e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="W"
                        value={formData.width}
                        onChange={(e) => handleChange("width", e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="H"
                        value={formData.height}
                        onChange={(e) => handleChange("height", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="space-y-3">
                    <Label>Payment Mode</Label>
                    <RadioGroup
                      value={formData.paymentMode}
                      onValueChange={(value) =>
                        handleChange("paymentMode", value)
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="prepaid" id="prepaid" />
                        <Label htmlFor="prepaid" className="cursor-pointer">
                          Prepaid
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="cursor-pointer">
                          COD
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.paymentMode === "cod" && (
                    <div className="space-y-2">
                      <Label>COD Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="Amount to collect"
                        value={formData.codAmount}
                        onChange={(e) =>
                          handleChange("codAmount", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      Promo Code
                    </Label>
                    <Input
                      placeholder="e.g. WELCOME500"
                      value={formData.promoCode}
                      onChange={(e) => handleChange("promoCode", e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full gradient-primary"
                    onClick={handleCalculate}
                  >
                    <Calculator className="h-4 w-4 mr-2" /> Calculate Rates
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {!showResults ? (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Enter shipment details
                  </h3>
                  <p className="text-muted-foreground">
                    Fill in the form to see available carriers and rates
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                      Available Carriers ({carriers.length})
                    </h2>
                    <Select defaultValue="price-low">
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="fastest">Fastest Delivery</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {carriers.map((carrier) => (
                    <Card
                      key={carrier.id}
                      className={`overflow-hidden ${carrier.recommended ? "ring-2 ring-primary" : ""
                        }`}
                    >
                      {carrier.recommended && (
                        <div className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1">
                          ⭐ Recommended
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          {/* Carrier Info */}
                          <div className="flex items-center gap-4 md:w-48">
                            <div className="text-3xl">{carrier.logo}</div>
                            <div>
                              <h3 className="font-semibold">{carrier.name}</h3>
                              <div className="flex items-center gap-1 text-sm">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{carrier.rating}</span>
                                <span className="text-muted-foreground">
                                  ({carrier.reviews})
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Service Options */}
                          <div className="flex-1 grid md:grid-cols-2 gap-4">
                            {/* Standard */}
                            <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <Truck className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Standard</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-2xl font-bold">
                                    ₹{calculatePrice(carrier.standardPrice, "STANDARD")}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {carrier.standardEta}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => navigate("/shipment/new")}
                                >
                                  Select
                                </Button>
                              </div>
                            </div>

                            {/* Express */}
                            <div className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="h-4 w-4 text-orange-500" />
                                <span className="font-medium">Express</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-2xl font-bold">
                                    ₹{calculatePrice(carrier.expressPrice, "EXPRESS")}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {carrier.expressEta}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  className="gradient-primary"
                                  onClick={() => navigate("/shipment/new")}
                                >
                                  Select
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                          {carrier.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RateCalculator;
