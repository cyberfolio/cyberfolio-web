import { Cex } from "@app-types/index";

export interface PaymentHistoryResponse {
  cexName: Cex;
  orderNo: number;
  type: string;
  fee: string;
  status: string;
  date: string;
  amount: string;
}
