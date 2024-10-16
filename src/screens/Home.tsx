import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from '../styles/globalStyles';
import CardHome from '../components/CardHome';

export default function Home({ navigation }: any) {

    const { user, signOut } = useAuth();

    const image = require('../assets/estoque.jpg');
    const image2 = require('../assets/usuarios.jpg');

    function handleNavigateToListUsers() {
        console.log('Clicou em Usuários');
    }

    function handleNavigateToStock() {
        console.log('Clicou em Estoque');
    }

    return (
        <SafeAreaView>
            <StatusBar style="light"  backgroundColor='#004085'/>

            {user && 
            <Header data={ user as unknown as User | null } 
            signOut={ signOut }/>}

            <View style={ [globalStyles.container, { marginTop: 40 } ]}>

                <CardHome 
                    image={image} 
                    title="Estoque" 
                    subtitle="Controle de Estoque de Medicamentos"
                    action={ handleNavigateToStock }
                />

                <CardHome 
                    image={image2}
                    title="Usuários" 
                    subtitle="Controle de Usuários"
                    action={ handleNavigateToListUsers }
                />

            </View>
            
        </SafeAreaView>
    );
}