"use server";

import { db } from "@/lib/db";
import { Transaction } from "@/types/Transaction";
import { auth } from "@clerk/nextjs/server";

const getTransaction = async (): Promise<{
  transaction?: Transaction[];
  error?: string;
}> => {
  const { userId } = auth();
  if (!userId) {
    return { error: "User not found" };
  }
  try {
    const transaction = await db.transection.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { transaction };
  } catch (error) {
    return { error: "Database error" };
  }
};

export default getTransaction;
