
export const getRewardMessage = (user, pointsEarned)=>{
    
    const messageBody = "You have earned "+ pointsEarned +" Reward point/s. Your points balance as of today is "+user.rewards+". Visit home site to know the list of items you can redeem"

    const res = {
        status : "Rewards", 
        date_send: new Date(),
        title : "Rewards",
        message : messageBody,
        open : false
    }
    return res
}
