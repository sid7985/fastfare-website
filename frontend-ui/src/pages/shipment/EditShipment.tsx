import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, MapPin, Package, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddressForm from "@/components/shipment/AddressForm";
import PackageForm from "@/components/shipment/PackageForm";
import { toast } from "@/hooks/use-toast";

const EditShipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pickupData, setPickupData] = useState({
    name: "Warehouse Mumbai",
    phone: "9876543210",
    email: "warehouse@company.com",
    address: "123 Industrial Area, Andheri East",
    pincode: "400093",
    city: "Mumbai",
    state: "maharashtra",
    landmark: "Near Metro Station",
    addressType: "warehouse",
    saveAddress: true,
  });

  const [deliveryData, setDeliveryData] = useState({
    name: "John Doe",
    phone: "9876543211",
    email: "john@example.com",
    address: "456 Green Park, Sector 21",
    pincode: "110022",
    city: "Delhi",
    state: "delhi",
    landmark: "Opposite Park",
    addressType: "home",
    saveAddress: false,
  });

  const [packageData, setPackageData] = useState({
    packages: [
      {
        id: "1",
        name: "Electronics",
        quantity: 2,
        weight: 1.5,
        length: 30,
        width: 20,
        height: 15,
        value: 15000,
      },
    ],
    contentType: "electronics",
    description: "Laptop and accessories",
    paymentMode: "prepaid",
    codAmount: 0,
    insurance: true,
  });

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Shipment details have been updated successfully.",
    });
    navigate(`/shipment/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/shipment/${id}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Edit Shipment</h1>
                <p className="text-muted-foreground">Order ID: {id}</p>
              </div>
            </div>
            <Button onClick={handleSave} className="gradient-primary">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>

          {/* Edit Form */}
          <Tabs defaultValue="pickup" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pickup" className="gap-2">
                <MapPin className="h-4 w-4" /> Pickup
              </TabsTrigger>
              <TabsTrigger value="delivery" className="gap-2">
                <MapPin className="h-4 w-4" /> Delivery
              </TabsTrigger>
              <TabsTrigger value="package" className="gap-2">
                <Package className="h-4 w-4" /> Package
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pickup">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    Pickup Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    type="pickup"
                    data={pickupData}
                    onChange={setPickupData}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-red-600" />
                    </div>
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    type="delivery"
                    data={deliveryData}
                    onChange={setDeliveryData}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="package">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PackageForm data={packageData} onChange={setPackageData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => navigate(`/shipment/${id}`)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gradient-primary">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditShipment;
