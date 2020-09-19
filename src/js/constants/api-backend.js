
const SERVER = "localhost";
const PORT = "5555";
// 
// const DOMAIN = "https://ruhxbt88zj.execute-api.us-east-2.amazonaws.com/prod";
const DOMAIN = "http://localhost:5555/temp/prod";



export const SIGNIN                             = DOMAIN + "/signin";
export const GETACCOUNTDETAILS                  = DOMAIN + "/account"
export const PURSE_ALLOCATION_ADD               = DOMAIN + "/account-purse-allocation-add"
// export const PURSE_ALLOCATION_ADD_CASH          = DOMAIN + "/account-purse-allocation-update"
export const PURSE_ALLOCATION_ADD_CASH          = DOMAIN + "/account/purse/update-purse"
// export const PURSE_ALLOCATION_DELETE            = DOMAIN + "/account-purse-allocation-delete"
export const PURSE_ALLOCATION_DELETE            = DOMAIN + "/account/purse/delete-purse"
// export const PURSE_ALLOCATION_RELEASE           = DOMAIN + "/account-purse-allocation-release-cash"
export const PURSE_ALLOCATION_RELEASE           = DOMAIN + "/account/purse/release-cash"
// export const VAULT_ALLOCATION_ADD               = DOMAIN + "/account-vault-allocation-add"