import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../config/axios'
import { isNull } from 'util'

class Profile extends Component {

    state ={
        profile: null
    }

    componentDidMount() {
        // Get user
        axios.get(`/users/profile/${this.props.username}`)
        .then(res => {
            this.setState({profile: res.data})
            console.log(this.state.profile)
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        if(!isNull(this.state.profile)){
            let user = this.state.profile
            console.log(user.avatar)
            return (
                <div>
                    <img src={user.avatar} alt={user.name}/>
                    <h1>Hello, {user.name}</h1>
                    <p>{user.name} | {user.age} | {user.email}</p>
                </div>
            )
        }else{
            return <h1>Loading ...</h1>
        }
    }
}

const mapStateToProps = (state)=>{
    return {
        id: state.auth.id,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Profile)
