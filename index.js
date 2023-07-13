const Web3 = require('web3');

const providerUrl = 'https://goerli.infura.io/v3/<id_infura_goerli>';
const web3 = new Web3(providerUrl);
const sourcePrivateKey='<private_key>';
const destinationAddress ='0xeE4A49bCb0889233C4d040c514c275827fa6F9a7';
const amountToSend= web3.utils.toWei('0.1','ether');


async function sendEther() {
    try {
        const sourceAccount = web3.eth.accounts.privateKeyToAccount(sourcePrivateKey);
        const sourceAddress = sourceAccount.address;
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
            value: web3.utils.toHex(amountToSend),
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
sendEther();