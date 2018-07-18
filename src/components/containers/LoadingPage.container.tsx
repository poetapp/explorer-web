import { LoadingPage as Loading } from 'components/atoms/LoadingPage/LoadingPage'
import { FrostState, LoadingPage } from 'interfaces/Props'
import * as React from 'react'
import { connect } from 'react-redux'

interface LoadingPageProps {
  readonly loadingPage: LoadingPage
  readonly children?: React.ReactNode
}

const mapStateToProps = (state: FrostState): LoadingPageProps => ({
  loadingPage: state.loadingPage,
})

export const LoadingPageContainer = connect(mapStateToProps)(
  ({ loadingPage: { loading, percentage }, children }: LoadingPageProps) => (
    <Loading loading={loading} percentage={percentage}>
      {children}
    </Loading>
  )
)
