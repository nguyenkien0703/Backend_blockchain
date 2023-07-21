const dotenv = require('dotenv');
dotenv.config();
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const unit = 'ether';
const amountEthToSend='0.0001';
const amountTokenERC20Send='2';
module.exports = {
    DEPLOYER_PRIVATE_KEY,
    DESTINATION_ADDRESS,
    CONTRACT_ADDRESS,
    INFURA_API_KEY,
    unit,
    amountEthToSend,
    amountTokenERC20Send,
};
  