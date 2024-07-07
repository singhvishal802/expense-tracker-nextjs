import getTransaction from "@/actions/getTransaction";
import { Transaction } from "@/types/Transaction";
import TransactionItem from "./TransactionItem";

const TransactionList = async () => {
  const { transaction, error } = await getTransaction();
  if (error) {
    return <p className="error">{error}</p>;
  }
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transaction &&
          transaction.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
