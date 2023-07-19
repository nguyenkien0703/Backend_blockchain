const dotenv = require('dotenv');
dotenv.config();
const ERC20 = require('./artifacts/contracts/ERC20/ERC20.sol/ERC20.json');



const Web3 = require('web3');
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;
const providerUrl = `https://goerli.infura.io/v3/${INFURA_API_KEY}`;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(providerUrl);
const sourcePrivateKey=`${DEPLOYER_PRIVATE_KEY}`;
const destinationAddress =`${DESTINATION_ADDRESS}`;
const amountEthToSend= web3.utils.toWei('0.00001','ether');
const amountTokenERC20Send = '2';
console.log(CONTRACT_ADDRESS);
const sourceAccount = web3.eth.accounts.privateKeyToAccount(sourcePrivateKey);
const sourceAddress = sourceAccount.address;

async function sendEther() {
    try {

        const balance = await web3.eth.getBalance(sourceAddress);
        console.log(`so du cua vi nguon (${sourceAddress}) : ${web3.utils.fromWei(balance,'ether')} ETH`);
        // create transaction 
        const nonce = await web3.eth.getTransactionCount(sourceAddress);
        const gasPrice  = await web3.eth.getGasPrice();
        const gasLimit = 21000;

        const txObject = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: destinationAddress,
            value: web3.utils.toHex(amountEthToSend),
        }; 
        //sign and send transaction 
        console.log(1111111);
        const signEdTx = await sourceAccount.signTransaction(txObject);
        console.log(22222);
        const txReceipt = await web3.eth.sendSignedTransaction(signEdTx.rawTransaction);
        console.log(333333);
        console.log(`giao dich thanh cong!!! hash: ${txReceipt.transactionHash}`);
    }catch(error ){
        console.log('lỗi khi gửi ether:',error);
    }
}

async function sendERC20(){
    try {
        const contract = new web3.eth.Contract(ERC20.abi,CONTRACT_ADDRESS);
        //check balance
        const balance= await contract.methods.balanceOf(sourceAddress).call();
        console.log(`tài khoản (${sourceAddress}) có ${balance} token`);
        //create transaction to send token 
        const transferData= contract.methods.transfer(DESTINATION_ADDRESS,amountTokenERC20Send).encodeABI();
        const nonce = await web3.eth.getTransactionCount(sourceAddress);
        const gasPrice  = await web3.eth.getGasPrice();
        const gasLimit = 70000;
        const txObject = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: CONTRACT_ADDRESS,
            data: transferData,
        }; 
        console.log(1111111);
        const signEdTx = await sourceAccount.signTransaction(txObject);
        console.log(22222);
        const txReceipt = await web3.eth.sendSignedTransaction(signEdTx.rawTransaction);
        console.log(333333);
        console.log(`giao dich thanh cong!!! hash: ${txReceipt.transactionHash}`);

    }catch(error ){
        console.log('lỗi khi gửi ether:',error);

    }

}

// sendEther();
sendERC20();
