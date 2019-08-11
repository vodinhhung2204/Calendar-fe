import React, { Component } from "react";
import "./CheckHabit";
import Axios from "axios";
import "./CheckHabit.css";
import moment from "moment";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter, Label, FormGroup, Form } from "reactstrap";
import LableInput from "../Labelnput/LabelInput";
import iconyes from "./iconyes.png";
import iconno from "./iconno.png";
class CheckHabit extends Component {
    constructor (props) {
        super(props);
        this.state = {
            check: 0,
            note: "",
            idUser: "",
            idHabit: ""
        };
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.setStatusHabitTrue = this.setStatusHabitTrue.bind(this);
        this.setStatusHabitFalse = this.setStatusHabitFalse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange (event) {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    onConfirm () {
        this.setState({
            date: this.props.dataCalendarCheck.start
        });
        let object = {
            idUser: localStorage.getItem("Token"),
            habitID: this.props.idHabit,
            status: this.state.check,
            dayChecked: this.props.dataCalendarCheck.start.getTime(), // neu click 2 lan se bi loi khong nhan date????
            note: this.state.note
        };
        Axios.post("https://sleepy-dawn-29715.herokuapp.com/checked", object, { headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` } })
            .then(() => {
                alert("Checked succeed");
            })
            .catch(() => {
                alert("Checked fail");
            });
        this.props.closeCheck(false);
    }
    onCancel () {
        this.props.closeCheck(false);
    }
    setStatusHabitTrue () {
        this.setState({
            check: 1
        });
    }
    setStatusHabitFalse () {
        this.setState({
            check: 0
        });
    }

    render () {
        return (
            <Modal isOpen={this.props.openCheck} className="{this.props.className} container-form">
                <ModalHeader toggle={this.toggle} className="header">
                    <div className="wrapper-totalday">
                        <Label>Today</Label>
                        <Label className="label-current-day">{moment().format("dddd")}, {moment().format("MMM D")}</Label>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup className="wrapper-form">
                            <FormGroup>
                                <Button className="image-button check" onClick={this.setStatusHabitTrue}>
                                    <img alt="button YES" src={iconyes} />
                                YES</Button>
                                <Button className="image-button notcheck" onClick={this.setStatusHabitFalse}>
                                    <img alt="button NO"
                                        src={iconno} />
                                NO</Button>
                            </FormGroup>
                            <FormGroup>
                                <LableInput
                                    className="input" name="note" label="Add Node"
                                    labelClassName="label-addnode"
                                    onChange={this.handleInputChange}></LableInput>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className="footer-button">
                    <Button className="footer-button cancel-button" onClick={this.onCancel}>CANCEL</Button>
                    <Button className="footer-button save-button" onClick={this.onConfirm}>SAVE</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default CheckHabit;
