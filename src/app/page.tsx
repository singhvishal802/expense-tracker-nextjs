import AddTransaction from "@/components/AddTransection";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import IncomeExpense from "@/components/IncomeExpance";
import TransactionList from "@/components/TransactionList";
import { currentUser } from "@clerk/nextjs/server";

const HomePage = async () => {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  return (
    <main>
      <h2>Welcome, {user.firstName}</h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
};

export default HomePage;
