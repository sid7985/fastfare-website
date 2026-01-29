import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container py-12">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
                        <p className="text-center text-muted-foreground mt-2">Effective Date: January 28, 2026</p>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold">1. Agreement to Terms</h3>
                            <p>
                                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and FastFare ("we," "us" or "our"), concerning your access to and use of our website and services.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">2. User Representations</h3>
                            <p>
                                By using the Site, you represent and warrant that:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                                <li>You are not a minor in the jurisdiction in which you reside.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">3. Prohibited Activities</h3>
                            <p>
                                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">4. Intellectual Property Rights</h3>
                            <p>
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">5. Fees and Payment</h3>
                            <p>
                                We accept the following forms of payment: Visa, Mastercard, UPI, Net Banking. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">6. Termination</h3>
                            <p>
                                These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">7. Governing Law</h3>
                            <p>
                                These Terms shall be governed by and defined following the laws of India. FastFare and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
