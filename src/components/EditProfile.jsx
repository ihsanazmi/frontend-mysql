import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../config/axios'
import { isNull } from 'util'

class EditProfile extends Component {

    state = {
        profile: null
    }

    componentDidMount(){
        axios.get(`/users/profile/${this.props.username}`)
            .then((res)=>{
                this.setState({profile: res.data})
                // console.log(res.data)
            }).catch((err)=>{
                console.log(err.message)
            })
    }

    onSaveClick = ()=>{
        let formData = new FormData()

        let name = this.name.value
        let email = this.email.value
        let password = this.password.value
        let avatar = this.avatar.files[0]
        // Membuat object dari class FormData

        formData.append("name", name)
        formData.append("email", email)
        if(password) formData.append("password", password)
        if(avatar) formData.append("avatar", avatar)

        axios.patch(`/users/update/${this.props.username}`, formData)
            .then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })

    }
    render() {

        if(!isNull(this.state.profile)){
            let user = this.state.profile
            return (
                <div className="container">
                    <form>
                        <h1>Edit Profile</h1>
    
                        <h3>Name</h3>
                        <input ref={(input)=>{this.name = input}} type="text" className="form-control" defaultValue={user.name}/>
                        <h3>Email</h3>
                        <input ref={(input)=>{this.email = input}} type="text" className="form-control" defaultValue={user.email}/>
                        <h3>Password</h3>
                        <input ref={(input)=>{this.password = input}} type="password" className="form-control"/>
                        
                        <div className="custom-file mt-4">
                            <input ref={(input) => this.avatar = input} id="customFileLang"  className="custom-file-input" type="file"/>
                            <label className="custom-file-label" htmlFor="customFileLang">Please insert file</label>
                        </div>
                    </form>
                    <button onClick={this.onSaveClick} className="mt-5 btn btn-primary btn-block">Save</button>
                </div>
            )
        }else{
            return <h1>Loading...</h1>
        }

    }
}

const mapStateToProps = (state)=>{
    return{
        id: state.auth.id,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(EditProfile)
