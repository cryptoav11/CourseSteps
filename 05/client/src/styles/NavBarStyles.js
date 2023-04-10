import styled from "styled-components";

const AppLogo = styled.img`
  object-fit: cover;
  width: 230px;
  height: 230px;
  width: 40px;
  height: 40px;
  border: 1px #736b70 solid;
  border-radius: 5px;
  opacity: 0.5;
`

const NetworkLogo = styled.img`
  background-color: #fff;
  border-radius: 100px;
  border: 1px solid #a0969c;
  margin-top: 10px;
  margin-right: 14px;
  margin-bottom: 14px;
  width: 22px;
  height: 22px;
`

const NetworkName = styled.a`
  display: inline-block !important;
`

export { AppLogo, NetworkLogo, NetworkName }