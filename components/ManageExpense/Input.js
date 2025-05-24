import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/style";

function Input({ label, style ,textInputConfig ,invalid }) {

const inputStyle= [styles.input]
// const invalidStyle = invalid ? [styles.invalidInput] : ''

if( textInputConfig&& textInputConfig.multiline){
    inputStyle.push(styles.inputMultiline)
}
if(invalid){
  inputStyle.push(styles.invalidInput)

}



  return (
    <View style={[styles.inputContainer ,style]}>
      <Text style={[styles.label , invalid && styles.invalidLabel ]}> {label} </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
   
  },
  label: {
    fontSize: 14,
    color: "white",
    color: GlobalStyles.colors.primary100,
    marginBottom: 6,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel : {
    color: GlobalStyles.colors.error500
  },
  invalidInput : {
    borderWidth : 2,
    backgroundColor: GlobalStyles.colors.error50
  }
});
