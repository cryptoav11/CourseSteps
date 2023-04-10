import Utils from '../utils/Utils'
import {useEffect, useRef} from "react";
import useMetaMask from "../hooks/useMetaMask";
import {Address, Button, ConnectedButton, Icon} from "../styles/ConnectButtonStyles";

const ConnectButton = () => {
    const {connectMetaMask, tryConnectingMetaMask, signer, walletAddress} = useMetaMask()
    const iconRef = useRef()

    useEffect(() => {
        tryConnectingMetaMask()
    }, [])

    const setMetaMaskIcon = async () => {
        if(!walletAddress) return

        const icon = Utils.getMetaMaskIcon(walletAddress)
        const element = iconRef.current

        if (element) {
            if (element.firstChild) {
                element.removeChild(element.firstChild)
            }
            element.appendChild(icon);
        }
    }

    useEffect(() => {
        setMetaMaskIcon()
    }, [walletAddress])

    return (
        <>
            {signer ? (
                <ConnectedButton className="btn">
                    <Icon ref={iconRef}></Icon>
                    <Address className="address">
                        {Utils.condenseAddress(walletAddress)}
                    </Address>
                </ConnectedButton>
            ) : (
                <Button
                    onClick={() => connectMetaMask()}>
                    Connect Wallet
                </Button>
            )}
        </>
    )
}

export default ConnectButton
