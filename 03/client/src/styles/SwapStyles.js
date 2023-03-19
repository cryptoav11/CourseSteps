import styled from "styled-components";

const Page = styled.div`
  padding-top: 70px;
`
const SwapContainer = styled.div`
  background-color: #fff;
  width: 450px;
  height: 100%;
  margin: auto;
  border: 1px solid rgb(210, 217, 238);
  border-radius: 16px;
`
const SwapHeader = styled.div`
  margin: 12px 0px 12px 20px;
  text-align: left;
  font-weight: 600;
`
const TokenRow = styled.div`
  display: flex;
`
const TokenInput = styled.input`
  flex: 1;
  font-size: 36px;
  display: inline-block;
  width: 100%;
  border: none;
  background-color: transparent;
  outline: 0 none;
  ::placeholder {
    color: #c2c7db; 
  }
`
const Balance = styled.div`
  text-align: right;
`
const TokenContainer = styled.div`
  background-color: #f5f6fc;
  border-radius: 12px;
  margin: 8px;
  padding: 12px;
`
const PriceContainer = styled.div`
  background-color: #f5f6fc;
  border-radius: 12px;
  margin: 8px;
  padding: 12px;
  text-align: left;
  font-size: 14px;
  font-family: sans-serif;
  color: rgb(140, 148, 175);
  display: flex;
`
const PriceText = styled.div`
    flex: 1;
`

export {
    Page,
    SwapContainer,
    SwapHeader,
    TokenRow,
    TokenInput,
    Balance,
    TokenContainer,
    PriceContainer,
    PriceText
}