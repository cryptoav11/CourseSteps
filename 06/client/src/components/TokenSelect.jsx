import {useState, useEffect} from "react";
import {ThemeProvider} from 'styled-components'
import {CaretDownFill} from "react-bootstrap-icons";
import {SelectButton, tokenMissingTheme, tokenSelectedTheme} from "../styles/TokenSelectStyles";

const TokenSelect = ({displayModal, symbol, isInput}) => {
    const [themeInput, setThemeInput] = useState({})
    const [themeOutput, setThemeOutput] = useState({})

    const updateInputButton = () => {
        if (symbol) return setThemeInput(tokenSelectedTheme)
        setThemeInput(tokenMissingTheme)
    }

    const updateOutputButton = () => {
        if (symbol) return setThemeOutput(tokenSelectedTheme)
        setThemeOutput(tokenMissingTheme)
    }

    useEffect(() => {
        if(isInput) updateInputButton()
        if(!isInput) updateOutputButton()
    }, [symbol])

    return (
        <ThemeProvider theme={isInput ? themeInput : themeOutput}>
            <SelectButton onClick={() => displayModal()}>
                <>
                    {symbol ? (
                        <>
                            {symbol}
                            &nbsp;&nbsp;
                        </>
                    ) : (
                        <>
                            Select token
                            &nbsp;
                        </>
                    )}
                </>
                <span><CaretDownFill width="14" height="14"/></span>
            </SelectButton>
        </ThemeProvider>
    )
}

export default TokenSelect
