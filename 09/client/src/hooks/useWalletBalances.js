import {useState} from "react";
import {getWalletBalance} from "../services/WalletService";


const useWalletBalances = () => {
    const [inputWalletBalance, _setInputWalletBalance] = useState('')
    const [outputWalletBalance, _setOutputWalletBalance] = useState('')

    const setWalletBalances = (inputSymbol, outputSymbol) => {
        setInputWalletBalance(inputSymbol)
        setOutputWalletBalance(outputSymbol)
    }

    const setInputWalletBalance = async (symbol) => {
        if(symbol === null) { return _setInputWalletBalance(null) }

        _setInputWalletBalance('0')
        const inputWalletBalance = await getWalletBalance(symbol)
        _setInputWalletBalance(inputWalletBalance)
    }
    const setOutputWalletBalance = async (symbol) => {
        if(symbol === null) { return _setOutputWalletBalance(null) }

        _setOutputWalletBalance('0')
        const outputWalletBalance = await getWalletBalance(symbol)
        _setOutputWalletBalance(outputWalletBalance)
    }

    return { inputWalletBalance, outputWalletBalance, setWalletBalances }
}

export default useWalletBalances

















//