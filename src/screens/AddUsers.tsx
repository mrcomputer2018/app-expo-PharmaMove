import { View, Text, SafeAreaView, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Button } from 'react-native-paper';

export default function AddUsers() {

    return (
        <KeyboardAvoidingView style={ globalStyles.container }>
            {/*  tipo de usuario */}
            <View style={ styles.formGroup }>
                <Text>Picker motorista ou filial</Text>
            </View>

            {/*  nome */}
            <View style={ styles.formGroup }>
                <Text style={ styles.label }>
                    Nome Completo
                </Text>
                <TextInput
                    style={ styles.input }
                    placeholder="Nome completo"
                />
            </View>
            
            {/* documento */}
            <View style={ styles.formGroup }>
                <Text style={ styles.label }>
                    CPF
                </Text>
                <TextInput
                    style={ styles.input }
                    placeholder="Numero do documento"
                />
            </View>

            {/* endereço */}
            <View style={ styles.formGroup }>
                <Text style={ styles.label }>
                    Endereço
                </Text>
                <TextInput
                    style={ styles.input }
                    placeholder="Endereço completo"
                />
            </View>

            {/* email */}
            <View style={ styles.formGroup }>
                <Text style={ styles.label }>
                    E-mail
                </Text>
                <TextInput
                    style={ styles.input }
                    placeholder="Email"
                    keyboardType='email-address'
                />
            </View>
                
            {/* senha */}
            <View style={ styles.formGroup }>
                <Text style={ styles.label }>
                    Senha
                </Text>
                <TextInput
                    style={ styles.input }
                    placeholder="Senha"
                    secureTextEntry
                />
            </View>

            {/* botao de cadastro */}
            <View style={ styles.formGroup }>
                <Button
                    style={ globalStyles.button }
                    labelStyle={{ fontSize: 18 }}
                    buttonColor="#fd7e14"
                    icon="check-circle" 
                    mode="contained" 
                    onPress={() => {}}
                >
                    Cadastrar
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

export const styles = StyleSheet.create({
    formGroup: {
        marginVertical: 10
    },
    label: {
        marginBottom: 5
    },
    input: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});