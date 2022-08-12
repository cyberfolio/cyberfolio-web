import { Cex } from "@customTypes/index";

export interface PaymentHistoryResponse {
  cex: Cex;
  orderNo: number;
  type: string;
  fee: string;
  status: string;
  date: string;
  amount: string;
}
