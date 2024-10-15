import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Button, TextInput, Text } from 'react-native-paper';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const schema = z.object({
    email: z
        .string()
        .email('Email inválido')
        .nonempty('O campo email é obrigatório'),
    password: z
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .nonempty('O campo senha é obrigatório')
});

// Tipos baseados no esquema Zod para maior segurança com TypeScript
type FormData = z.infer<typeof schema>;
  

export default function Login({ navigation }: any) {
    // acessando contexto global
    const { signIn, loading } = useAuth();

    // Estado para mostrar ou esconder a senha
    const [showPassword, setShowPassword] = useState(false);

    // useForm com Zod integration para validação
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    // Função chamada quando o formulário é enviado corretamente
    const onSubmit = (data: FormData) => {
        const email = data.email;
        const password = data.password.toString();

        signIn(email, password);

        // Após o login bem-sucedido, limpa os campos
        reset();
    };

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
                    // Integração com React Hook Form
                    onChangeText={(text) => setValue('email', text)}
                    selectionColor="#004085"
                    underlineColorAndroid={ '#fd7e14' }
                    textColor='#004085'
                    secureTextEntry
                    placeholderTextColor="#6c757d"
                    keyboardType='email-address'
                    right={<TextInput.Icon icon="mail" color="#004085" />}
                />

                {errors.email && <Text style={styles.errorText}>
                    {errors.email.message}
                </Text>}
            </View>

            <View style={ globalStyles.formGroup }>
                <TextInput
                    label="Senha"
                    onChangeText={(text) => setValue('password', text)} 
                    selectionColor="#004085"
                    underlineColorAndroid={ '#fd7e14' }
                    textColor='#004085'
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#6c757d"
                    right={<TextInput.Icon 
                        icon={showPassword ? "eye-off" : "eye"}
                        color="#004085"
                        onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />

                {errors.password && <Text style={styles.errorText}>
                    {errors.password.message}
                </Text>}
            </View>

            <Button
                style={globalStyles.button}
                labelStyle={{ fontSize: 18 }}
                buttonColor="#fd7e14"
                icon={ loading ? '' : 'login' } 
                mode="contained"
                onPress={handleSubmit(onSubmit)} 
            >
                { loading ? <Loading color='white'/> : 'Logar' }
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});
