import getUserBalance from "@/actions/getUserBalance";
import { addThousandSeparators } from "@/lib/util";

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${addThousandSeparators(Number(balance?.toFixed(2))) ?? 0}</h1>
    </>
  );
};

export default Balance;
