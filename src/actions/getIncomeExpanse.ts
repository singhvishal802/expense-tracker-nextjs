"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getIncomeExpanse = async (): Promise<{
  income?: number;
  expanse?: number;
  error?: string;
}> => {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }
  try {
    const transaction = await db.transection.findMany({
      where: { userId },
    });

    const amounts = transaction.map((transaction) => transaction.amount);
    const income = amounts
      .filter((income) => income > 0)
      .reduce((acc, item) => acc + item, 0);
    const expanse = amounts
      .filter((expanse) => expanse < 0)
      .reduce((acc, item) => acc + item, 0);
    return { income, expanse: Math.abs(expanse) };
  } catch (error) {
    return { error: "Database error" };
  }
};

export default getIncomeExpanse;
