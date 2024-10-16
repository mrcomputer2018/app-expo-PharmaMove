import { NavigationContainer } from '@react-navigation/native';
import RouteStack from './src/navigation/RouteStack';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RouteStack />
            </NavigationContainer>
        </AuthProvider>
    );
}

