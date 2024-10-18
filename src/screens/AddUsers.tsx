import React, { useState } from 'react';
import 
{ View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { SelectList } from 'react-native-dropdown-select-list';


export default function AddUsers() {

    const [selected, setSelected] = useState("");

    const data = [
        {key:'Motorista',value:'Motorista'},
        {key:'Filial',value:'Filial'},
    ];
    

    return (
        <KeyboardAvoidingView
            style={globalStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS ajusta padding, Android height
            keyboardVerticalOffset={100} // Ajusta o quanto a tela deve "subir"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/*  tipo de usuario */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}> Tipo do usuário</Text>
                    <SelectList 
                        onSelect={() => {}}
                        setSelected={setSelected} 
                        data={data}  
                        arrowicon={
                            <FontAwesome 
                                name="chevron-down" 
                                size={12} 
                                color={'black'} />
                        } 
                        search={false}
                        boxStyles={{
                            borderRadius: 8,
                            backgroundColor:'#fff',
                            borderWidth:1,
                            borderColor:'#ccc',
                            height: 50,
                        }} 
                        inputStyles={{
                            color: '#aaa',  // Cor do texto
                            fontSize: 15,   // Tamanho da fonte
                        }}
                        dropdownStyles={{
                            backgroundColor: '#fff',  // Fundo da lista dropdown
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                        }}
                        dropdownTextStyles={{
                            color: '#333',  // Cor do texto nas opções
                            fontSize: 16,
                        }}
                        defaultOption={{ key:'0', value:'Selecione uma opção' }}   
                    />
                </View>

                {/* nome */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome completo"
                        returnKeyType="next"
                    />
                </View>

                {/* documento */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>
                        {(selected === 'Motorista' || selected === '') 
                        ? 'CPF' : 'CNPJ'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Numero do documento"
                        keyboardType="numeric"
                        returnKeyType="next"
                    />
                </View>

                {/* endereço */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Endereço</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço completo"
                        returnKeyType="next"
                    />
                </View>

                {/* email */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCapitalize="none"
                    />
                </View>

                {/* senha */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                        returnKeyType="done"
                    />
                </View>

                {/* botao de cadastro */}
                <View style={styles.formGroup}>
                    <Button
                        style={globalStyles.button}
                        labelStyle={{ fontSize: 18 }}
                        buttonColor="#fd7e14"
                        icon="check-circle"
                        mode="contained"
                        onPress={() => {}}
                    >
                        Cadastrar
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        marginVertical: 10,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});