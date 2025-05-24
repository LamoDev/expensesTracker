import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinuseDays } from "../util/date";


function RecentExpenses(){
    
    const expensesCtx =useContext(ExpensesContext)

    const recentExpenses=expensesCtx.expenses.filter((expense)=>{
       const today = new Date()
       const date7DaysAgo=getDateMinuseDays(today , 7)

       return expense.date > date7DaysAgo

    }) 
    
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallBackText="No expenses registered for the last 7 days" />

}

export default RecentExpenses;