import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Users from "../screens/Users";
import AddUsers from "../screens/AddUsers";
import Products from "../screens/Products";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="Usuarios" 
                component={Users} 
            />

            <Stack.Screen 
                name="Adicionar Usuário" 
                component={AddUsers} 
            />

            <Stack.Screen 
                name="Estoque" 
                component={Products} 
            />
        </Stack.Navigator>
    );
}