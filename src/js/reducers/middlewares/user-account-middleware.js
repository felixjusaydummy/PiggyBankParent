import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as AccountManager from "../../actions-api/account-manager"


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



export const GetUserAccount = (action, dispatch)=>{
    action.initializeState = true
    action.page_loading = true

    new Promise((resolve, reject)=>{
        try{
            // const result = AccountManager.getAccountDetails(action.authorization);
            // resolve(result);

            resolve(tempData)
        }catch(err){
            reject(err);
        }

    }).then(response=>{
        let value = null;

        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            value = response.data.data
        }
        
        // console.log(response.data.status + " : " + STATUSTYPE.RESPOND_SUCCESS)
        // console.log(JSON.stringify(value, null, 2))

        action = {
            type : ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED,
            initializeState: false,
            page_loading : false,
            data: value
        }
        // console.log("middleware: "+ JSON.stringify(action, null, 2))
        console.log(action)
        dispatch(action);
    })
    .catch(error=>{
        action = {
            type : ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED,
            initializeState: false,
            page_loading: false
        }
        dispatch(action);
    })
}