import {tokenSymbols, tokenInfos} from "../constants";
import {
    Logo,
    MiddleColumn,
    Modal,
    ModalBackground,
    ModalBody,
    ModalHeader, Row,
    Title,
    ModalLine,
    TokenName, TokenSymbol, LastColumn
} from "../styles/SelectTokenModalStyles";
import {useEffect, useState} from "react";
import AccountService from "../services/AccountService";
import {getWalletBalance} from "../services/WalletService";
import Utils from "../utils/Utils";

const SelectTokenModal = ({setInputSymbol, setOutputSymbol, isInput, onClose}) => {

    const [walletBalances, setWalletBalances] = useState({})

    const setToken = (symbol) => isInput ? setInputSymbol(symbol) : setOutputSymbol(symbol)

    const setWalletTokenBalances = async () => {
        const {walletAddress} = await AccountService.getAccountData()

        await Promise.all(
            tokenSymbols.map(async (symbol) => {
                let balance = 0

                if(!!walletAddress) { balance = await getWalletBalance(symbol)}
                balance = Utils.hexToHumanAmount(balance, tokenInfos[symbol].decimals)
                setWalletBalances(prev => ({...prev, [symbol]: balance}))
            })
        )
    }

    useEffect(() => {
        setWalletTokenBalances()
    }, [])

    if (Object.keys(walletBalances).length !== tokenSymbols.length) {
        return null
    }

    return(
        <ModalBackground onClick={onClose}>
            <Modal onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <Title >Select a token</Title>
                </ModalHeader>
                <ModalLine/>
                <ModalBody>
                    {tokenSymbols.map((symbol) => (
                        <Row
                            className="row"
                            key={symbol}
                            onClick={() => {setToken(symbol); onClose();}}>
                            <div className="col-md-2">
                                <Logo>{symbol}</Logo>
                            </div>
                            <MiddleColumn className="col-md-7">
                                <TokenName>{tokenInfos[symbol].name}</TokenName>
                                <TokenSymbol>{symbol}</TokenSymbol>
                            </MiddleColumn>
                            <LastColumn className="col-md-3">
                                {walletBalances[symbol]}
                            </LastColumn>
                        </Row>
                    ))}
                </ModalBody>
            </Modal>
        </ModalBackground>
    )
}

export default SelectTokenModal
