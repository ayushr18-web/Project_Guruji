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


export const hinduMonths = [
  { value: "chaitra", label: "Chaitra (Mar – Apr)", month_range: "March – April" },
  { value: "vaishakha", label: "Vaishakha (Apr – May)", month_range: "April – May" },
  { value: "jyeshtha", label: "Jyeshtha (May – Jun)", month_range: "May – June" },
  { value: "ashadha", label: "Ashadha (Jun – Jul)", month_range: "June – July" },
  { value: "shravana", label: "Shravana (Jul – Aug)", month_range: "July – August" },
  { value: "bhadrapada", label: "Bhadrapada (Aug – Sep)", month_range: "August – September" },
  { value: "ashwin", label: "Ashwin (Sep – Oct)", month_range: "September – October" },
  { value: "kartika", label: "Kartika (Oct – Nov)", month_range: "October – November" },
  { value: "margashirsha", label: "Margashirsha (Nov – Dec)", month_range: "November – December" },
  { value: "pausha", label: "Pausha (Dec – Jan)", month_range: "December – January" },
  { value: "magha", label: "Magha (Jan – Feb)", month_range: "January – February" },
  { value: "phalguna", label: "Phalguna (Feb – Mar)", month_range: "February – March" }
];

