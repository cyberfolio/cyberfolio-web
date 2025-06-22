import AppStructures from "structures/index";

export interface PaymentHistoryResponse {
  cexName: AppStructures.Cex;
  orderNo: number;
  type: string;
  fee: string;
  status: string;
  date: string;
  amount: string;
}
