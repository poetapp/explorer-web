export interface ClassNameProps {
  readonly className?: string
}

export interface Profile {
  readonly email: string
  readonly apiTokens?: ReadonlyArray<string>
  readonly verified: boolean
  readonly createdAt: string
}

export interface User {
  readonly token: string | undefined
  readonly profile: Profile
}

export interface LoadingPage {
  readonly loading: boolean
  readonly percentage: number
}

export interface ErrorService {
  readonly status: boolean
  readonly message: string
}

export interface StatusService {
  readonly error: ErrorService
  readonly loading: boolean
}

export interface FrostState {
  readonly user: User
  readonly loadingPage: LoadingPage
  readonly signIn: StatusService
  readonly signUp: StatusService
}
