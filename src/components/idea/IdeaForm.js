import React, { Component } from "react"
import { Button, Input } from "reactstrap"
import { Clock, Box } from "grommet";
import "./Idea.css"

export default class IdeaForm extends Component {
    // Set initial state and let categoryId be 1.
    state = {
        idea: "",
        userId: "",
        categoryId: 1,
        value: "woop"

    }
    // clear the input field whenever we submit.
    clearField = ()=> {

        this.setState({idea: ""})

    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)

    }



    /*
        Local method for validation, creating idea object, and
        invoking the function reference passed from parent component
     */
    constructNewIdea = evt => {
        let sessionUser = sessionStorage.getItem("userId");
        evt.preventDefault()

        const idea = {
            idea: this.state.idea,
            categoryId: this.state.categoryId,
            value: this.state.value,
            userId: Number(sessionUser)
        }

        console.log("IDEA: ", idea)

        this.props.addIdea(idea)
        .then(() => this.props.history.push("/idea"))
        .then (()=> this.clearField())

    }


    render() {
        return (


                <Box
                gridArea="header"
                direction="column"
                align="start"

                pad={{ horizontal: "medium", vertical: "small" }}
                background="dark-3"
                className="ideaForm1" >


                        <label htmlFor="IdeaName">What do you have in your mind?</label>
                        <Input type="textarea" required
                            key="form-control"
                            onChange={this.handleFieldChange}
                            value = {this.state.idea}
                            ref= "idea"
                            id="idea"
                            placeholder="anything"
                        />
                        <Clock type="digital" run = "forward" size= "xlarge"  margin= "small" hourLimit= "12"
                        alignSelf = "center"/>

                    <Button type="submit"  onClick={this.constructNewIdea} color="success">Add Idea</Button>
                </Box>





        )
    }
}