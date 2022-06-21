import { useWeb3Contract } from "react-moralis"
import {abi, contractAddresses} from "../constants/index"
import {useMoralis} from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {

    const { chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    
    const { runContractfunction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,

    })

    const { runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromCall)
                console.log(entranceFeeFromCall)
            }
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            Hi from LotteryEntrance!
            { raffleAddress 
                ? 
                    (<div>
                        <button
                            onClick={async function () {
                                await enterRaffle({
                                    
                                })
                            }}
                        >
                            Enter Raffle
                        </button>
                        Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH 
                    </div>) 
                : 
                    (<div> No Raffle Address Detected </div>)
            }
            
        </div>
    )

}