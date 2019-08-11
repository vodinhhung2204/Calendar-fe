import React, { Component } from "react";
import { CalenderContext } from "../../../context/CalenderContext";
import { CustomInput, Label } from "reactstrap";
import "./SidebarCard.css";
export default class SidebarCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: this.props.name,
            id: this.props.id,
            color: this.props.color
        };
    }

    render () {
        return (
            <div>
                <CalenderContext.Consumer>
                    {({ clickToPushID }) => (
                        <CustomInput className="CheckHabit" type="radio" name="checkhabit" id={this.state.id} onClick={() => {
                            clickToPushID(this.state.id);
                            this.props.dataColor(this.state.color);
                        }
                        } ></CustomInput>

                    )}
                </CalenderContext.Consumer>
                <Label className="labelName">{this.state.name}</Label>
            </div>
        );
    }
}
