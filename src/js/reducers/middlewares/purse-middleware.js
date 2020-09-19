import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as PurseManager from "../../actions-api/purse-manager"
import * as AccountManager from  "../../actions-api/account-manager"

export const addAllocation = (action, dispatch)=>{
    new Promise((resolve, reject)=>{
        try{
            //add thriftpoints
            
            let result = PurseManager.addPurseAllocation(action.payload, action.authorization);
            resolve(result)
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        // console.log("checking: "+ response.data.status + " : "+ STATUSTYPE.RESPOND_SUCCESS )
        
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                    message: "Wallet Allocation Successfully Added",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            // console.log("pursemiddleware succss: ")
            // console.log("pursemiddleware succss: "+ JSON.stringify(response.data.data.user, null, 2))
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                    message: "Failed to Add Wallet Allocation.",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: action_status
            }
            // console.log("pursemiddleware error: "+ JSON.stringify(response, null, 2))
            dispatch(action);
        }
    })
    .catch(error=>{
        // console.log("Error Purse Middlware: "+error)
        let action_status = {
            purse: {
                status: STATUSTYPE.STATUS_ERROR,
                transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                message: "Failed to Add Wallet Allocation.",
            }
        }
        action = {
            type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        // console.log("pursemiddleware catch error: "+ JSON.stringify(error))
        dispatch(action);
    })
}



export const addCashToAllocation = (action, dispatch)=>{

    new Promise((resolve, reject)=>{
        try{
            let result = PurseManager.addCashToPurseAllocation(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        // console.log("checking: "+ response.data.status + " : "+ STATUSTYPE.RESPOND_SUCCESS )
        
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH_RESOLVED,
                    message: "Successfully Add Cash to Wallet Allocation",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            // console.log("pursemiddleware succss: ")
            // console.log("pursemiddleware succss: "+ JSON.stringify(response.data.data.user, null, 2))
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH_RESOLVED,
                    message: "Failed to Add Cash to Wallet Allocation",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: action_status
            }
            // console.log("pursemiddleware error: "+ JSON.stringify(response, null, 2))
            dispatch(action);
        }
    })
    .catch(error=>{
        console.log("Error Purse Middlware: "+error)
        let action_status = {
            purse: {
                status: STATUSTYPE.STATUS_ERROR,
                transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH_RESOLVED,
                message: "Failed to Add Cash to Wallet Allocation.",
            }
        }
        action = {
            type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        // console.log("pursemiddleware catch error: "+ JSON.stringify(error))
        dispatch(action);
    })
}


export const deleteAllocation = (action, dispatch)=>{

    new Promise((resolve, reject)=>{
        try{
            // console.log("delete purse middlware: "+ JSON.stringify(action, null, 2))
            let result = PurseManager.deletePurseAllocation(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE_RESOLVED,
                    message: "Successfully Deleting Wallet Allocation",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            // console.log("delete purse action: "+ JSON.stringify(action, null, 2))
            // console.log("delete purse action: "+ JSON.stringify(response, null, 2))
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE_RESOLVED,
                    message: "Failed to Delete Wallet Allocation",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: action_status
            }
            dispatch(action);
        }
    })
    .catch(error=>{
        let action_status = {
            purse: {
                status: STATUSTYPE.STATUS_ERROR,
                transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE_RESOLVED,
                message: "Failed to Delete Wallet Allocation.",
            }
        }
        action = {
            type : ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        dispatch(action);
    })
}


export const releaseAllocationCash = (action, dispatch)=>{

    new Promise((resolve, reject)=>{
        try{
            let result = PurseManager.releaseAllocationCash(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH_RESOLVED,
                    message: "Successfully release Wallet Allocation Cash",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH_RESOLVED,
                    message: "Failed to  release Wallet Allocation Cash",
                }
            }
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: action_status
            }
            dispatch(action);
        }
    })
    .catch(error=>{
        let action_status = {
            purse: {
                status: STATUSTYPE.STATUS_ERROR,
                transaction: ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH_RESOLVED,
                message: "Failed to release Wallet Allocation Cash",
            }
        }
        action = {
            type : ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        dispatch(action);
    })
}