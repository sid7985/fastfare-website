import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Check, X, Zap, Building2, Crown, HelpCircle,
  Package, Users, Headphones, Shield
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: { monthly: 0, yearly: 0 },
    icon: Package,
    popular: false,
    features: [
      { name: "Up to 100 shipments/month", included: true },
      { name: "Basic tracking", included: true },
      { name: "Email support", included: true },
      { name: "Single user", included: true },
      { name: "API access", included: false },
      { name: "Custom integrations", included: false },
      { name: "Dedicated account manager", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Professional",
    description: "For growing businesses with higher volume",
    price: { monthly: 2999, yearly: 29990 },
    icon: Zap,
    popular: true,
    features: [
      { name: "Up to 1,000 shipments/month", included: true },
      { name: "Advanced tracking with ETA", included: true },
      { name: "Priority email & chat support", included: true },
      { name: "Up to 5 users", included: true },
      { name: "API access", included: true },
      { name: "Webhook notifications", included: true },
      { name: "Dedicated account manager", included: false },
      { name: "Custom SLA", included: false },
    ],
  },
  {
    name: "Business",
    description: "For established businesses with high volume",
    price: { monthly: 9999, yearly: 99990 },
    icon: Building2,
    popular: false,
    features: [
      { name: "Up to 10,000 shipments/month", included: true },
      { name: "Real-time tracking with live map", included: true },
      { name: "24/7 phone & chat support", included: true },
      { name: "Up to 20 users", included: true },
      { name: "Full API access", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom SLA", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: { monthly: null, yearly: null },
    icon: Crown,
    popular: false,
    features: [
      { name: "Unlimited shipments", included: true },
      { name: "White-label tracking pages", included: true },
      { name: "Dedicated support team", included: true },
      { name: "Unlimited users", included: true },
      { name: "Custom API development", included: true },
      { name: "On-premise deployment option", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom SLA", included: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, UPI, net banking, and wire transfers for enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens if I exceed my shipment limit?",
    answer: "You'll be notified when approaching your limit. Additional shipments are charged at a per-shipment rate, or you can upgrade your plan.",
  },
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container text-center">
            <Badge className="mb-4">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that fits your business. Start free and scale as you grow.
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className={!isYearly ? "font-medium" : "text-muted-foreground"}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={isYearly ? "font-medium" : "text-muted-foreground"}>
                Yearly <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-primary">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <plan.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      {plan.price.monthly !== null ? (
                        <>
                          <span className="text-4xl font-bold">
                            ₹{isYearly ? Math.round(plan.price.yearly / 12).toLocaleString() : plan.price.monthly.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                          {isYearly && plan.price.yearly > 0 && (
                            <p className="text-sm text-muted-foreground">
                              ₹{plan.price.yearly.toLocaleString()} billed yearly
                            </p>
                          )}
                        </>
                      ) : (
                        <span className="text-4xl font-bold">Custom</span>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground shrink-0" />
                          )}
                          <span className={feature.included ? "" : "text-muted-foreground"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/register">
                      <Button
                        className={`w-full ${plan.popular ? "gradient-primary" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.price.monthly === null ? "Contact Sales" : plan.price.monthly === 0 ? "Get Started Free" : "Start Free Trial"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All plans include</h2>
              <p className="text-muted-foreground">Core features available across all pricing tiers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Package, title: "Multi-carrier Support", desc: "Access to 15+ carrier partners" },
                { icon: Shield, title: "Shipment Insurance", desc: "Up to ₹50,000 coverage included" },
                { icon: Users, title: "Customer Notifications", desc: "Automated SMS & email updates" },
                { icon: Headphones, title: "Customer Support", desc: "Help when you need it" },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of businesses shipping smarter with FastFare
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Sales
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

export default PricingPage;
