import { authApi } from "@/lib/api";
import OrganizationDashboard from "./OrganizationDashboard";
import PartnerDashboard from "./PartnerDashboard";

const DashboardWrapper = () => {
    const user = authApi.getCurrentUser();

    if (user?.role === 'shipment_partner') {
        return <PartnerDashboard />;
    }

    return <OrganizationDashboard />;
};

export default DashboardWrapper;
