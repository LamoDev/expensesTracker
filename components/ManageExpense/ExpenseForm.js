import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState } from "react";
import { getFormattedDate } from "../../util/date";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GlobalStyles } from "../../constant/style";

function ExpenseForm({
  submitButtonLabel,
  onCancle,
  onSubmit,
  expenseToUpdate,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: expenseToUpdate ? expenseToUpdate.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: expenseToUpdate ? getFormattedDate(expenseToUpdate.date) : "",
      isValid: true,
    },
    description: {
      value: expenseToUpdate ? expenseToUpdate.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enterdValues) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {value : enterdValues , isValid: true},
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionValid) {
      // Alert.alert("Invalid inputs", "Please check your inputs");

      setInputs((currentInputs)=>{
        return {
          amount : { value : currentInputs.amount.value , isValid: amountIsValid},
          date : { value : currentInputs.date.value , isValid: dateIsValid},
          description : { value : currentInputs.description.value , isValid: descriptionValid}
        }


      })
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid


  return (
    <View style={styles.form}>
      <View style={styles.rowInputs}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.inputFlex}
          textInputConfig={{
            KeyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.inputFlex}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.invalidText}>Invalid inputs values - please check your entered values</Text>}
      <View style={styles.buttonsContainer}>
        <Button onPress={onCancle} style={styles.button} mode="flat">
          {" "}
          Cancle{" "}
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {" "}
          {submitButtonLabel}{" "}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputFlex: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  invalidText : {
    textAlign : 'center',
    color: GlobalStyles.colors.error500,
    margin : 8 

  }
  // title:{
  //     fontSize:18,
  //     fontWeight:'bold',
  //     textAlign:'center',
  //     marginBottom: 8

  // },
});
