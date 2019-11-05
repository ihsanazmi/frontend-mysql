import React, { Component } from 'react'
import axios from '../config/axios'
import {Redirect} from 'react-router-dom'

class Register extends Component {

    onSubmitClick = (event)=>{

        event.preventDefault()

        let _username = this.username.value
        let _name = this.name.value
        let _email = this.email.value
        let _password = this.password.value

        axios.post(
            '/users',
            {
                username: _username,
                name: _name,
                email: _email,
                password: _password
            }
        ).then((res)=>{
            // alert('registrasi berhasil')
            if(res.data.error){
                return alert(res.data.error)
            }

            alert('register berhasil')
            return  <Redirect to="/login"/>

        }).catch(err =>{
            console.log({err})
        })
    }
    render() {
        return (
            <div className='col-6 mx-auto mt-5 card'>
                <div className='card-body'>
                    <div className='border-bottom border-secondary card-title'>
                        <h1>Register</h1>
                    </div>
                    <form onSubmit={this.onSubmitClick} className='form-group' >
                        <div className='card-title'>
                            <h4>Username</h4>
                        </div>
                        <input ref={ (asdf) => {this.username = asdf} } className='form-control' type='text'/>
                        <div className='card-title'>
                            <h4>Nama</h4>
                        </div>
                        <input ref={ (asdf) => {this.name = asdf} } className='form-control' type='text'/>
                        
                        <div className='card-title'>
                            <h4>Email</h4>
                        </div>
                        <input ref={ (input) => {this.email = input} } className='form-control' type='email'/>

                        <div className='card-title'>
                            <h4>Password</h4>
                        </div>
                        <input ref={ (input) => {this.password = input} } className='form-control' type='password'/>
                        <button onClick={this.onSubmitClick} className='btn btn-outline-primary btn-block mt-4'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register
