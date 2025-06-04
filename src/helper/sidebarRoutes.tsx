import { Grid2X2, Inbox, Settings, Users, Wallet } from "lucide-react";
import { SidebarMenuObj } from "./types";

// Import other icons similarly

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes: SidebarMenuObj[] = [
  {
    path: "/dashboard",
    icon: <Grid2X2 className={iconClasses} />,
    pageName: "Dashboard",
    pageTitle: "Dashboard",
  },
  {
    path: "/leads",
    icon: <Inbox className={iconClasses} />,
    pageName: "Leads",
    pageTitle: "Leads",
  },
  {
    path: "/settings",
    icon: <Settings className={`${iconClasses} inline`} />,
    pageName: "Settings",
    pageTitle: "",
    submenu: [
      {
        path: "/settings/billing",
        icon: <Wallet className={submenuIconClasses} />,
        pageName: "Billing",
        pageTitle: "Bills",
      },
      {
        path: "/settings/team",
        icon: <Users className={submenuIconClasses} />,
        pageName: "Team",
        pageTitle: "Team",
      },
    ],
  },
];

export default routes;
