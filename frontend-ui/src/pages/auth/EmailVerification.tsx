import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, CheckCircle, RefreshCw } from "lucide-react";
import logo from "@/assets/logo.png";
import authBg from "@/assets/auth-bg.png";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleVerify = () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        setTimeout(() => navigate("/organization-setup"), 2000);
      }, 1500);
    }
  };

  const handleResend = () => {
    setCanResend(false);
    setResendTimer(60);
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
              One last step to secure your account
            </h1>
            <p className="text-xl text-white/80">
              Verify your email to unlock all FastFare features and start shipping today.
            </p>
          </div>
          <div className="text-sm text-white/60">
            © 2024 FastFare. Verified businesses only.
          </div>
        </div>
      </div>

      {/* Right Side - Verification */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <motion.div
                animate={isVerified ? { scale: [1, 1.2, 1] } : {}}
                className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center"
              >
                {isVerified ? (
                  <CheckCircle className="h-10 w-10 text-green-500" />
                ) : (
                  <Mail className="h-10 w-10 text-primary" />
                )}
              </motion.div>
              <CardTitle className="text-2xl">
                {isVerified ? "Email Verified!" : "Verify your email"}
              </CardTitle>
              <CardDescription>
                {isVerified
                  ? "Redirecting to organization setup..."
                  : "We've sent a 6-digit code to your email address"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isVerified && (
                <>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button
                    onClick={handleVerify}
                    className="w-full gradient-primary"
                    disabled={otp.length !== 6 || isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify Email"}
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code?
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResend}
                      disabled={!canResend}
                      className="gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {canResend ? "Resend code" : `Resend in ${resendTimer}s`}
                    </Button>
                  </div>
                </>
              )}

              {isVerified && (
                <div className="flex justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Wrong email?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Change email address
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification;
