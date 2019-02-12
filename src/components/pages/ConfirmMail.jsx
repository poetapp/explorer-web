import React from 'react'

import { useConfirmEmail } from 'effects/useConfirmMail'

export const ConfirmMail = ({ token }) => {
  const { loginToken, error } = useConfirmEmail(token)

  return (
    <section>
      <div>Success:{loginToken}</div>
      <div>Error:{error}</div>
    </section>
  )
}
