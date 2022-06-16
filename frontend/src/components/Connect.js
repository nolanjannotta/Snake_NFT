import React, { useEffect, useState } from 'react'
import "./NavBar.css"
import { useWeb3React } from '@web3-react/core';
import {injected, walletconnect, walletlink} from "../connectors/connectors"





function Connect() {





    const {active, activate, deactivate, account, chainId, connector} = useWeb3React();
    const [connectImage, setConnectImage] = useState("")
    const [connectButtons, setConnectButtons] = useState(false)
    useEffect(()=> {
        !active && account == undefined && setConnectImage("connectWallet2.png") 
        active && setConnectImage("connected.png")
    },[active])

    
    const activateMetaMask = async() => {
        let provider

        if(window.ethereum.providers) {
            provider = window.ethereum.providers.find(({ isMetaMask }) => isMetaMask)
            window.ethereum.setSelectedProvider(provider);
        }
        

       
        
        try {
            activate(injected) 

            setConnectButtons(connectButtons => !connectButtons)
        }
        catch(e) {
            console.log(e)
        }



    }
    
    // const deactivate = async() => {

    //     try {
    //         deactivate(injected)
    //     }
    //     catch(e) {
    //         console.log(e)
    //     }
  
    //   }


    const activateConnector = async (connector) => {

        try {
            activate(connector) 

            
        }
        catch(e) {
            console.log(e)
        }
        setConnectButtons(connectButtons => !connectButtons)

    }

  const selectConnector = () => {
     if(active) {
        deactivate(connector)
        setConnectButtons(false)
        return

    } 
    setConnectButtons(connectButtons => !connectButtons)

    
  }

  const truncate = (addr) => {
    return addr.substring(0,6) + "..." + addr.substring(addr.length -6,addr.length)
  }


return (
    <div className="connect_container">

        {!connectButtons || active ? <img className="connect" src={`https://arweave.net/PFj-YLYQWRrI2M7kq2TRL-tFrbBek0U9HiF47rxCbYo/${connectImage}`} alt="activate" onClick={() => {selectConnector()}} /> :
        <>
        {window.ethereum.isMetaMask 
        ? <button className="connect_button" onClick={() => activateMetaMask()}>MetaMask</button> 
        : <button  className="connect_button" >
            <a href="https://metamask.io/" target="_blank" rel="noreferrer noopener">
                Install MetaMask
            </a>
        </button>}
        
        <button className="connect_button" onClick={() => activateConnector(walletconnect)}>Wallet Connect</button>
        <button className="connect_button" onClick={() => activateConnector(walletlink)}>Coinbase</button>
        
        </>
        }
        {active && account != undefined && <h4 className="address">hello {truncate(account)}!</h4>}

        {active && chainId != 1 && <h4 className="chain_id">Please switch to mainnet!</h4>}

    </div>

)

}

export default Connect