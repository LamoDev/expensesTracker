import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";


function AllExpenses(){

    const expenseCtx = useContext(ExpensesContext) ;


    return <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod="Total" fallBackText="No registered expenses found !!" />

}

export default AllExpenses;