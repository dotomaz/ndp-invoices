import styled from 'styled-components';

const Button = styled.button`
    background-color: #F0533E;
    color: #ffffff;
    padding: 10px 25px;
    border-radius: 5px;
    border: 0;
    text-transform: uppercase;
    font-weight: 700;
    outline: none;

    &:disabled{
        filter: brightness(180%);
    }

    &:focus{
        outline: none;
    }
`;

export default Button;
