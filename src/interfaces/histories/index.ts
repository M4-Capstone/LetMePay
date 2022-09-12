import Transaction from "../../entities/transactions.entity";

export type TGetHistory = (
  id: string,
  dateFilter: DateOptions
) => Promise<Transaction[]>;

export type TGetHistoryByType = (
  id: string,
  type: TransactionTypes,
  dateFilter: DateOptions
) => Promise<Transaction[]>;

export interface DateOptions {
  period?: string;
  startDate?: string;
  endDate?: string;
}

export type TransactionTypes = "tf" | "wd" | "dp"; // TODO: Usar enum
