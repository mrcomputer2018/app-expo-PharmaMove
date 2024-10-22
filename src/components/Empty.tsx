import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { emptyStyles as styles } from '../styles/emptyStyles';

export default function Empty({ message}: { message: string }) {
    return (
        <View style={ [globalStyles.container, styles.container ]}>
            <Text style={ styles.text}>
                { message }
            </Text>
        </View>
    );
}