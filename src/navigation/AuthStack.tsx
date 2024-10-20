import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Users from "../screens/Users";
import AddUsers from "../screens/AddUsers";
import Products from "../screens/Products";
import Movements from "../screens/Movements";
import Driver from "../screens/Driver";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function AuthStack() {

    const { profile } = useAuth();

    if (!profile) {
        return null;
    }
    else if(profile.profile === 'admin'){
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
    else if(profile.profile === 'filial'){ 
        return (
            <Stack.Navigator initialRouteName="Movimentacoes">    
                <Stack.Screen 
                    name="Movimentacoes" 
                    component={Movements}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }
    else if(profile.profile === 'motorista'){
        return (
            <Stack.Navigator initialRouteName="Motorista">
                <Stack.Screen 
                    name="Motorita" 
                    component={Driver}
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
        );
    }
   else {
        return null;
   }
}