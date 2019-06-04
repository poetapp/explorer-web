import { useEffect } from 'react'

export const useDocumentKeyDown = (onKeyDown) => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])
}
