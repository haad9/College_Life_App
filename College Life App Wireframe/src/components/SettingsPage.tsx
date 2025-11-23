import { useState } from "react";
import { Bell, Moon, User, Shield, HelpCircle, LogOut, ChevronRight, ChevronDown, ChevronUp, Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface SettingsPageProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function SettingsPage({ darkMode, setDarkMode }: SettingsPageProps) {
  const [profileOpen, setProfileOpen] = useState(true);
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(true);
  const [helpOpen, setHelpOpen] = useState(true);

  const [assignmentReminders, setAssignmentReminders] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [wellnessReminders, setWellnessReminders] = useState(false);

  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-8 border-b border-gray-200 dark:border-gray-700">
        <h1 className="dark:text-white mb-1">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your preferences and account</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Profile Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <User className="w-5 h-5" />
                Profile
              </CardTitle>
              {profileOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {profileOpen && (
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-600 text-white">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900 dark:text-white">Alex Johnson</p>
                  <p className="text-gray-600 dark:text-gray-400">alex.johnson@college.edu</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue="Alex Johnson"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="alex.johnson@college.edu"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="major" className="dark:text-gray-300">Major</Label>
                  <Input
                    id="major"
                    defaultValue="Computer Science"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                <Button className="w-full">Save Changes</Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Appearance Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setAppearanceOpen(!appearanceOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Moon className="w-5 h-5" />
                Appearance
              </CardTitle>
              {appearanceOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {appearanceOpen && (
            <CardContent className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-gray-600 dark:text-gray-400">Switch between light and dark theme</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              {/* Font Size */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Type className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white">Font Size</p>
                    <p className="text-gray-600 dark:text-gray-400">Adjust text size for better readability</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <Button
                    variant={fontSize === "small" ? "default" : "outline"}
                    onClick={() => setFontSize("small")}
                    className="text-xs"
                  >
                    Small
                  </Button>
                  <Button
                    variant={fontSize === "medium" ? "default" : "outline"}
                    onClick={() => setFontSize("medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    variant={fontSize === "large" ? "default" : "outline"}
                    onClick={() => setFontSize("large")}
                    className="text-lg"
                  >
                    Large
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Notifications Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              {notificationsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {notificationsOpen && (
            <CardContent className="space-y-3">
              {/* Assignment Reminders */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">Assignment Reminders</p>
                  <p className="text-gray-600 dark:text-gray-400">Get notified before deadlines</p>
                </div>
                <Switch checked={assignmentReminders} onCheckedChange={setAssignmentReminders} />
              </div>

              {/* Event Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">Event Notifications</p>
                  <p className="text-gray-600 dark:text-gray-400">Alerts for upcoming events</p>
                </div>
                <Switch checked={eventNotifications} onCheckedChange={setEventNotifications} />
              </div>

              {/* Budget Alerts */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">Budget Alerts</p>
                  <p className="text-gray-600 dark:text-gray-400">Warning when spending limit reached</p>
                </div>
                <Switch checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
              </div>

              {/* Wellness Reminders */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-gray-900 dark:text-white">Wellness Reminders</p>
                  <p className="text-gray-600 dark:text-gray-400">Daily wellness check-ins</p>
                </div>
                <Switch checked={wellnessReminders} onCheckedChange={setWellnessReminders} />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Privacy & Security Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setPrivacyOpen(!privacyOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              {privacyOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {privacyOpen && (
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">Change Password</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">Privacy Settings</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">Data & Storage</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </CardContent>
          )}
        </Card>

        {/* Help & Support Section */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setHelpOpen(!helpOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <HelpCircle className="w-5 h-5" />
                Help & Support
              </CardTitle>
              {helpOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {helpOpen && (
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">Help Center</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">Contact Support</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">Terms of Service</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <span className="text-gray-900 dark:text-white">About</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </CardContent>
          )}
        </Card>

        {/* Sign Out */}
        <Button variant="destructive" className="w-full">
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
