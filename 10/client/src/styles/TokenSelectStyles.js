import styled from "styled-components";

const SelectButton = styled.button`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  border-radius: 16px;
  border: none;
  font-size: 22px;
  font-weight: ${props => props.theme.fontWeight};
  padding: 0px 12px;
  display: inline-block;
  margin: 5px 0;
  &:hover {
    background-color: ${props => props.theme.backgroundHover}
  }
`

SelectButton.defaultProps = {
    theme: {
        background: '#fb118e',
        color: '#fff',
        fontWeight: 600,
        backgroundHover: '#d50c77',
    }
}

const tokenSelectedTheme = {
    background: '#e8ecfb',
    color: '#000',
    fontWeight: 600,
    backgroundHover: '#d2daf7',
}
const tokenMissingTheme = {
    background: '#fb118e',
    color: '#fff',
    fontWeight: 600,
    backgroundHover: '#d50c77',
}

export { SelectButton, tokenSelectedTheme, tokenMissingTheme }