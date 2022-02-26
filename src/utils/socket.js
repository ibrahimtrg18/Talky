import Config from 'react-native-config';
import io from 'socket.io-client';

export class Socket {
  constructor(access_token) {
    this._socket = null;
    this._uri = Config.SOCKET_URL;
    this._options = {
      access_token: access_token || '',
    };
  }

  initiateSocket() {
    console.log('socket connection...');
    this._socket = io(this._uri, {
      extraHeaders: {
        Authorization: 'Bearer ' + this._options.access_token,
      },
      transports: ['websocket'],
    });
  }

  disconnectSocket() {
    console.log('socket disconnect...');
    if (this._socket) this._socket.disconnect();
  }

  subscribeSocket(event, cb) {
    if (this._socket) {
      this._socket.on(event, (msg) => {
        return cb(msg);
      });
    }
  }

  sendSocket(event, data) {
    console.log({ event, data });
    if (this._socket) {
      try {
        this._socket.emit(event, data);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
