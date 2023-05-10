import {ethers} from "ethers";
import {
    contracts, ERC20ABI,
    PoolArtifact,
    Quoter2Artifact,
    QuoterArtifact,
    SwapRouterArtifact,
    tokenInfos,
    WethArtifact
} from "../constants";
import AccountService from "./AccountService";

export const getSwapRouter = () => {
    return  new ethers.Contract(
        contracts.SWAPROUTER.address,
        SwapRouterArtifact.abi,
        AccountService.getProvider(),
    )
}

export const getQuoter = () => {
    return new ethers.Contract(
        contracts.QUOTER.address,
        QuoterArtifact.abi,
        AccountService.getProvider(),
    )
}

export const getQuoter2 = () => {
    return  new ethers.Contract(
        contracts.QUOTER2.address,
        Quoter2Artifact.abi,
        AccountService.getProvider(),
    )
}

export const getPool = (address) => {
    return new ethers.Contract(
        address,
        PoolArtifact.abi,
        AccountService.getProvider(),
    )
}

export const getToken = (symbol) => {
    const abi = symbol === 'WETH' ? WethArtifact.abi : ERC20ABI

    return new ethers.Contract(
        tokenInfos[symbol].address,
        abi,
        AccountService.getProvider(),
    )
}
