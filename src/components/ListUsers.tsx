import { useState } from 'react';
import { View, Text, Image, Switch } from 'react-native';

import { globalStyles } from '../styles/globalStyles';
import { headerStyles } from '../styles/headerStyles';
import { listUsersStyles as styles } from '../styles/listUsersStyles';

type User = {
    id: number;
    profile: string;
    name: string;
    status: boolean;
}

type ListUsersProps = {
    item: User;
    users: User[];
};

export default function ListUsers({ item, users }: ListUsersProps) {

    const [isEnabled, setIsEnabled] = useState(false);
    
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
                    value={item.status} 
                    onValueChange={(value) => {
                        const updatedUsers: User[] = users.map((user: User) => 
                            user.id === item.id ? { ...user, status: value } : user
                        );
                        /* setusers(updatedUsers); */
                    }}
                    trackColor={{false: '#767577', true: '#ccc'}}
                    thumbColor={isEnabled ? '#f4f3f4' :'#004085'}
                />
            </View>
        </View>
    );
}