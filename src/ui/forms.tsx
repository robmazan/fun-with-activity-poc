import styled from "@emotion/styled";

export const Form = styled.form`
    max-width: 300px;
    margin: 5px auto;
    border: 1px solid lightgray;
    border-radius: 4px;
`;

export const FormSection = styled.fieldset`
    border: 0;
    padding: 10px;
    margin: 0;
    display: flex;
    flex-direction: column;
`;

export const FormSectionTitle = styled.legend`
    font-size: 1.5em;
    font-weight: bold;
    padding: 5px;
    margin-left: -10px;
    background-color: orange;
    width: calc(100% + 10px);
`;

export const InputField = styled.input`
    padding: 5px;
    border: 1px solid lightgray;
    border-radius: 4px;
`;

export const Label = styled.label`
    color: darkgray;
    margin: 15px 0 5px 0;
`;

export const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px solid lightgray;
    margin-top: 15px;
`;

export const Button = styled.button`
    padding: 10px;
    border-radius: 4px;
    border: 0;
    background-color: lightblue;
    cursor: pointer;
`;
