export interface FeedOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "pending" | "done" | "created";
  updatedAt: string;
  _id: string;
}
