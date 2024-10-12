import { View } from 'react-native';
import { globalStyles as styles } from '../styles/globalStyles';
import { Button, Text } from 'react-native-paper';


export default function Presentation() {
    return (
        <View style={ styles.container }>
            <View style={ styles.areaView }>
                <Text 
                variant="displaySmall"
                >
                    Bem-vindo ao PharmaMove!
                </Text>
            </View>
        
            <View style={ styles.areaView }>
                <Text variant='labelLarge'>
                    Otimize a movimentação de produtos entre nossas filiais 
                    com praticidade e agilidade. Simplifique sua rotina 
                    e maximize a eficiência logística!
                </Text>
            </View>

            <Button 
                icon="door" 
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Entrar
            </Button>

        </View>
    );
}