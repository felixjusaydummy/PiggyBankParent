import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as STATUSTYPE from "./../constants/status-type"

async function checkCredentials(param){
    let url = APIBACKEND.SIGNIN;
    let body =  { 
        username: param.username,
        password: param.password
    }

    // console.log("signin: " + url)
    return axios({
        method: 'post',
        responseType: 'json',
        url: url,
        data: body
    })
    .then(response=>{
        // console.log("signin res: " + JSON.stringify(response))
        return response;
    }).catch(error=>{
        // console.log("signin err: " + JSON.stringify(error))
        return error;
    })

}

export async function loginAsync(param){
    let res = null;
    const response = await checkCredentials(param);
    return response;
}