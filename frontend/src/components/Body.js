import React, {useEffect, useState} from 'react'
import { useWeb3React } from '@web3-react/core';
import Mint from "./Mint"
import { ethers } from 'ethers';

import "./Body.css"



function Body(props) {


    
    const {active, account, library} = useWeb3React();
    const [orderCart, setOrderCart] = useState([])
    const [cartAmountDisplay, setCartAmountDisplay] = useState({0:0, 1:0,2:0,3:0, 4:0})
    const [demoUri, setDemoUri] = useState("")
    const [price, setPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [finalPrice, setFinalPrice] = useState(0)


    const [colors, setColors] = useState({})
    // const snake = new ethers.Contract(snakeAddr, snakeAbi, library )
    // const {snake} = useContractAlchemy()


    useEffect(()=> {
      const getDiscount = async() => {
        const discountedPrice = await props.snake.getFinalPrice(orderCart.length, account)
        setFinalPrice(Number(ethers.utils.formatEther(discountedPrice)))

      }

      setTotalPrice(orderCart.length * price)
      account && getDiscount()

    }, [orderCart])

    
    useEffect(()=> {
      const getData = async() => {
        try {
          const _price = await props.snake.price()
          let demo1 = await props.snake.tokenURI(1)
          const jsonManifestString = Buffer.from(demo1.substring(29), "base64");
          const jsonManifest = JSON.parse(jsonManifestString);

        setDemoUri(jsonManifest.image)  
        let calcPrice = Number(ethers.utils.formatEther(_price))
        setPrice(calcPrice)
        

        }
        catch (e) {
          console.log(e)
        }
          
      }

      getData()
      



      
    }, [])

    const imageClick = (color) => {
      if(orderCart.includes(color)) {
        // if color is already selected, then remove it
        setOrderCart(orderCart.filter(_color => _color !== color))
        setCartAmountDisplay({...cartAmountDisplay, [color]: 0})

      } 
      else {
        if(orderCart.length >= 5){return}
        setOrderCart(prevCart => [...prevCart, color])
        setCartAmountDisplay({...cartAmountDisplay, [color]: 1})


      }
      // setTotalPrice(orderCart.length  * price)

    }
    const getFrequency = (starting, color) => {
      let count=starting
      for(let i =0; i<orderCart.length; i++) {
        if(orderCart[i]==color) {count++}
      }
      return count

    }


    const increment = (color) => {
      
      if(orderCart.length >= 5){return}
      setOrderCart(orderCart => [...orderCart, color])
      const count = getFrequency(1,color)
      
      setCartAmountDisplay(cartAmountDisplay => ({...cartAmountDisplay, [color]: count}))


    }
    const decrement = (color) => {
      

      const tempArr = orderCart;
      const index = orderCart.indexOf(color)
      // console.log(index)

      if(index > -1) {
        tempArr.splice(index,1)

        setOrderCart([...tempArr])
        const count = getFrequency(0,color)
        setCartAmountDisplay(cartAmountDisplay => ({...cartAmountDisplay, [color]: count}))



      }

      // setTotalPrice(prevPrice => prevPrice - price)


    }

    const Color = (props) => {
      return (

        <div className='color'>
            <img className='color1' style={orderCart.includes(props.index) ? {outline: "5px solid #fc9000"} : {}}  src={props.image} alt="color0" width="150px" height="150px" onClick={() => {imageClick(props.index)}}></img>
            {orderCart.includes(props.index) && 
            <div className='buttons'>  
              <button className="button" onClick={() => {decrement(props.index)}} >-</button> 
              <span style={{color: "#fcf803"}}>{cartAmountDisplay[props.index]}</span> 
              <button className="button" onClick={() => {increment(props.index)}}>+</button> 
            </div>}
            
          </div>
      )
    }

  return (
    <div className='demo_container'>
      <div className='demo_box'>
        
      {demoUri !== "" ? <div className="try_me">Demo</div> : <div className="try_me">Loading demo...</div>}

          <object className="demo" id="svg" data={demoUri} type="image/svg+xml"></object>

          </div>
      
      
         <div className='color_container'>

            <div className='colors'>
              <Color image={"https://arweave.net/wra_vKM_Qf0Q3cb8rnUm1SU3D4Mp7qsrASbBdWB4lR4/color1.gif"} index={1}></Color>
              <Color image={"https://arweave.net/wra_vKM_Qf0Q3cb8rnUm1SU3D4Mp7qsrASbBdWB4lR4/color2.gif"} index={2}></Color>
              <Color image={"https://arweave.net/wra_vKM_Qf0Q3cb8rnUm1SU3D4Mp7qsrASbBdWB4lR4/color3.gif"} index={3}></Color>
              <Color image={"https://arweave.net/wra_vKM_Qf0Q3cb8rnUm1SU3D4Mp7qsrASbBdWB4lR4/color4.gif"} index={4}></Color>
              <Color image={"https://arweave.net/wra_vKM_Qf0Q3cb8rnUm1SU3D4Mp7qsrASbBdWB4lR4/color5.gif"} index={5}></Color>

            </div >

            

          <div className="sub_body">

              <div className="price_container">
                <div className="price"> price: {price} ETH</div>
                <div className="price"> total: {totalPrice.toFixed(2)} ETH</div>
                { account && <div className="price"> your total: {finalPrice} ETH</div>}
              </div>
            

          <Mint price={finalPrice} colorArr={orderCart}>

          </Mint>

          <div className="description">

          
              <p>
              
              Introducing a fully working, fully on chain game of Snake. <br/>
              Game image and logic all stored on chain.<br/>
              Available in 5 color schemes<br/>
              Automatic 20% discount to all Calculator owners. <br/>
              <a style={{textDecoration: "none"}}  href={'https://arweave.net/RsGtM7KYvNX56pKmhISQuCThR56o5dGyaI6m3wKpTAk'} target="_blank">click here to mint a Calculator and receive a discount!</a>

          


            </p>
          </div>
          </div>

      </div>
      
      
      

      
    </div>
  )
}

export default Body