import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Settings, Bell, Shield, Key, Globe, Building2, Users,
  CreditCard, Package, Truck, Save, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    emailShipment: true,
    emailBilling: true,
    smsDelivery: true,
    smsAlerts: false,
    whatsappUpdates: true,
  });

  const [shippingSettings, setShippingSettings] = useState({
    defaultCarrier: "auto",
    defaultPackage: "box",
    insurance: true
  });

  const [keys, setKeys] = useState({
    production: "ff_prod_" + Math.random().toString(36).substring(7),
    test: "ff_test_" + Math.random().toString(36).substring(7)
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const regenerateKey = (type: 'production' | 'test') => {
    const newKey = `ff_${type === 'production' ? 'prod' : 'test'}_${Math.random().toString(36).substring(7)}${Math.random().toString(36).substring(7)}`;
    setKeys(prev => ({ ...prev, [type]: newKey }));
    toast.info(`New ${type} API key generated`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and organization preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-2">
            <TabsTrigger value="general" className="gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="organization" className="gap-2">
              <Building2 className="h-4 w-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="shipping" className="gap-2">
              <Package className="h-4 w-4" />
              Shipping
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Key className="h-4 w-4" />
              API
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Language</label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="te">Telugu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Timezone</label>
                      <Select defaultValue="ist">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="pst">PST (UTC-8)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Format</label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Currency</label>
                      <Select defaultValue="inr">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">INR (₹)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="gap-2 gradient-primary" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="organization">
            <Card>
              <CardHeader>
                <CardTitle>Organization Details</CardTitle>
                <CardDescription>Your company information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input defaultValue="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GSTIN</label>
                    <Input defaultValue="22AAAAA0000A1Z5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input defaultValue="123 Business Park, Mumbai 400001" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input defaultValue="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Input defaultValue="Maharashtra" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PIN Code</label>
                    <Input defaultValue="400001" />
                  </div>
                </div>
                <Button className="gap-2 gradient-primary" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Update Organization
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Shipment Updates</p>
                        <p className="text-sm text-muted-foreground">Receive email updates for shipments</p>
                      </div>
                      <Switch checked={notifications.emailShipment} onCheckedChange={(checked) => setNotifications({ ...notifications, emailShipment: checked })} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Billing Notifications</p>
                        <p className="text-sm text-muted-foreground">Invoices and payment reminders</p>
                      </div>
                      <Switch checked={notifications.emailBilling} onCheckedChange={(checked) => setNotifications({ ...notifications, emailBilling: checked })} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-medium">SMS Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delivery Updates</p>
                        <p className="text-sm text-muted-foreground">SMS for delivery status</p>
                      </div>
                      <Switch checked={notifications.smsDelivery} onCheckedChange={(checked) => setNotifications({ ...notifications, smsDelivery: checked })} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Critical Alerts</p>
                        <p className="text-sm text-muted-foreground">Important account alerts</p>
                      </div>
                      <Switch checked={notifications.smsAlerts} onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })} />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-medium">WhatsApp Notifications</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Shipment Updates</p>
                      <p className="text-sm text-muted-foreground">Receive updates via WhatsApp</p>
                    </div>
                    <Switch checked={notifications.whatsappUpdates} onCheckedChange={(checked) => setNotifications({ ...notifications, whatsappUpdates: checked })} />
                  </div>
                </div>
                <Button className="gap-2 gradient-primary" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Preferences</CardTitle>
                <CardDescription>Default shipping settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Carrier</label>
                    <Select
                      value={shippingSettings.defaultCarrier}
                      onValueChange={(val) => setShippingSettings({ ...shippingSettings, defaultCarrier: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto Select (Best Rate)</SelectItem>
                        <SelectItem value="bluedart">BlueDart</SelectItem>
                        <SelectItem value="delhivery">Delhivery</SelectItem>
                        <SelectItem value="dtdc">DTDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Package Type</label>
                    <Select
                      value={shippingSettings.defaultPackage}
                      onValueChange={(val) => setShippingSettings({ ...shippingSettings, defaultPackage: val })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="envelope">Envelope</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium">Enable Shipment Insurance</p>
                    <p className="text-sm text-muted-foreground">Auto-insure shipments over ₹5,000</p>
                  </div>
                  <Switch
                    checked={shippingSettings.insurance}
                    onCheckedChange={(checked) => setShippingSettings({ ...shippingSettings, insurance: checked })}
                  />
                </div>
                <Button className="gap-2 gradient-primary" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password regularly</p>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">3 active sessions</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Production API Key</p>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input value={keys.production} readOnly className="font-mono bg-muted" />
                    <Button variant="outline" onClick={() => copyToClipboard(keys.production)}>Copy</Button>
                    <Button variant="outline" onClick={() => regenerateKey('production')} className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Test API Key</p>
                    <Badge variant="secondary">Sandbox</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input value={keys.test} readOnly className="font-mono bg-muted" />
                    <Button variant="outline" onClick={() => copyToClipboard(keys.test)}>Copy</Button>
                    <Button variant="outline" onClick={() => regenerateKey('test')} className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
                <Button className="gap-2">
                  <Key className="h-4 w-4" />
                  Generate New Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
