import React from 'react'

import { useConfirmEmail } from 'effects/useConfirmMail'

export const ConfirmMail = ({ token }) => {
  const { success, error } = useConfirmEmail(token)

  return (
    <section>
      <div>Success:{success}</div>
      <div>Error:{error}</div>
    </section>
  )
}
