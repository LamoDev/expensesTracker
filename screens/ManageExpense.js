import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/style";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useState } from "react";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LodaingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSending, setIsSending] = useState(false);
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError]=useState()


  // because we have 2 modes , editing an expense which requiers the id , and adding new
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  const expenseToBeUpdated = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function handleDeleteExpense() {
    setIsSending(true);
    try {
      await deleteExpense(editedExpenseId);
      // isSending(false);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch(error){
      setError('Could not delete expense')
      setIsSending(false);

    }
 
  
  }

  function cancleHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSending(true)
    try {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }catch(error){
    setError('Could not save data ')
    setIsSending(false)
  }
  

  }

  console.log(expenseToBeUpdated);




  if(error && !isSending){
    return <ErrorOverlay message={error}/>
  }

  if (isSending) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancle={cancleHandler}
        onSubmit={confirmHandler}
        expenseToUpdate={expenseToBeUpdated}
      />

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
