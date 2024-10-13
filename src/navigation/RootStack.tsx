import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Presentation from "../screens/Presentation";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Apresentacao">
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false }}
            />
            
            <Stack.Screen 
                name="Apresentacao" 
                component={Presentation} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}