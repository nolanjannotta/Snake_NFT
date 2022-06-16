import React, {useState, useEffect} from 'react'
import { useWeb3React } from '@web3-react/core';
import useContract from '../hooks/useContract';
import { ethers } from 'ethers';
import "./Body.css"

function Mint(props) {

    const {active, library, account} = useWeb3React();
    const [message, setMessage] = useState("")
    const [maxMintMessage, setMaxMintMessage] = useState("")
    const {snake} = useContract(active, library)

    useEffect(() => {
      // if (props.colorArr.length > 0) {
      //   setMessage("")
      // }

      props.colorArr.length > 0 && setMessage("")

      props.colorArr.length == 5 ? setMaxMintMessage("max 5 snakes per mint") : setMaxMintMessage("")
  
    },[props.colorArr])
  


    const mintCalc = async() => {
      const numMints = props.colorArr.length


        if(!active) {
            setMessage("connect a wallet to mint") 
          return
        }
        if(numMints == 0) {
          setMessage("*please select at least one color scheme")
          return;
        }
        const snakeSigner = snake.connect(library.getSigner())
        
        setMessage("")
        const currentPrice = numMints * props.price
        const finalPrice = await snake.getFinalPrice(numMints, account)
        await snakeSigner.buySnake(props.colorArr, {value: finalPrice})

        // await calcSigner.withdrawFunds()
        // await results.wait()
        // window.location.reload()

        // console.log(library.getSigner())
    }

  return (
    <div className='mint_container'>

      <div className="message">{message}</div>

    
      <img className="mint_image" src={"https://arweave.net/PFj-YLYQWRrI2M7kq2TRL-tFrbBek0U9HiF47rxCbYo/mint3.png"} alt="mint" onClick={mintCalc} ></img>

      <div className="max_message">{maxMintMessage}</div>
    </div>
  )
}

export default Mint