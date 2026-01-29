import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Target, Users, Globe, Award, TrendingUp, Heart,
  MapPin, Package, Truck, CheckCircle
} from "lucide-react";

const stats = [
  { value: "10M+", label: "Shipments Delivered" },
  { value: "50K+", label: "Businesses Trust Us" },
  { value: "500+", label: "Cities Covered" },
  { value: "99.5%", label: "On-Time Delivery" },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "Every decision we make starts with our customers. Their success is our success.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We constantly push boundaries to build better logistics solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work together with our partners, carriers, and customers as one team.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We do what's right, even when no one is watching. Trust is everything.",
  },
];

const team = [
  { name: "Amit Sharma", role: "CEO & Co-founder", image: "/placeholder.svg" },
  { name: "Priya Patel", role: "CTO & Co-founder", image: "/placeholder.svg" },
  { name: "Rahul Verma", role: "COO", image: "/placeholder.svg" },
  { name: "Sneha Gupta", role: "VP of Product", image: "/placeholder.svg" },
];

const milestones = [
  { year: "2019", title: "Founded", description: "Started with a vision to simplify logistics" },
  { year: "2020", title: "1M Shipments", description: "Crossed our first million deliveries" },
  { year: "2021", title: "Series A", description: "Raised $10M to expand operations" },
  { year: "2022", title: "Pan-India", description: "Expanded to cover 500+ cities" },
  { year: "2023", title: "10M Shipments", description: "Delivered 10 million packages" },
  { year: "2024", title: "Going Global", description: "Launched international shipping" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">About FastFare</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Making logistics simple for every business
              </h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to democratize logistics technology and help businesses 
                of all sizes deliver exceptional customer experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-3xl font-bold mb-6">
                From a small startup to India's leading logistics platform
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  FastFare was born in 2019 when our founders, frustrated with the complexity 
                  of managing shipments across multiple carriers, decided to build a better solution.
                </p>
                <p>
                  What started as a simple aggregation platform has evolved into a comprehensive 
                  logistics operating system that powers deliveries for over 50,000 businesses.
                </p>
                <p>
                  Today, we're proud to be the trusted logistics partner for startups, SMEs, and 
                  enterprises across India, helping them deliver millions of packages every month.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="h-24 w-24 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="h-12 w-12 text-primary" />
                  </div>
                  <div className="h-24 w-24 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Truck className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="h-24 w-24 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-orange-500" />
                  </div>
                  <div className="h-24 w-24 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Our Values</Badge>
              <h2 className="text-3xl font-bold">What drives us every day</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 container">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl font-bold">Milestones that define us</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <Card>
                      <CardContent className="pt-4 pb-4">
                        <p className="text-2xl font-bold text-primary">{milestone.year}</p>
                        <p className="font-semibold">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 h-4 w-4 rounded-full bg-primary" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Leadership Team</Badge>
              <h2 className="text-3xl font-bold">Meet the people behind FastFare</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 container">
          <div className="text-center mb-12">
            <Badge className="mb-4">Recognition</Badge>
            <h2 className="text-3xl font-bold">Awards & Accolades</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Best Logistics Startup 2023", org: "ET Startup Awards" },
              { title: "Top 50 Supply Chain Innovators", org: "Supply Chain India" },
              { title: "Customer Excellence Award", org: "CX India Summit" },
            ].map((award, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.org}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
