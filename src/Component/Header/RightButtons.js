import React, { Component } from "react";
import { Button } from "reactstrap";
import "./RightButtons.css";

class RightButtons extends Component {
    constructor () {
        super();
        this.state = {
            showFormLogin: true,
            showFormSignUp: false
        };
        this.clickLogin = this.clickLogin.bind(this);
        this.clickSignUp = this.clickSignUp.bind(this);
    }
    clickLogin () {
        this.setState({
            showFormLogin: true,
            showFormSignUp: false
        });
        this.props.stateButton(true);
    }
    clickSignUp () {
        this.setState({
            showFormLogin: false,
            showFormSignUp: true
        });
        this.props.stateButton(false);
    }
    render () {
        return (
            <div className="btn-group">
                <Button className="btnLogin" color="link" onClick={this.clickLogin}>Login</Button>{""}
                <Button className="btnSignUp" color="link" onClick={this.clickSignUp}>SignUp</Button>{""}
            </div>
        );
    }
}
export default RightButtons;
