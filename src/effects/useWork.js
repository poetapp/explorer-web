import { useFetch } from './useFetch'

const url = (network = 'mainnet') => `https://${network}.poetnetwork.net/works`

const urlById = (id, network) => `${url(network)}/${id}`

const urlByIssuer = (issuer, network) => `${url(network)}?issuer=${issuer}`

export const useWorkById = (id, network) => useFetch(urlById(id, network))

export const useWorkByIssuer = (issuer, network) => useFetch(urlByIssuer(issuer, network))

export const useWorks = (network) => useFetch(url(network))
