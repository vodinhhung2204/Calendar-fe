import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

class LabelInput extends Component {
    render () {
        const {
            id,
            type,
            name,
            className,
            value,
            label,
            labelClassName,
            onChange
        } = this.props;
        return (
            <FormGroup className={className} style={{ backgroundColor: this.props.color }}>
                <Label className={labelClassName}>{label}</Label>
                <Input
                    type={type}
                    name={name}
                    value={value}
                    className={className}
                    id={id}
                    onChange={onChange}
                />
            </FormGroup>
        );
    }
}

export default LabelInput;
