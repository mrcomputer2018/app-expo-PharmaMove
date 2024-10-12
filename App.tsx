import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Open up App.tsx to start working on your app!</Text>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
