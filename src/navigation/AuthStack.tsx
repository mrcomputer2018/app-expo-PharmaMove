import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Users from "../screens/Users";

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
        </Stack.Navigator>
    );
}