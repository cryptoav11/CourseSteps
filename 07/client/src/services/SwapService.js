import Utils from "../utils/Utils";
import AccountService from "./AccountService";
import {GAS_LIMIT, tokenInfos} from "../constants";
import {getSwapRouter} from "./ContractService";


export default {
    swapTokens: async (
        inputAmount,
        inputSymbol,
        outputSymbol,
        setIsTransacting,
        setIsConfirming,
        minutesToDeadline = 10,
    ) => {
        setIsConfirming(true)

        const deadline = Utils.deadlineFromMinutes(minutesToDeadline)
        const inputDecimals = tokenInfos[inputSymbol].decimals
        const amountIn = Utils.tokensToWei(inputAmount, inputDecimals)
        const { signer, walletAddress: recipient } = await AccountService.getAccountData()

        if(![inputSymbol, outputSymbol].includes('ETH')) {
            await swapErc20ToErc20(amountIn, inputSymbol, outputSymbol, deadline, signer, recipient, setIsTransacting, setIsConfirming)
        }

        setIsConfirming(false)
        setIsTransacting(false)
    },
}

const swapErc20ToErc20 = async (
    amountIn,
    inputSymbol,
    outputSymbol,
    deadline,
    signer,
    recipient,
    setIsTransacting,
    setIsConfirming,
) => {
    const tokenIn = tokenInfos[inputSymbol].address
    const tokenOut = tokenInfos[outputSymbol].address

    const params = {
        tokenIn,
        tokenOut,
        recipient,
        deadline,
        amountIn,
        fee: 3000,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
    }

    const swapRouterContract = getSwapRouter()

    try {
        const tx = await swapRouterContract.connect(signer).exactInputSingle(params, {gasLimit: GAS_LIMIT})
        setIsTransacting(true)
        setIsConfirming(false)

        await tx.wait()
    } catch {
        setIsConfirming(false)
    }
    console.log(`Swapped ${inputSymbol} to ${outputSymbol}`)
}















//