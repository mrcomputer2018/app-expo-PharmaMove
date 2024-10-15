import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from '../styles/globalStyles';

export default function Home() {

    const { user, signOut } = useAuth();

    return (
        <SafeAreaView>
            <StatusBar style="light"  backgroundColor='#004085'/>

            {user && 
            <Header data={ user as unknown as User | null } 
            signOut={ signOut }/>}

            <View style={ globalStyles.container }>

            </View>
            
        </SafeAreaView>
    );
}