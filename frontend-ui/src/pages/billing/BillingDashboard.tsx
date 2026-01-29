import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Wallet, CreditCard, Receipt, TrendingUp, Plus, Download,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { label: "Wallet Balance", value: "₹45,230", change: "+₹5,000", trend: "up", icon: Wallet },
  { label: "This Month's Spend", value: "₹1,23,456", change: "+12%", trend: "up", icon: TrendingUp },
  { label: "Pending Payments", value: "₹8,900", change: "2 invoices", trend: "neutral", icon: Clock },
  { label: "Credit Limit", value: "₹2,00,000", change: "₹1,54,770 used", trend: "neutral", icon: CreditCard },
];

const recentTransactions = [
  { id: "TXN-001", type: "Recharge", amount: "+₹10,000", date: "Jan 26, 2024", status: "Completed" },
  { id: "TXN-002", type: "Shipment Charge", amount: "-₹2,345", date: "Jan 25, 2024", status: "Completed" },
  { id: "TXN-003", type: "Shipment Charge", amount: "-₹1,890", date: "Jan 25, 2024", status: "Completed" },
  { id: "TXN-004", type: "Refund", amount: "+₹450", date: "Jan 24, 2024", status: "Completed" },
  { id: "TXN-005", type: "Shipment Charge", amount: "-₹3,210", date: "Jan 24, 2024", status: "Completed" },
];

const invoices = [
  { id: "INV-2024-001", period: "Jan 1-15, 2024", amount: "₹45,230", status: "Paid", dueDate: "Jan 20, 2024" },
  { id: "INV-2024-002", period: "Jan 16-31, 2024", amount: "₹38,900", status: "Pending", dueDate: "Feb 5, 2024" },
  { id: "INV-2023-024", period: "Dec 16-31, 2023", amount: "₹52,100", status: "Paid", dueDate: "Jan 5, 2024" },
];

const BillingDashboard = () => {
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/payment/wallet", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setWalletData(data);
        }
      } catch (error) {
        console.error("Failed to fetch wallet data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWalletData();
  }, []);

  const recentTxns = walletData?.transactions || [];
  const balance = walletData?.balance || 0;

  // Calculate this month's spend (mock calculation logic for demo based on recent txns)
  const currentMonth = new Date().getMonth();
  const monthlySpend = recentTxns
    .filter((t: any) => new Date(t.createdAt).getMonth() === currentMonth && t.amount < 0)
    .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Billing & Payments</h1>
            <p className="text-muted-foreground">Manage your wallet, invoices, and payments</p>
          </div>
          <div className="flex gap-3">
            <Link to="/billing/recharge">
              <Button className="gap-2 gradient-primary">
                <Plus className="h-4 w-4" />
                Add Funds
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold">₹{balance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">₹{monthlySpend.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">This Month's Spend</p>
            </CardContent>
          </Card>

          {/* Placeholders for Credit/Pending */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">₹0</p>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">--</p>
              <p className="text-sm text-muted-foreground">Credit Limit</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTxns.length > 0 ? recentTxns.map((txn: any) => (
                  <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm capitalize">{txn.type}</p>
                      <p className="text-xs text-muted-foreground">{new Date(txn.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`font-semibold ${txn.amount > 0 ? "text-green-500" : "text-foreground"}`}>
                      {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount).toLocaleString()}
                    </span>
                  </div>
                )) : (
                  <p className="text-center text-muted-foreground py-4">No recent transactions</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Invoices (Static for now as no backend) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Your billing history</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{invoice.amount}</p>
                      <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment options</CardDescription>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => toast({ title: "Feature Coming Soon", description: "Payment method integration is currently in development." })}>
              <Plus className="h-4 w-4" />
              Add Method
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: "Credit Card", last4: "4242", expiry: "12/25", brand: "Visa", primary: true },
                { type: "Bank Account", last4: "6789", expiry: null, brand: "HDFC Bank", primary: false },
                { type: "UPI", last4: "fastfare@hdfc", expiry: null, brand: "UPI", primary: false },
              ].map((method, index) => (
                <div key={index} className={`p-4 rounded-lg border ${method.primary ? "border-primary" : ""}`}>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{method.brand}</Badge>
                    {method.primary && <Badge>Primary</Badge>}
                  </div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.type === "UPI" ? method.last4 : `•••• ${method.last4}`}
                  </p>
                  {method.expiry && (
                    <p className="text-xs text-muted-foreground mt-1">Expires {method.expiry}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default BillingDashboard;
