import styled from "styled-components";

export default function Input({ type, placeholder, Icon, ...otherProps }) {
  return (
    <InputStyled>
      {Icon && Icon}
      <input type={type} placeholder={placeholder} {...otherProps} />
    </InputStyled>
  );
}

const InputStyled = styled.div`
  border: solid 1px #2b3139;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 18px 24px;
  margin: 18px 0;

  .icon {
    font-size: 15px;
    margin-right: 8px;
    color: #93a2b1;
  }

  input {
    border: none;
    font-size: 15px;
    color: #e9ecef;
    width: 100%;
    background-color: transparent;
  }

  &::placeholder {
    background: #93a2b1;
    color: lightgrey;
  }
`;
