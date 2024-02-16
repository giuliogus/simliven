import MainLayout from "src/layouts/MainLayout.vue";
import ProductionPage from "src/pages/ProductionPage.vue";
import HrPage from "src/pages/HrPage.vue";
import SalesPage from "src/pages/SlPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "production",
        component: ProductionPage,
      },
    ],
  },
  {
    path: "/sales",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "sales",
        component: SalesPage,
      },
    ],
  },
  {
    path: "/hr",
    component: MainLayout,
    children: [{ path: "", name: "hr", component: HrPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
