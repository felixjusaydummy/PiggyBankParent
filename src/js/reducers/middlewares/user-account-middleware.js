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
                accountNo: "22012345",
                bankName: "BPI",
                balance: 339800.0,
                acounts: [
                    {
                        accountNo: "22012345",
                        bankName: "BPI",
                        balance: 339800.0,
                        main : true,
                        "_comment": "temporaring kabit lang boss, test lang sa desperadong dev",
                        "TransactionHistory": [
                        {
                            "amount": 1000,
                            "crdr": "dr",
                            "date": "2020-01-16T18:00:00.000Z",
                            "description": "ATM Withdrawal"
                        },
                        {
                            "amount": 10000,
                            "crdr": "cr",
                            "date": "2020-01-17T13:00:00.000Z",
                            "description": "Credit Memo"
                        }
                        ]
                    },
                    {
                        accountNo: "22012347",
                        bankName: "BP0",
                        balance: 100000,
                        main : false
                    }
                    
                ]
            },

            purse: {
                pocketAmount: 200,
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