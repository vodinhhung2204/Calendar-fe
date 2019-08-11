import React, { Component } from "react";
import { Label, Button } from "reactstrap";

class LabelButton extends Component {
    render () {
        const {
            labelclassName,
            buttonclassName,
            label,
            src
        } = this.props;
        return (
            <Label className={labelclassName}>
                <Button className={buttonclassName}><img alt="BUTON " src={src}/></Button>
                {label}
            </Label>
        );
    }
}

export default LabelButton;
