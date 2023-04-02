export enum WebsocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type OrderWsStatus = "pending" | "done" | "created";

export interface OrderWs {
  readonly createdAt: string;
  readonly ingredients: string[];
  readonly name: string;
  readonly number: number;
  readonly status: OrderWsStatus;
  readonly updatedAt: string;
  readonly _id: string;
}

export type OrdersWs = Array<OrderWs>;

export enum OrdersWsActionType {
  DATA = "data",
  INSERT = "insert",
  DELETE = "delete",
  UPDATE = "update",
  MOVE = "move",
}

export type Data = {
  type: OrdersWsActionType.DATA;
  data: OrdersWs;
};

export type Insert = {
  type: OrdersWsActionType.INSERT;
  data: {
    rows: Array<OrderWs>;
    pos: number;
  };
};

export type Update = {
  type: OrdersWsActionType.UPDATE;
  data: OrdersWs;
};

export type Delete = {
  type: OrdersWsActionType.DELETE;
  data: Array<number>;
};

export type Move = {
  type: OrdersWsActionType.MOVE;
  data: Array<{ from: number; to: number }>;
};

// export type OrdersWsAction = Insert | Data | Delete | Update | Move;

export type OrdersWsActions = any;
export type UserOrdersWsActions = any;
