export namespace Actions {
  export const fetchRequest = 'fetch requested'

  export const unrecognizedSocketMessage = 'unrecognized socket message'

  export const blockInfoReceived = 'block info received'

  export namespace Search {
    export const Change = 'search change'
    export const Offset = 'search offset'
  }

  export namespace Session {
    export const MockLoginRequest = 'mock login server requested'
    export const LoginButtonClicked = 'login button clicked'
    export const LogoutButtonClicked = 'logout button clicked'
    export const LoginResponse = 'login response'
    export const LoginSuccess = 'login success'
    export const LogoutRequested = 'logout requested'
    export const LoginIdReceived = 'login ID received'
  }

  export namespace Profile {
    export const Updating = 'updating profile'
    export const Updated = 'profile updated successfully'
    export const UpdateRequested = 'profile update requested'
    export const FetchProfile = 'fetch profile data'
    export const ProfileFetched = 'profile data fetched'
    export const NotificationsUpdate = 'notifications update'
    export const MarkNotificationRead = 'mark notification read'
  }

  export namespace Transfer {
    export const TransferRequested = 'transfer work requested'
    export const TransferIdReceived = 'transfer id to sign received'
    export const FakeTransferSign = 'fake transfer sign requested'
    export const SetTransferTarget = 'transfer work target set'
    export const Success = 'transfer success'
  }

  export namespace Claims {
    export const FakeSign = 'fake sign claim requested'
    export const Response = 'claim response for signature'
    export const IdReceived = 'request id for authorizing claim received'
    export const Signed = 'claim signed'
    export const SubmitRequested = 'claims submit requested'
    export const Submitting = 'submitting claims'
    export const SubmittedSuccess = 'create claim success'
  }

  export namespace Transactions {
    export const SignSubmitRequested = 'sign tx submit requested'
    export const FakeSign = 'fake sign requested'
    export const Submitting = 'submitting tx'
    export const SubmittedSuccess = 'tx submitted'
    export const SignIdReceived = 'sign tx id received'
  }

  export namespace Licenses {
    export const PurchaseRequested = 'license purchase requested'
    export const Paid = 'license paid'
    export const Success = 'license bought'
  }

  export namespace Notifications {
    export const MarkAllAsRead = 'mark all notifications as read'
  }

  export namespace Withdrawal {
    export const Requested = 'withdrawal started'
    export const Done = 'withdrawal done'
  }

  export namespace Router {
    export const ROUTER_ON_ENTER = 'ROUTER_ON_ENTER'
    export const ROUTER_ON_CHANGE = 'ROUTER_ON_CHANGE'
    export const onEnter = (payload?: object) => ({ type: ROUTER_ON_ENTER, payload })
    export const onChange = (payload?: object) => ({ type: ROUTER_ON_CHANGE, payload })
  }

  export namespace SignIn {
    export const SIGN_IN = 'SIGN_IN'
    export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
    export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
    export const SIGN_IN_CLEAR_ERROR = 'SIGN_IN_CLEAR_ERROR'
    export const onSignIn = (payload?: object) => ({
      type: SIGN_IN,
      payload,
    })
    export const onSignInSuccess = (payload?: object) => ({
      type: SIGN_IN_SUCCESS,
      payload,
    })
    export const onSignInError = (payload?: object) => ({
      type: SIGN_IN_ERROR,
      payload,
    })
    export const onSignInClearError = (payload?: object) => ({
      type: SIGN_IN_CLEAR_ERROR,
      payload,
    })
  }

  export namespace LoadingPage {
    export const LOADING_ON = 'LOADING_ON'
    export const LOADING_OFF = 'LOADING_OFF'
    export const LOADING_FULL = 'LOADING_FULL'
    export const onLoadingOn = (payload?: object) => ({ type: LOADING_ON, payload })
    export const onLoadingOff = (payload?: object) => ({ type: LOADING_OFF, payload })
    export const onLoadingFull = (payload?: object) => ({ type: LOADING_FULL, payload })
  }

  export namespace Profile {
    export const PROFILE = 'PROFILE'
    export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
    export const PROFILE_ERROR = 'PROFILE_ERROR'
    export const PROFILE_CLEAR_ERROR = 'PROFILE_CLEAR_ERROR'
    export const onProfile = (payload?: object) => ({ type: PROFILE, payload })
    export const onProfileSuccess = (payload?: object) => ({ type: PROFILE_SUCCESS, payload })
    export const onProfileError = (payload?: object) => ({ type: PROFILE_ERROR, payload })
    export const onProfileClearError = (payload?: object) => ({ type: PROFILE_CLEAR_ERROR, payload })
  }

  export namespace SetTokenLogin {
    export const SET_TOKEN_LOGIN = 'SET_TOKEN_LOGIN'

    export const onSetTokenLogin = (payload?: object) => ({
      type: SET_TOKEN_LOGIN,
      payload,
    })
  }

  export namespace Modals {
    export namespace PurchaseLicense {
      export const Show = 'purchase license modal show'
      export const Hide = 'purchase license modal hide'
      export const ShowSuccess = 'purchase license modal show success'
      export const Accept = 'purchase license modal accept'
      export const Cancel = 'purchase license modal cancel'
    }
    export namespace Transfer {
      export const Show = 'transfer modal show'
      export const Hide = 'transfer modal hide'
      export const DismissRequested = 'transfer modal dismiss requested'
      export const Dismissed = 'transfer work modal dismissed'
    }
    export namespace SignClaims {
      export const Show = 'show sign claims modal'
      export const Hide = 'hide sign claims modal'
      export const DismissRequested = 'dismiss work modal'
    }
    export namespace SignTransaction {
      export const Show = 'sign tx modal show'
      export const Hide = 'sign tx modal hide'
      export const DismissRequested = 'sign tx dismiss modal received'
    }
    export namespace CreateWorkResult {
      export const Show = 'create work result modal show'
      export const Hide = 'create work result modal hide'
    }
    export namespace TryItOut {
      export const Show = 'try-it-out modal show'
      export const Hide = 'try-it-out modal hide'
      export const Submit = 'try-it-out modal submit'
    }
  }
}
