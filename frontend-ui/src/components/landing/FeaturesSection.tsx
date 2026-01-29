import { motion } from "framer-motion";
import {
  Code,
  BarChart3,
  Shield,
  Route,
  RefreshCw,
  Users,
  Globe,
  Headphones,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Robust API Access",
    description: "Seamlessly integrate shipping capabilities into your custom ERP or storefront.",
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    description: "Predictive insights on delivery times, carrier performance, and shipping costs.",
  },
  {
    icon: Shield,
    title: "Fraud Protection",
    description: "Automated address verification and risk scoring for every shipment.",
  },
  {
    icon: Route,
    title: "Real-time Tracking",
    description: "Branded tracking pages that keep your customers updated every step of the way.",
  },
  {
    icon: RefreshCw,
    title: "Return Management",
    description: "Self-service return portals that automate labels and refunds.",
  },
  {
    icon: Users,
    title: "Multi-User Access",
    description: "Granular permissions for your finance, support, and warehouse teams.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Automated customs forms and duties calculation for international orders.",
  },
  {
    icon: Headphones,
    title: "24/7 Priority Support",
    description: "Dedicated account managers and round-the-clock technical assistance.",
  },
  {
    icon: CheckCircle,
    title: "99.99% Uptime",
    description: "Enterprise-grade infrastructure ensuring your shipping never stops.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="solutions" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Modern Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage logistics at scale, from developer-friendly APIs to advanced fraud protection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-4"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
