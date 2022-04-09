import EthName from './EthName'

const Account = function ({ account, connect }) {
  // TODO!!!
  // if already logged in, it should show 
  // the EthName component with the correct address
  // if not logged in, show a connect button
  // that when its clicked, will prompt us to login
  // and store the info on the page

  if (account) {
    return (
      <span>{account}</span>
    )
  } else {
    return (
      <button onClick={connect}>Connect Wallet</button>
    )
  }
  
}

export default Account;