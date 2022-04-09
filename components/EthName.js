import { useState, useEffect } from "react"
import { web3 } from '../lib/web3';

// https://www.npmjs.com/package/react-jazzicon
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

// https://docs.ens.domains/dapp-developer-guide/working-with-ens
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
const ens = new ENS({ 
  provider: web3.currentProvider,
  ensAddress: getEnsAddress('1') 
})


const EnsName = function ({ address }) {
  // TODO!
  // check for ENS domain

  const [name, setName] = useState()

  useEffect(async function() {
    const n = await ens.getName(address)
    if (n.name) {
      setName(n.name)
    }
  }, [address])
  // get image if it has one


  let formattedAddress = address.substr(0, 8) + "..." + address.substr(-4);

  let icon = (
    <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
  )

  return (
    <div className="eth-name">
      <div className="icon">
        {/* icon goes here */}
        {icon}
      </div>

      <div className="name">
        <span className="primary">
          {/* ENS name if one here */}
          {name ? name : formattedAddress}
        </span>
        <span className="secondary">
          {/* formatted address here */}
          {name ? formattedAddress : ""}
        </span>
      </div>
     
    </div>
  )
}

export default EnsName