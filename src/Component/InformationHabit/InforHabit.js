import React, { Component } from "react";
import { FormGroup, Label } from "reactstrap";
import moment from "moment";
import "./inforHabit.css";
import { CalenderContext } from "../../context/CalenderContext";

class Inforhabit extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    render () {
        return (
            <CalenderContext.Consumer>
                {
                    ({ inforHabit }) => (
                        inforHabit.map((habit) =>
                            <React.Fragment key={habit._id}>
                                <div className="container wrapper-habit">
                                    <div className="row pl-4 pt-4">
                                        <div className="col-sm-6">
                                            <FormGroup className="name-habit">
                                                <p>{habit.name}</p>
                                            </FormGroup>
                                        </div>
                                        <div className="col-sm-6">
                                            <FormGroup className="note-habit">
                                                <p>&ldquo;{habit.slogan}&rdquo;</p>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="row pl-4">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-2">
                                                    <Label className="date-start-content"><h4>Start</h4></Label>
                                                    <Label className="date-start dateStart"> {moment(habit.timeBegin).format("MMM Do YY")} </Label>

                                                </div>
                                                <div className="col-sm-2">
                                                    <Label className="date-finish-content"><h4>End</h4></Label>
                                                    <Label className="date-finish"> {moment(habit.timeEnd).format("MMM Do YY")} </Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )

                    )
                }
            </CalenderContext.Consumer>
        );
    }
}

export default Inforhabit;
