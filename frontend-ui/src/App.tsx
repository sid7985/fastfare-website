import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Auth
import ForgotPassword from "./pages/auth/ForgotPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import OrganizationSetup from "./pages/auth/OrganizationSetup";
import RegisterUser from "./pages/auth/RegisterUser";
import RegisterPartner from "./pages/auth/RegisterPartner";

// Dashboard
import DashboardWrapper from "./pages/dashboard/DashboardWrapper";
import OrganizationDashboard from "./pages/dashboard/OrganizationDashboard";
import UserProfile from "./pages/dashboard/UserProfile";
import NotificationCenter from "./pages/dashboard/NotificationCenter";
import SearchResults from "./pages/dashboard/SearchResults";
import UserManagement from "./pages/dashboard/UserManagement";

// Public Pages
import PricingPage from "./pages/public/PricingPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import ServicesPage from "./pages/public/ServicesPage";

// Shipment Management
import NewShipmentBooking from "./pages/shipment/NewShipmentBooking";
import ShipmentSuccess from "./pages/shipment/ShipmentSuccess";
import ShipmentsList from "./pages/shipment/ShipmentsList";
import ShipmentDetails from "./pages/shipment/ShipmentDetails";
import EditShipment from "./pages/shipment/EditShipment";

// Bulk Operations
import BulkUpload from "./pages/bulk/BulkUpload";
import BulkValidation from "./pages/bulk/BulkValidation";
import BulkProcessing from "./pages/bulk/BulkProcessing";
import BulkSuccess from "./pages/bulk/BulkSuccess";

// Tracking
import FleetTracking from "./pages/tracking/FleetTracking";
import PublicTracking from "./pages/tracking/PublicTracking";
import TrackingResults from "./pages/tracking/TrackingResults";
import LiveMapTracking from "./pages/tracking/LiveMapTracking";
import ProofOfDelivery from "./pages/tracking/ProofOfDelivery";

// Rates
import RateCalculator from "./pages/rates/RateCalculator";

// Warehouse
import WarehouseDashboard from "./pages/warehouse/WarehouseDashboard";
import InventoryManagement from "./pages/warehouse/InventoryManagement";

// Drivers
import DriverManagement from "./pages/drivers/DriverManagement";

// Analytics
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard";

// Billing
import BillingDashboard from "./pages/billing/BillingDashboard";
import WalletRecharge from "./pages/billing/WalletRecharge";
import TransactionsPage from "./pages/billing/TransactionsPage";
import InvoicesPage from "./pages/billing/InvoicesPage";

// Support
import SupportCenter from "./pages/support/SupportCenter";

// Settings
import SettingsPage from "./pages/settings/SettingsPage";
import KYCVerification from "./pages/settings/KYCVerification";
import FinancialSetup from "./pages/settings/FinancialSetup";

// Returns
import ReturnsDashboard from "./pages/returns/ReturnsDashboard";

// Legal
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import PartnerAgreement from "./pages/legal/PartnerAgreement";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";

// Onboarding
import BusinessStage from "./pages/onboarding/BusinessStage";
import SellingChannels from "./pages/onboarding/SellingChannels";

const queryClient = new QueryClient();

import { WalletProvider } from "./contexts/WalletContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardWrapper />} />

            {/* Auth */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/organization-setup" element={<OrganizationSetup />} />
            <Route path="/register/user" element={<RegisterUser />} />
            <Route path="/register/partner" element={<RegisterPartner />} />
            <Route path="/users" element={<UserManagement />} />

            {/* Dashboard */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/notifications" element={<NotificationCenter />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Public Pages */}
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />

            {/* Shipment Management */}
            <Route path="/shipment/new" element={<NewShipmentBooking />} />
            <Route path="/shipment/success" element={<ShipmentSuccess />} />
            <Route path="/shipments" element={<ShipmentsList />} />
            <Route path="/shipment/:id" element={<ShipmentDetails />} />
            <Route path="/shipment/:id/edit" element={<EditShipment />} />

            {/* Bulk Operations */}
            <Route path="/bulk/upload" element={<BulkUpload />} />
            <Route path="/bulk/validation" element={<BulkValidation />} />
            <Route path="/bulk/processing" element={<BulkProcessing />} />
            <Route path="/bulk/success" element={<BulkSuccess />} />

            {/* Tracking */}
            <Route path="/fleet-tracking" element={<FleetTracking />} />
            <Route path="/track" element={<PublicTracking />} />
            <Route path="/track/:awb" element={<TrackingResults />} />
            <Route path="/tracking/:awb/live" element={<LiveMapTracking />} />
            <Route path="/tracking/:awb/pod" element={<ProofOfDelivery />} />

            {/* Rates */}
            <Route path="/rates" element={<RateCalculator />} />
            <Route path="/rate-calculator" element={<RateCalculator />} />

            {/* Warehouse */}
            <Route path="/warehouse" element={<WarehouseDashboard />} />
            <Route path="/warehouse/inventory" element={<InventoryManagement />} />

            {/* Drivers */}
            <Route path="/drivers" element={<DriverManagement />} />

            {/* Analytics */}
            <Route path="/analytics" element={<AnalyticsDashboard />} />

            {/* Billing */}
            <Route path="/billing" element={<BillingDashboard />} />
            <Route path="/billing/recharge" element={<WalletRecharge />} />
            <Route path="/billing/transactions" element={<TransactionsPage />} />
            <Route path="/billing/invoices" element={<InvoicesPage />} />

            {/* Support */}
            <Route path="/support" element={<SupportCenter />} />

            {/* Settings */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/kyc" element={<KYCVerification />} />
            <Route path="/settings/financial-setup" element={<FinancialSetup />} />

            {/* Returns */}
            <Route path="/returns" element={<ReturnsDashboard />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/partner-agreement" element={<PartnerAgreement />} />

            {/* Onboarding */}
            <Route path="/onboarding/business-stage" element={<BusinessStage />} />
            <Route path="/onboarding/channels" element={<SellingChannels />} />
            <Route path="/onboarding/kyc" element={<KYCVerification />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
