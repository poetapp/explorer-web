import { useFetch } from './useFetch'

const url = 'https://mainnet.poetnetwork.net/works'

const urlByIssuer = issuer => `${url}?issuer=${issuer}`

export const useWorkByIssuer = issuer => useFetch(urlByIssuer(issuer))

export const useWorks = () => useFetch(url)
