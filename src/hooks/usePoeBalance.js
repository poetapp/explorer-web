import { useEffect, useState } from 'react'

export const usePoeBalance = (poeAddress) => {
  const [poeBalance, setPoeBalance] = useState(null)

  useEffect(() => {
    if (poeAddress)
      fetch(`https://api.tokenbalance.com/token/0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195/${poeAddress}`)
        .then(_ => _.json())
        .then(_ => _.balance)
        .then(setPoeBalance)
    else
      setPoeBalance(null)
  }, [poeAddress])

  return poeBalance
}
