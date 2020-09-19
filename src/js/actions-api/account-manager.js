import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as STATUSTYPE from "./../constants/status-type"


async function callAccountDetails(authorizationToken){
    let url = APIBACKEND.GETACCOUNTDETAILS;
    const param = {
        method: 'get',
        headers: {'authorization': authorizationToken},
        responseType: 'json',
        url: url
    }
    // console.log("AccountManager call: "+ JSON.stringify(param, null, 2))
    return axios(param)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function getAccountDetails(authorizationToken){
    let res = null;
    const response = await callAccountDetails(authorizationToken);
    // console.log("AccountManager call result: "+ JSON.stringify(response, null, 2))
    return response;
}
