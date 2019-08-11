import React, { Component } from "react";
import Axios from "axios";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SidebarCard from "./SidebarCard/SidebarCard";
import "./SideBar.css";
class SideBar extends Component {
    constructor () {
        super();
        this.state = {
            ListHabit: [],
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.showSidebar = this.showSidebar.bind(this);
        this.getDataOnSidebar = this.getDataOnSidebar.bind(this);
    }

    toggle () {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    showSidebar () {
        return this.props.showSidebar;
    }

    getDataOnSidebar () {
        let dataHabit = [];
        Axios.get("https://sleepy-dawn-29715.herokuapp.com/index", { headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` } })
            .then((response) => {
                if (response.data.length > 0) {
                    dataHabit = response.data;
                    this.setState({
                        ListHabit: dataHabit
                    });
                }
            });
    }

    componentDidUpdate () {
        this.getDataOnSidebar();
    }
    componentWillMount () {
        this.getDataOnSidebar();

    }

    render () {
        return (
            <SideNav>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
                        </NavIcon>
                    </NavItem>
                    {this.state.ListHabit.map(habit => (
                        <NavItem eventKey={habit._id} key={habit._id}>
                            <NavIcon>
                                <i className="fa fa-fw fa-line-chart" style={{ fontSize: "1.75em" }} />
                            </NavIcon>
                            <NavText>
                                <div key={habit._id} className="dataSidebarCard">
                                    <SidebarCard name={habit.name} id={habit._id} color={habit.color} dataColor={this.props.dataColor} />
                                </div>
                            </NavText>

                        </NavItem>
                    ))}

                </SideNav.Nav>
            </SideNav>
        );
    }
}
export default SideBar;
