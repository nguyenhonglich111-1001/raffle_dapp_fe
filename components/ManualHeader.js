import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader(){

    const {enableWeb3, account, isWeb3Enabled, Moralis,deactivateWeb3, isWeb3EnableLoading} = useMoralis()

    // useEffect(() => {}, []) when sth change in [], {} is excecuted
    // if we leave [] blank, it will run only 1 time on when page load
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])   


    // Detect when change account
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found!")
            }
        })
    } , [])
    // Add enable Web3 to connect to metamask
    // account : string is the address of the account connected in metamask
    return(<div>
        {
            account ? 
            (<div>Connected to {account}</div>) : 
            (
            <button 
                onClick={async () => {
                    await enableWeb3()
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem("connected", "inject")
                    }}
                }
                disabled={isWeb3EnableLoading}
                >
                    Connect</button>

            )
            
        } 
    </div>)
}
