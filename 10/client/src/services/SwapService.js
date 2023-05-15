import Utils from "../utils/Utils";
import AccountService from "./AccountService";
import {contracts, GAS_LIMIT, tokenInfos} from "../constants";
import {getSwapRouter, getToken} from "./ContractService";


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
        else if (inputSymbol === 'ETH' && outputSymbol !== 'WETH') {
            await swapEthToErc20(amountIn, outputSymbol, deadline, signer, recipient, setIsTransacting, setIsConfirming)
        }
        else if (inputSymbol === 'ETH' && outputSymbol === 'WETH') {
            await swapEthToWeth(amountIn, signer, setIsTransacting, setIsConfirming)
        }
        else if (inputSymbol === 'WETH' && outputSymbol === 'ETH') {
            await swapWethToEth(amountIn, signer, setIsTransacting, setIsConfirming,)
        }
        else if (inputSymbol !== 'ETH' && outputSymbol === 'ETH') {
            await swapErc20ToEth(amountIn, inputSymbol, deadline, signer, recipient, setIsTransacting, setIsConfirming)
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

const swapEthToErc20 = async (
    amountIn,
    outputSymbol,
    deadline,
    signer,
    recipient,
    setIsTransacting,
    setIsConfirming,
) => {
    const tokenIn = tokenInfos['WETH'].address
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
        const tx = await swapRouterContract.connect(signer).exactInputSingle(params, {gasLimit: GAS_LIMIT, value: amountIn})
        setIsTransacting(true)
        setIsConfirming(false)

        await tx.wait()
    } catch {
        setIsConfirming(false)
    }
    console.log(`Swapped ETH to ${outputSymbol}`)
}

const swapEthToWeth = async (
    amountIn,
    signer,
    setIsTransacting,
    setIsConfirming,
) => {
    try {
        const tx = await signer.sendTransaction({
            to: contracts.WRAPPEDETHER.address,
            value: amountIn
        })
        setIsTransacting(true)
        setIsConfirming(false)
        await tx.wait()
    } catch {
        setIsConfirming(false)
    }
    console.log(`WETH to ETH`)
}

const swapWethToEth = async (
    amountIn,
    signer,
    setIsTransacting,
    setIsConfirming,
) => {
    try {
        const wethContract = getToken('WETH')
        await wethContract.connect(signer).approve(
            contracts.WRAPPEDETHER.address,
            amountIn,
        )
        const tx = await wethContract.connect(signer).withdraw(amountIn)
        setIsTransacting(true)
        setIsConfirming(false)
        await tx.wait()
    } catch {
        setIsConfirming(false)
    }
    console.log(`Unwrap WETH to ETH`)
}

const swapErc20ToEth = async (
    amountIn,
    inputSymbol,
    deadline,
    signer,
    recipient,
    setIsTransacting,
    setIsConfirming,
) => {

    try {
        const tokenIn = tokenInfos[inputSymbol].address
        const tokenOut = tokenInfos['WETH'].address

        const swapRouterContract = getSwapRouter()

        const params1 = {
            tokenIn,
            tokenOut,
            recipient: swapRouterContract.address,
            deadline,
            amountIn,
            fee: 3000,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0,
        }
        const encData1 = swapRouterContract.interface.encodeFunctionData('exactInputSingle', [params1])

        const amountMinimum = 0
        const encData2 = swapRouterContract.interface.encodeFunctionData('unwrapWETH9', [amountMinimum, recipient])

        const calls = [encData1, encData2]
        const encMultiCall = swapRouterContract.interface.encodeFunctionData('multicall', [calls])

        const txArgs = {
            to: contracts.SWAPROUTER.address,
            from: recipient,
            data: encMultiCall,
            gasLimit: GAS_LIMIT,
        }
        const tx = await signer.sendTransaction(txArgs)
        setIsTransacting(true)
        setIsConfirming(false)
        await tx.wait()
    } catch {
        setIsConfirming(false)
    }

    console.log(`Swapped ${inputSymbol} to ETH`)
}












//