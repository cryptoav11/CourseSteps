import AccountService from "./AccountService";
import {getToken} from "./ContractService";
import {tokenInfos} from "../constants";

export const getWalletBalance = async (symbol) => {
    if (tokenInfos[symbol].address === '0x') { return await getEtherBalance() }

    return await getTokenBalance(symbol)
}

const getEtherBalance = async () => {
    const {provider, walletAddress} = await AccountService.getAccountData()

    if (walletAddress == null) return

    return await provider.getBalance(walletAddress)
}

const getTokenBalance = async (symbol) => {
    const {walletAddress} = await AccountService.getAccountData()

    if (walletAddress == null) return

    const contract = getToken(symbol)

    return await contract.balanceOf(walletAddress)
}