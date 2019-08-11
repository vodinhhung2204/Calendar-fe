import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
export const CalenderContext = React.createContext();

export class CalenderContextProvider extends Component {
    constructor () {
        super();
        this.state = {
            habitID: [],
            listEvent: [],
            idHabit: "",
            inforHabit: [],
            dataCheckHabit: []
        };
        this.clickToPushID = this.clickToPushID.bind(this);
        this.getCalender = this.getCalender.bind(this);
        this.checkExistHabit = this.checkExistHabit.bind(this);
    }
    checkExistHabit (i) {
        this.state.dataCheckHabit.forEach((dataCheck) => {
            if (moment(dataCheck.dateChecked).format("L").toString() === moment(i).format("L").toString()) {
                return true;
            }
        });
        return false;
    }
    getCalender (query) {
        let dataHabit = [];
        const data = [];
        Axios.get(query, { headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` } })
            .then((response) => {
                dataHabit = response.data.habit;
                this.setState({
                    inforHabit: dataHabit,
                    dataCheckHabit: response.data.listChecked
                });
                dataHabit.map((habit) => {
                    const days = habit.repeat;
                    if (habit.repeat.length > 0) {
                        let i = new Date(habit.timeBegin).getTime();
                        while (i <= new Date(habit.timeEnd).getTime()) {
                            const dayofweek = new Date(i).getDay() + 1;
                            if (days.some(a => a === dayofweek)) {
                                if (new Date(i) < new Date()) {
                                    let temp = null;
                                    this.state.dataCheckHabit.forEach((dataCheck) => {
                                        if (moment(dataCheck.dateChecked).format("L").toString() === moment(i).format("L").toString()) {
                                            temp = dataCheck;
                                        }
                                    });
                                    if (temp) {
                                        data.push({
                                            status: true,
                                            start: new Date(i),
                                            end: new Date(i),
                                            allDay: true,
                                            title: temp.note
                                        });
                                    } else {
                                        data.push({
                                            status: false,
                                            start: new Date(i),
                                            end: new Date(i),
                                            allDay: true,
                                            title: "NOT DO"
                                        });
                                    }
                                }
                            }
                            i += 86400000;
                        }
                    }
                });
                this.setState({
                    listEvent: data
                });
            }).catch(() => {

            });
    }

    componentWillMount () {
        this.getCalender("https://sleepy-dawn-29715.herokuapp.com/");
    }

    clickToPushID (newHabitId) {
        let query = "https://sleepy-dawn-29715.herokuapp.com/index/habit?id=" + newHabitId;
        this.setState({
            habitID: newHabitId,
            idHabit: newHabitId
        });
        this.getCalender(query);
    }

    render () {
        return (
            <CalenderContext.Provider
                value={{
                    inforHabit: this.state.inforHabit,
                    habitID: this.state.habitID,
                    listEvent: this.state.listEvent,
                    clickToPushID: this.clickToPushID,
                    idHabit: this.state.idHabit
                }}
            >
                {this.props.children}
            </CalenderContext.Provider>
        );
    }
}
