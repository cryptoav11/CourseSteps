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
    TokenName, TokenSymbol
} from "../styles/SelectTokenModalStyles";

const SelectTokenModal = ({setInputSymbol, setOutputSymbol, isInput, onClose}) => {
    const setToken = (symbol) => isInput ? setInputSymbol(symbol) : setOutputSymbol(symbol)

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
                        </Row>
                    ))}
                </ModalBody>
            </Modal>
        </ModalBackground>
    )
}

export default SelectTokenModal
