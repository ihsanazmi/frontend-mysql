import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import {sendData} from '../actions/index'
import axios from '../config/axios'

class Login extends Component {

    onSignInClick =(event)=>{
        
        event.preventDefault()

        let _email = this.email.value
        let _password = this.password.value

        axios.post('/users/login',
            {
                email: _email,
                password: _password
            }
        ).then(res=>{
            if(res.data.error){
                return alert(res.data.error)
            }

            let {username, _id} = res.data

            localStorage.setItem('userData', JSON.stringify({username, _id}))
            this.props.sendData(username, _id)
            
        }).catch(err=>{
            console.log({err})
        })
    }
    render() {
        // Jika belum login , username di state kosong
        if(!this.props._username){
            // Tampilkan halaman login
            return (
                <div className="col-3 mx-auto mt-5 card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title">
                            <h1>Login</h1>
                        </div>
                        <form onSubmit={this.onSignInClick} className="form-group">
                            <div className="card-title">
                                <h4>Email</h4>
                            </div>
                            <input ref = { (input)=> {this.email = input} } className="form-control" type="text"/>
                            <div className="card-title">
                                <h4>Password</h4>
                            </div>
                            <input ref = { (input)=> {this.password = input} } className="form-control" type="password"/>
                            <p className="lead">If you don't have account please <Link to="/register">Register Here!</Link> </p>
                            <button className="btn btn-primary btn-block" onClick={this.onSignInClick}>Sign In</button>
                        </form>
                    </div>
                </div>
            )
        }else{
            // arahkan ke halaman home
            return <Redirect to ="/"/>
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        _username: state.auth.username
    }
}

export default connect(mapStateToProps, {sendData})(Login)
