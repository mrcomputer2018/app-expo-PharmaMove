import { Image, SafeAreaView, View } from 'react-native';
import { globalStyles as styles } from '../styles/globalStyles';
import { Button, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';


export default function Presentation({navigation}: any) {

    function handleNavigateToLogin() {
        navigation.navigate('Login');
    }

    return (
       
        <SafeAreaView style={ styles.container }>
            <StatusBar style="light" />

            <View>
                <Image 
                style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}    
                source={require('../assets/PharmaMove.webp')}/>
            </View>

            <View style={ styles.areaView }>
                <Text 
                style={ styles.text }
                variant="displaySmall"
                >
                    Bem-vindo ao PharmaMove!
                </Text>
            </View>
        
            <View style={ styles.areaView }>
                <Text 
                style={ [styles.text, { opacity: 0.8 }] }
                variant='labelLarge'>
                    Otimize a movimentação de produtos entre nossas filiais 
                    com praticidade e agilidade. Simplifique sua rotina 
                    e maximize a eficiência logística!
                </Text>
            </View>

            <Button
                style={styles.button}
                labelStyle={{ fontSize: 18 }}
                buttonColor="#fd7e14"
                icon="door" 
                mode="contained" 
                onPress={() => handleNavigateToLogin()}
            >
                Entrar
            </Button>

        </SafeAreaView>
    );
}