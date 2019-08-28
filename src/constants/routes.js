const ROUTES = {
  HOME: "/",
  NEW_REPAIR_ORDER: {
    PATH: "/new-repair-order",
    NESTED: {
      CLIENT: "/new-repair-order/client",
      ASSOCIATE: "/new-repair-order/associate",
      ORDER_PREVIEW: "/new-repair-order/preview",
      SIGN: "/new-repair-order/sign"
    }
  },
  REPAIR_ORDERS: {
    PATH: "/repair-orders"
  }
};

export { ROUTES };
