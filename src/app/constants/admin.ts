export const sidebarItems = [
  {
    section: "Dashboard",
    items: [
      { label: "Overview", icon: "grid", path: "/overview", isActive: true },
      { label: "Analytics", icon: "bar-chart", path: "/analytics" },
    ],
  },
  {
    section: "Content Management",
    items: [
      { label: "Stories", icon: "file-text", path: "/stories" },
      { label: "E-Books", icon: "book", path: "/ebooks" },
      { label: "Audiobooks", icon: "headphones", path: "/audiobooks" },
      { label: "Teachings", icon: "book-open", path: "/teachings" },
      { label: "Collections", icon: "shopping-basket", path: "/collections" },
    ],
  },
  {
    section: "Places & Routes",
    items: [
      { label: "Places", icon: "map-pin", path: "/places" },
      { label: "Temples", icon: "building", path: "/temples" },
      { label: "Pilgrimage Routes", icon: "share-2", path: "/routes" },
      { label: "Lost Heritage", icon: "archive", path: "/heritage" },
    ],
  },
  {
    section: "Calendar & Events",
    items: [
      { label: "Panchang", icon: "map-pin", path: "/panchang" },
      { label: "Festivals", icon: "building", path: "/festivals" },
    ],
  },
  {
    section: "Settings & Tools",
    items: [
      { label: "General Settings", icon: "map-pin", path: "/panchang" },
      { label: "Translations", icon: "building", path: "/festivals" },
       { label: "Themes", icon: "building", path: "/festivals" },
    ],
  }
];
