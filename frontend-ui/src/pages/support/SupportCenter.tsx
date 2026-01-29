import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  HelpCircle, MessageSquare, Phone, Mail, Search, Plus,
  Clock, CheckCircle, AlertCircle, FileText, Video, BookOpen
} from "lucide-react";

const tickets = [
  { id: "TKT-001", subject: "Shipment delayed for 3 days", status: "Open", priority: "High", created: "2 hours ago" },
  { id: "TKT-002", subject: "Invoice discrepancy", status: "In Progress", priority: "Medium", created: "1 day ago" },
  { id: "TKT-003", subject: "API integration help needed", status: "Resolved", priority: "Low", created: "3 days ago" },
];

const faqs = [
  { question: "How do I track my shipment?", category: "Tracking" },
  { question: "What are the shipping rates?", category: "Pricing" },
  { question: "How to schedule a pickup?", category: "Shipping" },
  { question: "How do I add funds to my wallet?", category: "Billing" },
  { question: "Can I change the delivery address?", category: "Shipping" },
];

const SupportCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Help & Support</h1>
            <p className="text-muted-foreground">Get help with your shipments and account</p>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl font-semibold mb-4">How can we help you?</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MessageSquare, title: "Live Chat", description: "Chat with our support team", action: "Start Chat", color: "bg-blue-500" },
            { icon: Phone, title: "Call Us", description: "+91 1800-123-4567", action: "Call Now", color: "bg-green-500" },
            { icon: Mail, title: "Email Support", description: "support@fastfare.in", action: "Send Email", color: "bg-purple-500" },
          ].map((option) => (
            <Card key={option.title} className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <div className={`h-12 w-12 rounded-lg ${option.color} flex items-center justify-center mb-4`}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                <Button variant="outline" className="w-full">{option.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="new">New Ticket</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>Your recent support requests</CardDescription>
                </div>
                <Button className="gap-2 gradient-primary">
                  <Plus className="h-4 w-4" />
                  New Ticket
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          ticket.status === "Open" ? "bg-blue-500/10" :
                          ticket.status === "In Progress" ? "bg-yellow-500/10" : "bg-green-500/10"
                        }`}>
                          {ticket.status === "Open" ? <AlertCircle className="h-5 w-5 text-blue-500" /> :
                           ticket.status === "In Progress" ? <Clock className="h-5 w-5 text-yellow-500" /> :
                           <CheckCircle className="h-5 w-5 text-green-500" />}
                        </div>
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground">{ticket.id} • {ticket.created}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={ticket.priority === "High" ? "destructive" : ticket.priority === "Medium" ? "secondary" : "outline"}>
                          {ticket.priority}
                        </Badge>
                        <Badge variant={ticket.status === "Resolved" ? "default" : "outline"}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Create New Ticket</CardTitle>
                <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shipment">Shipment Issue</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="Brief description of your issue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AWB/Order ID (Optional)</label>
                    <Input placeholder="Enter AWB or Order ID if applicable" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Please provide detailed information about your issue..." rows={5} />
                  </div>
                  <Button className="gradient-primary">Submit Ticket</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <span>{faq.question}</span>
                      </div>
                      <Badge variant="outline">{faq.category}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">Comprehensive guides and API documentation</p>
                  <Button variant="outline" className="w-full">Browse Docs</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Video className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground mb-4">Step-by-step video guides</p>
                  <Button variant="outline" className="w-full">Watch Videos</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground mb-4">Articles and troubleshooting guides</p>
                  <Button variant="outline" className="w-full">Read Articles</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SupportCenter;
