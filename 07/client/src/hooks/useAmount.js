import {useState} from "react";

const useAmount = () => {
    const [inputAmount, _setInputAmount] = useState('')
    const [outputAmount, setOutputAmount] = useState('')

    const setInputAmount = (e) => {
        let amount = e.target.value

        if(amount === '.') { amount = '0.'}
        if ( (!isNaN(parseFloat(amount)) && isFinite(amount)) || [0, '', null].includes(amount) ){
            _setInputAmount(amount)
        }
    }

    return ({
        inputAmount,
        setInputAmount,
        outputAmount,
        setOutputAmount
    })
}

export default useAmount