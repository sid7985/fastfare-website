import { useState } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Download, FileText, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const invoices = [
    { id: "INV-2024-001", period: "Jan 1-15, 2024", amount: "₹45,230", status: "Paid", dueDate: "Jan 20, 2024", date: "Jan 16, 2024" },
    { id: "INV-2024-002", period: "Jan 16-31, 2024", amount: "₹38,900", status: "Pending", dueDate: "Feb 5, 2024", date: "Feb 1, 2024" },
    { id: "INV-2023-024", period: "Dec 16-31, 2023", amount: "₹52,100", status: "Paid", dueDate: "Jan 5, 2024", date: "Jan 1, 2024" },
    { id: "INV-2023-023", period: "Dec 1-15, 2023", amount: "₹48,500", status: "Paid", dueDate: "Dec 20, 2023", date: "Dec 16, 2023" },
];

const InvoicesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredInvoices = invoices.filter(inv =>
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Invoices</h1>
                        <p className="text-muted-foreground">View and download your monthly invoices</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Invoice History</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search invoices..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Billing Period</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInvoices.map((inv) => (
                                    <TableRow key={inv.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            {inv.id}
                                        </TableCell>
                                        <TableCell>{inv.date}</TableCell>
                                        <TableCell>{inv.period}</TableCell>
                                        <TableCell>{inv.dueDate}</TableCell>
                                        <TableCell>
                                            <Badge variant={inv.status === "Paid" ? "default" : "secondary"} className={inv.status === "Paid" ? "bg-green-500 hover:bg-green-600" : ""}>
                                                {inv.status === "Paid" ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                                {inv.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">{inv.amount}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => {
                                                const win = window.open('', '_blank');
                                                if (win) {
                                                    win.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>Invoice ${inv.id}</title>
                                                                <style>
                                                                    body { font-family: sans-serif; padding: 40px; color: #333; }
                                                                    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                                                                    .logo { font-size: 24px; font-weight: bold; color: #011E41; }
                                                                    .invoice-details { text-align: right; }
                                                                    .table { width: 100%; margin-top: 40px; border-collapse: collapse; }
                                                                    .table th { text-align: left; background: #f8fafc; padding: 12px; }
                                                                    .table td { padding: 12px; border-bottom: 1px solid #eee; }
                                                                    .total { margin-top: 40px; text-align: right; font-size: 20px; font-weight: bold; }
                                                                    .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #666; }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                <div class="header">
                                                                    <div class="logo">FastFare</div>
                                                                    <div class="invoice-details">
                                                                        <h1 style="margin: 0; color: #011E41;">INVOICE</h1>
                                                                        <p style="margin: 5px 0;">#${inv.id}</p>
                                                                        <p style="margin: 5px 0; color: #666;">Date: ${inv.date}</p>
                                                                    </div>
                                                                </div>
                                                                <div style="margin-top: 40px;">
                                                                    <strong>Bill To:</strong><br/>
                                                                    User Business Name<br/>
                                                                    123 Business Street<br/>
                                                                    Mumbai, India
                                                                </div>
                                                                <table class="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Description</th>
                                                                            <th>Period</th>
                                                                            <th style="text-align: right;">Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Shipping Services</td>
                                                                            <td>${inv.period}</td>
                                                                            <td style="text-align: right;">${inv.amount}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div class="total">
                                                                    Total: ${inv.amount}
                                                                </div>
                                                                <div class="footer">
                                                                    Thank you for your business!<br/>
                                                                    FastFare Logistics Pvt Ltd
                                                                </div>
                                                                <script>window.print();</script>
                                                            </body>
                                                        </html>
                                                    `);
                                                    win.document.close();
                                                }
                                            }}>
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default InvoicesPage;
