import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Truck, Package, Clock, Globe, RotateCcw, Warehouse,
  ShieldCheck, Zap, MapPin, ArrowRight, CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Express Delivery",
    description: "Same-day and next-day delivery for urgent shipments",
    features: [
      "Delivery within 24 hours for metro cities",
      "Real-time tracking",
      "Priority handling",
      "Guaranteed delivery slots",
    ],
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Truck,
    title: "Standard Shipping",
    description: "Cost-effective delivery for regular shipments",
    features: [
      "2-5 business days delivery",
      "Pan-India coverage",
      "Competitive rates",
      "Full tracking visibility",
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Globe,
    title: "International Shipping",
    description: "Ship worldwide with trusted global partners",
    features: [
      "220+ countries covered",
      "Customs clearance support",
      "Door-to-door delivery",
      "International tracking",
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: RotateCcw,
    title: "Reverse Logistics",
    description: "Seamless returns and exchange management",
    features: [
      "Easy return pickups",
      "Quality check services",
      "Refurbishment options",
      "RTO analytics",
    ],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Fulfillment",
    description: "End-to-end inventory and order management",
    features: [
      "Multi-location warehouses",
      "Pick, pack, and ship",
      "Inventory management",
      "Same-day dispatch",
    ],
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Package,
    title: "Cash on Delivery",
    description: "Collect payments at the time of delivery",
    features: [
      "Multiple payment modes",
      "Quick remittance",
      "Low RTO rates",
      "COD verification",
    ],
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

const industries = [
  "E-commerce",
  "Retail",
  "Healthcare",
  "Electronics",
  "Fashion",
  "FMCG",
  "Automotive",
  "Manufacturing",
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Our Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Complete logistics solutions for your business
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From express delivery to warehousing, we've got all your shipping needs covered 
                with reliable, technology-driven solutions.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="gradient-primary">
                    Get Started
                  </Button>
                </Link>
                <Link to="/rates">
                  <Button size="lg" variant="outline">
                    Calculate Rates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary transition-colors">
                  <CardHeader>
                    <div className={`h-14 w-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4`}>
                      <service.icon className={`h-7 w-7 ${service.color}`} />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Why FastFare</Badge>
              <h2 className="text-3xl font-bold mb-4">The FastFare advantage</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge technology with extensive carrier network to deliver 
                exceptional shipping experiences.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MapPin, title: "500+ Cities", description: "Pan-India coverage including remote areas" },
                { icon: Clock, title: "99.5% On-Time", description: "Industry-leading delivery success rate" },
                { icon: ShieldCheck, title: "Insured Shipments", description: "Up to ₹50,000 coverage included" },
                { icon: Zap, title: "API Integration", description: "Seamless integration with your platform" },
              ].map((item, index) => (
                <Card key={item.title}>
                  <CardContent className="pt-6 text-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Industries We Serve</Badge>
              <h2 className="text-3xl font-bold mb-6">
                Tailored solutions for every industry
              </h2>
              <p className="text-muted-foreground mb-6">
                From small startups to large enterprises, we understand the unique logistics 
                challenges of different industries and provide customized solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge key={industry} variant="secondary" className="text-sm py-1.5 px-3">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50K+", label: "Active Businesses" },
                { value: "10M+", label: "Shipments/Month" },
                { value: "15+", label: "Carrier Partners" },
                { value: "24/7", label: "Support Available" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-6 text-center">
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to streamline your logistics?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join 50,000+ businesses that trust FastFare for their shipping needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start Shipping Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
