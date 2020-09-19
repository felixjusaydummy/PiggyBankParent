import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as LoginManager from "../../actions-api/login-manager"

const tempdata = {
    data: {
        result : "success",
        data :{
            name: "john"
        }
    }
}

export const SignIn = (action, dispatch)=>{
    action.login_status = STATUSTYPE.QUERY_LOADING;
    new Promise((resolve, reject)=>{
        try{
            // const result = LoginManager.loginAsync(action.payload);
            // resolve(result);

            resolve(tempdata)
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        console.log(response.data.result+ " : " + STATUSTYPE.RESPOND_SUCCESS)
        if(response.data.result === STATUSTYPE.RESPOND_SUCCESS){
            action = {
                type : ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED,
                login_status : STATUSTYPE.QUERY_RESOLVED,
                login_message : "Successfully Login",
                authorization : response.data.data.name
            }
        }else{
            console.log(JSON.stringify(response, null, 2));
            action = {
                type : ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED,
                login_status : STATUSTYPE.QUERY_ERROR,
                login_message : "You have entered an invalid username and/or password"
            }
        }
        dispatch(action);
    })
    .catch(error=>{
        // console.log(JSON.stringify(error));
        action = {
            type : ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED,
            login_status : STATUSTYPE.QUERY_ERROR,
            login_message : "You have entered an invalid username and/or password"
        }
        dispatch(action);
    })
}


