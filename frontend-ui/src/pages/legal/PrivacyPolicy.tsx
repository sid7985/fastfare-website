import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container py-12">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
                        <p className="text-center text-muted-foreground mt-2">Last updated: January 28, 2026</p>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold">1. Introduction</h3>
                            <p>
                                Welcome to FastFare ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">2. Information We Collect</h3>
                            <p>
                                We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services or otherwise contacting us.
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Name and Contact Data (Email, Phone, Address)</li>
                                <li>Credentials (Passwords, Security questions)</li>
                                <li>Payment Data (Credit card number, instrument number)</li>
                                <li>Social Media Login Data</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">3. How We Use Your Information</h3>
                            <p>
                                We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>To facilitate account creation and logon process</li>
                                <li>To send administrative information to you</li>
                                <li>To fulfill and manage your orders</li>
                                <li>To post testimonials</li>
                                <li>To request feedback</li>
                                <li>To protect our Services</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">4. Will Your Information be Shared with Anyone?</h3>
                            <p>
                                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share data based on the following legal basis:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
                                <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">5. How Long Do We Keep Your Information?</h3>
                            <p>
                                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">6. How Do We Keep Your Information Safe?</h3>
                            <p>
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold">7. Contact Us</h3>
                            <p>
                                If you have questions or comments about this policy, you may email us at support@fastfare.com or by post to:
                            </p>
                            <address className="mt-2 not-italic">
                                FastFare Logistics Pvt Ltd.<br />
                                123 Business Park, Sector 4<br />
                                Mumbai, Maharashtra 400001
                            </address>
                        </section>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
