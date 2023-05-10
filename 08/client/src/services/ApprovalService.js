import {contracts, tokenInfos} from "../constants";
import AccountService from "./AccountService";
import {getToken} from "./ContractService";


export default {
    isApprovedToken: async (tokenSymbol, spenderAddress) => {
        const contract = getToken(tokenSymbol)
        const { walletAddress } = await AccountService.getAccountData()
        const allowance = await contract.allowance(walletAddress, spenderAddress)
        const maxAllowance = tokenInfos[tokenSymbol].maxAllowance
        return (allowance.toString() - maxAllowance) === 0
    },
    approveTokens: async (tokenSymbol, spenderAddress, setIsApproving, setIsAskingPermission) => {
        const contract = getToken(tokenSymbol)
        const {signer} = await AccountService.getAccountData()

        try {
            const maxAllowance = tokenInfos[tokenSymbol].maxAllowance

            const tx = await contract.connect(signer).approve(
                spenderAddress,
                maxAllowance,
            )

            setIsAskingPermission(false)
            setIsApproving(true)

            await tx.wait()

            setIsApproving(false)
        } catch {
            setIsAskingPermission(false)
            setIsApproving(false)
            console.log('Approve declined')
        }
    },
    clearApprovals: async () => {
        const { signer } = await AccountService.getAccountData()

        const wethContract = getToken('WETH')
        const uniContract = getToken('UNI')
        const usdcContract = getToken('USDC')

        wethContract.connect(signer).approve(contracts.SWAPROUTER.address, 0)
        uniContract.connect(signer).approve(contracts.SWAPROUTER.address, 0)
        usdcContract.connect(signer).approve(contracts.SWAPROUTER.address, 0)
    },
}












//