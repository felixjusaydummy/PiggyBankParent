import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as USERACCOUNT from "./account-manager"

const tempData = {
    data: {
        status: "success",
        data: {
            userid : "ccruz_02",
            name : "Juan dela Cruz",

            account: {
                accountNo: "2201234d",
                bankName: "Metrobank",
                balance: 339811.0
            },

            purse: {
                allocations: [
                    {
                        id: 1,
                        description: "09101111111",
                        amount: 100,
                        active: true
                    },
                    {
                        id: 2,
                        description: "09101111111",
                        amount: 50,
                        active: false
                    },
                ]
            }
        }
    }
}


async function callAddPurseAllocation(allocation, authorizationToken){
    // console.log("purse manager: call add allocatio api")
    let url = APIBACKEND.PURSE_ALLOCATION_ADD;
    let body =  allocation
    

    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken
        },
        url: url,
        data: body
    }

    console.log("pursemanager - callPurseAllocationAPI: "+ JSON.stringify(params))

    return axios(params)
    .then(response=>{
        // console.log("success: "+ response)
        return response;
    }).catch(error=>{
        // console.log("error: "+ error)
        return error;
    })

}
export async function addPurseAllocation(allocation, authorizationToken){
    let res = null;
    const response = await callAddPurseAllocation(allocation, authorizationToken);
    // return USERACCOUNT.getAccountDetails(authorizationToken);
    return tempData
}




async function callAddCashToPurseAllocation(payload, authorizationToken){
    // console.log("purse manager: call add allocatio api")
    let url = APIBACKEND.PURSE_ALLOCATION_ADD_CASH;
    // let body =  payload
    const thriftpoints = 0
    let body = {
        amount: (Number(payload.amount) + Number(payload.additionAmmount)),
        oldDescription: payload.description,
        newDescription: payload.description,
        active : payload.active
    }
    

    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken,
            'thriftpoints' : thriftpoints
        },
        url: url,
        data: body
    }

    // console.log("Update Wallet: "+ JSON.stringify(body, null, 2))

    return axios(params)
    .then(response=>{
        // console.log("Update Wallet OK: "+ JSON.stringify(response, null,2))
        return response;
    }).catch(error=>{
        // console.log("Error Update cash: " + JSON.stringify(error, null, 2))
        return error;
    })
}
export async function addCashToPurseAllocation(payload, authorizationToken){
    let res = null;
    const response  = await callAddCashToPurseAllocation(payload, authorizationToken);
    // return USERACCOUNT.getAccountDetails(authorizationToken);
    return tempData
}



async function callDeletePurseAllocation(payload, authorizationToken){
    // console.log("purse manager: call add allocatio api")
    let url = APIBACKEND.PURSE_ALLOCATION_DELETE;
    let body =  {
        description: payload.description
    }

    const thriftpoints = 0;
    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken,
            'thriftpoints' : thriftpoints
        },
        url: url,
        data: body
    }

    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })
}
export async function deletePurseAllocation(payload, authorizationToken){
    // let res = null;
    await callDeletePurseAllocation(payload, authorizationToken);
    // return USERACCOUNT.getAccountDetails(authorizationToken);
    return tempData
}






async function callReleaseAllocationCash(payload, authorizationToken){
    // console.log("purse manager: call add allocatio api")
    let url = APIBACKEND.PURSE_ALLOCATION_RELEASE;
    const thriftpoints = 0
    let body = {
        amount: (Number(payload.amount) - Number(payload.releaseAmount)),
        oldDescription: payload.description,
        newDescription: payload.description,
        active : payload.active
    }
    

    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken,
            'thriftpoints' : thriftpoints
        },
        url: url,
        data: body
    }

    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })
}
export async function releaseAllocationCash(payload, authorizationToken){
    await callReleaseAllocationCash(payload, authorizationToken);
    // return USERACCOUNT.getAccountDetails(authorizationToken);
    return tempData
}

