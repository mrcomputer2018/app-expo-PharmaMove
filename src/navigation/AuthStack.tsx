import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}