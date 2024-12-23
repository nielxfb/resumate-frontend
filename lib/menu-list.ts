import {
  LayoutGrid,
  LucideIcon,
  Microscope,
  LibraryBig,
  Coins,
  CreditCard,
  Settings,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "How It Works",
          active: pathname.includes("/home"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Resume Analyzer",
      menus: [
        {
          href: "/analyze",
          label: "Analyzer",
          active: pathname.includes("/analyze"),
          icon: Microscope,
          submenus: [],
        },
        {
          href: "/history",
          label: "Analysis Results",
          active: pathname.includes("/history"),
          icon: LibraryBig,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/user-profile",
          label: "Account",
          active: pathname.includes("/user-profile"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
