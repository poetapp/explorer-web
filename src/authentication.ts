import * as SocketIO from 'socket.io-client'
import { v4 } from 'uuid'

import { Configuration } from './configuration';

export const Authentication = new class {
  private socket: any;
  private currentlyConnected: boolean = false;
  private promises: { [key:string]: PromiseInfo<string> } = {};
  private handler: (data: string) => void;

  constructor(handler?: (payload: string) => void) {
    this.socket = SocketIO(Configuration.api.auth.host, {path: Configuration.api.auth.path + '/socket.io'});
    this.handler = handler;
    this.socket.on('connected', this.onConnected.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
  }

  private onConnected() {
    this.currentlyConnected = true;
    for (let message of Object.keys(this.promises)) {
      this.socket.emit('request', JSON.stringify({
        type: 'associate',
        id: message
      }))
    }
  }

  private onDisconnect() {
    this.currentlyConnected = false;
  }

  private onMessage(payload: string) {
    const info = JSON.parse(payload);
    if (info.ref) {
      const promise = this.promises[info.ref];
      if (promise) {
        promise.resolve(JSON.parse(info.encoded));
        return
      }
    }
    if (info.id) {
      const promise = this.promises[info.ref || info.id];
      if (promise) {
        const message = JSON.parse(info.request).message;
        promise.resolve({ ...info, message });
        return
      }
    }
    this.handler(payload)
  }

  public getRequestIdForLogin = () =>
    this.getRequestIdForMultipleSigningBuffers([new Buffer(JSON.stringify({
      timestamp: Date.now()
    }))], false);

  public getRequestIdForMultipleSigning(payload: string[], bitcoin: boolean, notifyPubkey?: string): Promise<string> {
    return this.getRequestIdForMultipleSigningBuffers(payload.map(payload => new Buffer(payload)), bitcoin, notifyPubkey)
  }

  public getRequestIdForMultipleSigningBuffers(payload: Buffer[], bitcoin: boolean, notifyPubkey?: string): Promise<string> {
    const ref = v4();
    const data = JSON.stringify({
      type: 'multiple',
      bitcoin,
      notifyPubkey,
      payload: payload.map(payload => payload.toString('hex')),
      ref
    });
    const deferred = defer();
    this.promises[ref] = deferred;
    this.socket.emit('request', data);
    return deferred.promise
  }

  public onResponse(id: string): Promise<string> {
    const deferred = defer();
    this.promises[id] = deferred;
    return deferred.promise
  }

  public setHandler(handler: (data:string) => void) {
    this.handler = handler
  }

};

interface PromiseInfo<T> {
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (error: any) => void
}

function defer<T>(): PromiseInfo<T> {
  let resolve, reject;
  const promise = new Promise(function() {
    resolve = arguments[0];
    reject = arguments[1];
  });
  return { resolve, reject, promise }
}
