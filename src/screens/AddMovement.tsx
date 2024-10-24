import { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import { z } from 'zod';
import { Picker } from '@react-native-picker/picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, set, useForm } from 'react-hook-form';
import { globalStyles } from '../styles/globalStyles';
import axios from 'axios';

import { Button } from 'react-native-paper';
import Loading from '../components/Loading';

type Branch = {
    id: number;
    latitude: number;
    longitude: number;
    location: string;
    name: string;
}

type Product = {
    branch_id: number;
    branch_name: string;
    product_name: string;
    product_id: number;
    quantity: number;
}

type FormData = {
    originBranchId: number;
    destinationBranchId: number;
    productId: number;
    quantity: number;
    observation: string;
};

const schema = z.object({
    originBranchId: z.number()
        .int()
        .positive("Selecione uma filial de destino")
        .refine(value => value > 0, {
            message: "Selecione uma filial de origem",
        }),
    destinationBranchId: z.number()
        .int()
        .positive("Selecione uma filial de destino")
        .refine(value => value > 0, {
            message: "Selecione uma filial de destino",
        }),
    productId: z.number()
        .int()
        .positive("Selecione um produto")
        .refine(value => value > 0, {
            message: "Selecione um produto",
        }),
    quantity: z.coerce.number()
        .int()
        .positive("Digite uma quantidade"),
    observation: z.string()
        .nonempty("Digite uma observação"),
});

export default function AddMovement() {

    const [ loading, setLoading ] = useState(false);
    const [ branches, setBranches ] = useState<Branch[]>([]);
    const [ products, setProducts ] = useState<Product[]>([]);

    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            originBranchId: 0,
            destinationBranchId: 0,
            productId: 0,
            quantity: 0,
            observation: '',
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

    useEffect(() => {
        function getBranchs() {
            setLoading(true);

            // Lógica para buscar as filiais
            axios.get(process.env.EXPO_PUBLIC_API_URL + '/branches/options')
            .then((response) => {
                setLoading(false);
                setBranches(response.data);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                Alert.alert("Error","Erro ao buscar filiais");
            });
        }

        getBranchs();

    }, []);

    useEffect(() => {
        setLoading(true);

        function getProducts() {
            // Lógica para buscar as produtos
            axios.get(process.env.EXPO_PUBLIC_API_URL + '/products/options')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                Alert.alert("Error","Erro ao buscar produtos");
            });
        }

        getProducts();
        
    }, []);

    const onSubmit = (data: FormData) => {
       //verificando se a filial de origem é a mesma da filial de destino
        if(data.originBranchId === data.destinationBranchId) {
            Alert.alert("Atenção", "A filial de origem não pode ser a mesma da filial de destino");
            return;
        }
       
        //selecionando o produto e a filial desejada
        const product = products.find((product) => 
            product.branch_id === data.originBranchId &&
            product.product_id === data.productId
        );

        //verificando se o produto esta disponivel na filial
        if(!product) {
            Alert.alert("Atenção", "Produto não esta disponivel nesta filial");
            return;
        }

        //verificando se a quantidade desejada é maior que a quantidade disponivel
        if(data.quantity > product.quantity) {
            Alert.alert("Atenção", "A quantidade excede a quantidade disponivel");
            return;
        }

        setLoading(true);

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/movements', {
            originBranchId: data.originBranchId,
            destinationBranchId: data.destinationBranchId,
            productId: data.productId,
            quantity: data.quantity,
        })
        .then((response) => {
            console.log(">>> POST /movements" + response.data);
            Alert.alert("Sucesso","Movimentação cadastrada com sucesso");
            reset();
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            Alert.alert("Error","Erro ao cadastrar movimentação");
            setLoading(false);
        });
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
                        Movimentação
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
                                {branches.map((branch) => ( 
                                    <Picker.Item 
                                        key={branch.id} 
                                        label={branch.name} 
                                        value={branch.id} 
                                    />
                                ))}
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
                                {branches.map((branch) => ( 
                                    <Picker.Item 
                                        key={branch.id} 
                                        label={branch.name} 
                                        value={branch.id} 
                                    />
                                ))}
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
                                {products.map((product) => ( 
                                    <Picker.Item 
                                        key={product.product_id} 
                                        label={product.product_name} 
                                        value={product.product_id} 
                                    />
                                ))}
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