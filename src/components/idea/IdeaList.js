import React, { Component } from "react"
import { Link } from "react-router-dom";
import { Card, CardColumns, CardText, CardBody, Button, } from "reactstrap"
import "./Idea.css"
import IdeaManager from "../modules/IdeaManager"



export default class IdeaList extends Component {

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
            categoryId: 2
        }
        console.log("this.state.idea.id:", evt.target.id)
        console.log("existingIdea:", existingComponent);

        this.props.forwardComponent1(evt.target.id, existingComponent)
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

        if (this.props.okIdea !== prevProps.okIdea) {

            IdeaManager.getOkIdeas(this.props.okIdea)
                .then(newIdea =>
                    this.setState({
                        idea: newIdea
                    })
                )
        }
    }

    render() {
        console.log(this.props)
        return (
            <CardColumns>

                <Card body outline color="secondary" className="ideas" >
                    <h1>ok idea</h1>
                    {
                        this.props.okIdea.map(idea =>
                            <Card key={idea.id} className="card">

                                <CardBody body outline color="primary" className="card-body">

                                    <CardText>{idea.idea} </CardText>

                                    <Button color="secondary">
                                        <button
                                            onClick={() => this.props.deleteOkIdea(idea.id)}
                                            className="card-link">Delete</button>

                                    </Button>
                                </CardBody>
                                <Link className="nav-link" to={`/idea/${idea.id}/edit`}>Edit</Link>
                                <button id={idea.id}
                                    onClick={this.updateExistingComponent}
                                    className="card-link">Forward</button>


                            </Card>
                        )
                    }
                </Card>
            </CardColumns>
        )
    }
}
// when the button is clicked it needs to change the category ID to 2.
// we need to update the state of only category ID of 2.
// we need to use PUT or patch for changing the ID.