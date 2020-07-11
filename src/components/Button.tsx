import styled from 'styled-components';

const Button = styled.button`
    background-color: #F0533E;
    color: #ffffff;
    padding: 10px 25px;
    border-radius: 5px;
    border: 0;
    text-transform: uppercase;
    font-weight: 700;

    &:disabled{
        filter: brightness(180%);
    }
`;

export default Button;
