
import * as ACTIONTYPE from "../constants/action-type";
import * as STATUSTYPE from "../constants/status-type";
import * as INITSTATE from "./init-state"
import * as MIDDLEWARE from "./middleware"
import * as AUTHENTICATION from  "./../actions/authentication-manager"
import * as RedirectManager from  "../actions/redirect-manager"

const initialState = INITSTATE.initialState;
const  middleware = MIDDLEWARE.middleware;

function getInitialState(){
    // console.log("initialize state")
    initialState.authorization = AUTHENTICATION.getAuthorization();
    return initialState;
}

function rootReducer(state = getInitialState(), action){
    console.log("enter reducer: "+ action.type)

    //REDIRECT
    if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS
        || action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED){
        let data = {
            initializeState: action.initializeState,
            page_loading  : action.page_loading
        }

        if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED){

            if(!action.data ){
                data.user = null;
            }
            else if(action.data.status === STATUSTYPE.RESPOND_ERROR){
                AUTHENTICATION.removeAuthorization()
                RedirectManager.redirectToLogin()
            }else{
                data.user = action.data
            }
        }
        state = Object.assign({}, state, data)  
    }
    
    else if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        state = Object.assign({}, state, {login_status: action.login_status})  
    }
    
    else if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED ){
        state = Object.assign({}, state, {login_status: action.login_status, login_message:  action.login_message})  
        if(state.login_status === STATUSTYPE.QUERY_RESOLVED){
            AUTHENTICATION.setAuthorization(action.authorization);
            RedirectManager.redirectToPurse();
        }
    }
    
    
    else if(action.type === ACTIONTYPE.MESSAGE_RESET_DEFAULT){
        state = Object.assign(
            {},
            state, 
            {
                action_status: {
                    purse: {
                        status: "",
                        transaction: "",
                        message: ""
                    }
                }
            })    
    }

    state = Object.assign({}, state, {countvisit: state.countvisit+1, action_type: action.type})    
    console.log("end reducer: "+ state.action_type)
    return state;
}


export{
    rootReducer,
    middleware
}
