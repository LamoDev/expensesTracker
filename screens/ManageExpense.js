import { useLayoutEffect } from "react";
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/style";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpenseForm from '../components/ManageExpense/ExpenseForm'



function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  // because we have 2 modes , editing an expense which requiers the id , and adding new
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;



  // let expenseToBeUpdated 
  
  // if(isEditing){
  //   expenseToBeUpdated = expensesCtx.expenses.map((expense)=>{
  //      if(expense.id ===route.params.expenseId){
  //       return expense
  //     }
  //   })

  // console.log(expenseToBeUpdated)
  // }

  const expenseToBeUpdated=expensesCtx.expenses.find(
    (expense) => expense.id===editedExpenseId )




  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function handleDeleteExpense() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancleHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(
        editedExpenseId,expenseData 
      );
    } else {
      expensesCtx.addExpense(expenseData);
    }

    navigation.goBack();
  }

  console.log(expenseToBeUpdated)

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={isEditing ? "Update" : "Add"} onCancle={cancleHandler} onSubmit={confirmHandler} expenseToUpdate={expenseToBeUpdated}  />
     
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={34}
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
