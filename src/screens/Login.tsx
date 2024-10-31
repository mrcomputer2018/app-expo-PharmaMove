import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles/globalStyles';
import { loginStyles as styles } from '../styles/loginStyles';
import { Button, TextInput, Text } from 'react-native-paper';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
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
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
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
        <ImageBackground 
        source={require('../assets/bg_presentation.jpg')}
        style={[globalStyles.container, styles.container
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

            <LinearGradient
                // Background Linear Gradient
                colors={['transparent','rgba(0,0,0,.9)']}
                style={styles.background}
            />

            <View style={ globalStyles.formGroup }>
                <Controller 
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="E-mail"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            selectionColor="#004085"
                            underlineColorAndroid={ '#fd7e14' }
                            textColor='#004085'
                            autoCapitalize='none'
                            placeholderTextColor="#6c757d"
                            keyboardType='email-address'
                            right={<TextInput.Icon icon="mail" color="#004085" />}
                        />
                    )}
                />

                {errors.email && <Text style={[styles.errorText, {
                    color: '#f50'
                }]}>
                    {errors.email.message}
                </Text>}
            </View>

            <View style={ globalStyles.formGroup }>
                <Controller 
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Senha"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
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
                    )}
                />

                {errors.password && <Text style={[styles.errorText, {
                    color: '#f50'
                }]}>
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
                { loading ? <Loading size="small" color='white'/> : 'Logar' }
            </Button>
        </ImageBackground>
    );
}