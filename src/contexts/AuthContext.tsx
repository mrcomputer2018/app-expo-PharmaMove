import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { storeData } from '../services/storage';

interface AuthContextData {
    signed: boolean;
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

    function signIn(email: any, password: any) {
        setLoading(true);

        axios.post('http://192.168.0.212:3000/login', {
            email: email,
            passord: password
        })
        .then(function (response) {
            setUser(response.data);
            storeData('@user', response.data);
            setLoading(false);
        })
        .catch(function (error) {
            console.error(error);
            alert("Erro ao fazer login");
            setLoading(false);
        });
    }

    function signOut() {
        setUser(null);
       /*  storeData('@user', null); */
    }

    return (
        <AuthContext.Provider 
        value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}