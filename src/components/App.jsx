import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import EditProfile from './EditProfile'

import {keepLogin} from '../actions/index'

class App extends Component {

    state = {
        check : false
    }

    componentDidMount() {
        // backup user dari localStorage ke redux state
        // akan mengubah object string menjadi object sebenarnya
        let userData = JSON.parse(localStorage.getItem('userData'))
        // console.log(userData)
        if(userData){
            // Kirim ke redux
            this.props.keepLogin(userData)
        }
        this.setState({check: true})
    }

    render() {
        if(this.state.check){
            return (
                <div>
                    <BrowserRouter>
                        <div>
                            <Header/>
                            <Route path ="/" exact component={Home}/>
                            <Route path ="/register" component = {Register}/>
                            <Route path ="/login" component = {Login}/>
                            <Route path = "/profile" component = {Profile}/>
                            <Route path ="/editProfile" component={EditProfile}/>
                        </div>
                    </BrowserRouter>
                </div>
            )
        }else{
            return <h1>Loading</h1>
        }
    }
}

export default connect(null, {keepLogin})(App)
