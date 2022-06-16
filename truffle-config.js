const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config({ path: './.env' })


module.exports = {

  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    //  gas: 9000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.RINKEBY_PRIVATE_KEY, 'https://eth-rinkeby.alchemyapi.io/v2/eriQZWQGeXNylGAMxvyOVIBe4JyU0Kxz'),
      network_id: 4,       // Ropsten's id
      gas: 7000000,        // Ropsten has a lower block limit than mainnet
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    
  },
  plugins: ['truffle-plugin-verify'],

  api_keys: {
    etherscan: '7IMDVEF8WK82PYBFNMGXFUAD8MUX84IPRT'
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.7",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 100
      }
      //  evmVersion: "byzantium"
      }
    }
  },

};
