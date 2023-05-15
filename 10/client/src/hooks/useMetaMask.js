import AccountService from "../services/AccountService";
import {useState} from "react";

const useMetaMask = () => {
    const [signer, setSigner] = useState(null)
    const [walletAddress, setWalletAddress] = useState(null)

    const connectMetaMask = async () => {
        const {signer, walletAddress} = await AccountService.connectWallet()

        setSigner(signer)
        setWalletAddress(walletAddress)
    }

    const tryConnectingMetaMask = async () => {
        const {signer, walletAddress} = await AccountService.getAccountData()

        setSigner(signer)
        setWalletAddress(walletAddress)
    }

    return { connectMetaMask, tryConnectingMetaMask, signer, walletAddress }
}

export default useMetaMask