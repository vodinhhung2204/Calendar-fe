import React, { Component } from "react";
import "./NewHabit.css";
import moment from "moment";
import Switch from "react-switch";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, ButtonGroup, Button, Alert } from "reactstrap";
import LabelInput from "../../Labelnput/LabelInput";
import Axios from "axios";

class NewHabit extends Component {
    constructor (props) {
        super(props);
        this.state = {
            onClose: false,
            date: new Date(),
            cSelected: [],
            name: "",
            slogan: "",
            datestart: "",
            datefinish: "",
            after: "",
            color: "",
            message: "",
            colorError: "",
            checked: false
        };
        this.onCloseHandler = this.onCloseHandler.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.submitHabit = this.submitHabit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.validateDay = this.validateDay.bind(this);
    };
    handleInputChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    validateDay () {
        const currentDay = new Date();
        const startDay = new Date(this.state.datestart);
        const endDay = new Date(this.state.datefinish);
        if (moment(startDay).format("L").toString() < moment(currentDay).format("L").toString()) {
            return false;
        }
        if (moment(endDay).format("L").toString() < moment(startDay).format("L").toString()) {
            return false;
        }
        return true;
    };
    submitHabit () {
        if (!this.validateDay()) {
            this.setState({
                colorError: "danger",
                message: "Timestart must be current day or a day in future"
            });
            return;
        }

        let object = {
            idUser: localStorage.getItem("Token"),
            name: this.state.name,
            slogan: this.state.slogan,
            timeBegin: this.state.datestart,
            timeEnd: this.state.datefinish,
            after: this.state.after,
            repeat: this.state.cSelected,
            color: this.state.color
        };
        Axios.post("https://sleepy-dawn-29715.herokuapp.com/habit/create", object, { headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` } })
            .then(response => {
                this.setState({
                    colorError: "primary",
                    message: response.data.message
                });
                this.props.closeform(this.state.onClose);
            })
            .catch(() => {
                this.setState({
                    colorError: "danger",
                    message: "Sign up Fail !"
                });
            });
    }
    onCheckboxBtnClick (selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
        if (this.state.cSelected.length === 7) {
            this.setState({
                checked: true
            });
        } else {
            this.setState({
                checked: false
            });
        }
    }
    onCloseHandler () {
        this.props.closeform(this.state.onClose);
    }
    checkAll (checked) {
        this.setState({
            checked
        });
        if (checked) {
            this.setState({
                cSelected: [2, 3, 4, 5, 6, 7, 8]
            });
        } else {
            this.setState({ cSelected: [] });
        }
    }
    render () {
        return (
            <Modal isOpen={this.props.showform} >
                <ModalHeader id="create">CREATE NEW HABIT</ModalHeader>
                <ModalBody>
                    <Form className="myform">
                        <FormGroup>
                            <LabelInput
                                label="Name"
                                type="text"
                                id="name"
                                name="name"
                                onChange={this.handleInputChange}
                            />
                            <LabelInput
                                label="Slogan"
                                type="text"
                                id="slogan"
                                name="slogan"
                                onChange={this.handleInputChange}
                                value={this.state.slogan}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label xs="6" id="start">Start Day</Label>
                            <Label xs="6" id="color-label">Color</Label>
                            <Label xs="6">
                                <LabelInput
                                    type="date"
                                    name="datestart"
                                    id="datestart"
                                    className="datestart"
                                    onChange={this.handleInputChange}
                                    value={this.state.datestart}
                                />
                            </Label>
                            <Label xs="2" >
                                <LabelInput
                                    type="color"
                                    name="color"
                                    id="color"
                                    className="color btn"
                                    onChange={this.handleInputChange}
                                    color={this.state.color}
                                />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label xs="6" id="repeat">Repeat</Label>
                            <FormGroup>
                                <Switch
                                    checked={this.state.checked}
                                    onChange={this.checkAll}
                                    offColor="#9B9B9B"
                                    onColor="#F15A27"
                                    uncheckedIcon
                                    checkedIcon
                                    height={16}
                                    width={27}

                                />
                                <Label xs="6" id="allday">All Day</Label>
                            </FormGroup>
                            <ButtonGroup>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(2)}
                                    active={this.state.cSelected.includes(2)}
                                >Mon
                                </Button>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(3)}
                                    active={this.state.cSelected.includes(3)}
                                >Tue
                                </Button>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(4)}
                                    active={this.state.cSelected.includes(4)}
                                >Wed
                                </Button>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(5)}
                                    active={this.state.cSelected.includes(5)}
                                >Thur
                                </Button>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(6)}
                                    active={this.state.cSelected.includes(6)
                                    }>
                                    Fri
                                </Button>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(7)}
                                    active={this.state.cSelected.includes(7)}
                                >Sat
                                </Button>
                                <Button
                                    color="infor"
                                    className="day-button"
                                    onClick={() => this.onCheckboxBtnClick(8)}
                                    active={this.state.cSelected.includes(8)
                                    }>Sun
                                </Button>
                            </ButtonGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label xs="6" for="" id="end">End</Label>
                            <Label xs="6" for="" />
                            <Label xs="6" for="">On:</Label>
                            <Label xs="6">
                                <LabelInput
                                    type="date"
                                    name="datefinish"
                                    id="datefinish"
                                    onChange={this.handleInputChange}
                                />
                            </Label>
                            <Label xs="6" for="">After:</Label>
                            <Label xs="6">
                                <LabelInput
                                    type="text"
                                    id="dateafter"
                                    onChange={this.handleInputChange}
                                />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Alert color={this.state.colorError}>{this.state.message}</Alert>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.onCloseHandler} id="cancel-button" >CANCEL</Button>{" "}
                    <Button color="primary" onClick={this.submitHabit} id="finish-button">FINISH</Button>
                </ModalFooter>
            </Modal>

        );
    }
}

export default NewHabit;
