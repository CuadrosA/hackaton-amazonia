const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "productos",
        component: () => import("pages/ProductosGeneral.vue"),
      },
      {
        path: "lugares",
        component: () => import("pages/LugaresView.vue"),
      },
      {
        path: "calculadora-contable",
        component: () =>
          import("pages/aplicaciones_libre/CalculadoraContable.vue"),
      },
      {
        path: "simulador-precio",
        component: () => import("pages/aplicaciones_libre/SimuladorPrecio.vue"),
      },
      {
        path: "control-inventario",
        component: () => import("pages/ControlInventario.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
