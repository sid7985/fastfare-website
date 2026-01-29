import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PartnerAgreement = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container py-12">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Delivery Partner Agreement</CardTitle>
                        <p className="text-center text-muted-foreground mt-2">Last updated: January 28, 2026</p>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold">1. Role of Partner</h3>
                            <p>
                                As a delivery partner ("Partner") for FastFare, you agree to providing delivery services as an independent contractor. You are not an employee of FastFare.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">2. Responsibilities</h3>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Maintain a valid driving license (if applicable) and vehicle registration.</li>
                                <li>Ensure safe and timely delivery of parcels.</li>
                                <li>Maintain professional conduct with customers.</li>
                                <li>Comply with all traffic laws and regulations.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">3. Compensation</h3>
                            <p>
                                Payments will be made weekly based on the number of completed deliveries. Incentives and bonuses are subject to change based on performance and market conditions.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">4. Insurance and Liability</h3>
                            <p>
                                FastFare provides limited liability insurance for goods in transit. Partners are responsible for their own vehicle insurance and personal accident coverage unless otherwise specified in writing.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">5. Termination</h3>
                            <p>
                                FastFare reserves the right to suspend or terminate this agreement immediately for violation of terms, fraudulent activity, or consistent poor performance ratings.
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default PartnerAgreement;
