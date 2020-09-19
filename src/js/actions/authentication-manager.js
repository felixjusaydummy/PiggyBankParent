import * as LOCALSTORAGE from "local-storage"

const AUTHORIZATION_KEY = "thriftykoala"

export function setAuthorization(authorization_value){
    LOCALSTORAGE.set(AUTHORIZATION_KEY, authorization_value);
}

export function getAuthorization(){
    return LOCALSTORAGE.get(AUTHORIZATION_KEY);
}


export function removeAuthorization(){
    localStorage.removeItem(AUTHORIZATION_KEY);
}