import React, { Component } from "react";
import "./SignUp.css";
import Axios from "axios";
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Alert
} from "reactstrap";
import LabelInput from "../Labelnput/LabelInput";

class SignupForm extends Component {
    constructor () {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: "",
            fullname: "",
            email: "",
            password: "",
            role: "student",
            colorError: "",
            message: ""
        };
        this.onUserRoleChange = this.onUserRoleChange.bind(this);
        this.signupSubmit = this.signupSubmit.bind(this);
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
    onUserRoleChange (event) {
        this.setState({
            role: event.target.id
        });
    }
    signupSubmit () {
        const data = this.state;
        Axios.post("https://sleepy-dawn-29715.herokuapp.com/register", data)
            .then(response => {
                alert("Succeed" + response);
                this.setState({
                    colorError: "primary",
                    message: response.data.message
                });
            })
            .catch((err) => {
                this.setState({
                    colorError: "danger",
                    message: err.message
                });
            });
    }

    render () {
        return (
            <Container className="signup-container">
                <Row>
                    <Col sm="12" md="4"></Col>
                    <Col sm="12" md="4">
                        <Form>
                            <FormGroup className="text-center">
                                <Label className="signup">
                                    <p>SIGN UP</p>
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <LabelInput
                                    label="Username"
                                    labelClassName="info"
                                    value={this.state.username}
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={(this.handleInputChange)}
                                ></LabelInput>
                                <LabelInput
                                    label="Fullname"
                                    labelClassName="info"
                                    value={this.state.fullname}
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    onChange={(this.handleInputChange)}
                                ></LabelInput>
                                <LabelInput
                                    label="Email"
                                    labelClassName="info"
                                    value={this.state.email}
                                    type="text"
                                    id="email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                ></LabelInput>
                                <LabelInput
                                    label="Password"
                                    labelClassName="info"
                                    value={this.state.password}
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                ></LabelInput>
                            </FormGroup>
                            <FormGroup>
                                <Label className="info">
                                    You are (optional)
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    color="default"
                                    onClick={this.onUserRoleChange}
                                    active={this.state.role === "student"}
                                    className="user-role"
                                    id="student"
                                >
                                    STUDENT
                                </Button>
                                <Button
                                    color="default"
                                    onClick={this.onUserRoleChange}
                                    active={this.state.role === "staff"}
                                    className="user-role"
                                    id="staff"
                                >
                                    STAFF
                                </Button>
                                <Button
                                    color="default"
                                    onClick={this.onUserRoleChange}
                                    active={this.state.role === "other"}
                                    className="user-role"
                                    id="other"
                                >
                                    OTHER
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <Alert color={this.state.colorError}>{this.state.message}</Alert>
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Button
                                    onClick={this.signupSubmit}
                                    className="signup-button"
                                >
                                    SIGN UP
                                </Button>{" "}
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col sm="12" md="4"></Col>
                </Row>
            </Container>
        );
    }
}

export default SignupForm;
