// Import the web3.js library
const Web3 = require('web3');

// Replace with your Ethereum RPC URL and your private key (keep it secret)
const rpcUrl = 'YOUR_ETHEREUM_RPC_URL';
const privateKey = 'YOUR_PRIVATE_KEY';

// Create a new Web3 instance connected to the Ethereum network
const web3 = new Web3(rpcUrl);

// Replace with the recipient's Ethereum address
const toAddress = 'RECIPIENT_ADDRESS';

// Convert the private key to a Buffer
const privateKeyBuffer = Buffer.from(privateKey, 'hex');

// Create a new account using the private key
const senderAccount = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

// Unlock the sender's account (be cautious with this in a production environment)
web3.eth.accounts.wallet.add(senderAccount);
web3.eth.defaultAccount = senderAccount.address;

// Transaction parameters
const txParams = {
  to: toAddress,
  value: web3.utils.toWei('0.1', 'ether'), // Amount to send (in Ether)
  gas: 21000, // Gas limit
  gasPrice: web3.utils.toWei('50', 'gwei'), // Gas price (in Gwei)
};

// Send the transaction
web3.eth.sendTransaction(txParams)
  .on('transactionHash', (hash) => {
    console.log(`Transaction Hash: ${hash}`);
  })
  .on('receipt', (receipt) => {
    console.log(`Transaction Receipt:`);
    console.log(receipt);
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log(`Confirmation Number: ${confirmationNumber}`);
  })
  .on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });
