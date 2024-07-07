import getIncomeExpanse from "@/actions/getIncomeExpanse";
import { addThousandSeparators } from "@/lib/util";

const IncomeExpense = async () => {
  const { income, expanse } = await getIncomeExpanse();
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${addThousandSeparators(Number(income))}</p>
      </div>
      <div>
        <h4>Expanse</h4>
        <p className="money minus">${addThousandSeparators(Number(expanse))}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
