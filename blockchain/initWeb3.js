
const { INFURA_API_KEY } = require('../constants/infoVariable');
const Web3 = require('web3');


const providerUrl = `https://goerli.infura.io/v3/${INFURA_API_KEY}`;

// init instance web3
const web3 = new Web3(providerUrl);


module.exports = {
  web3
};
