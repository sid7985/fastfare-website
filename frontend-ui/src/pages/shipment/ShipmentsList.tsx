import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpDown,
  RefreshCw,
  FileText,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mockShipments = [
  {
    id: "FF12345678",
    awb: "AWBDHL123456",
    pickup: { city: "Mumbai", pincode: "400001" },
    delivery: { city: "Delhi", pincode: "110001", name: "John Doe" },
    status: "in-transit",
    carrier: "BlueDart",
    weight: "2.5 kg",
    createdAt: "2024-01-15",
    eta: "2024-01-18",
    amount: 249,
  },
  {
    id: "FF12345679",
    awb: "AWBFED789012",
    pickup: { city: "Bangalore", pincode: "560001" },
    delivery: { city: "Chennai", pincode: "600001", name: "Jane Smith" },
    status: "delivered",
    carrier: "FedEx",
    weight: "1.2 kg",
    createdAt: "2024-01-14",
    eta: "2024-01-16",
    amount: 189,
  },
  {
    id: "FF12345680",
    awb: "AWBDTDC345678",
    pickup: { city: "Hyderabad", pincode: "500001" },
    delivery: { city: "Pune", pincode: "411001", name: "Bob Wilson" },
    status: "pending",
    carrier: "DTDC",
    weight: "5.0 kg",
    createdAt: "2024-01-16",
    eta: "2024-01-20",
    amount: 349,
  },
  {
    id: "FF12345681",
    awb: "AWBDEL901234",
    pickup: { city: "Kolkata", pincode: "700001" },
    delivery: { city: "Jaipur", pincode: "302001", name: "Alice Brown" },
    status: "cancelled",
    carrier: "Delhivery",
    weight: "0.8 kg",
    createdAt: "2024-01-13",
    eta: "2024-01-17",
    amount: 129,
  },
  {
    id: "FF12345682",
    awb: "AWBBLUE567890",
    pickup: { city: "Ahmedabad", pincode: "380001" },
    delivery: { city: "Surat", pincode: "395001", name: "Charlie Davis" },
    status: "out-for-delivery",
    carrier: "BlueDart",
    weight: "3.2 kg",
    createdAt: "2024-01-15",
    eta: "2024-01-17",
    amount: 199,
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  pending: { label: "Pending Pickup", variant: "secondary", icon: Clock },
  "in-transit": { label: "In Transit", variant: "default", icon: Truck },
  "out-for-delivery": { label: "Out for Delivery", variant: "default", icon: Package },
  delivered: { label: "Delivered", variant: "outline", icon: CheckCircle },
  cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
};

const ShipmentsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [carrierFilter, setCarrierFilter] = useState("all");

  const filteredShipments = mockShipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.awb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.delivery.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    const matchesCarrier =
      carrierFilter === "all" ||
      shipment.carrier.toLowerCase() === carrierFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCarrier;
  });

  const stats = {
    total: mockShipments.length,
    pending: mockShipments.filter((s) => s.status === "pending").length,
    inTransit: mockShipments.filter((s) => s.status === "in-transit" || s.status === "out-for-delivery").length,
    delivered: mockShipments.filter((s) => s.status === "delivered").length,
  };

  const handlePrintManifest = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Shipment Manifest</title>
            <style>
              body { font-family: sans-serif; padding: 40px; color: #333; }
              .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #011E41; }
              .title { text-align: right; }
              h1 { margin: 0; color: #011E41; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
              th { background-color: #f8fafc; padding: 12px; text-align: left; border-bottom: 2px solid #ddd; font-weight: bold; }
              td { padding: 12px; border-bottom: 1px solid #eee; }
              .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">FastFare</div>
              <div class="title">
                <h1>MANIFEST</h1>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <p>Total Shipments: ${filteredShipments.length}</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>AWB Number</th>
                  <th>Order ID</th>
                  <th>Pickup Location</th>
                  <th>Delivery Location</th>
                  <th>Carrier</th>
                  <th>Weight</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredShipments.map(s => `
                  <tr>
                    <td>${s.awb}</td>
                    <td>${s.id}</td>
                    <td>${s.pickup.city} - ${s.pickup.pincode}</td>
                    <td>${s.delivery.city} - ${s.delivery.pincode}</td>
                    <td>${s.carrier}</td>
                    <td>${s.weight}</td>
                    <td>${s.status.toUpperCase()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="footer">
              Generated by FastFare Logistics Platform<br/>
              Authorized Signature
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">All Shipments</h1>
              <p className="text-muted-foreground">
                Manage and track all your shipments
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrintManifest}>
                <FileText className="h-4 w-4 mr-2" /> Print Manifest
              </Button>
              <Button
                className="gradient-primary"
                onClick={() => navigate("/shipment/new")}
              >
                <Plus className="h-4 w-4 mr-2" /> New Shipment
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.inTransit}</p>
                    <p className="text-sm text-muted-foreground">In Transit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.delivered}</p>
                    <p className="text-sm text-muted-foreground">Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by Order ID, AWB, or Customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={carrierFilter} onValueChange={setCarrierFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Carriers</SelectItem>
                    <SelectItem value="bluedart">BlueDart</SelectItem>
                    <SelectItem value="delhivery">Delhivery</SelectItem>
                    <SelectItem value="fedex">FedEx</SelectItem>
                    <SelectItem value="dtdc">DTDC</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shipments Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer">
                      <div className="flex items-center gap-1">
                        Order ID <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="cursor-pointer">
                      <div className="flex items-center gap-1">
                        Created <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => {
                    const StatusIcon = statusConfig[shipment.status].icon;
                    return (
                      <TableRow
                        key={shipment.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => navigate(`/shipment/${shipment.id}`)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{shipment.id}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {shipment.awb}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-green-500" />
                            <span className="text-sm">{shipment.pickup.city}</span>
                            <span className="text-muted-foreground">→</span>
                            <MapPin className="h-3 w-3 text-red-500" />
                            <span className="text-sm">{shipment.delivery.city}</span>
                          </div>
                        </TableCell>
                        <TableCell>{shipment.delivery.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{shipment.carrier}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusConfig[shipment.status].variant}
                            className="gap-1"
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[shipment.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {shipment.createdAt}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{shipment.amount}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/shipment/${shipment.id}`);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/shipment/${shipment.id}/edit`);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Navigate to create return page with shipment ID
                                  navigate(`/returns/create?shipmentId=${shipment.id}`);
                                }}
                              >
                                <RefreshCw className="h-4 w-4 mr-2" /> Create Return
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => e.stopPropagation()}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {filteredShipments.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No shipments found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={() => navigate("/shipment/new")}>
                    <Plus className="h-4 w-4 mr-2" /> Create New Shipment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShipmentsList;
