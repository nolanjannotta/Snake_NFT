import React, {useEffect, useState} from 'react'
import "./Footer.css"
import { useWeb3React } from '@web3-react/core';

// import useContract from '../hooks/useContract';



function Footer(props) {
    const {active, library} = useWeb3React();

    const [address, setAddress] = useState("")
    const [owner, setOwner] = useState("")

    useEffect(()=> {
        const loadData = async() => {
            const address = await props.snake.address
            const owner = await props.snake.owner()
            setAddress(address)
            setOwner(owner)
        }
        loadData()
    })
    
  return (
      <div className="footer_container">
          <a style={{textDecoration: "none"}}  href={`https://etherscan.io/address/${address}`} target="_blank">Etherscan</a>
          <a style={{textDecoration: "none"}}  href={"https://opensea.io/collection/sssnake"} target="_blank">Open Sea</a>

          <div>Creator: {owner}</div>

      </div>
    
  )
}

export default Footer