import { View, Text } from 'react-native';
import { loadingStyles as styles } from '../styles/loadingStyles';


export default function Presentation() {
    return (
        <View style={ styles.container }>
            <Text>Apresentação</Text>
        </View>
    );
}