import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Search,
  Trophy,
  Wallet,
  HelpCircle,
  Grid,
  Bell,
  User,
  ChevronDown,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import logo from "@/assets/logo.png";
import { authApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = authApi.isAuthenticated();
  const user = authApi.getCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const { balance } = useWallet();

  const navLinks = [
    { label: "Solutions", href: "#solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "Resources", href: "#resources" },
  ];

  const handleLogout = () => {
    authApi.logout();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4 shrink-0">
          {location.pathname !== "/" && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate(-1)}
              title="Go Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <img src={logo} alt="FastFare" className="h-8 w-auto" />
          </Link>
        </div>

        {isAuthenticated ? (
          /* Authenticated Header */
          <>
            {/* Search Bar - Center Left */}
            <div className="flex-1 max-w-md hidden md:flex">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Order ID"
                  className="w-full bg-muted/50 pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              {/* Business Success Score */}
              <div className="hidden lg:flex items-center gap-2 text-sm bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                <div className="bg-yellow-100 p-1 rounded-full">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase">Business Score</span>
                  <span className="font-bold text-yellow-700">0/6</span>
                </div>
              </div>

              {/* Wallet */}
              <div className="hidden md:flex items-center gap-3 bg-muted/30 px-3 py-1.5 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="font-semibold">₹{balance.toLocaleString()}</span>
                </div>
                <Button size="sm" variant="outline" className="h-6 text-xs px-2" onClick={() => navigate('/billing/recharge')}>
                  + Add
                </Button>
              </div>

              {/* Help */}
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => navigate('/support')}>
                <HelpCircle className="h-5 w-5" />
                <span className="hidden lg:inline">Need Help</span>
              </div>

              {/* All Products */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Grid className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>All Products</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/shipments')}>Shipments</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/analytics')}>Analytics</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/fleet-tracking')}>Fleet</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(user?.businessName || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.businessName || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          /* Public Header */
          <>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gradient-primary text-primary-foreground hover:opacity-90">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <form onSubmit={handleSearch} className="relative w-full mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Order ID"
                    className="w-full bg-muted/50 pl-9 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Button>
                </Link>
                <Link to="/shipments" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Grid className="mr-2 h-4 w-4" /> Shipments
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/billing/recharge')}>
                  <Wallet className="mr-2 h-4 w-4" /> Wallet: ₹{balance.toLocaleString()}
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full gradient-primary">Get Started Free</Button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

