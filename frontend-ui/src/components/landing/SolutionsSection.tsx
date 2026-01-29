import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Truck, Package, Warehouse } from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "Hyper-local Delivery",
    description: "Deliver within the city in hours. Perfect for food, grocery, and pharmacy.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Truck,
    title: "Intercity Courier",
    description: "Cost-effective shipping across 29,000+ pincodes with top carriers.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Package,
    title: "Cargo Shipping",
    description: "B2B bulk movements with dedicated support for heavy loads (20kg+).",
    color: "bg-green-50 text-green-500",
  },
  {
    icon: Warehouse,
    title: "Fulfillment",
    description: "Store inventory in our tech-enabled warehouses for faster delivery.",
    color: "bg-amber-50 text-amber-500",
  },
];

const SolutionsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Everything you need to scale
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Our platform unifies the entire logistics lifecycle. From first mile to last mile, we've got you covered.
            </p>
          </div>
          <Link to="/services" className="shrink-0">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
              View all solutions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-elevated transition-all duration-300 border-border/50 group cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${solution.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <solution.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
