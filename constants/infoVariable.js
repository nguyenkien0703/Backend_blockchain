const dotenv = require('dotenv');
dotenv.config();
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const unit = 'ether';
module.exports = {
    DEPLOYER_PRIVATE_KEY,
    DESTINATION_ADDRESS,
    CONTRACT_ADDRESS,
    INFURA_API_KEY,
    unit
};
  