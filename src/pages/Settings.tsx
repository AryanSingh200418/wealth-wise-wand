import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, User, Shield, CreditCard, Download, Trash2 } from "lucide-react";

export const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    currency: "INR",
  });
  
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    transactionReminders: false,
    monthlyReports: true,
    emailNotifications: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    biometric: true,
  });

  const handleProfileUpdate = () => {
    // Handle profile update logic here
    console.log("Profile updated:", profile);
  };

  const handleExportData = () => {
    // Handle data export logic here
    console.log("Exporting data...");
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    console.log("Delete account requested");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and app preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-gradient-primary text-primary-foreground">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={profile.currency} onValueChange={(value) => setProfile({ ...profile, currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="budget-alerts" className="text-base font-medium">Budget Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when you exceed budget limits</p>
              </div>
              <Switch
                id="budget-alerts"
                checked={notifications.budgetAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, budgetAlerts: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="transaction-reminders" className="text-base font-medium">Transaction Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders to log your daily expenses</p>
              </div>
              <Switch
                id="transaction-reminders"
                checked={notifications.transactionReminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, transactionReminders: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="monthly-reports" className="text-base font-medium">Monthly Reports</Label>
                <p className="text-sm text-muted-foreground">Receive monthly financial summaries</p>
              </div>
              <Switch
                id="monthly-reports"
                checked={notifications.monthlyReports}
                onCheckedChange={(checked) => setNotifications({ ...notifications, monthlyReports: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor" className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch
                id="two-factor"
                checked={security.twoFactor}
                onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="biometric" className="text-base font-medium">Biometric Login</Label>
                <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
              </div>
              <Switch
                id="biometric"
                checked={security.biometric}
                onCheckedChange={(checked) => setSecurity({ ...security, biometric: checked })}
              />
            </div>
            
            <Button variant="outline" className="w-full md:w-auto">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                variant="outline" 
                onClick={handleExportData}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={handleDeleteAccount}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Account</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Export your data in CSV format or permanently delete your account and all associated data.
            </p>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Last Updated:</strong> January 2024</p>
              <p><strong>Support:</strong> support@financetracker.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};