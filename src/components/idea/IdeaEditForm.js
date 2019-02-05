import React, { Component } from "react"
import IdeaManager from "../modules/IdeaManager"


export default class IdeaEditForm extends Component {
    state={
        idea: "",
        time: "",
        userId: "",
      }
    
      handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
      componentDidMount(){
        IdeaManager.get(this.props.match.params.id).then(idea => {
          this.setState({
            idea:idea.idea,
            time: idea.time,
            userId: idea.userId
          })
        })
      }
    
      updateExistingTask = evt => {
          evt.preventDefault()
    
          const existingIdea = {
            idea:this.state.idea ,
            time: this.state.time,
            userId: this.state.userId
          }
          this.props.updateIdea(this.props.match.params.id, existingIdea)
          .then(() => this.props.history.push("/idea"))
        }
    render(){
        return
    }
}