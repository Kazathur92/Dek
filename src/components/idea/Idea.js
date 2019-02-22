import React, { Component } from 'react'
import IdeaList from './IdeaList';
import IdeaForm from './IdeaForm';
import BestForm from './bestForm';
import BetterForm from './BetterForm';
import "./Idea.css"
import NavBar from "../nav/NavBar"




export class Idea extends Component {


  // here is my parent component that holds all the other child components.
  render() {

    return (
      <React.Fragment>
      <NavBar clearStorage={this.props.clearStorage}/>
      <div className =" dek">
        <IdeaForm addIdea={this.props.addIdea}
          history={this.props.history} /> {/*history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.*/}

        <IdeaList okIdea={this.props.okIdea}
          deleteOkIdea={this.props.deleteOkIdea}
          forwardComponent1={this.props.forwardComponent1}
          sessionId= {this.props.sessionId}
          sendNewSessionId={this.props.sendNewSessionId}/>
        <BetterForm betterIdea={this.props.betterIdea}
          deleteBetterIdea={this.props.deleteBetterIdea}
          forwardComponent2={this.props.forwardComponent2} />
        <BestForm bestIdea={this.props.bestIdea}
          deleteBestIdea={this.props.deleteBestIdea} />

      </div>
      </React.Fragment>
    )
  }

}

export default Idea
