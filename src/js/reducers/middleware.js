import * as ACTIONTYPE from "../constants/action-type";
import * as SIGNIN from "./middlewares/signin-middleware"
import * as USERACCOUNT from "./middlewares/user-account-middleware"
import * as PURSEMIDDLEWARE from "./middlewares/purse-middleware"

export const  middleware = ({dispatch}) => next => action => {
    // console.log("enter middleware");

    if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        SIGNIN.SignIn(action, dispatch)
        
    }else if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS ){
        USERACCOUNT.GetUserAccount(action, dispatch)
    }
    
    
    else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD) {
        PURSEMIDDLEWARE.addAllocation(action, dispatch)
    }
    else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH) {
        PURSEMIDDLEWARE.addCashToAllocation(action, dispatch)
    }
    else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE) {
        PURSEMIDDLEWARE.deleteAllocation(action, dispatch)
    }
    else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH) {
        PURSEMIDDLEWARE.releaseAllocationCash(action, dispatch)
    }
    

    next(action);
 }















 // delete after

// setTimeout(function() {
//     try{
//         const result = LoginManager.loginAsync(action.payload);
//         resolve(result);
//     }catch(err){
//         reject(err);
//     }
// }, 2000);