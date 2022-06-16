import React, {useState, useEffect} from 'react'
import Connect from './Connect'
import "./NavBar.css"
import { useWeb3React } from '@web3-react/core';

function NavBar(props) {
  const [balance, setBalance] = useState(0)
  const {account, active, library} = useWeb3React()


  const [message, setMessage] = useState("")

  useEffect(() => {
      const getBalance = async() => {
          const bal = await props.snake.balanceOf(account)
          setBalance(bal)
      }
      active && getBalance()
      
      props.snake.on("TokenMint", getBalance);

      return () => {
        props.snake.off("TokenMint", getBalance);
      }
  }, [active])
  useEffect(()=> {

    if(active) {
      props.frontPage  
      ? setMessage(` You own ${balance.toString()} snakes!`) 
      : setMessage("Back to home")
    } 
    else {
      setMessage("connect with a wallet to view your Snakes!") 
    }
 
  },[active, balance, props.frontPage])

  
  return (
    <div className="nav">

        <div className='nav_buttons'>
            {active ? 

            <button onClick={()=>{props.setFrontPage(!props.frontPage)}} className='balance'>{message}</button>
            :
            <p className='please_login'>{message}</p>
          } 
        </div>
    
          



        <div className="title_container">
    
            <img className="title" src={"https://arweave.net/PFj-YLYQWRrI2M7kq2TRL-tFrbBek0U9HiF47rxCbYo/snakelogo2.png"} alt="snake logo" />

        </div>

      <Connect>

      </Connect>

    </div>
  )
}

export default NavBar