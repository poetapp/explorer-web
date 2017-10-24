export namespace Actions {
  export const fetchRequest = 'fetch requested';

  export const unrecognizedSocketMessage = 'unrecognized socket message';

  export const blockInfoReceived = 'block info received';

  export namespace Search {
    export const Change = 'search change';
    export const Offset = 'search offset';
  }

  export namespace Session {
    export const MockLoginRequest = 'mock login server requested';
    export const LoginButtonClicked = 'login button clicked';
    export const LogoutButtonClicked = 'logout button clicked';
    export const LoginResponse = 'login response';
    export const LoginSuccess = 'login success';
    export const LogoutRequested = 'logout requested';
    export const LoginIdReceived = 'login ID received';
  }

  export namespace Profile {
    export const Updating = 'updating profile';
    export const Updated = 'profile updated successfully';
    export const UpdateRequested = 'profile update requested';
    export const FetchProfile = 'fetch profile data';
    export const ProfileFetched = 'profile data fetched';
    export const NotificationsUpdate = 'notifications update';
    export const MarkNotificationRead = 'mark notification read';
  }

  export namespace Transfer {
    export const TransferRequested = 'transfer work requested';
    export const TransferIdReceived = 'transfer id to sign received';
    export const FakeTransferSign = 'fake transfer sign requested';
    export const SetTransferTarget = 'transfer work target set';
    export const Success = 'transfer success';
  }

  export namespace Claims {
    export const FakeSign = 'fake sign claim requested';
    export const Response = 'claim response for signature';
    export const IdReceived = 'request id for authorizing claim received';
    export const Signed = 'claim signed';
    export const SubmitRequested = 'claims submit requested';
    export const Submitting = 'submitting claims';
    export const SubmittedSuccess = 'create claim success';
  }

  export namespace Transactions {
    export const SignSubmitRequested = 'sign tx submit requested';
    export const FakeSign = 'fake sign requested';
    export const Submitting = 'submitting tx';
    export const SubmittedSuccess = 'tx submitted';
    export const SignIdReceived = 'sign tx id received';
  }

  export namespace Licenses {
    export const PurchaseRequested = 'license purchase requested';
    export const Paid = 'license paid';
    export const Success = 'license bought';
  }

  export namespace Notifications {
    export const MarkAllAsRead = 'mark all notifications as read';
  }

  export namespace Withdrawal {
    export const Requested = 'withdrawal started';
    export const Done = 'withdrawal done';
  }

  export namespace Modals {
    export namespace PurchaseLicense {
      export const Show = 'purchase license modal show';
      export const Hide = 'purchase license modal hide';
      export const ShowSuccess = 'purchase license modal show success';
      export const Accept = 'purchase license modal accept';
      export const Cancel = 'purchase license modal cancel';
    }
    export namespace Transfer {
      export const Show = 'transfer modal show';
      export const Hide = 'transfer modal hide';
      export const DismissRequested = 'transfer modal dismiss requested';
      export const Dismissed = 'transfer work modal dismissed';
    }
    export namespace SignClaims {
      export const Show = 'show sign claims modal';
      export const Hide = 'hide sign claims modal';
      export const DismissRequested = 'dismiss work modal';
    }
    export namespace SignTransaction {
      export const Show = 'sign tx modal show';
      export const Hide = 'sign tx modal hide';
      export const DismissRequested = 'sign tx dismiss modal received';
    }
    export namespace CreateWorkResult {
      export const Show = 'create work result modal show';
      export const Hide = 'create work result modal hide';
    }
    export namespace TryItOut {
      export const Show = 'try-it-out modal show';
      export const Hide = 'try-it-out modal hide';
      export const Submit = 'try-it-out modal submit';
    }
  }
}