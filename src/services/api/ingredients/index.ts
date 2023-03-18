import api from "../api";
import { IIngredient } from "../../../ts/interfaces/ingredient.interface";
import { IUser } from "../../../ts/interfaces/user.interface";

export type CreateOrderResponse = {
  success: boolean;
  name: string;
  order: TOrder;
  error?: string;
};
export type FetchIngredientsResponse = {
  success: boolean;
  data: IIngredient[];
  error?: string;
};
interface IOrderOwner extends IUser {
  createdAt: string;
  updatedAt: string;
}
export type TOrder = {
  Ingredients: IIngredient[];
  _id: string;
  owner: IOrderOwner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export async function createOrderRequest(
  ids: Array<string>
): Promise<CreateOrderResponse> {
  const response = await api.post("/orders", { ingredients: ids });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as CreateOrderResponse;
}
export async function fetchIngredientsRequest(): Promise<FetchIngredientsResponse> {
  const response = await api.get("/ingredients");
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as FetchIngredientsResponse;
}
