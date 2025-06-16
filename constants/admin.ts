import {
  BarChart3,
  Book,
  BookOpen,
  Headphones,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  MapPin,
  Church,
  Route,
  ShoppingBasketIcon as Collection,
  Calendar,
  Scroll,
  TestTube,
  Database,
  Upload,
  Bell,
  Languages,
  Palette,
} from "lucide-react"

export const menuItems = [
    {
      title: "Dashboard",
      items: [
        { href: "/admin/overview", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      title: "Content Management",
      items: [
        { href: "/admin/stories", label: "Stories", icon: FileText },
        { href: "/admin/books", label: "E-Books", icon: Book },
        { href: "/admin/audiobooks", label: "Audiobooks", icon: Headphones },
        { href: "/admin/teachings", label: "Teachings", icon: BookOpen },
        { href: "/admin/collections", label: "Collections", icon: Collection },
      ],
    },
    {
      title: "Places & Routes",
      items: [
        { href: "/admin/places", label: "Places", icon: MapPin },
        { href: "/admin/temples", label: "Temples", icon: Church },
        { href: "/admin/pilgrimage-routes", label: "Pilgrimage Routes", icon: Route },
        { href: "/admin/lost-heritage", label: "Lost Heritage", icon: Scroll },
      ],
    },
    {
      title: "Calendar & Events",
      items: [
        { href: "/admin/panchang", label: "Panchang", icon: Calendar },
        { href: "/admin/festivals", label: "Festivals", icon: Calendar },
      ],
    },
    {
      title: "User Management",
      items: [
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/notifications", label: "Notifications", icon: Bell },
      ],
    },
    {
      title: "Settings & Tools",
      items: [
        { href: "/admin/settings", label: "General Settings", icon: Settings },
        { href: "/admin/settings/translations", label: "Translations", icon: Languages },
        { href: "/admin/themes", label: "Themes", icon: Palette },
      ],
    },
    {
      title: "Development & Testing",
      items: [
        { href: "/admin/test-image-uploads", label: "Test Uploads", icon: Upload },
        { href: "/admin/diagnostics", label: "Diagnostics", icon: TestTube },
        { href: "/admin/database", label: "Database Tools", icon: Database },
      ],
    },
  ]
