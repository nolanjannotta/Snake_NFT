import {useState} from "react"
import './App.css';
import Body from './components/Body';
import { Web3ReactProvider } from '@web3-react/core';
import {Web3Provider} from "@ethersproject/providers"
import NavBar from './components/NavBar';
import Supply from './components/Supply';
import Snakes from './components/Snakes';
import Footer from "./components/Footer.js"
import MainBody from "./components/MainBody";
import useContract from "./hooks/useContract";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
}
  

function App() {
  const [frontPage, setFrontPage] = useState(true)

  const {snake} = useContract();


  return (
      <div className="landing-wrapper">
  
        <Web3ReactProvider getLibrary={getLibrary}>
          <NavBar snake={snake} frontPage={frontPage} setFrontPage={setFrontPage}></NavBar>

          {frontPage ? 
          <>               
            <MainBody snake={snake}/> 
          </>
          : 
          <>
            <Snakes/>
          </> 
          }
            
        <Footer snake={snake}/> 
        </Web3ReactProvider>
        
        </div>

  );
}

export default App;
