import React, { Component } from "react"

export default class IdeaList extends Component {
    render(){
    return(
        <section className="ideas">
        {
            this.props.idea.map(idea => 
                <div key={idea.id} className="card">
                <div className="card-body">
            
                  {idea.name}
                  <a href="#"
                  onClick={() => this.props.deleteLocations(idea.id)} 
                  className="card-link">Delete</a>
                  
                </div>
                </div>
            )
        }
        </section>
    )
}}