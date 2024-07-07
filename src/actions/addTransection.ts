"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

const addTransaction = async (
  formData: FormData
): Promise<TransactionResult> => {
  const textValue = formData.get("text");
  const textAmount = formData.get("amount");

  if (!textValue || textValue === "" || !textAmount) {
    return {
      error: "Text or Amount is missing",
    };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(textAmount.toString());

  const { userId } = auth();

  if (!userId) {
    return { error: "Transaction not added" };
  }

  try {
    const transactionData: TransactionData = await db.transection.create({
      data: {
        text,
        amount,
        userId,
      },
    });
    revalidatePath("/");
    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added" };
  }
};

export default addTransaction;
