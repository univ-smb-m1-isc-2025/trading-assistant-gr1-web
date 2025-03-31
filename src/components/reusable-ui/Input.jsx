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
  /* border: 1px solid red; */
  background-color: white;
  border-radius: 5px;
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
    color: #17161a;
    width: 100%;
  }

  &::placeholder {
    background: white;
    color: lightgrey;
  }
`;
