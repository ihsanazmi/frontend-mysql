
export const sendData = (username, id )=>{
    return{
        type: "LOGIN_SUCCESS",
        payload:{
            username, id
        }
    }
    
}

export const logOut = (id, _email, _username)=>{
    localStorage.removeItem('userData')
    return {
        type: "LOGOUT_SUCCESS",
       
    }
}

export const keepLogin = (userData)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload: {
            id: userData.id,
            username: userData.username
        }
    }
}