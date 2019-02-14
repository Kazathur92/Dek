import React, { Component } from "react"
import IdeaManager from "../modules/IdeaManager"
import { Card, CardColumns, CardText, CardBody, Button, Input } from "reactstrap"
import "./Better.css"



export default class BetterForm extends Component {
    state = {
        idea: "",
        userId: "",
        categoryId: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingComponent = (evt) => {
        evt.preventDefault()

        const existingComponent = {
            categoryId: 3
        }
        console.log("this.state.idea.id:", evt.target.id)
        console.log("existingIdea:", existingComponent);

        this.props.forwardComponent2(evt.target.id, existingComponent)
        // .then(() => this.props.history.push("/idea"))
    }

    componentDidMount() {
        IdeaManager.get(this.state.idea.id)
            .then(idea => {
                this.setState({
                    idea: idea.idea,
                    userId: idea.userId,
                    categoryId: idea.categoryId
                })
            })
    }
    componentDidUpdate(prevProps) {

        if (this.props.categoryId !== prevProps.categoryId) {
            this.fetchData(this.props.categoryId);
        }




    }


    render() {
        return (

            <CardColumns className="betterIdeas">

                <Card body outline color="secondary" className="ideas" >
                    <h1>Better Idea</h1>
                    {
                        this.props.betterIdea.map(idea =>
                            <Card key={idea.id} className="card">
                                <CardBody body outline color="primary" className="card-body">

                                    <CardText >{idea.idea} </CardText>

                                    <Button color="secondary">
                                        <button
                                            onClick={() => this.props.deleteBetterIdea(idea.id)}
                                            className="card-link">Delete</button>
                                        <button id={idea.id}
                                            onClick={this.updateExistingComponent}
                                            className="card-link">Forward</button>
                                    </Button>
                                </CardBody>
                                {/* <Link className="nav-link" to={`/idea/${idea.id}/edit`}>Edit</Link> */}

                            </Card>
                        )
                    }
                </Card>
            </CardColumns>
        )
    }
}