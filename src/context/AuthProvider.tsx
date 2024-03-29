import React,{createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiConnection from '../services/ApiConnection'


interface Administrator{
    email:string;
    registration:string;
}

interface ResponseData{
    administrator:Administrator | null;
    token:string;
}

interface Context{
    administrator:Administrator | null;
    login: (cpf:string, password:string) => Promise<void>;
    logout: () => Promise<void>;
    isLogged: boolean;
}


const AuthContext = createContext({} as Context);

export const AuthProvider: React.FC = ({children}) => {

    const [administrator, setAdministrator] = useState<Administrator | null>(null);

    useEffect(() => {
    async function loadStorage(){
        const administratorStorage = await AsyncStorage.getItem('Auth.administrator');
        const tokenStorage = await AsyncStorage.getItem('Auth.token');

        if(administratorStorage && tokenStorage){
            apiConnection.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
            setAdministrator(JSON.parse(administratorStorage));
        }
    }
    loadStorage();
  },[]);

    async function login(cpf:string, password:string){

        const data = {
            cpf, password
        }

        const response = await apiConnection.post('login', data);

        const {administrator, token} = response.data as ResponseData;

        apiConnection.defaults.headers.common.Authorization = `Bearer ${token}`;

        await AsyncStorage.setItem('Auth.administrator', JSON.stringify(administrator));
        await AsyncStorage.setItem('Auth.token', (token));

        setAdministrator(administrator);
    }
    
    async function logout() {

        setAdministrator(null);

        await AsyncStorage.removeItem('Auth.administrator');
        await AsyncStorage.removeItem('Auth.token');
        
    }
    return (
        <AuthContext.Provider
        value={{administrator, login, logout, isLogged: !!administrator}}
        >
            {children}    
        </AuthContext.Provider>
    );

}

export function useMyContext(){
    const context = useContext(AuthContext);
    return context;
}
