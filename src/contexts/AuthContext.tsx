import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(): void;
    signOut(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    async function signIn() {
        setUser({ name: 'John Doe', email: 'john@john.com' });
    }

    function signOut() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// hook personalizado
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}