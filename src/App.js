import React, { Component } from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import FormLogin from "./Component/FormLogin/Form";
import SignUp from "./Component/SignUp/SignUp";
import HeaderMenu from "./Component/Header-Menu/HeaderMenu";
import CalendarFull from "./Component/Calendar/Calendar";
import { CalenderContextProvider } from "./context/CalenderContext";
import SideBar from "./Component/SideBar/SideBar";
import { BrowserRouter, Route } from "react-router-dom";
import InforHabit from "./Component/InformationHabit/InforHabit";
import Profile from "./Component/User-profile/Profile";

class App extends Component {
    constructor () {
        super();
        this.state = {
            loginForm: true,
            isLoggedIn: false,
            profile: false
        };
        this.getState = this.getState.bind(this);
        this.reloadState = this.reloadState.bind(this);
        this.dataColor = this.dataColor.bind(this);
        this.profile = this.profile.bind(this);
    }

    componentDidMount () {
        const token = localStorage.getItem("Token");
        if (token === null) {
            this.setState({ isLoggedIn: false });
        } else {
            this.setState({ isLoggedIn: true });
        }
    }
    getState (value) {
        this.setState({
            loginForm: value
        });
    }
    reloadState (value) {
        this.setState({
            isLoggedIn: value
        });
    }
    dataColor (color) {
        this.setState({
            color: color
        });
    }
    profile (status) {
        this.setState({
            profile: status
        });
    }
    render () {
        return (
            <div>
                <BrowserRouter>
                    <CalenderContextProvider>
                        {this.state.isLoggedIn === false && (
                            <div>
                                <Header stateForm={this.getState} />
                                {this.state.loginForm && (
                                    <FormLogin loginCompleted={this.reloadState} />
                                )}
                                {this.state.loginForm === false && <SignUp />}
                            </div>
                        )}
                        {this.state.isLoggedIn === true &&

                            (
                                <div className="Container">
                                    <div className="HeaderMenu">
                                        <HeaderMenu profile={this.profile} loginStatus={this.reloadState} logoutStatus={this.reloadState} />
                                    </div>

                                    <div>
                                        <SideBar idHabit={this.getIdHabit} dataColor={this.dataColor} />
                                    </div>
                                    {
                                        this.state.profile === true &&
                                        (
                                            <div>
                                                <Profile />
                                            </div>
                                        )
                                    }
                                    {
                                        this.state.profile === false &&
                                        (
                                            <div>
                                                <div className="col-sm-11 float-right infor-habit p-2">
                                                    <InforHabit></InforHabit>
                                                </div>
                                                <div className="calendar col-sm-11 float-right pb-3">
                                                    <Route exact path="/" component={() => {
                                                        return (
                                                            <div>
                                                                <CalendarFull idHabit={this.state.id} color={this.state.color} id={this.state.id} />
                                                            </div>
                                                        );
                                                    }}>
                                                    </Route>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )

                        }
                    </CalenderContextProvider>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;
