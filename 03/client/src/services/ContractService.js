import {ethers} from "ethers";
import {
    contracts,
    QuoterArtifact,
} from "../constants";
import AccountService from "./AccountService";

export const getQuoter = () => {
    return new ethers.Contract(
        contracts.QUOTER.address,
        QuoterArtifact.abi,
        AccountService.getProvider(),
    )
}