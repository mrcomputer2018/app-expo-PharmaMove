import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { getData, storeData } from '../services/storage';

interface AuthContextData {
    user: User | null;
    signIn: (email: any, password: any) => void;
    signOut: () => void;
    loading: boolean;
}

type User = {
    email: string;
     password: string;
 }

interface AuthProviderProps {
    children: ReactNode;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await getData('@user');
            if (storagedUser) {
                setUser(storagedUser);
            }
        }

        loadStorageData();
    }, []);

    function signIn(email: string, password: string) {
        setLoading(true);
       
        axios.post('http://192.168.0.212:3000/login', {
            email: `${email}`, 
            password: `${password}`
        })
        .then((response) => {
            setUser(response.data);
            storeData('@user', response.data);
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
    }

    return (
        <AuthContext.Provider 
        value={{ user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}