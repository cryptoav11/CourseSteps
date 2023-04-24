import {useEffect, useState} from 'react'
import Utils from '../utils/Utils'
import SelectTokenModal from "../components/SelectTokenModal"
import {getQuote} from "../services/QuoteService";
import TokenSelect from "../components/TokenSelect";
import {
    Balance,
    Page, PriceContainer, PriceText,
    SwapContainer, SwapHeader,
    TokenContainer,
    TokenInput,
    TokenRow
} from "../styles/SwapStyles";
import useMetaMask from "../hooks/useMetaMask";
import useSymbols from "../hooks/useSymbols";
import useAmount from "../hooks/useAmount";
import * as PriceService from "../services/PriceService";
import useWalletBalances from "../hooks/useWalletBalances";
import useDecimals from "../hooks/useDecimals";


function Swap() {
    const {
        _connectMetaMask,
        tryConnectingMetaMask,
        signer,
        _walletAddress
    } = useMetaMask()
    const {
        inputSymbol,
        setInputSymbol,
        outputSymbol,
        setOutputSymbol,
    } = useSymbols()
    const {
        inputAmount,
        setInputAmount,
        outputAmount,
        setOutputAmount
    } = useAmount()
    const {
        inputWalletBalance,
        outputWalletBalance,
        setWalletBalances,
    } = useWalletBalances()
    const {
        inputDecimals,
        outputDecimals,
        setDecimals,
    } = useDecimals()

    const [isInput, setIsInput] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [priceImpact, setPriceImpact] = useState(false)

    const calculateQuote = async () => {
        const quotedOutput = await getQuote(inputAmount, inputSymbol, outputSymbol)
        setOutputAmount(quotedOutput)
    }

    const calculatePriceImpact = async () => {
        const priceImpact = await PriceService.getPriceImpact(inputAmount, inputSymbol, outputSymbol)
        setPriceImpact(priceImpact)
    }

    useEffect(() => {
        tryConnectingMetaMask()
    }, [])

    useEffect(() => {
        setOutputAmount('')

        if (!Utils.validateInputs(inputSymbol, outputSymbol, inputAmount)) return

        calculateQuote()
        calculatePriceImpact()
    }, [inputAmount, inputSymbol, outputSymbol])

    useEffect(() => {
        setWalletBalances(inputSymbol, outputSymbol)
        setDecimals(inputSymbol, outputSymbol)
    }, [inputSymbol, outputSymbol])

    useEffect(() => {
        setWalletBalances(inputSymbol, outputSymbol)
    }, [signer])

    return (
        <Page>
            <SwapContainer>
                <SwapHeader>Swap</SwapHeader>
                <TokenContainer>
                    <TokenRow>
                        <TokenInput
                            placeholder="0"
                            value={inputAmount}
                            onChange={setInputAmount} />
                        <TokenSelect
                            displayModal={() => { setIsInput(true); setShowModal(true) }}
                            symbol={inputSymbol}
                            isInput={true} />
                    </TokenRow>
                    <Balance>
                        {Utils.hexToHumanAmount(inputWalletBalance, inputDecimals, 3)}
                    </Balance>
                </TokenContainer>
                <TokenContainer>
                    <TokenRow>
                        <TokenInput
                            placeholder="0"
                            value={outputAmount}
                            readOnly >
                        </TokenInput>
                        <TokenSelect
                            displayModal={() => { setIsInput(false); setShowModal(true) }}
                            symbol={outputSymbol}
                            isInput={false} />
                    </TokenRow>
                    <Balance>
                        {Utils.hexToHumanAmount(outputWalletBalance, outputDecimals, 3)}
                    </Balance>
                </TokenContainer>

                {priceImpact && (
                    <PriceContainer>
                        <PriceText>
                            Price Impact
                        </PriceText>
                        <div>
                            {priceImpact}%
                        </div>
                    </PriceContainer>
                )}

            </SwapContainer>

            {showModal && (
                <SelectTokenModal
                    onClose={() => setShowModal(false)}
                    isInput={isInput}
                    setInputSymbol={setInputSymbol}
                    setOutputSymbol={setOutputSymbol}
                />
            )}
        </Page>
    );
}

export default Swap;