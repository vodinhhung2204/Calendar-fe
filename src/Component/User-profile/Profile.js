import React, { Component } from "react";
import { Container, Row, Col, Form, FormGroup, FormText } from "reactstrap";
import Habit from "./Habit";
import "./Profile.css";
import Axios from "axios";
import moment from "moment";

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dataUser: {},
            ListHabit: []
        };
    }

    componentWillMount () {
        Axios.get("https://sleepy-dawn-29715.herokuapp.com/profile", { headers: { "Authorization": `Bearer ${localStorage.getItem("Token")}` } })
            .then((response) => {
                this.setState({
                    dataUser: response.data.userInformation,
                    ListHabit: response.data.listOfHabits
                });
            })
            .catch(() => {
            });
    }
    render () {
        return (

            <Container>
                <Row className="top-row">
                    <Col className="profile">
                        <Form>
                            <FormGroup className="my-profile"><h3>MY PROFILE</h3></FormGroup>
                            <img className="img" src="https://picsum.photos/130/130?image=1027" alt=""></img>
                            <FormGroup className="info">
                                <FormText className="name">{this.state.dataUser.fullname}</FormText>
                                <FormText className="mail">{this.state.dataUser.email}</FormText>
                            </FormGroup>

                        </Form>

                    </Col>
                    <Col className="first-habit">
                        {this.state.ListHabit.map(habit => (
                            <Habit
                                key={habit._id}
                                label={habit.name}
                                slogan={habit.slogan}
                                remaining={habit.repeat}
                                start= {moment(habit.timeBegin).format("L").toString()}
                                end= {moment(habit.timeEnd).format("L").toString()}
                                fibuttonclassName="yes"
                                firstlabelButton={habit.totalFinishDay + " days"}
                                sebuttonclassName="no"
                                secondlabelButton={habit.totalUnfinishedDay + " days"}
                                successText={Math.ceil((habit.totalFinishDay / (moment(habit.timeEnd).diff(habit.timeBegin, "days"))) * 100) }
                            >
                            </Habit>
                        ))}

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;
