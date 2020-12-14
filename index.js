/* eslint-disable header/header */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */

// Import the API, Keyring and some utility functions
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

const receive_account = '148MkHoZht6dVMVdYGJCDAxeTYSShcsXMeVyjjd1LQqf6CpC'; // @@@!!! Change to your new address

async function main () {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  // Constuct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  const json = JSON.parse('{"address":"14Y4jnkUJJxfoxxxxxxF3eJboyyQ","encoded":"vmoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxnQhQAO0","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0x91b171bb158e2d3848fa23a9f1c2518xxxx7a70ce90c3","name":"111","tags":[],"whenCreated":1607932636256}}') // @@@!!! change to your keystore.
  // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const send_account = keyring.addFromJson(json);
  send_account.decodePkcs8("") //With null password


  console.log("Account is Locked?"+send_account.isLocked)// false means unlocked.
  // Create a extrinsic, transferring 1.5 DOT units to Bob, @@@!!! change the amount for you
  const transfer = api.tx.balances.transfer(receive_account,"15000000000"); // 15000000000 = 1.5 DOT

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(send_account);

  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());