import {useState} from 'react'
import {contracts} from "../constants";
import ApprovalService from "../services/ApprovalService";

const useApproval = (symbol) => {
    const [isApproved, setIsApproved] = useState(false)
    const [isAskingPermission, setIsAskingPermission] = useState(false)
    const [isApproving, setIsApproving] = useState(false)

    const checkIsApproved = async () => {
        const isApproved = await ApprovalService.isApprovedToken(symbol, contracts.SWAPROUTER.address)
        setIsApproved(isApproved)
    }

    const approve = async () => {
        setIsAskingPermission(true)
        await ApprovalService.approveTokens(symbol, contracts.SWAPROUTER.address, setIsApproving, setIsAskingPermission)
        const isApproved = await ApprovalService.isApprovedToken(symbol, contracts.SWAPROUTER.address)
        setIsApproved(isApproved)
    }

    return {
        isApproved, isAskingPermission, isApproving, checkIsApproved, approve
    }
}

export default useApproval