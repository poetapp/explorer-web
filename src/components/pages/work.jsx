import React from 'react'

import { useWorkById } from 'effects/useWork'
import { useFetch } from 'effects/useFetch'

import { Main } from 'components/templates/Main'
import { Work } from 'components/organisms/work'

export const WorkById = ({ id, network }) => {
  const work = useWorkById(id, network)
  const content = useFetch(work && work.claim && work.claim.archiveUrl, false)

  return (
    <Main>
      <Work work={work} content={content && content.substring(0, 3000)} />
    </Main>
  )
}
