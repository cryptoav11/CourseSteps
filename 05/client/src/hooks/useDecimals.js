import {useState} from "react";
import {tokenInfos} from "../constants";


const useDecimals = () => {
    const [inputDecimals, _setInputDecimals] = useState(null)
    const [outputDecimals, _setOutputDecimals] = useState(null)

    const setDecimals = (inputSymbol, outputSymbol) => {
        setInputDecimals(inputSymbol)
        setOutputDecimals(outputSymbol)
    }

    const setInputDecimals = (symbol) => {
        if (symbol === null) { return _setInputDecimals(null) }
        _setInputDecimals(tokenInfos[symbol].decimals)
    }
    const setOutputDecimals = (symbol) => {
        if (symbol === null) { return _setOutputDecimals(null) }
        _setOutputDecimals(tokenInfos[symbol].decimals)
    }

    return { inputDecimals, outputDecimals, setDecimals }
}

export default useDecimals