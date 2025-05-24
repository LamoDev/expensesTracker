import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
     id:"e1"  , 
     description: 'Study space',
     amount: 39,
     date: new Date('2025-5-16')
    },   
     {
        id:"e2"  , 
        description: 'dinner',
        amount: 120,
        date: new Date('2025-5-10')
       },
       {
        id:"e3"  , 
        description: 'Makeup',
        amount: 120,
        date: new Date('2025-5-6')
       },
       {
        id:"e4"  , 
        description: 'SHEIN',
        amount: 230,
        date: new Date('2025-5-1')
       },
       {
        id:"e5"  , 
        description: 'COFFEE',
        amount: 30,
        date: new Date('2025-4-5')
       },
];

export const ExpensesContext = createContext([
  {
    // better defintion for auto compleation
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
  },
]);

function expensesReducer(state , action ){
    switch(action.type){
      case 'ADD':
        const id = new Date().toString() + Math.random().toString()
        return [{ ...action.payload , id:id } ,...state]
      case 'UPDATE':  
        const updatableExpenseIndex= state.findIndex((expense)=>expense.id === action.payload.id)
        const UpdatableExpense = state[updatableExpenseIndex]
        const updatedItem = {...UpdatableExpense , ...action.payload.data};
        const updatedExpenses=[...state]
        updatedExpenses[updatableExpenseIndex]=updatedItem;
        return updatedExpenses ;
      case 'DELETE':
        return  state.filter((expense) => expense.id!==action.payload) 
        default: 
            return state ;
    }
}


function ExpensesContextProvider({ children }) {
   const [expensesState , dispatch]= useReducer(expensesReducer , DUMMY_EXPENSES);

   function addExpense(expenseData){
        dispatch({type: 'ADD' , payload : expenseData})
   }

   function deleteExpense(id){
    dispatch({type: 'DELETE' , payload : id})
}
function updateExpense(id , expenseData){
    dispatch({type: 'UPDATE' , payload : {id :id , data: expenseData} })
}

const value = {
    expenses:expensesState,
    addExpense:addExpense,
    deleteExpense:deleteExpense,
    updateExpense:updateExpense
}

  
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
