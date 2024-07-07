"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getUserBalance = async (): Promise<{
  balance?: number;
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

    const balance = transaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return { balance };
  } catch (error) {
    return { error: "Database error" };
  }
};

export default getUserBalance;
