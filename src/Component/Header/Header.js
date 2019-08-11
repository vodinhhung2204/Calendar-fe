import React, { Component } from "react";
import "./Header.css";
import RightButtons from "./RightButtons";
import logo from "../../image/logo.jpg";

class Header extends Component {
    constructor () {
        super();
        this.state = {
            isloggedin: false
        };
        this.getStateForm = this.getStateForm.bind(this);
    }
    getStateForm (value) {
        this.props.stateForm(value);
    }

    render () {
        return (
            <header>
                <div className="container">
                    <div className="row header">
                        <div className="logo col-sm-4">
                            <a href="/">
                                <img src={logo} alt="CES Calendar Logo"></img>
                            </a>
                        </div>
                        <div className="col-sm-8 right">
                            <RightButtons stateButton={this.getStateForm}/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;
