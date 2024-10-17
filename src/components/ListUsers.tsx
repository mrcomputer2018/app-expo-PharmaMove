import { useState } from 'react';
import { View, Text, Image, Switch } from 'react-native';

import { globalStyles } from '../styles/globalStyles';
import { headerStyles } from '../styles/headerStyles';
import { listUsersStyles as styles } from '../styles/listUsersStyles';

type UserProps = {
    id: number; 
    profile: string;
    name: string;
    document: string;
    full_address: string;
    email: string;
    password: string;
    status: number;
}

type ListUsersProps = {
    item: UserProps;
    action: (item: UserProps) => Promise<void>;
};

export default function ListUsers({ item, action }: ListUsersProps) {

    const num = item.status;
    const booleanValue = !!num;

    const [isEnabled, setIsEnabled] = useState(booleanValue);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    return (
        <View style={[ globalStyles.container, styles.container, { opacity: item.status ? 1 : 0.2 } ]}>
            <Image 
                style={ styles.image }
                source={require('../assets/motorista.jpg')}
            />
            
            <View style={globalStyles.container}>
                <Text style={ headerStyles.name }>
                    {item.name}
                </Text>
                <Text style={ headerStyles.profile }>
                    {item.profile}
                </Text>
            </View>

            <View style={ styles.areaSwitch }>
                <Text style={ styles.textSwitch }>
                    {item.status ? 'Ativo' : 'Inativo'}
                </Text>
                <Switch 
                    value={isEnabled} 
                    onChange={() => action(item)}
                    trackColor={{false: '#767577', true: '#ccc'}}
                    thumbColor={isEnabled ? '#004085' : '#f4f3f4'}
                />
            </View>
        </View>
    );
}