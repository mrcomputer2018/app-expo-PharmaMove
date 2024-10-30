import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Constants from 'expo-constants';
import { globalStyles } from '../styles/globalStyles';
import { presentationStyles as styles } from '../styles/presentationStyles';

const statusBarHeight = Constants.statusBarHeight;


export default function Presentation({navigation}: any) {

    function handleNavigateToLogin() {
        navigation.navigate('Login');
    }

    return (
       
        <SafeAreaView style={ [ globalStyles.container, styles.container ]}>
            <View style={{ paddingTop: statusBarHeight }}>
                <StatusBar
                    style="light"  
                    backgroundColor='#004085'
                />
            </View>

            <View>
                <Image 
                    style={ styles.image }    
                    source={require('../assets/PharmaMove.webp')}
                />
            </View>

            <View style={ globalStyles.areaView }>
                <Text 
                style={ globalStyles.text }
                variant="displaySmall"
                >
                    Bem-vindo ao PharmaMove!
                </Text>
            </View>
        
            <View style={ globalStyles.areaView }>
                <Text 
                style={ [ globalStyles.text, { opacity: 0.7, fontSize: 16 }] }
                variant='labelLarge'>
                    Otimize a movimentação de produtos entre nossas filiais 
                    com praticidade e agilidade. 
                </Text>
            </View>

            <Button
                style={ globalStyles.button }
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