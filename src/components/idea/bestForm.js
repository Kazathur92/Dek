import React, { Component } from "react"
import { Link } from "react-router-dom";
import { Card, CardColumns, CardText, CardBody, Button, Input } from "reactstrap"
import "./Idea.css"



export default class BestForm extends Component {
   
    
    render(){
    return( 
      
       
        
        <Card body outline color="secondary"className="ideas3" >
        <h2>Best idea</h2>
        {
            this.props.bestIdea.map(idea => 
                <Card key={idea.id} className="card">
                <CardBody body outline color="primary"className="card-body">
              
                 <CardText >{idea.idea} </CardText>
                 
                <Button color="secondary">
                  <button
                  onClick={() => this.props.deleteBestIdea(idea.id)} 
                  className="card-link">Delete</button>
                  
                  </Button>
                  </CardBody>
                  
                 
                  </Card>
            )
        }
        </Card>
   
    )
}}