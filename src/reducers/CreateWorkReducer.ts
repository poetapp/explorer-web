import { Actions } from '../actions/index'
import { CreateWorkStore } from '../store/PoetAppState'
import { Claim, ClaimTypes } from 'poet-js'

export function createWorkReducer(state: any, action: any): CreateWorkStore {
  switch (action.type) {
    case Actions.Claims.SubmittedSuccess:
      const workClaim = action.claims.find((claim: Claim) => claim.type === ClaimTypes.WORK) as Claim
      return { ...state, workClaim }
  }
  return state || {}
}