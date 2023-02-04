import { useState } from "react";
import FriendContext from "./FriendContext";

export default function FriendState(props) {
    const host = "http://127.0.0.1:8000/"

    // To make CRUD opertions we must use useState
    const [friendJson, setFriendJson] = useState([])

    const getFriends = async () => {
        const url = `${host}api/friends/` // ViewFriends's view
        
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        })

        const json = await response.json()
        setFriendJson(json)
    }

    // Its not Sender's ID, its ID of the User Model
    const getUserId = async (_username) => { 
        const url = `${host}api/users/`
        
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        })

        const json = await response.json()
        // console.log(json)
        for(let i=0;i<json.length;i++) {
            if(json[i].username === _username) {
                return json[i].id
            }
        }
        return -1
    }

    const getUserName = async (uid) => { 
        const url = `${host}api/users/`
        
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        })

        const json = await response.json()

        for(let i=0;i<json.length;i++) {
            if(json[i].id === uid) {
                return json[i].username
            }
        }
        return -1
    }

    // By using the userID we can get receiver ID
    const getViewFriendsSetUId = async (uid) => {
        const url = `${host}api/allusersinfriendsviewset/`

        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
            }
        })

        const json = await response.json()
        for(let i=0;i<json.length;i++) {
            if(json[i].user === uid) return json[i].id
        }
        return -1
    }

    // Add friends should display all the UserModel Users
    // sid = ViewFriends.objects.get(user={UserModelLoginId})
    // UserId = User.objects.get(username={nameInputByUser}).id
    // rid = ViewFriends.objects.get(user=UserId).id
    // To perfrom this in react create getID REST call
    const addFriends = async (sid, rid) => { // User model ids are not used, ViewFriends model ids are used
        const url = `${host}api/addfriend/`
        
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify( {
                "sender": sid,
                "receiver": rid,
                "status": "accepted"
            })
        })
        // const json = await response.json()
        // friendJson(friendJson.concat(json))
    }

    // Budget starts
    // const [budgetJson, setBudgetJson] = useState([])

    const getBudget = async (budgetId) => {
        const url = `${host}api/budget/${budgetId}`

        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        })
        const json = await response.json()
        return json.budgetofUser
    }

    // Add Budget
    const updateBudget = async (budgetId, amount) => {
        const url = `${host}api/addbudget/`

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify( {
                "budget": `${budgetId}`,
                "amount": amount
            } )
        }) 
    }

    const SinglePayBudget = async (budgetId, amount) => {
        const url = `${host}api/singlepaybudget/`

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify( {
                "budgetForSinglePay": `${budgetId}`,
                "amount": amount
            } )
        }) 
    }

    const SplitPayBudget = async (budgetId, friends_list, amount) => {
        const url = `${host}api/splitpaybudget/`

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify( {
                "budgetForSplitPay": `${budgetId}`,
                "amount": amount,
                "friendsList": friends_list
            } )
        }) 
    }

    const getBudgetViewSetUId = async (uid) => {
        const url = `${host}api/budget/`

        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            }
        })

        const json = await response.json()
        for(let i=0;i<json.length;i++) {
            if(json[i].user === uid) return json[i].id
        }
        return -1
    }

  return (
    <div>
      <FriendContext.Provider value={ {friendJson, getFriends, addFriends, getUserId, getViewFriendsSetUId, getBudget, updateBudget, getBudgetViewSetUId, SinglePayBudget, getUserName, SplitPayBudget} } >
        {props.children}
      </FriendContext.Provider>
    </div>
  )
}
