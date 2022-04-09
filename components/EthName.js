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
  // get image if it has one
  const [name, setName] = useState()
  const [avatar, setAvatar] = useState()

  useEffect(async function() {
    const n = await ens.getName(address)
    if (n.name) {
      setName(n.name)
    }
  }, [address])

  //only check for avatar if ENS name exists
  useEffect(async function() {
    if (name) {
      const a = await ens.name(name).getText("avatar")

      if (a) {
        setAvatar(a)
      }
    }

    
  }, [name])

  let formattedAddress = address.substr(0, 8) + "..." + address.substr(-4);

  let icon = (
    <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
  )


  return (
    <div className="eth-name">
      <div className="icon">
        {/* icon goes here */}
        {avatar ? (
          <img src={avatar} /> 
        ) : icon}
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