import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { z } from 'zod';
import { Picker } from '@react-native-picker/picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { globalStyles } from '../styles/globalStyles';
import { Button } from 'react-native-paper';
import Loading from '../components/Loading';

type FormData = {
    originBranchId: number;
    destinationBranchId: number;
    productId: number;
    quantity: number;
    observation: string;
};

const schema = z.object({
    originBranchId: z.string()
        .min(1, { message: "Selecione uma opção válida" })
        .transform((value) => String(value)), // Coerce para string
});

export default function AddMovement() {

    const [ loading, setLoading ] = useState(false);

    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            originBranchId: 0,
            destinationBranchId: 0,
            productId: 0,
            quantity: 0,
        }
    });

    type OnChangeArg = {
        nativeEvent: {
            text: string;
        };
    };

    const onChange = (arg: OnChangeArg): { value: string } => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <KeyboardAvoidingView 
            style={ [globalStyles.container, { marginBottom: 20 }] }
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <Text style={ [globalStyles.title, {
                            marginTop: 30,
                        } 
                    ]}>
                        Adicionando Movimentação
                    </Text>
                </View>

                <View style={ globalStyles.formGroup}>
                    {/*  origem */}
                    <Text style={globalStyles.label}>Filial de origem</Text>
                    <Controller
                        control={control}
                        name="originBranchId"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                        <View style={globalStyles.selectContainer}>
                            <Picker
                            selectedValue={value}
                            onValueChange={(itemValue) => onChange(itemValue)}
                            style={globalStyles.picker}
                            >
                                <Picker.Item label="Selecione uma opção" value="" />
                                <Picker.Item 
                                    label="Farmácia Saúde SP" 
                                    value="Farmácia Saúde SP" 
                                />
                                <Picker.Item 
                                    label="Farmácia Bem-Estar CE" 
                                    value="Farmácia Bem-Estar CE" 
                                />
                            </Picker>
                        </View>
                        )}  
                    />
                    { errors.originBranchId && 
                        <Text style={globalStyles.errorText}>
                            {errors.originBranchId.message}
                        </Text>
                    }
                </View>

                <View style={ globalStyles.formGroup}>
                    {/*  destino */}
                    <Text style={globalStyles.label}>Filial de destino</Text>
                    <Controller
                        control={control}
                        name="destinationBranchId"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                        <View style={globalStyles.selectContainer}>
                            <Picker
                            selectedValue={value}  
                            onValueChange={(itemValue) => onChange(itemValue)}
                            style={globalStyles.picker}
                            >
                                <Picker.Item label="Selecione uma opção" value="" />
                                <Picker.Item 
                                    label="Farmácia Saúde SP" 
                                    value="Farmácia Saúde SP" 
                                />
                                <Picker.Item 
                                    label="Farmácia Bem-Estar CE" 
                                    value="Farmácia Bem-Estar CE" 
                                />
                            </Picker>
                        </View>
                        )}  
                    />
                    { errors.destinationBranchId && 
                        <Text style={globalStyles.errorText}>
                            {errors.destinationBranchId.message}
                        </Text>
                    }
                </View>

                <View style={ globalStyles.formGroup}>
                    {/*  produto*/}
                    <Text style={globalStyles.label}>Produto desejado</Text>
                    <Controller
                        control={control}
                        name="productId"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                        <View style={globalStyles.selectContainer}>
                            <Picker
                            selectedValue={value}  
                            onValueChange={(itemValue) => onChange(itemValue)}
                            style={globalStyles.picker}
                            >
                                <Picker.Item label="Selecione uma opção" value="" />
                                <Picker.Item 
                                    label="Farmácia Saúde SP" 
                                    value="Farmácia Saúde SP" 
                                />
                                <Picker.Item 
                                    label="Farmácia Bem-Estar CE" 
                                    value="Farmácia Bem-Estar CE" 
                                />
                            </Picker>
                        </View>
                        )}  
                    />
                    { errors.productId && 
                        <Text style={globalStyles.errorText}>
                            {errors.productId.message}
                        </Text>
                    }
                </View>

                {/* quantidade */}
                <View style={globalStyles.formGroup}>
                    <Text style={globalStyles.label}>Quantidade</Text>
                    <Controller
                        control={control}
                        name="quantity"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={globalStyles.input}
                                placeholder="0"
                                keyboardType='numeric'
                                returnKeyType="next"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}  
                    />
                     { errors.quantity && 
                        <Text style={globalStyles.errorText}>
                            {errors.quantity.message}
                        </Text>
                    }
                </View>

                {/* observaçao */}
                <View style={globalStyles.formGroup}>
                    <Text style={globalStyles.label}>Observação</Text>
                    <Controller
                        control={control}
                        name="observation"
                        rules={{ required: true }}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={globalStyles.input}
                                placeholder="digite uma observação"
                                keyboardType='default'
                                multiline={true}
                                numberOfLines={4}
                                returnKeyType="done"
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value as unknown as string}
                            />
                        )}  
                    />
                     { errors.observation && 
                        <Text style={globalStyles.errorText}>
                            {errors.observation.message}
                        </Text>
                    }
                </View>

                 {/* botao de cadastro */}
                 <View style={globalStyles.formGroup}>
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