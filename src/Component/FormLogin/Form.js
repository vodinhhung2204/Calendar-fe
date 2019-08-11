import React, { Component } from "react";
import "./Form.css";
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

class loginForm extends Component {
    constructor () {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            username: "",
            password: "",
            colorError: "",
            message: ""
        };
        this.loginSubmit = this.loginSubmit.bind(this);
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

    loginSubmit () {
        const data = this.state;
        Axios.post("https://sleepy-dawn-29715.herokuapp.com/login", data)
            .then(response => {
                localStorage.setItem("Token", response.data.token);
                this.props.loginCompleted(true);
            }).catch(() => {
                this.setState({
                    colorError: "danger",
                    message: "Username or password is wrong !"
                });
            });
    }

    render () {
        return (
            <Container className="login-container">
                <Row>
                    <Col sm="12" md="4"></Col>
                    <Col sm="12" md="4">
                        <Form>
                            <FormGroup className="text-center">
                                <Label className="login">
                                    <p>Login</p>
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
                                <Alert color={this.state.colorError}>{this.state.message}</Alert>
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Button
                                    onClick={this.loginSubmit}
                                    className="login-button"
                                >
                                    LOGIN
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

export default loginForm;
