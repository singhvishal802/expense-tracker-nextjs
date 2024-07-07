"use client";
import deleteTransaction from "@/actions/deleteTransaction";
import { addThousandSeparators } from "@/lib/util";
import { Transaction } from "@/types/Transaction";
import { toast } from "react-toastify";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount > 0 ? "+" : "-";
  const handleDelete = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure want to delete this transaction?"
    );
    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      toast.success(error);
    } else {
      toast.success(message);
    }
  };
  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text}
      <span>
        {sign}${addThousandSeparators(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => handleDelete(transaction.id)}
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;
