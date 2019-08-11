import React, { Component } from "react";
import "./HeaderMenu.css";
import logo from "../../image/logo.jpg";
import NewHabit from "./NewHabit/NewHabit";
import { Button } from "reactstrap";

class HeaderMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.ToggleShowForm = this.ToggleShowForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.Logout = this.Logout.bind(this);
        this.profile = this.profile.bind(this);
    }
    ToggleShowForm () {
        this.setState({
            showModal: !this.state.showModal
        });
    }
    Logout () {
        localStorage.removeItem("Token");
        this.props.logoutStatus(false);
    }
    closeForm (status) {
        this.setState({
            showModal: status
        });
    }
    profile () {
        this.props.profile(true);
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
                            <Button className="ButtonCreate" color="primary" onClick={this.ToggleShowForm}>Create New Habit</Button>{""}
                            <Button className="ButtonProfile" color="link" onClick={this.profile}>Report</Button>{" "}
                            <Button className="ButtonLogout" color="link" onClick={this.Logout}>Logout</Button>{" "}
                        </div>
                    </div>
                </div>
                <NewHabit showform={this.state.showModal} closeform={this.closeForm}></NewHabit>
            </header>
        );
    }
}

export default HeaderMenu;
