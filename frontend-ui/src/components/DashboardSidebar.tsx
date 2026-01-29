import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    Package,
    MapPin,
    Wallet,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft,
    Truck,
    Warehouse,
    RefreshCw,
    Upload,
    Calculator,
    Users
} from "lucide-react";
import logo from "@/assets/logo.png";
import { authApi } from "@/lib/api";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const primaryNavItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/users", icon: Users },
    { label: "Shipments", href: "/shipments", icon: Package },
    { label: "Fleet Tracking", href: "/fleet-tracking", icon: MapPin },
    { label: "Tracking", href: "/track", icon: MapPin },
    { label: "Warehouse", href: "/warehouse", icon: Warehouse },
    { label: "Drivers", href: "/drivers", icon: Truck },
    { label: "Bulk Ops", href: "/bulk/upload", icon: Upload },
    { label: "Rates", href: "/rates", icon: Calculator },
    { label: "Returns", href: "/returns", icon: RefreshCw },
    { label: "Wallet", href: "/billing", icon: Wallet },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const secondaryNavItems: NavItem[] = [
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help Center", href: "/support", icon: HelpCircle },
];

interface DashboardSidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    onMobileItemClick?: () => void;
}

const DashboardSidebar = ({ collapsed = false, onCollapse, onMobileItemClick }: DashboardSidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = authApi.getCurrentUser();

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return location.pathname === "/dashboard";
        }
        return location.pathname.startsWith(href);
    };

    const handleLogout = () => {
        authApi.logout();
        navigate("/login");
        onMobileItemClick?.();
    };

    const handleLinkClick = () => {
        onMobileItemClick?.();
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-sidebar-background border-r border-sidebar-border transition-all duration-300",
                collapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Logo Section Removed as it is in Header */}
                {/* Mobile collapse button if needed, but usually redundant with Header menu */}
                {onCollapse && (
                    <div className={cn("flex items-center justify-end p-2", collapsed ? "justify-center" : "")}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => onCollapse(!collapsed)}
                        >
                            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
                        </Button>
                    </div>
                )}

                {/* Primary Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {primaryNavItems.filter(item => {
                        // Admin-only items
                        const adminItems = ["Users", "Warehouse", "Drivers", "Bulk Ops"];
                        if (user?.role !== 'admin' && adminItems.includes(item.label)) {
                            return false;
                        }

                        // Partner specific filtering
                        if (user?.role === 'shipment_partner') {
                            const partnerAllowed = ["Dashboard", "Fleet Tracking", "Tracking", "Wallet", "Settings", "Help Center"];
                            return partnerAllowed.includes(item.label);
                        }

                        // Hide Partner-only items for others
                        if (item.label === "Fleet Tracking") {
                            return false;
                        }

                        return true;
                    }).map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive(item.href)
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "mx-auto")} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Secondary Navigation */}
                <div className="px-3 py-2 border-t border-sidebar-border">
                    {secondaryNavItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive(item.href)
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "mx-auto")} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </div>

                {/* User Profile Section */}
                <div className="p-3 border-t border-sidebar-border">
                    <div
                        className={cn(
                            "flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer",
                            collapsed && "justify-center"
                        )}
                    >
                        <Avatar className="h-9 w-9 flex-shrink-0">
                            <AvatarImage src="" alt={user?.businessName || "User"} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {getInitials(user?.businessName || "User")}
                            </AvatarFallback>
                        </Avatar>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                    {user?.businessName || "User"}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {user?.email || "user@example.com"}
                                </p>
                            </div>
                        )}
                        {!collapsed && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={handleLogout}
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
