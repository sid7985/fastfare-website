import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Plus,
  X,
  CheckCircle,
  Loader2,
  Phone,
  IdCard,
  Copy,
  Key,
  AlertCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WmsDriver {
  _id: string;
  driverId: string;
  name: string;
  phone: string;
  license?: { number?: string };
  status: string;
  createdAt: string;
}

interface Credentials {
  id: string;
  password: string;
}

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const DriversTab = () => {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState<WmsDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    licenseNumber: "",
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/partner-team/drivers`, {
        headers: getHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setDrivers(data.drivers || []);
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch drivers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing fields",
        description: "Name and phone are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/partner-team/drivers`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        // Show credentials modal
        setCredentials(data.credentials);
        setShowCredentials(true);
        setShowForm(false);
        setFormData({ name: "", phone: "", licenseNumber: "" });
        fetchDrivers();
        toast({
          title: "Driver Created",
          description: `${data.driver.driverId} created successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create driver",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create driver",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this driver?")) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/partner-team/drivers/${id}`,
        { method: "DELETE", headers: getHeaders() }
      );
      const data = await response.json();
      if (data.success) {
        toast({ title: "Success", description: "Driver deactivated" });
        fetchDrivers();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate",
        variant: "destructive",
      });
    }
  };

  const handleViewCredentials = async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/partner-team/drivers/${id}/credentials`,
        { headers: getHeaders() }
      );
      const data = await response.json();
      if (data.success) {
        setCredentials(data.credentials);
        setShowCredentials(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch credentials",
        variant: "destructive",
      });
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/partner-team/drivers/${id}/reactivate`,
        { method: "PUT", headers: getHeaders() }
      );
      const data = await response.json();
      if (data.success) {
        toast({ title: "Success", description: "Driver reactivated" });
        fetchDrivers();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reactivate",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" /> Active
        </Badge>
      );
    }
    if (status === "terminated") {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" /> Inactive
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Drivers
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your driver team — each driver gets a unique ID (DRV-XXXX)
            for app login
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Driver
        </Button>
      </div>

      {/* Add Driver Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Driver</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter driver's full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10),
                        })
                      }
                      placeholder="9876543210"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number (optional)</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          licenseNumber: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="MH0120190001234"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-800">
                  A unique Driver ID (DRV-XXXX) and password will be
                  auto-generated. The credentials will be shown after
                  creation — share them with the driver for app login.
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: "", phone: "", licenseNumber: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Driver"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Credentials Modal */}
      {showCredentials && credentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4 shadow-2xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Driver Credentials
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowCredentials(false);
                    setCredentials(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-800">
                  Use these credentials to log in to the driver app.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Driver ID</p>
                    <p className="text-lg font-mono font-bold">
                      {credentials.id}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(credentials.id, "id")}
                  >
                    {copiedField === "id" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Password</p>
                    <p className="text-lg font-mono font-bold">
                      {credentials.password}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(credentials.password, "password")
                    }
                  >
                    {copiedField === "password" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setShowCredentials(false);
                  setCredentials(null);
                }}
              >
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Drivers List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : drivers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No drivers found</p>
            <Button onClick={() => setShowForm(true)} className="mt-4 gap-2">
              <Plus className="h-4 w-4" /> Add Your First Driver
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver) => (
            <Card key={driver._id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">
                      {getInitials(driver.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{driver.name}</h3>
                      {getStatusBadge(driver.status)}
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-1.5 font-mono text-primary font-semibold">
                        <IdCard className="h-3 w-3" /> {driver.driverId}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3" /> {driver.phone}
                      </p>
                      {driver.license?.number &&
                        driver.license.number !== "PENDING" && (
                          <p className="flex items-center gap-1.5">
                            <IdCard className="h-3 w-3" />{" "}
                            {driver.license.number}
                          </p>
                        )}
                    </div>
                  </div>
                  <div>
                    {driver.status === "active" ? (
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:text-primary hover:bg-primary/10 text-xs w-full justify-start"
                          onClick={() => handleViewCredentials(driver._id)}
                        >
                          <Eye className="h-3 w-3 mr-2" /> View Credentials
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs w-full justify-start"
                          onClick={() => handleDeactivate(driver._id)}
                        >
                          <XCircle className="h-3 w-3 mr-2" /> Deactivate
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 text-xs"
                        onClick={() => handleReactivate(driver._id)}
                      >
                        Reactivate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriversTab;
