import { ethers } from "ethers";
import { useEffect } from "react";
import SnakeABI from  "../ABIs/Snake.json"




const useContract = (active, library) => {
    const snakeAddr = "0x8c822FA282722eDcA512A9E94C591d3F52196eF2"
    let snake, provider
    if(active) {
        // provider = new ethers.providers.Web3Provider(window.ethereum)

        snake = new ethers.Contract(snakeAddr, SnakeABI, library)  
    }
    else{
        provider = new ethers.providers.AlchemyProvider("mainnet", process.env.REACT_APP_MAINNET_API_KEY)

        snake = new ethers.Contract(snakeAddr, SnakeABI, provider)  

    }
    

    




    return {
        snake

    }

}

export default useContract