import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import IdeaManager from "../components/modules/IdeaManager"
import Login from "./authentication/loginAssets/Login"
import UsersManager from "./modules/UsersManager"
import Registeration from "./authentication/loginAssets/Registration"
import SignUpManager from "../components/modules/SignUpManager"
import IdeaEditForm from "./idea/IdeaEditForm"
import Idea from "./idea/Idea"






export default class ApplicationViews extends Component {
    isAuthenticated = () => sessionStorage.getItem("username") !== null
    state = {
        okIdea: [],
        betterIdea: [],
        bestIdea: [],
        users: []


    };
    componentDidMount() {

        IdeaManager.getOkIdeas()
            .then(okIdeas => {
                this.setState({
                    okIdea: okIdeas
                })
            })

        IdeaManager.getBetterIdeas()
            .then(better => {
                this.setState({
                    betterIdea: better
                })
            })

        IdeaManager.getBestIdeas()
            .then(best => {
                this.setState({
                    bestIdea: best
                })
            })
          
        const newState = {}
//updating the new state.
        fetch("http://localhost:5002/idea")
            .then(r => r.json())
            .then(r => {
                console.log(r)
                newState.idea = r
                console.log(newState)
                this.setState(newState)

            })
        // this.updateComponent()
        // this.addUser()
        // commented out to keep new user from being added on

    }
    addUser = (user) => SignUpManager.post(user)
        .then(() => UsersManager.getAll())
        .then(Allusers => this.setState({
            users: Allusers             //added this three line of codes today.
        }))

    addIdea = (idea) => IdeaManager.post(idea)
        .then(() => IdeaManager.getOkIdeas())
        .then(AllIdea => this.setState({

            okIdea: AllIdea

        })
        );
   

    deleteOkIdea = id => {
        return fetch(`http://localhost:5002/idea/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/idea?categoryId=1`))
            .then(e => e.json())
            .then(idea => this.setState({
                okIdea: idea,

            }))
    }
    deleteBetterIdea = id => {
        return fetch(`http://localhost:5002/idea/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/idea?categoryId=2`))
            .then(e => e.json())
            .then(idea => this.setState({
                betterIdea: idea,

            }))
    }
    deleteBestIdea = id => {
        return fetch(`http://localhost:5002/idea/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/idea?categoryId=3`))
            .then(e => e.json())
            .then(idea => this.setState({
                bestIdea: idea,

            }))
    }



    editIdea = (id, idea) => {
        return IdeaManager.updateIdea(id, idea)
            .then(() => IdeaManager.getOkIdeas())
            .then(idea => this.setState({
                okIdea: idea



            }))
    }

    forwardComponent1 = (id, idea) => {
        return IdeaManager.changeComponent(id, idea)
            .then(() => IdeaManager.getBetterIdeas())
            .then(idea => this.setState({
                betterIdea: idea




            }))
            .then(() => IdeaManager.getOkIdeas())
            .then(idea => this.setState({
                okIdea: idea
            }))

    }
    forwardComponent2 = (id, idea) => {
        return IdeaManager.changeComponent(id, idea)
            .then(() => IdeaManager.getBestIdeas())
            .then(idea => this.setState({
                bestIdea: idea



            }))
            .then(() => IdeaManager.getBetterIdeas())
            .then(idea => this.setState({
                betterIdea: idea
            }))
    }

    //?????
    updateComponent = () => {

        UsersManager.getAll().then(allUsers => {
            this.setState({ users: allUsers });
            console.log(allUsers)
        })
        IdeaManager.getAll()
            .then(allIdea => {
                this.setState({
                    idea: allIdea
                })
            })
    }

    render() {
        return (
            <React.Fragment>

                <Route path="/login" render={(props) => {
                    return <Login {...props}
                        users={this.state.users}
                        updateComponent={this.updateComponent} />
                }} />
                <Route path="/register" render={(props) => {
                    return <Registeration {...props}
                        addUser={this.addUser} />
                }} />
                <Route
                    exact
                    path="/idea" render={props => {
                        if (this.isAuthenticated()) {   // added that line so u we cant change the route manually.   
                        return <Idea {...props}
                            okIdea={this.state.okIdea}
                            addIdea={this.addIdea}
                            deleteOkIdea={this.deleteOkIdea}
                            deleteBetterIdea={this.deleteBetterIdea}
                            deleteBestIdea={this.deleteBestIdea}
                            betterIdea={this.state.betterIdea}
                            bestIdea={this.state.bestIdea}
                            forwardComponent1={this.forwardComponent1}
                            forwardComponent2={this.forwardComponent2}
                        />
                    } else{
                        return <Redirect to= "/login" />;
                    }
                }}
                />

                <Route path="/idea/:ideaId(\d+)/edit" render={props => {
                        return <IdeaEditForm {...props}
                            editIdea={this.editIdea}
                            idea={this.state.idea}

                        />
                    
                    
                }} />
                
            </React.Fragment>
        )
    }

}
