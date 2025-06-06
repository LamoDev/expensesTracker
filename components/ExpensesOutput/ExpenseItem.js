import { Pressable ,View ,StyleSheet,Text } from "react-native";
import { GlobalStyles } from "../../constant/style";
import { getFormattedDate } from "../../util/date";
import {useNavigation} from '@react-navigation/native'
function ExpenseItem({ id , description,amount ,date  }){
    const navigation= useNavigation() 
    
    
    function expensePressHandler(){
        navigation.navigate("ManageExpenses" , {
            expenseId:id 
        })

    }
    return <Pressable onPress={expensePressHandler} style={({pressed})=> pressed&&styles.pressed}>
        <View style={styles.expenseItem}>
            <View>
            <Text style={[styles.textBase , styles.descrption]}>{description}</Text>
            <Text style={styles.textBase}>{getFormattedDate(date)}</Text>  

            </View>
            <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount.toFixed(2)}</Text>  
            </View>  
        </View> 
    </Pressable>
}

export default ExpenseItem ;

const styles = StyleSheet.create({
    expenseItem : {
        padding:12 ,
        marginVertical: 8,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4, 
        shadowOpacity: 0.4 , 
        shadowOffset:{ width:1 , height:1 }

    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    descrption:{
        fontSize:16,
        margin:4 ,
        fontWeight:'bold'
    },
    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 4 ,
        minWidth: 80,
    },
    amount:{
        color: GlobalStyles.colors.primary500,
        fontWeight:'bold'
    },
    pressed:{
        opacity:0.75
    }

})