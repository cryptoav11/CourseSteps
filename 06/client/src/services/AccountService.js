import {ethers} from "ethers"

const getProvider = () => new ethers.providers.Web3Provider(window.ethereum)

const getSigner = async () => {
    const provider = getProvider()
    const accounts = await provider.send("eth_accounts", []);
    if (accounts.length > 0) {
        return await provider.getSigner()
    }
    return null
}

const getWalletAddress = async (signer) => signer?.getAddress()

export default {
    getProvider: () => getProvider(),

    connectWallet: async () => {
        const provider = getProvider()
        await provider.send("eth_requestAccounts", []);
        const signer = provider?.getSigner();
        const walletAddress = await getWalletAddress(signer)
        return { provider, signer, walletAddress }
    },

    getAccountData: async () => {
        const provider = await getProvider()
        const signer = await getSigner(provider)
        const walletAddress = await getWalletAddress(signer)
        return { provider, signer, walletAddress }
    }
}

