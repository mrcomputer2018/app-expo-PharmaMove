import { StatusBar } from 'expo-status-bar';
import { Animated, Image, ImageBackground, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { globalStyles } from '../styles/globalStyles';
import FadeInRight from 'react-native-reanimated';
import AnimatedText from 'react-native-reanimated';
import { presentationStyles as styles } from '../styles/presentationStyles';

const statusBarHeight = Constants.statusBarHeight;


export default function Presentation({navigation}: any) {

    function handleNavigateToLogin() {
        navigation.navigate('Login');
    }

    return (
       
        <ImageBackground 
        source={require('../assets/bg_presentation.jpg')} 
        style={ [ globalStyles.container, styles.container ]}>
            <View style={{ paddingTop: statusBarHeight }}>
                <StatusBar
                    style="light"  
                    backgroundColor="transparent"
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
                >
                    Bem-vindo ao PharmaMove!
                </Text>
            </View>
        
            <View style={ globalStyles.areaView }>
                <Text 
                style={ [ globalStyles.text, { opacity: 0.8, fontSize: 16 }] }
                >
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

        </ImageBackground>
    );
}