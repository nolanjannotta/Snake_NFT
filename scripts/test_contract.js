require('dotenv').config({ path: '../.env' })

module.exports = async function (callback) {
    // const Web3 = require('web3');
    // const web3 = new Web3("http://localhost:7545")

    const Web3 = require('web3');
    const web3 = new Web3(`https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINKEBY_API_KEY}`)
    const account = web3.eth.accounts.privateKeyToAccount(process.env.RINKEBY_PRIVATE_KEY)
    web3.eth.accounts.wallet.add(account);



    const accounts = await web3.eth.getAccounts()
    const snakeAddr = "0xa01f0b5885690B5C0e3438be0aF9DF82ec0da224"
    const ABI = require('../build/contracts/Snake.json')
    const snake = new web3.eth.Contract(ABI.abi, snakeAddr)

    const user = accounts[0]
    // const user2 = accounts[1]
    
    const buySnake = async () => {

        // const pauseTx = await snake.methods.togglePaused().send({from:user, gas: 28944})
        // console.log(pauseTx)

        // const finalPrice = await snake.methods.getFinalPrice(1, user).call()
        // const total = await snake.methods.owner().call()
        // console.log(total)
        // console.log(finalPrice)
        // let color = 1
        await snake.methods.withdrawFunds().send({from: account.address, gas: 40000, gasPrice: '40000000000'})

        // const uri = await snake.methods.tokenURI(15).call()
        //     const jsonManifestString = Buffer.from(uri.substring(29), "base64");
        //     const jsonManifest = JSON.parse(jsonManifestString);
        //     console.log(uri)

        // for (let i = 1; i <= 20; i++) {
            
            
        // let tx = await snake.methods.buySnake([2]).send({from: user, value: web3.utils.toWei("0.05", "ether"), gas: 700000, gasPrice: '40000000000'})
        // const uri = await snake.methods.tokenURI(1).call()
        // console.log(uri)
            // let total = await snake.methods.totalSupply().call()
            // const uri = await snake.methods.tokenURI(i).call()
            // const jsonManifestString = Buffer.from(uri.substring(29), "base64");
            // const jsonManifest = JSON.parse(jsonManifestString);
            // console.log(`token ${i} name:`,jsonManifest.name)
            // console.log(tx.cumulativeGasUsed)
            // console.log(`token ${i} uri:`, jsonManifest.image)
            // color == 5 ? color == 1 : color ++
            

        // }
       
        // console.log(tx)

        
        // const paused = await snake.methods.isPaused().call()

        // console.log(paused)



        // await snake.methods.buySnake([1]).send({from: account.address, value: web3.utils.toWei("0.05", "ether"), gas: 700000, gasPrice: '40000000000'})
        // const uri = await snake.methods.tokenURI(1).call()
        // const jsonManifestString = Buffer.from(uri.substring(29), "base64");
        // const jsonManifest = JSON.parse(jsonManifestString);

        // console.log(jsonManifest)
    }
    buySnake()

    // callback()
    

};