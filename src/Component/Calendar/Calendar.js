import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { Component } from "react";
import moment from "moment";
import "./Calendar.css";
import { CalenderContext } from "../../context/CalenderContext";
import CheckHabit from "../CheckHabit/CheckHabit";
import iconyes from "./iconyes.png";
import iconno from "./iconno.png";
const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => {
    if (event.status) {
        return (
            <div className="custom-calendar">
                <img src={iconyes}
                    width="56px" height="56px" alt="YES"
                    className="custom-img"
                ></img>
                <p className="custom-note-fall">{event.title}</p>
            </div>
        );
    }
    return (
        <div className="custom-calendar">
            <img src={iconno}
                width="56px" height="56px" alt="NO"
                className="custom-img"
            ></img>
            <p className="custom-note">{event.title}</p>
        </div>
    );
};

class CalendarFull extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ListEvents: [],
            modal: false,
            dateDetail: new Date(),
            openCheck: false,
            dataCalendarCheck: {}
        };
        this.toggle = this.toggle.bind(this);
        this.handleShowCheck = this.handleShowCheck.bind(this);
        this.closeCheck = this.closeCheck.bind(this);
    }
    toggle (e) {
        this.setState({
            modal: !this.state.modal,
            dateDetail: moment(e.start).format("MMM Do YYYY")
        });
    }

    handleShowCheck (e) {
        if (moment(e.start).format("L").toString() === moment(new Date()).format("L").toString()) {
            this.setState({
                openCheck: true,
                dataCalendarCheck: e
            });
        }
    }
    closeCheck (status) {
        this.setState({
            openCheck: status
        });
    }

    render () {
        return (
            <div className="ContainCalendar" >
                <CalenderContext.Consumer>
                    {
                        ({ listEvent }) => (
                            <Calendar
                                localizer={localizer}
                                events={listEvent}
                                startAccessor="start"
                                endAccessor="end"
                                onSelectEvent={this.handleShowCheck}
                                components={{
                                    event: CustomEvent
                                }}
                            />
                        )

                    }
                </CalenderContext.Consumer>
                <CalenderContext.Consumer>
                    {
                        ({ idHabit }) => (
                            <CheckHabit
                                openCheck={this.state.openCheck}
                                handleShowCheck={this.handleShowCheck}
                                closeCheck={this.closeCheck}
                                idHabit={idHabit}
                                dataCalendarCheck={this.state.dataCalendarCheck}
                            />
                        )
                    }
                </CalenderContext.Consumer>

            </div>
        );
    }
}
export default CalendarFull;
