import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  Image as ImageIcon,
  FileSignature,
  Clock,
  MapPin,
  User,
  Share2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProofOfDelivery = () => {
  const { awb } = useParams();
  const navigate = useNavigate();

  const podData = {
    awb: awb || "AWB1234567890",
    orderId: "FF12345678",
    deliveredAt: "January 18, 2024, 11:45 AM",
    deliveredTo: "John Doe",
    relationship: "Self",
    location: "456 Green Park, Sector 21, Delhi - 110022",
    coordinates: "28.5494° N, 77.2001° E",
    driver: {
      name: "Rajesh Kumar",
      id: "DRV-12345",
    },
    signatureUrl: "/placeholder.svg",
    photos: [
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    notes: "Package delivered to the front door as requested.",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/shipment/${podData.orderId}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Proof of Delivery</h1>
                <p className="text-muted-foreground font-mono">{awb}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
            </div>
          </div>

          {/* Delivery Confirmation */}
          <Card className="mb-6 border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <Badge className="bg-green-100 text-green-700 mb-2">
                    Delivered Successfully
                  </Badge>
                  <p className="text-lg font-semibold">{podData.deliveredAt}</p>
                  <p className="text-muted-foreground">
                    Delivered to: {podData.deliveredTo} ({podData.relationship})
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Delivery Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{podData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GPS Coordinates</p>
                  <p className="font-mono text-sm">{podData.coordinates}</p>
                </div>
              </CardContent>
            </Card>

            {/* Receiver Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Receiver Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Received By</p>
                  <p className="font-medium">{podData.deliveredTo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Relationship</p>
                  <p className="font-medium">{podData.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Partner</p>
                  <p className="font-medium">
                    {podData.driver.name} ({podData.driver.id})
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Signature */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-primary" />
                Digital Signature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mb-2">
                    <img
                      src={podData.signatureUrl}
                      alt="Signature"
                      className="max-w-full max-h-full opacity-50"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Signed by {podData.deliveredTo}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Photos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Delivery Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {podData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={photo}
                      alt={`Delivery photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Click to view full size
              </p>
            </CardContent>
          </Card>

          {/* Notes */}
          {podData.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Delivery Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{podData.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate(`/shipment/${podData.orderId}`)}
            >
              View Shipment Details
            </Button>
            <Button className="gradient-primary">
              <Download className="h-4 w-4 mr-2" /> Download POD
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProofOfDelivery;
