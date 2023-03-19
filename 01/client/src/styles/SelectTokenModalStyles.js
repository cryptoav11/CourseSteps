import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Modal = styled.div`
  background-color: #fff !important;
  width: 418px !important;
  border-radius: 18px;
  padding: 20px 5px;
`
const Row = styled.div`
  padding: 8px 18px;

  &:hover {
    background-color: #f0f0f3;
    margin-left:  -4px;
    margin-right:  -4px;
    padding-left: 10px;
    padding-right: 10px;
  }
`
const Logo = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  font-size: 14px;
  text-align: center;
  background: #e8ecfb;
  color: #40434f;
  overflow: hidden;
`
const MiddleColumn = styled.div`
  text-align: left;
`
const LastColumn = styled.div`
  text-align: right;
`
const TokenName = styled.div`
  font-weight: 500;
`
const TokenSymbol = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #aaaebb;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin-left: 0;
  padding-left: 20px;
`
const ModalLine = styled.div`
  border-bottom: 1px #c7cbd7 solid;
`
const ModalBody = styled.div`
  //padding-top: 20px;
`
const ModalHeader = styled.div`
  padding-bottom: 20px;
  font-weight: 500;
`

export {
    ModalBackground,
    Modal,
    Row,
    Logo,
    MiddleColumn,
    LastColumn,
    TokenName,
    TokenSymbol,
    Title,
    ModalLine,
    ModalBody,
    ModalHeader
}