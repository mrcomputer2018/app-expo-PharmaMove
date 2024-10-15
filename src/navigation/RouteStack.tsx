import React from "react";
import AuthStack from "./AuthStack";
import RootStack from "./RootStack";
import { useAuth } from "../contexts/AuthContext";

export default function RouteStack() {

    const { signed } = useAuth();

    return (
        <>
            { 
                signed 
                ? <AuthStack /> 
                : <RootStack />
            }
        </>
    );
}