import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { getData, storeData } from '../services/storage';
import { set } from 'react-hook-form';

interface AuthContextData {
    user: User | null;
    profile: Profile | null;
    signIn: (email: any, password: any) => void;
    signOut: () => void;
    loading: boolean;
}

type User = {
    email: string;
    password: string;
 }

 type Profile = {
    name: string;
    profile: string;
 }

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [ profile, setProfile ] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await getData('@user');

            const storagedProfile = await getData('@profile');

            if (storagedUser) {
                setUser(storagedUser);
                setProfile(storagedProfile);
            }
            
        }

        loadStorageData();
    }, []);

    function signIn(email: string, password: string) {
        setLoading(true);
       
        axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
            email: `${email}`, 
            password: `${password}`
        })
        .then((response) => {
            setUser(response.data);
            setProfile(response.data);
            storeData('@user', response.data);
            storeData('@profile', response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            alert("Erro ao fazer login");
            setLoading(false);
        });
    }

    function signOut() {
        setUser(null);
        storeData('@user', null);
        storeData('@profile', null);
    }

    return (
        <AuthContext.Provider 
        value={{ user, profile, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}