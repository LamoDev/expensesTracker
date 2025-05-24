import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { NavigationContainer } from '@react-navigation/native';
import {GlobalStyles} from './constant/style'
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context'
import { useContext } from 'react';

const Stack = createNativeStackNavigator();
const BottomTabs= createBottomTabNavigator();


function ExpensesOverview(){
  return <BottomTabs.Navigator screenOptions={({navigation})=> ({
      headerStyle :{
        backgroundColor: GlobalStyles.colors.primary500 
      },
      headerTintColor:'white',
      tabBarStyle:{ backgroundColor:
        GlobalStyles.colors.primary500
      },
       tabBarActiveTintColor : GlobalStyles.colors.accent500,
       headerRight : ({tintColor})=> <IconButton icon="add" size={24} color={tintColor} onPress={()=>{navigation.navigate('ManageExpenses')}} />
  })}>
      <BottomTabs.Screen  name="RecentsExpenses" component={RecentExpenses} options={
        {
          tiRtle:"Recent Expenses",
          tabBarLabel:'Recent',
          tabBarIcon : ({color , size}) => <Ionicons name="hourglass" size={size} color={color} />
          
        }
      } />
      <BottomTabs.Screen  name="AllExpenses" component={AllExpenses}
      options={
        {
          title:"All Expenses",
          tabBarLabel:'All Expenses',
          tabBarIcon : ({color , size}) => <Ionicons name="calendar" size={size} color={color} />
         }} />
  </BottomTabs.Navigator>
}


export default function App() {

  

  return (
    <>
    <StatusBar style="light" />
<ExpensesContextProvider>
    <NavigationContainer>
    <Stack.Navigator 
    screenOptions={ {
        headerStyle:{
        backgroundColor:GlobalStyles.colors.primary500 } ,
          headerTintColor:'white'
      }
    }>
    <Stack.Screen name="ExpensesOverview"  component={ExpensesOverview} options={{headerShown: false}}/> 
    <Stack.Screen name="ManageExpenses" component={ManageExpense}options={{
    presentation:'modal' 
    }} />
  </Stack.Navigator>
   
    </NavigationContainer>
    </ExpensesContextProvider>
    </>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
