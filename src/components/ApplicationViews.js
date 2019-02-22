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
    isAuthenticated = () => sessionStorage.getItem("userName") !== null
    //if the username is not empty
    state = {
        okIdea: [],
        betterIdea: [],
        bestIdea: [],
        usersList: [],
        sessionId: ""
    };

    // This is being triggered in NavBar
    clearStorage = () => {
        sessionStorage.clear()
        this.setState({ sessionId: ""})
    }

    // This is being triggered in ideaList
    sendNewSessionId = (newSessionId) => {
        this.setState({
            sessionId: +newSessionId
        })
    }


    componentDidMount() {



        // IdeaManager.getBetterIdeas(sessionId)
        // .then(better => {
        //     this.setState({
        //         betterIdea: better
        //     })
        // })

        // IdeaManager.getBestIdeas(sessionId)
        // .then(best => {
        //     this.setState({
        //         bestIdea: best
        //     })
        // })
        // .then(() => {this.updateComponent()}) // i callled this function to load the users before i pass it to the login

            // this.addUser()
            // commented out to keep new user from being added on

            const newState = {}
    //updating the new state.

    // console.log(sessionId)
            // fetch(`http://localhost:5002/idea?userId=${sessionId}`)
            //     .then(r => r.json())
            //     .then(r => {
            //         // console.log(r)
            //         newState.idea = r
            //         // console.log(newState)
            //         this.setState(newState)

            //     })
        }

        componentDidUpdate = () => {
            IdeaManager.getOkIdeas(+this.state.sessionId)
            .then(okIdeas => {
                this.setState({
                    okIdea: okIdeas
                })
            })
        }



        addUser = (user) => SignUpManager.post(user)
        .then(() => UsersManager.getAll())
        .then(Allusers => this.setState({
            usersList: Allusers             //added this three line of codes today to set the new user.
        }))

    addIdea = (idea) => IdeaManager.post(idea)
        .then(() => IdeaManager.getOkIdeas(this.state.sessionId))
        .then(AllIdea => this.setState({

            okIdea: AllIdea

        })
        );

//??
    deleteOkIdea = id => {

        return fetch(`http://localhost:5002/idea/${id}`, {
            method: "DELETE"
        })
        .then(() => { IdeaManager.getOkIdeas(this.state.sessionId)
            .then(okIdeas => {
                this.setState({
                    okIdea: okIdeas
                })
                console.log("UPDATE STATE")
            })
        })


        // NOT NESCESARY was somehow messing things up
            // .then(e => e.json())
            // .then(() => fetch(`http://localhost:5002/idea?categoryId=1&${sessionId}`))
            // .then(e => e.json())
            // .then(idea => this.setState({
            //     okIdea: idea,

            // }))
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
            .then(() => IdeaManager.getOkIdeas(this.state.sessionId))
            .then(idea => this.setState({
                okIdea: idea



            }))
    }

    forwardComponent1 = (id, idea) => {
        return IdeaManager.changeComponent(id, idea)
            .then(() => IdeaManager.getBetterIdeas(this.state.sessionId))
            .then(idea => this.setState({
                betterIdea: idea




            }))
            .then(() => IdeaManager.getOkIdeas(this.state.sessionId))
            .then(idea => this.setState({
                okIdea: idea
            }))

    }
    forwardComponent2 = (id, idea) => {
        return IdeaManager.changeComponent(id, idea)
            .then(() => IdeaManager.getBestIdeas(this.state.sessionId))
            .then(idea => this.setState({
                bestIdea: idea



            }))
            .then(() => IdeaManager.getBetterIdeas(this.state.sessionId))
            .then(idea => this.setState({   //When the data is fetched successfully, it will be stored in the local state with React’s this.setState()
                betterIdea: idea
            }))
    }

    //?????
    updateComponent = () => {
        const sessionId = sessionStorage.getItem("userId");
        const currentUserId = Number(sessionId);
        this.setState({usersList: currentUserId})
        UsersManager.getAll(this.state.sessionId).then(allUsers => {
            this.setState({ usersList: allUsers });
            // console.log(allUsers)
        })
        IdeaManager.getAll(this.state.sessionId)
            .then(allIdea => {
                this.setState({     //the method setstate stores the result in the local component state by using React
                    idea: allIdea
                })
            })
    }

    consoleLogMain = () => {
        console.log("SESSION ID: ", this.state.sessionId)
        // console.log("NEW SESSION ID: ", this.state.newSessionId)
        console.log("OK IDEAS: ", this.state.okIdea)
        console.log("USERS: ", this.state.users)
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.consoleLogMain}>CONSOLE LOG MAIN</button>
                <Route path="/login" render={(props) => {
                    return <Login {...props}
                        usersList={this.state.usersList}
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
                            sessionId= {this.state.sessionId}
                            clearStorage={this.clearStorage}
                            sendNewSessionId={this.sendNewSessionId}
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
