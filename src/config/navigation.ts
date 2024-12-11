// src/config/navigation.ts
import {
  LayoutDashboard,
  Heart,
  Calendar,
  Activity,
  Building2,
  MessageSquare,
  Image,
  Settings as SettingsIcon,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  { name: "Donations", href: "/donations", icon: Heart },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Activities", href: "/activities", icon: Activity },
  { name: "Partners", href: "/partners", icon: Building2 },
  { name: "Contacts", href: "/contacts", icon: MessageSquare },
  { name: "Posters", href: "/posters", icon: Image },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];
