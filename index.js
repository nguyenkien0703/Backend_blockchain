const BigNumber = require('bignumber.js');
const { web3} = require('./blockchain/initWeb3');
const {DEPLOYER_PRIVATE_KEY, DESTINATION_ADDRESS, CONTRACT_ADDRESS } = require('./constants/infoVariable');
const {ERC20_ABI} = require('./utils/ERC20.js');

const sourcePrivateKey=DEPLOYER_PRIVATE_KEY;
const destinationAddress =DESTINATION_ADDRESS;


const sourceAccount = web3.eth.accounts.privateKeyToAccount(sourcePrivateKey);
const sourceAddress = sourceAccount.address;

const amountEthToSend='0.0001';
const unit = 'ether';
const amountTokenERC20Send='2';

async function sendEther(amountEthToSend,unit ) {
    try {
        
        const amountEther= new BigNumber(web3.utils.toWei(amountEthToSend,unit));
        const balance = await web3.eth.getBalance(sourceAddress);
        console.log(`so du cua vi nguon (${sourceAddress}) : ${web3.utils.fromWei(balance,unit)} ${unit}`);
        // create transaction 
        const nonce = await web3.eth.getTransactionCount(sourceAddress);
        const gasPrice  = await web3.eth.getGasPrice();
        // get gasLimit value for transaction appromixately 
        const estimatedGas = await web3.eth.estimateGas({
            from: sourceAddress,
            to: destinationAddress,
            value: amountEther.toString(),
        });
        
        const txObject = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: estimatedGas,
            to: destinationAddress,
            value: amountEther.toString(),
        }; 
        //sign and send transaction 
        
        const signEdTx = await sourceAccount.signTransaction(txObject);
        
        const txReceipt = await web3.eth.sendSignedTransaction(signEdTx.rawTransaction);
        
        console.log(`giao dich thanh cong!!! hash: ${txReceipt.transactionHash}`);
    }catch(error ){
        console.log('lỗi khi gửi ether:',error);
    }
}
sendEther(amountEthToSend,unit);

async function sendERC20(amountTokenERC20Send){
    try {
        const amountTokenERC20 = amountTokenERC20Send;
        const contract = new web3.eth.Contract(ERC20_ABI,CONTRACT_ADDRESS);
        //check balance
        const balance= await contract.methods.balanceOf(sourceAddress).call();
        console.log(`tài khoản (${sourceAddress}) có ${balance} token`);
        //create transaction to send token 
        const transferData= contract.methods.transfer(DESTINATION_ADDRESS,amountTokenERC20).encodeABI();
        const nonce = await web3.eth.getTransactionCount(sourceAddress);
        const gasPrice  = await web3.eth.getGasPrice();
        const estimatedGas = await contract.methods.transfer(DESTINATION_ADDRESS, amountTokenERC20).estimateGas({ from: sourceAddress });
        const txObject = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: estimatedGas,
            to: CONTRACT_ADDRESS,
            data: transferData,
        }; 
        
        const signEdTx = await sourceAccount.signTransaction(txObject);
        
        const txReceipt = await web3.eth.sendSignedTransaction(signEdTx.rawTransaction);
        
        console.log(`giao dich thanh cong!!! hash: ${txReceipt.transactionHash}`);

    }catch(error ){
        console.log('lỗi khi gửi token:',error);

    }

}

sendERC20(amountTokenERC20Send);
