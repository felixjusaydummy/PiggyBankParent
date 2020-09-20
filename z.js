const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({  'region': 'us-east-2' });
const table = "piggybee_account"

//1.
const addTransactionItem=  async (token, item)=>{
    var params = {
        TableName: table,
        Key: { 
            email:token
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set transaction_archive = list_append(if_not_exists(transaction_archive, :empty_list), :element)',
        ExpressionAttributeValues: {
          ':element': [item],
          ':empty_list': []
        }
    };
    
    try{
        const items = await documentClient.update(params).promise();
        return {
            status: "success",
            data: items.Attributes
        }   
    }catch(err){
        return {
            status: "error",
            data: err
        }
    }
}

//2
const updateTotalPocketAmount =  async (token, currentPocketAllocationAmount)=>{
    
    //1. GET INFORMATION AND EXECUTE TOTAL SUMMATION
    var params = {
        TableName:table,
        Key: {
            email: token
        }
    };
    var items = await documentClient.get(params).promise();
    let allocLen = items.Item.transaction_archive.length;
    
    let totalPocketAmount = 0;
    for (let i=0; i < allocLen; i++){
         let pocketAmount =   items.Item.transaction_archive[i].amount;
         totalPocketAmount += Number(pocketAmount);
    }
    
    //2. UPDATE AMOUNT
    params = {
        TableName: table,
        Key: { 
            email:token
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set savings = :totalPocketAmount',
        ExpressionAttributeValues: {
          ':totalPocketAmount' : totalPocketAmount
        }
    };
    
    try{
        const items = await documentClient.update(params).promise();
        return {
            status: "success",
            data: items.Attributes,
            allocationLen: allocLen
        }   
    }catch(err){
        return {
            status: "error",
            data: err
        }
    }
}


//3
const updateRewards =  async (token, coins)=>{
    
    var params = {
        TableName:table,
        Key: {
            email: token
        }
    };
    var items = await documentClient.get(params).promise();
    let currentThriftPoints = items.Item.coins;
    
    const newCoins = Number(currentThriftPoints) + Number(coins)
    
    
    //2. UPDATE AMOUNT
    params = {
        TableName: table,
        Key: { 
            email:token
        },
        ReturnValues: 'UPDATED_NEW',
        UpdateExpression: 'set coins = :tp ',
        ExpressionAttributeValues: {
          ':tp' : newCoins
        }
    };
    
    try{
        const items = await documentClient.update(params).promise();
        return {
            status: "success",
            data: items.Attributes
        }   
    }catch(err){
        return {
            status: "error",
            data: err
        }
    }
}


exports.handler = async (event) => {

    const payload = event.body    
    const token = payload.to

    return await addTransactionItem(token, payload );
    // await updateTotalPocketAmount(token,payload.amount);
	// return await updateRewards(token,payload.coins); 

};