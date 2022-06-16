import React from 'react'
import "./NavBar.css"


function ConnectButton(props) {


const activateConnector = async () => {


        try {
        props.connector.activate() 
        console.log(props.connector)
        }
        catch(e) {
            console.log(e)
        }

    }
  return (

    <button className="connect_button" onClick={activateConnector}>{props.connectorName}</button>
  )
}

export default ConnectButton