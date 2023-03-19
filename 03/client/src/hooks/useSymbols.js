import {useState} from "react";

const useSymbols = () => {
    const [inputSymbol, _setInputSymbol] = useState('ETH')
    const [outputSymbol, _setOutputSymbol] = useState(null)

    const setInputSymbol = (symbol) => {
        if (symbol === outputSymbol) { _setOutputSymbol(null)}
        _setInputSymbol(symbol)
    }
    const setOutputSymbol = (symbol) => {
        if (symbol === inputSymbol) { _setInputSymbol(null)}
        _setOutputSymbol(symbol)
    }

    return ({
        inputSymbol,
        setInputSymbol,
        outputSymbol,
        setOutputSymbol
    })
}

export default useSymbols