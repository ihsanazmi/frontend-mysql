import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Fade from 'react-reveal/Fade'
import TransitionGroup from 'react-transition-group/TransitionGroup'

class Home extends Component {

    state={
        task: [],
        button: true
    }

    onDoubleClick = (id)=>{
        axios.delete(`/tasks/delete/${id}`)
            .then(res=>{
                // alert('berhasil dihapus')
                this.getTask()
            })
    }

    componentDidMount(){
        this.getTask()
    }

    onSubmit = (event)=>{
        // get data
        event.preventDefault()
        let userid = this.props.id
        let description = this.task.value

        axios.post(`/tasks`,
            {
                description,
                user_id : userid
            }
        ).then(res=>{
        //    alert('Task Berhasil di tambah')
            this.task.value = ''
            this.getTask()
        }).catch(err=>{
            console.log({err})
        })
    }

    getTask = ()=>{
        let userid = this.props.id

        axios.get(`/tasks/${userid}`,)
            .then(res=>{
                this.setState({
                    task : res.data
                })
            })
    }

    done = (taskid, completed)=>{
        axios.patch(`/tasks/update/${taskid}`,{
            completed: !completed
        }).then(res=>{
            this.getTask()
        }).catch(err=>{
            console.log(err)
        })
    }

    renderTask = ()=>{
        if(this.props.id){
            return this.state.task.map((item)=>{
                if(item.completed){
                    return (
                        <Fade key={item.id} collapse bottom>
                            <div className="card" onDoubleClick={()=>{this.onDoubleClick(item.id)}}>
                                <div className="card-body row">
                                    <div className="col-auto mr-auto align-self-center">
                                        <p className="my-auto"><del>{item.description}</del></p>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={()=>{this.done(item.id, item.completed)}} className='btn btn-outline-danger'>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )
                }else{
                    return (
                        <Fade key={item.id} collapse bottom>
                            <div className="card" onDoubleClick={()=>{this.onDoubleClick(item.id)}}>
                                <div className="card-body row">
                                    <div className="col-auto mr-auto align-self-center">
                                        <p className="my-auto">{item.description}</p>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={()=>{this.done(item.id, item.completed)}} className='btn btn-outline-primary'>Done</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )
                }
            })
        }else{
            return <Redirect to="/login"/>
        }
        
    }

    groupProps = {
        appear: false,
        enter: true,
        exit: true,
    }

    render() {
        return (
            <div className="container">
                <center className="col-12">
                    <h1 className="display-4">List Task</h1>

                    <TransitionGroup {...this.groupProps}>
                        {this.renderTask()}
                    </TransitionGroup>
                    
                    <form onSubmit={this.onSubmit} className="form-group mt-5" autoComplete="off">
                        <input ref={(input)=> this.task = input} type="text" className="form-control" placeholder="What do you want to do?"/>
                        <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-block mt-2">Up!</button>
                    </form>
                    
                </center>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps, {})(Home)
