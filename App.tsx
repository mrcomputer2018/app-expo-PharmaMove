import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </AuthProvider>
    );
}

