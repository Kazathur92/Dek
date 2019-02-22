import React, { Component } from "react"
import { Link } from "react-router-dom";
import { Card, CardText, CardBody } from "reactstrap"
import UsersManager from "../modules/UsersManager"

import "./Idea.css"
import IdeaManager from "../modules/IdeaManager"



export default class IdeaList extends Component {

    state = {
        idea: "",
        userId: this.props.sessionId,
        categoryId: "",
        okIdea: [],
        sessionId: [],
        usersList: []
    }



    getMeAll = (sessionId) => {
        UsersManager.getAll().then(allUsers => {
            this.setState({ usersList: allUsers });
            this.setState({ sessionId: +sessionStorage.getItem("userId")})
            console.log("sessionId var: ", sessionId)
            console.log("SESSION ID: ", this.state.sessionId)
        }).then(() => {
            console.log("SESSION ID AFTER: ", +this.state.sessionId)
            let usersList = this.state.usersList
            let userId = +this.state.sessionId
            usersList.map(user => {
                if (user.id === userId) {
                    IdeaManager.getOkIdeas(userId)
                    .then(okIdeas => {
                        this.setState({
                            okIdea: okIdeas
                        })

                        console.log("IDEAS: ", okIdeas)
                    })
                } else {
                    console.log("ids did not match")
                }

            })

        })
        .then(() => {
            this.props.sendNewSessionId(this.state.sessionId)
        })
    }


    componentDidMount = () => {
        console.log("woop")
        this.getMeAll()
        // this.props.sendNewSessionId(this.state.sessionId)
    }

    componentDidUpdate = () => {
        if(this.props.okIdea > this.state.okIdea) {
            this.setState({
                okIdea: this.props.okIdea
            })
        } else if (this.props.okIdea < this.state.okIdea) {
            this.setState({
                okIdea: this.props.okIdea
            })
        }
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    updateExistingComponent = (evt) => {
        evt.preventDefault()

        const existingComponent = {
            categoryId: 2
        }
        // console.log("this.state.idea.id:", evt.target.id)
        // console.log("existingIdea:", existingComponent);

        this.props.forwardComponent1(evt.target.id, existingComponent)
        // .then(() => this.props.history.push("/idea"))
    }

    // componentDidUpdate(prevProps) {

    //     if (this.props.okIdea !== prevProps.okIdea) {
    //     console.log(this.props.sessionId)
    //         IdeaManager.getOkIdeas(this.props.sessionId)
    //             .then(newIdea =>
    //                 this.setState({
    //                     idea: newIdea
    //                 })
    //             )
    //     }
    // }

    consoleLog = () => {
        this.props.okIdea.map(idea => console.log("props loop okidea idea.userId: ", idea.userId))
        console.log("OK IDEA props: ", this.props.okIdea)
        console.log("OK IDEA state: ", this.state.okIdea)
        console.log("OK IDEA state: ", this.state.sessionId)
        console.log("this state USER ID: ", this.state.userId)
    }


    // NEED TO WRITE AN IF STATEMENT THAT ONLY GETS THE IDEA IF THE ID MATCHES
    render() {

        return (


            <Card body outline color="secondary" className="ideas12" >
                <h2>Free writting</h2>
                <button onClick={this.consoleLog}>CONSOLE LOG IDEA LIST</button>
                {
                    this.state.okIdea.map(idea =>
                        <Card key={idea.id} className="card">

                            <CardBody className="card-body">

                                <CardText>{idea.idea} </CardText>


                                <Link className="nav-link" to={`/idea/${idea.id}/edit`}>Edit</Link>
                                <button

                                    onClick={() => this.props.deleteOkIdea(idea.id)}
                                    className="card-link">Delete</button>


                            <button id={idea.id}
                                onClick={this.updateExistingComponent}
                                className="card-link">Forward</button>

                                </CardBody>

                        </Card>
                    )
                }
            </Card>

        )
    }
}
// when the button is clicked it needs to change the category ID to 2.
// we need to update the state of only category ID of 2.
// we need to use PUT or patch for changing the ID.