import React, {useState, useEffect} from 'react'
import { useWeb3React } from '@web3-react/core';

import "./Supply.css"


function Supply(props) {


    const {active, library, chainId} = useWeb3React();
    const [amountLeft, setAmountLeft] = useState('Loading supply...')
    const [isMainnet, setIsMainnet] = useState(false)
      
    useEffect(() => {
        const loadAmountLeft = async() => {
            const currentId = await props.snake.totalSupply()
            const max = await props.snake.maxSupply()
            setAmountLeft("only " + (max-currentId.toString()) + " left!!")
            // console.log(library._network.chainId)
        }
        
        loadAmountLeft()

        props.snake.on("TokenMint", loadAmountLeft);

      return () => {
        props.snake.off("TokenMint", loadAmountLeft);
      }


        

       


    },[active])



  return (
      <div className="supply_contianer">
        
        <h1 className='blinker'>{amountLeft}</h1>

      </div>
      
    
  )
}

export default Supply