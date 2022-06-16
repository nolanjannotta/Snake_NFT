import React, {useEffect, useState} from 'react'
import { useWeb3React } from '@web3-react/core';
import useContract from '../hooks/useContract';
import "./Snakes.css"
import { createClient } from 'urql'
import { ethers } from 'ethers';


function Snakes() {
    const [snakes, setSnakes] = useState([])
    const {active, account, library} = useWeb3React()
    const [loading, setLoading] = useState(true)
    // console.log(library._network.chainId)

    const {snake} = useContract(active, library)
    // const APIURL = "https://api.studio.thegraph.com/query/26876/snake/0.0.1";

    const APIURL = process.env.REACT_APP_GRAPH_API

    

    
    // const tokensQuery = `
    //     query {
    //         user(id: "${account.toLowerCase()}") {
                      
    //             id
    //             tokens {
    //               id
    //             }
    //           }
    //     }
    // `

    const client = createClient({
        url: APIURL,
        })
        
    const graph = async() => {
        const tokensQuery = `
            query {
                user(id: "${account.toLowerCase()}") {
                        
                    id
                    tokens {
                    id
                    }
                }
            }
        `
       
        const data = await client.query(tokensQuery).toPromise()
        if(data.data.user == null) {
            return []
        }
        return data.data.user.tokens

    }


    useEffect(()=> {
        // account && graph()
        

        const loadSnakes = async() => {
            const ids = await graph()
            // const ids = await snake.tokenIdsByOwner(account)
            let uris =[]
            
            for(let i=0; i<ids.length; i++) {
                let demo1 = await snake.tokenURI(ids[i].id)
                const jsonManifestString = Buffer.from(demo1.substring(29), "base64");
                const jsonManifest = JSON.parse(jsonManifestString);
                uris.push(jsonManifest.image)                

                

            }
             
            setSnakes(uris)
            setLoading(false)

                
        }

        //account && graph()
        active && loadSnakes()
        

    },[active, account])

    const returnImage = (uri,index) => {
        return (
            <div className="owned_calc" key={index}>
                <div>{console.log(snakes)}</div>
                <a className="link" href={uri} target="_blank" rel="noreferrer noopener">full screen</a>
                <object style={{boxShadow: "4px 4px 3px 1px #9d7cbd"}} id="svg"  data={uri} type="image/svg+xml" width="150px"></object>
            </div>
        )

    }
  return (
            <div className='calc_container'>

                

            {loading ? <div className="loading"> Loading...</div> : 
            
                snakes.map((uri,index) =>  {return returnImage(uri, index)})
                }
    
            </div>  
        
        
  )
}

export default Snakes