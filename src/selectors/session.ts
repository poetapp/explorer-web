import { PoetAppState, NotificationsStore } from '../store/PoetAppState'

export function currentPublicKey(state: PoetAppState): string {
  return state.session && state.session.token && state.session.token.publicKey;
}

export function countUnreadNotifications(state: PoetAppState): number {
  return state.profile && state.profile.notifications && state.profile.notifications.unreadCount
}

export function selectNotifications(state: PoetAppState): NotificationsStore {
  return state.profile && state.profile.notifications
}