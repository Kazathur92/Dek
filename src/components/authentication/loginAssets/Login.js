import React, { Component } from "react"
import "./Login.css"
import { Link } from "react-router-dom"
import brain from "../loginAssets/brain.png"
import UsersManager from "../../modules/UsersManager"


export default class Login extends Component {
    // Set initial state
    state = {
        email: "",
        username: "",
        authenticated: false
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

    //    Setting username in session storage. Grabbing the username from session
    //storage and searching through "users" in the datatbase. The .find attempts to find
    //a username that matches the username in session storage. If able to find a match,
    //log in under that user. If not, display message that username not found.


        UsersManager.checkUser(this.state.email, this.state.username).then((response) => {
              if (response.length > 0) {
                  console.log("RESPONOSE:", response)
                sessionStorage.setItem("userId", response[0].id);
                sessionStorage.setItem("userName", response[0].name);
              }
            })
            .then(() => {
                if (sessionStorage.userName) {
                    console.log("IT FOUND A USER NAME")
                    this.setState({ authenticated: true })
                    console.log(this.state.authenticated)
                    console.log("ITS CHANGING STATE")

                } else {
                    alert("incorrect username or password!")
                    this.props.history.push("/register")
                }
                })
                .then(() => {
                    if (this.state.authenticated) {
                            console.log("ITS PASSING")
                            this.props.updateComponent()
                            this.props.history.push("/idea")
                    } else {
                        console.log("woops")
                    }
                })



        // sessionStorage.setItem("username",this.state.username)

        // let currentUser = sessionStorage.getItem("username")
        // //we get the current user from the session storage.

        // let authenticated = this.props.usersList.find(user =>   //The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
        //     user.name === this.state.username )


        //     if (authenticated === undefined){
        //         alert("Please re-renter a valid username and email or sign up below!")
        // //if the user is not registered direct them to the registeration page.
        //         this.props.history.push("/register")
        //     } else {
        //         sessionStorage.setItem("userId",authenticated.id)

        //                   // UPDATING THE COMPONENT WITHOUT REFRESHING THE PAGE
        //                  this.props.updateComponent()
        //                  // Taking user to idea page
        //                  this.props.history.push("/idea")

        //             }




    }

    //if the username is not equal to null remove everything in the session storage.
   componentDidMount() {
       if(sessionStorage.getItem("username") !== null){
           sessionStorage.removeItem("username")
           sessionStorage.removeItem("userId")
           sessionStorage.removeItem("credentials")
       }
   }

   consoleLog = () => {
       console.log("authenticated State: ", this.state.authenticated)
   }

    render()
    {


        return (
             //The onSubmit handler of the form is used to execute the class method
            <section className="login">
                <button onClick={this.consoleLog}>CONSOLE LOG</button>
                <form className="registerContainer" onSubmit={this.handleLogin}>
                <img src={brain} className="acornIcon" alt="acornIcon" height="60" width="60"></img>
                    <h2>Please sign in</h2>
                    <label htmlFor="inputUsername">
                    </label> <br></br>
                    <input onChange={this.handleFieldChange} type="text"
                        id="username"
                        placeholder="Username"
                        required autoFocus="" />
                        <br></br>
                    <label htmlFor="inputEmail">
                    </label>
                    <br></br>
                    <input onChange={this.handleFieldChange} type="email" //onchange is a listener
                        id="email"
                        placeholder="Email"
                        required />
                        <br></br>
                    <button type="submit" className="btn btn-primary signIn" >Sign in </button>

                    <p className="signUp">Don't have an account? <Link className="nav-link signUpLink" to="/register">Sign Up</Link></p>
                </form>
            </section>
        )
    }
}