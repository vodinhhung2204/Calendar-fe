import React, { Component } from "react";
import { Form, FormGroup, FormText, Label } from "reactstrap";
import Switch from "react-switch";
import LabelButton from "./LabelButton";
import moment from "moment";
import checkImage from "../../image/checked.png";
import notcheckImage from "../../image/notcheck.png";
import "./Habit.css";
class Habit extends Component {
    constructor (props) {
        super(props);
        this.state = {
            checked: false
        };
        this.handleChange =this.handleChange.bind(this);
    }
    handleChange (checked) {
        this.setState({
            checked
        });
    }
    render () {
        const {
            label,
            slogan,
            start,
            end,
            firstlabelButton,
            secondlabelButton,
            fibuttonclassName,
            sebuttonclassName,
            successText
        } = this.props;
        return (
            <Form className="container-result">
                <FormGroup className="title-result">
                    <Label className="name-habit">{label}</Label>
                    <Switch onChange={this.handleChange}
                        checked={this.state.checked}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        className="first-switch"
                        height={20}
                        width={35.48}
                        onColor="#F15A27"
                    />
                </FormGroup>
                <FormGroup className="detail-habit">
                    <FormText className="slogan">&ldquo;{slogan}&rdquo;</FormText>
                    <FormGroup className="detail-date">
                        <Label className="remaining">Remaining: </Label>
                        <Label className="day-remaining">{moment(end).fromNow()}</Label>
                        <Label className="start">Start day: </Label>
                        <Label className="day-start">{moment(start).format("MMM Do YY")}</Label>
                        <Label className="end">End day: </Label>
                        <Label className="day-end">{moment(end).format("MMM Do YY")}</Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup className="result-data">
                    <LabelButton label={firstlabelButton} className="completed-result" buttonclassName={fibuttonclassName} src={checkImage}></LabelButton>
                    <LabelButton label={secondlabelButton} classname="uncompleted-result" buttonclassName={sebuttonclassName} src={notcheckImage}></LabelButton>
                    <Label className="result-label"><h4 className="title-success">Success</h4></Label>
                    <Label className="result-percent"><h4 className="title-percent">{successText + "%"}</h4></Label>
                </FormGroup>
                <FormGroup className="border"></FormGroup>
            </Form>
        );
    }
}

export default Habit;
