import styled from "styled-components";

const Button = styled.div`
  background-color: #febbe0;
  border-radius: 20px;
  border: 1px solid #fff;
  color: #fb118e;
  padding: 9px 15px;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;

const ConnectedButton = styled.div`
  border-radius: 24px !important;
  background-color: #f5f6fc !important;
  height: 38px;
`

const Icon = styled.div`
  display: inline-block;
  margin-right: 12px;
`

const Address = styled.div`
  display: inline-block;
  vertical-align: top;
`

export { Button, ConnectedButton, Icon, Address }