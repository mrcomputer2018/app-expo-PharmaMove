import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Button, TextInput, Text } from 'react-native-paper';


export default function App() {
    return (
        <SafeAreaView style={[globalStyles.container, {
            justifyContent: "center",
            }
        ]}>
            <StatusBar style="light" />
            <View style={ [ globalStyles.areaView, { marginBottom: 60}] }>
                <Text 
                    style={ globalStyles.text }
                    variant="displaySmall"
                >
                   Login
                </Text>
            </View>

            <View style={ globalStyles.formGroup }>
                <TextInput
                    label="E-mail"
                    selectionColor="#004085"
                    underlineColorAndroid={ '#fd7e14' }
                    textColor='#004085'
                    secureTextEntry
                    placeholderTextColor="#6c757d"
                    right={<TextInput.Icon icon="mail" color="#004085" />}
                />
            </View>

            <View style={ globalStyles.formGroup }>
                <TextInput
                    label="Senha"
                    selectionColor="#004085"
                    underlineColorAndroid={ '#fd7e14' }
                    textColor='#004085'
                    secureTextEntry
                    placeholderTextColor="#6c757d"
                    right={<TextInput.Icon icon="eye" color="#004085"/>}
                />
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