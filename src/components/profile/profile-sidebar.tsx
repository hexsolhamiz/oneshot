"use client";
import { LayoutGrid, Menu, X, TrafficCone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface DashboardSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function ProfileSidebar({
  activeSection,
  setActiveSection,
}: DashboardSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const navItems = [
    { id: "profile", label: "Profile", icon: LayoutGrid },
    { id: "trials", label: "My Trials", icon: TrafficCone },
 
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-18 left-4 z-50 p-2 bg-background border border-border rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-sidebar border-r border-border flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* User Info */}
        <div className="p-6 border-b border-border mt-16 lg:mt-0">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage
                src={user?.user.playerProfile.imageUrl || ""}
                alt={user?.user.firstName || " "}
              />
              <AvatarFallback>{user?.user.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {user?.user.playerProfile.firstName} {user?.user.playerProfile.lastName}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {user?.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            One Shot Football UK.
          </p>
        </div>
      </aside>
    </>
  );
}