import { View, Text , StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/style";

function ExpensesSummary( { expenses ,periodName ,}) {
    // the sum is the total value that is carried over across executions
    const expensesSum =expenses.reduce((sum , expense)=>{
        return sum + expense.amount
    } , 0)
  
    return (
    <View style={styles.summaryContainer}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}> ${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles =StyleSheet.create({
    summaryContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:8 ,
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius:6 ,
        marginTop : 10
    },
    period:{
        fontSize:12,
        color:GlobalStyles.colors.primary400
    },
    sum:{
        fontSize:16,
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold',
        
    }
})
