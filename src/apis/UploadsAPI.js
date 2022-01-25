import API from './API';

class UploadsAPI extends API {
  constructor() {
    super('/uploads');
  }

  userAvatar(avatarFileName) {
    return `${this.getBaseURL}${this.getResource}/user/avatar/${avatarFileName}`;
  }
}

export default UploadsAPI;
