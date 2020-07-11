import React from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import { parse, format } from 'date-fns';

import '../react-datepicker.css';

interface Props {
    name: string;
    type: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    values?: { id: string, value: string }[];
    onChange?: Function;
}

const Section = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Label = styled.div`
    flex: 1;
    text-align: right;
    padding-right: 15px;
`;

const ChildContainer = styled.div`
    flex: 3;
`;

const InputComponent = styled.input`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 15px;
`;

const CheckboxComponent = styled.input`

`;

const InputCurrencyComponent = styled(InputComponent as any)`
    display: inline-block;
    max-width: 100px;
    margin-right: 10px;
`;

const InputDistanceComponent = styled(InputComponent as any)`
    display: inline-block;
    max-width: 100px;
    margin-right: 10px;
`;

const SelectComponent = styled.select`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 15px;
`;

const TextareaComponent = styled.textarea`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px 15px;
`;

const FormComponent: React.FunctionComponent<Props> = (props) => {
    const onChange = (event: any): void => {
        const value = event.target.type === 'checkbox'
            ? event.target.checked ? '1' : '0'
            : event.target.value;

        if (typeof props.onChange === "function") { props.onChange(value); }
    }

    return (
        <Section className="form-group">
            <Label>{props.name}:{!!props.required ? '*' : ''}</Label>
            <ChildContainer>
                {props.type === 'input' && (
                    <InputComponent
                        type="text"
                        value={props.value}
                        className="form-control"
                        disabled={props.disabled || false}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => onChange(event)}
                    />
                )}

                {props.type === 'currency' && (
                    <>
                        <InputCurrencyComponent
                            type="text"
                            value={props.value}
                            className="form-control"
                            disabled={props.disabled || false}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => onChange(event)}
                        />
                        <span>EUR</span>
                    </>
                )}

                {props.type === 'distance' && (
                    <>
                        <InputDistanceComponent
                            type="text"
                            value={props.value}
                            className="form-control"
                            disabled={props.disabled || false}
                            onChange={(event: React.FormEvent<HTMLInputElement>) => onChange(event)}
                        />
                        <span>KM</span>
                    </>
                )}

                {props.type === 'checkbox' && (
                    <CheckboxComponent
                        type="checkbox"
                        checked={props.value === '1'}
                        disabled={props.disabled || false}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => onChange(event)}
                    />
                )}

                {props.type === 'textarea' && (
                    <TextareaComponent
                        value={props.value}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event)}
                        disabled={props.disabled || false}
                        className="form-control"
                    />
                )}

                {props.type === 'select' && (
                    <SelectComponent
                        value={props.value}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event)}
                        disabled={props.disabled || false}
                        className="form-control"
                    >
                        {props.values && props.values.map((option) => {
                            return (
                                <option key={option.id} value={option.id} >{option.value}</option>
                            )
                        })}
                    </SelectComponent>
                )}

                {props.type === 'date-time' && (
                    <DatePicker
                        className="form-control"
                        selected={parse(props.value || '', 'YYYY-MM-DD HH:mm:ss', new Date())}
                        onChange={(value: any) => onChange({ target: { value: format(value || '', 'YYYY-MM-DD HH:mm:ss'), type: 'date-type' } })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="dd. MM. yyyy HH:mm"
                    />
                )}
            </ChildContainer>
        </Section>
    )
};

export default FormComponent;
