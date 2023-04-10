import { ethers } from 'ethers'
import jazzicon from '@metamask/jazzicon'


const weiToTokenAmount = (amount, decimals) => ethers.utils.formatUnits(amount, decimals)

export default {
    decimalToPercent: (decimalValue, decimalPlaces = 3) => (decimalValue * 100).toFixed(decimalPlaces),

    sqrtToPrice: (sqrt, token0Decimals, token1Decimals, token0IsInput = true) => {
        const numerator = sqrt ** 2

        const denominator = 2 ** 192

        let ratio = numerator / denominator

        const decimalDifference = token0Decimals - token1Decimals

        const decimalShift = Math.pow(10, decimalDifference)

        ratio = ratio * decimalShift

        if(!token0IsInput) { ratio = 1 / ratio }

        return ratio
    },

    deadlineFromMinutes: (minutes) => Math.floor(Date.now() / 1000 + (minutes * 60)),

    tokensToWei: (inputAmount, inputDecimals) => ethers.utils.parseUnits(inputAmount, inputDecimals),

    getMetaMaskIcon: (walletAddress) => {
        const addr = walletAddress.slice(2, 10);
        const seed = parseInt(addr, 16);
        return jazzicon(24, seed);
    },

    condenseAddress: (walletAddress) => {
        const first = walletAddress.slice(0,6)
        const last = walletAddress.slice(-4)

        return first + '...' + last
    },

    hexToHumanAmount: (amount, decimals= 18, maxDecimals = 5) => {
        if (!amount) { return '-' }

        return parseFloat(
            Number(
                weiToTokenAmount(
                    amount.toString(),
                    decimals
                )
            )?.toFixed(maxDecimals)
        )
    },

    validateInputs: (inputSymbol, outputSymbol, inputAmount) => {
        if(inputSymbol === outputSymbol) return
        if(['', null].includes(inputSymbol)) return
        if(['', null].includes(outputSymbol)) return
        if(Number(inputAmount) === 0) return

        return true
    },

    EthtoWethString: (inputSymbol, outputSymbol) => {
        if (inputSymbol === 'ETH') { inputSymbol = 'WETH' }
        if (outputSymbol === 'ETH') { outputSymbol = 'WETH' }
        return { inputSymbol, outputSymbol }
    },

    isSymbolsEthAndWeth: (input, output) => {
        return (['WETH','ETH'].includes(input) &&  ['WETH','ETH'].includes(output))
    },

}
