import {ethers} from "ethers";

export { default as PoolArtifact} from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json'
export { default as QuoterArtifact } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
export { default as Quoter2Artifact } from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
export { default as SwapRouterArtifact } from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'
export { default as ERC20ABI } from '../abis/erc20.json'
export { default as WethArtifact } from '../abis/weth.json'

export const tokenSymbols = [
    'ETH',
    'WETH',
    'UNI',
    'USDC',
]

export const tokenInfos = {
    ETH: {
        address: '0x',
        decimals: 18,
        name: 'Ether',
    },
    WETH: {
        address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
        decimals: 18,
        name: 'Wrapped Ether',
        maxAllowance: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    UNI: {
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        decimals: 18,
        name: 'Uniswap',
        maxAllowance: '79228162514264337593543950335',
    },
    USDC: {
        address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
        decimals: 6,
        name: 'USD Coin',
        maxAllowance: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    }
}

export const contracts = {
    QUOTER: {
        address: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    },
    QUOTER2: {
        address: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    },
    FACTORY: {
        address: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    },
    SWAPROUTER: {
        address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    },
    WRAPPEDETHER: {
        address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    }

}

export const pools = {
    WETH: {
        UNI: {
            100: '0x0EB1a21b298Ff65c483359df85F88b4708E235ab',
            500: '0x07A4f63f643fE39261140DF5E613b9469eccEC86',
            3000: '0x4d1892f15B03db24b55E73F9801826a56d6f0755',
            10000: '0xd2cD8bba98B51D18bA7C9bd2782E460aab5BBDe4',
        },
        USDC: {
            100: '0x614dAdD4af14781A76aD6a9a0ecb8e207C557744',
            500: '0xfAe941346Ac34908b8D7d000f86056A18049146E',
            3000: '0x6337B3caf9C5236c7f3D1694410776119eDaF9FA',
            10000: '0xF79817bD541D686F926aDCd01a950472B8AB890D',
        },
    },
    UNI: {
        WETH: {
            100: '0x0EB1a21b298Ff65c483359df85F88b4708E235ab',
            500: '0x07A4f63f643fE39261140DF5E613b9469eccEC86',
            3000: '0x4d1892f15B03db24b55E73F9801826a56d6f0755',
            10000: '0xd2cD8bba98B51D18bA7C9bd2782E460aab5BBDe4',
        },
        USDC: {
            100: '0x',
            500: '0x',
            3000: '0x18b48728B0577daF89668d7d74D44fD8398885DF',
            10000: '0x1cBd6ad8e28f11deFf094daAF65BAb6D615BE69C',
        },
    },
    USDC: {
        WETH: {
            100: '0x614dAdD4af14781A76aD6a9a0ecb8e207C557744',
            500: '0xfAe941346Ac34908b8D7d000f86056A18049146E',
            3000: '0x6337B3caf9C5236c7f3D1694410776119eDaF9FA',
            10000: '0xF79817bD541D686F926aDCd01a950472B8AB890D',
        },
        UNI: {
            100: '0x',
            500: '0x',
            3000: '0x18b48728B0577daF89668d7d74D44fD8398885DF',
            10000: '0x1cBd6ad8e28f11deFf094daAF65BAb6D615BE69C',
        },
    }
}

export const GAS_LIMIT = ethers.utils.hexlify(1_000_000)