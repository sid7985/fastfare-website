import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config";
import logo from "@/assets/logo.png";
import authBg from "@/assets/auth-bg.png";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setIsSubmitted(true);

      toast({
        title: "Email Sent",
        description: "Check your inbox for the password reset link.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please try again";
      toast({
        title: "Request Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${authBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <img src={logo} alt="FastFare" className="h-12 w-auto brightness-0 invert" />
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              Don't worry, it happens to the best of us
            </h1>
            <p className="text-xl text-white/80">
              We'll help you reset your password and get back to shipping in no time.
            </p>
          </div>
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} FastFare. Secure password recovery.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                {isSubmitted ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <Mail className="h-8 w-8 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {isSubmitted ? "Check your email" : "Forgot password?"}
              </CardTitle>
              <CardDescription>
                {isSubmitted
                  ? `We've sent a password reset link to ${email}`
                  : "Enter your email and we'll send you a link to reset your password."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsLoading(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Resend email
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Didn't receive the email?{" "}
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setIsLoading(false);
                      }}
                      className="text-primary hover:underline"
                    >
                      Click to resend
                    </button>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
