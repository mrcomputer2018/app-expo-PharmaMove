import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Button } from 'react-native-paper';


export default function App() {
    return (
        <SafeAreaView style={[globalStyles.container, {
            backgroundColor: "#f8f9fa",
            }
        ]}>
            <StatusBar style="auto" />
            <View>
                <Text>Login</Text>
            </View>

            <View>
                <Text>E-mail</Text>
                <TextInput />
            </View>

            <View>
                <Text>Senha</Text>
                <TextInput />
            </View>

            <Button
                style={globalStyles.button}
                labelStyle={{ fontSize: 18 }}
                buttonColor="#fd7e14"
                icon="door" 
                mode="contained" 
                onPress={() => console.log("Logar")}
            >
                Logar
            </Button>
        </SafeAreaView>
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