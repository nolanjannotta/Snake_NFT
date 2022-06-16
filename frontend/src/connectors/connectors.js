import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'


export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 42161, 137, 10,42,3]
 });


export const walletconnect = new WalletConnectConnector({
  rpc: {1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_MAINNET_API_KEY}`, 4: "", 42161:"", 137:"",10:"",42:"",3:""},
  chainId: [1, 4, 42161, 137, 10,42,3],
  qrcode: true
})

export const walletlink = new WalletLinkConnector({
  url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_MAINNET_API_KEY}`,
  appName: 'web3-react example',
  supportedChainIds: [1, 4, 42161, 137, 10,42,3]
})


