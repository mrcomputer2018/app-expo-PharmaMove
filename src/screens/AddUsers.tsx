import React, {useState } from 'react';
import 
{ View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert } 
from 'react-native';
import { Button } from 'react-native-paper';
import { globalStyles } from '../styles/globalStyles';
import {Picker} from '@react-native-picker/picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import Loading from '../components/Loading';

// Define a custom type for your form data
type FormData = {
    profile: string;
    name: string;
    document: string;
    full_address: string;
    email: string;
    password: string;
};

interface OnChangeArg {
    nativeEvent: {
        text: string;
    };
}

interface OnChangeReturn {
    value: string;
}

const schema = z.object({
    profile: z.string()
        .min(1, { message: "Selecione uma opção válida" })
        .transform((value) => String(value)), // Coerce para string
    name: z.string()
        .nonempty('O campo nome é obrigatório'),
    document: z.string()
        .nonempty('O campo documento é obrigatório')
        .min(11, 'O documento deve ter no mínimo 11 caracteres'),
    full_address: z.string()
        .nonempty('O campo endereço é obrigatório'),
    email: z.string()
        .email('Email inválido')
        .nonempty('O campo email é obrigatório'),
    password: z.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .nonempty('O campo senha é obrigatório'),
});


export default function AddUsers() {

    const [loading, setLoading] = useState(false);

    // Usando Hook from React para criar um estado local
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            profile: '',
            name: '',
            document: '',
            full_address: '',
            email: '',
            password: '',
        }
    });

    //observar o valor do campo profile
    const selectedProfile = watch('profile');

    const onSubmit = (data: FormData) => {

        setLoading(true);
        
        axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', {
            profile: data.profile,
            name: data.name,
            document: data.document,
            full_address: data.full_address,
            email: data.email,
            password: data.password,
        })
        .then((response) => {
            console.log(response.data);
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
            setLoading(false);
            reset({
                profile: '',
                name: '',
                document: '',
                full_address: '',
                email: '',
                password: ''
            });
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível cadastrar o usuário');
            setLoading(false);
        });
    };
    
    const onChange = (arg: OnChangeArg): OnChangeReturn => {
        return {
            value: arg.nativeEvent.text,
        };
    };
    
    
    return (
        <KeyboardAvoidingView
            style={globalStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS ajusta padding, Android height
            keyboardVerticalOffset={100} // Ajusta o quanto a tela deve "subir"
        >
            <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}>
                {/*  tipo de usuario */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}> Tipo do usuário</Text>
                    <Controller
                        control={control}
                        name="profile"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.selectContainer}>
                            <Picker
                            selectedValue={value}  // Valor selecionado no Picker
                            onValueChange={(itemValue) => onChange(itemValue)}  // Atualiza o valor no formulário
                            style={globalStyles.picker}
                            >
                                <Picker.Item label="Selecione uma opção" value="" />
                                <Picker.Item label="Motorista" value="motorista" />
                                <Picker.Item label="Filial" value="filial" />
                            </Picker>
                        </View>
                        )}  
                    />
                    { errors.profile && 
                        <Text style={styles.errorText}>
                            {errors.profile.message}
                        </Text>
                    }
                </View>

                {/* nome */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Nome completo"
                                returnKeyType="next"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}
                    />
                    { errors.name && 
                        <Text style={styles.errorText}>
                            {errors.name.message}
                        </Text>
                    }
                </View>

                {/* documento */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>
                        {selectedProfile === 'motorista' ? 'CPF' : 'CNPJ'}
                    </Text>
                    <Controller
                        control={control}
                        name="document"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Numero do documento"
                                keyboardType="numeric"
                                returnKeyType="next"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}
                    />
                    { errors.document && 
                        <Text style={styles.errorText}>
                            {errors.document.message}
                        </Text>
                    }
                </View>

                {/* endereço */}
                <View style={styles.formGroup}>
                    <Text style={globalStyles.label}>Endereço</Text>
                    <Controller
                        control={control}
                        name="full_address"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Endereço completo"
                                returnKeyType="next"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}  
                    />
                     { errors.full_address && 
                        <Text style={styles.errorText}>
                            {errors.full_address.message}
                        </Text>
                    }
                </View>

                {/* email */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                returnKeyType="next"
                                autoCapitalize="none"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}
                    />
                     { errors.email && 
                        <Text style={styles.errorText}>
                            {errors.email.message}
                        </Text>
                    }
                </View>

                {/* senha */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="done"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}
                    />
                    { errors.password && 
                        <Text style={styles.errorText}>
                            {errors.password.message}
                        </Text>
                    }
                </View>

                {/* botao de cadastro */}
                <View style={styles.formGroup}>
                    <Button
                        style={globalStyles.button}
                        labelStyle={{ fontSize: 18 }}
                        buttonColor="#fd7e14"
                        icon={ loading ? '' : 'check-circle' }
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                    >
                        {loading ? <Loading size="small" color='#fff'/> : "Cadastrar"}
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
    selectContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
    },
    input: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});