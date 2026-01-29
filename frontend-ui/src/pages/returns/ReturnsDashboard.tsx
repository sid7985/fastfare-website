import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  RotateCcw, Package, Clock, CheckCircle, AlertTriangle, Plus,
  Search, Download, TrendingUp, ArrowLeft
} from "lucide-react";

const stats = [
  { label: "Total Returns", value: "234", change: "+12", trend: "up", icon: RotateCcw },
  { label: "Pending Pickup", value: "45", change: "+5", trend: "neutral", icon: Clock },
  { label: "In Transit", value: "89", change: "+8", trend: "up", icon: Package },
  { label: "Completed", value: "100", change: "+15", trend: "up", icon: CheckCircle },
];

const returns = [
  { id: "RET-001", awb: "FF123456789", reason: "Product Damaged", status: "Pickup Scheduled", created: "Jan 26, 2024" },
  { id: "RET-002", awb: "FF123456790", reason: "Wrong Item", status: "In Transit", created: "Jan 25, 2024" },
  { id: "RET-003", awb: "FF123456791", reason: "Size Issue", status: "Delivered", created: "Jan 24, 2024" },
  { id: "RET-004", awb: "FF123456792", reason: "Customer Request", status: "Pending", created: "Jan 24, 2024" },
  { id: "RET-005", awb: "FF123456793", reason: "Quality Issue", status: "RTO", created: "Jan 23, 2024" },
];

const ReturnsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Returns Management</h1>
            <p className="text-muted-foreground">Manage return requests and RTO shipments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2 gradient-primary">
              <Plus className="h-4 w-4" />
              Create Return
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Return ID, AWB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Returns Table */}
        <Card>
          <CardHeader>
            <CardTitle>Return Requests</CardTitle>
            <CardDescription>All return and RTO shipments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Original AWB</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns
                  .filter(item =>
                    searchQuery === "" ||
                    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.awb.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.awb}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Delivered" ? "default" :
                              item.status === "In Transit" ? "secondary" :
                                item.status === "RTO" ? "destructive" : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.created}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {returns.filter(item =>
                  searchQuery === "" ||
                  item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.awb.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No return requests found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* RTO Analytics */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>RTO Analytics</CardTitle>
            <CardDescription>Return to origin statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border text-center">
                <p className="text-3xl font-bold text-red-500">4.2%</p>
                <p className="text-sm text-muted-foreground">RTO Rate</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <p className="text-3xl font-bold">₹1.2L</p>
                <p className="text-sm text-muted-foreground">RTO Cost (Monthly)</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <p className="text-3xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">RTO Shipments</p>
              </div>
              <div className="p-4 rounded-lg border text-center">
                <p className="text-3xl font-bold">3.2 days</p>
                <p className="text-sm text-muted-foreground">Avg. Return Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnsDashboard;
