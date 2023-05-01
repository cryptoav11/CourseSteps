import {ThemeProvider} from 'styled-components'
import Utils from '../utils/Utils'
import {useState, useEffect} from "react"
import {ClipLoader} from "react-spinners"
import {approveTheme, Button, connectTheme, disabledTheme, swapTheme} from "../styles/SwapButtonStyles"
import useApproval from "../hooks/useApproval"


const SwapButton = (
    {
        signer,
        inputSymbol,
        outputSymbol,
        inputAmount,
        inputWalletBalance,
        inputDecimals,
        connectMetaMask,
        swapTokens,
        isTransacting,
        isConfirming,
    }) => {

    const [theme, setTheme] = useState({})
    const [onClickFunction, setOnClickFunction] = useState(() => {})
    const [text, setText] = useState('')


    const isMissingSymbol = () => !(inputSymbol && outputSymbol)
    const isMissingInputAmount = () => !inputAmount
    const isInsufficientBalance = () => inputAmount > Utils.hexToHumanAmount(inputWalletBalance, inputDecimals)
    const isNotSigner = () => !signer
    const isMissingApproval = () => !isApproved && inputSymbol !== 'ETH' &&
        !(isAskingPermission || isApproving || isTransacting || isConfirming) &&
        !isMissingSymbol()
    const isDisabled = () => isMissingSymbol() || isMissingInputAmount() || isInsufficientBalance() ||
        isAskingPermission || isApproving || isTransacting || isConfirming

    const {
        isAskingPermission,
        isApproving,
        isApproved,
        checkIsApproved,
        approve
    } = useApproval(inputSymbol)

    useEffect(() => {
        if(isNotSigner()) return
        if(inputSymbol === 'ETH' || inputSymbol === '' || inputSymbol === null) return

        checkIsApproved()
    }, [inputSymbol, signer])

    const updateButton = () => {
        if (isNotSigner()) {
            setTheme(connectTheme)
            setOnClickFunction(() => connectMetaMask)
            setText('Connect Wallet')
            return
        }

        if (isMissingApproval())  {
            setTheme(approveTheme)
            setOnClickFunction(() => approve)
            setText(`Approve use of ${inputSymbol}`)
            return
        }

        if (isDisabled()) {
            setTheme(disabledTheme)
            setOnClickFunction(() => {})
            if (isAskingPermission) { return setText('Approve in your wallet') }
            if (isTransacting) { return setText('Swapping') }
            if (isConfirming) { return setText('Confirming') }
            if (isApproving) { return setText('Approving') }
            if (isMissingSymbol()) { return setText('Select a token') }
            if (isMissingInputAmount()) { return setText('Enter amount') }
            if (isInsufficientBalance) { return setText('Insufficient balance')}
            return
        }

        setText('Swap')
        setOnClickFunction(() => swapTokens)
        setTheme(swapTheme)
    }

    useEffect(() => {
        updateButton()
    }, [signer, inputSymbol, outputSymbol, inputAmount, inputWalletBalance, isApproved, isAskingPermission, isConfirming, isTransacting])

    return (
        <ThemeProvider theme={theme}>
            <Button
                onClick={onClickFunction}>
                {(isAskingPermission || isApproving || isConfirming || isTransacting) && (
                    <>
                        <ClipLoader
                            color='#babfcf'
                            loading={true}
                            size={18}
                            speedMultiplier="0.75"/>
                        &nbsp;&nbsp;
                    </>
                )}
                {text}
            </Button>
        </ThemeProvider>
    )
}

export default SwapButton