
export const sendData = (username, _id )=>{
    return{
        type: "LOGIN_SUCCESS",
        payload:{
            username, _id
        }
    }
    
}

export const logOut = (_id, _email, _username)=>{
    localStorage.removeItem('userData')
    return {
        type: "LOGOUT_SUCCESS",
       
    }
}

export const keepLogin = (userData)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload: {
            _id: userData._id,
            username: userData.username
        }
    }
}