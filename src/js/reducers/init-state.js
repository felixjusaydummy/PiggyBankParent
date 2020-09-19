
//alert
//recommendation
//notification

const inboxTemplate = [
    {
        status : "Notification", //Notification or Rewards
        date_send: "2012-04-23T00:00:00.000Z",
        title : "Sale Alert! - Julie’s Jewels",
        message : "John, don’t miss out on this 80% off all regular priced accessories promo. \n\nThe deal ends tonight at 8pm, so come in before someone nabs that bracelet you’ve been eyeing.",
        open : false
    },
    {
        status : "Rewards", //Notification or Rewards
        date_send: "2012-05-23T00:00:00.000Z",
        title : "Rewards",
        message : "You have earned 2 Reward point/s. Your points balance as of today is 2. Visit home site to know the list of items you can redeem",
        open : false
    },
    {
        status : "Notification", //Notification or Rewards
        date_send: "2012-06-23T00:00:00.000Z",
        title : "Looking for a deal? - Cheeky Prints",
        message : "Perfect, get 20% off all printing services, and free shipping on any web order. The sale ends tomorrow at 2pm: bit.ly.get-the-goods",
        open : false
    }
]


const walletTemplate = [
    {
        name: "Budget Friendly",
        allocations: [
            {
                description: "Savings",
                percentage: 10,
                frequency: "Monthly", // Monthly, Semi-monthly
                details: {
                    content: "Description of the Budget Friendly "
                }
            }
        ]
    },
    {
        name: "Saving funds",
        allocations: [
            {
                description: "Savings",
                percentage: 20,
            },
            {
                description: "Utilities",
                percentage: 20,
            },
            {
                description: "Travel",
                percentage: 5,
            }
        ]
    },
    {
        name: "Long term",
        allocations: [
            {
                description: "Savings",
                percentage: 40,
            },
            {
                description: "Utilities",
                percentage: 20,
            },
            {
                description: "Travel",
                percentage: 5,
            }
        ]
    }     
]

export const initialState = {
    countvisit : 0,
    app_name: "Transfer Fund",
    useractive : false,
    authorization: "",

    //error statement
    action_status: {
        loading: false,
        purse: {
            status: "",
            transaction: "",
            message: ""
        }
    },

    login_status : "",
    login_message: "",
    initializeState: true,
    page_loading  : false,
    response_status: "",
    
    wallet_template: walletTemplate,
    current_inbox : null,
    current_accountdetails : null
}

















// no use, just for backup
const backupinitialState = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,
    authorization: "",

    user: {
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
                    description: "Savings",
                    amount: 100,
                    active: true
                },
                {
                    id: 2,
                    description: "Utilities",
                    amount: 0,
                    active: false
                },
                {
                    id: 3,
                    description: "Travel",
                    amount: 100,
                    active: true
                }
            ]
        },

        vault: {
            vaultBalance : 5900,
            pocketAmount: 500,
            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    targetAmount: 1000000,
                    expiration: "2012-04-23T00:00:00.000Z",
                    requestRelease: false,
                    amount: 500
                }
            ]
        }
    },
    action_status: {
        purse: {
            status: "",
            transaction: "",
            message: ""
        }
    },

    login_status : "",
    login_message: "",
    initializeState: false,
    tips : []
}
