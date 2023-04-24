import Utils from "../utils/Utils";
import {pools, tokenInfos} from "../constants";
import {getPool, getQuoter2} from "./ContractService";


export const getPriceImpact = async (
    inputAmount,
    inSymbol,
    outSymbol,
) => {
    if (Utils.isSymbolsEthAndWeth(inSymbol, outSymbol)) { return }

    const { inputSymbol, outputSymbol } = Utils.EthtoWethString(inSymbol, outSymbol)

    const poolAddress = pools[inputSymbol][outputSymbol][3000]
    const poolContract = getPool(poolAddress)

    const slot0 = await poolContract.slot0()
    const sqrtPriceX96 = slot0.sqrtPriceX96

    const token0 = await poolContract.token0()
    const isToken0Input  = inputSymbol === token0

    let token0Decimals
    let token1Decimals
    if (isToken0Input) {
        token0Decimals = tokenInfos[inputSymbol].decimals
        token1Decimals = tokenInfos[outputSymbol].decimals
    } else {
        token0Decimals = tokenInfos[outputSymbol].decimals
        token1Decimals = tokenInfos[inputSymbol].decimals
    }

    const inputAddress = tokenInfos[inputSymbol].address
    const outputAddress = tokenInfos[outputSymbol].address
    const inputTokenDecimals = tokenInfos[inputSymbol].decimals

    const amountIn = Utils.tokensToWei(inputAmount, inputTokenDecimals)

    const params = {
        tokenIn: inputAddress,
        tokenOut: outputAddress,
        amountIn,
        fee: 3000,
        sqrtPriceLimitX96: '0',
    }

    const quoter = getQuoter2()

    const quote = await quoter.callStatic.quoteExactInputSingle(params)
    const sqrtPriceX96After = quote.sqrtPriceX96After

    const price = Utils.sqrtToPrice(sqrtPriceX96, token0Decimals, token1Decimals, isToken0Input)
    const priceAfter = Utils.sqrtToPrice(sqrtPriceX96After, token0Decimals, token1Decimals, isToken0Input)

    const absoluteChange = -Math.abs(price - priceAfter)
    const percentageChange = absoluteChange / price

    return Utils.decimalToPercent(percentageChange, 3)
}



















//