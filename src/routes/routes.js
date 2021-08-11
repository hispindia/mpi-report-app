import {
  Home,
  PatientSearch,
  Reports
  
} from "../pages";

/**
 * list of available routes for the entire application.
 */
export const appRoutes = [
  {
    path: "/home",
    title: "Home",
    roles: ["*"],
    visibleOnSidebar: true,
    icon: "fa fa-home",
    component: Home,
    layout: "/app",
  },
  {
    path: "/patient-search",
    title: "Patient Search",
    roles: [
      "*",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-user-check",
    component: PatientSearch,
    layout: "/app",
  },
  {
    path: "/reports",
    title: "Reports",
    roles: [
      "*",
    ],
    visibleOnSidebar: true,
    icon: "fa fa-file-alt",
    component:   Reports,
    layout: "/app",
  },
  
];
