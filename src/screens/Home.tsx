import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default function Home() {
    return (
        <SafeAreaView>
            <Header />

            <Text>Home</Text>
            
        </SafeAreaView>
    );
}