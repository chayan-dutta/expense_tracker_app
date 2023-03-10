import { useContext } from "react";

import ExpensesOutput from "../components/expenssOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

export default function AllExpenses() {
  const ExpenseCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={ExpenseCtx.expenses}
      expensesPeriod="total"
      fallbackText="No registered expense found"
    />
  );
}
