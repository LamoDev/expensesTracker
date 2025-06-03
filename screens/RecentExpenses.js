import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinuseDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LodaingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const [isfetching , setIsFetching] =useState(true)
    const [error , setError] =useState()


  const expensesCtx = useContext(ExpensesContext);
  
  
  useEffect(() => {
    async function getExpenses() {
    setIsFetching(true)
    try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
    } catch(error){
     setError('Could not fetch expenses !')
   }
    setIsFetching(false)
   
    }
    getExpenses();
  }, []);



  if(error && !isfetching){
    return <ErrorOverlay message={error}  />
  }



  if(isfetching){
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinuseDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Last 7 days"
      fallBackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
