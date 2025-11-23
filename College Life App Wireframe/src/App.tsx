import { useState } from "react";
import { Home, Calendar, DollarSign, Users, Briefcase, Settings } from "lucide-react";
import { DashboardPage } from "./pages/DashboardPage";
import { RoutinesPage } from "./pages/RoutinesPage";
import { BudgetPage } from "./pages/BudgetPage";
import { SocialPage } from "./pages/SocialPage";
import { CareerPage } from "./pages/CareerPage";
import { SettingsPageContainer } from "./pages/SettingsPageContainer";

export type ViewType = "dashboard" | "routines" | "budget" | "social" | "career" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardPage />;
      case "routines":
        return <RoutinesPage />;
      case "budget":
        return <BudgetPage />;
      case "social":
        return <SocialPage />;
      case "career":
        return <CareerPage />;
      case "settings":
        return <SettingsPageContainer darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Main Content */}
        <div className="pb-20">
          {renderView()}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-6 gap-1">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  currentView === "dashboard"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentView("routines")}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  currentView === "routines"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Calendar className="w-6 h-6" />
                <span className="text-xs mt-1">Routines</span>
              </button>

              <button
                onClick={() => setCurrentView("budget")}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  currentView === "budget"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <DollarSign className="w-6 h-6" />
                <span className="text-xs mt-1">Budget</span>
              </button>

              <button
                onClick={() => setCurrentView("social")}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  currentView === "social"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Users className="w-6 h-6" />
                <span className="text-xs mt-1">Social</span>
              </button>

              <button
                onClick={() => setCurrentView("career")}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  currentView === "career"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Briefcase className="w-6 h-6" />
                <span className="text-xs mt-1">Career</span>
              </button>

              <button
                onClick={() => setCurrentView("settings")}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  currentView === "settings"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Settings className="w-6 h-6" />
                <span className="text-xs mt-1">Settings</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
