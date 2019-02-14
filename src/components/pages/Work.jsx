import React from 'react'

import { useWorkById } from 'hooks/useWork'
import { useFetch } from 'hooks/useFetch'

import { Main } from 'components/templates/Main'
import { Work } from 'components/organisms/Work'

export const WorkById = ({ id }) => {
  const work = useWorkById(id)
  const content = useFetch(work && work.claim && work.claim.archiveUrl)

  return (
    <Main>
      <Work work={work} content={content && content.substring(0, 3000)} />
    </Main>
  )
}
