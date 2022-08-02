import {CONFIG} from '../../app.config';

export class Paths {
  public static signUp: string = `${CONFIG.SERVER_HOST}/api/auth/signup`;
  public static signIn: string = `${CONFIG.SERVER_HOST}/api/auth/signin`;
  public static sendCode: string = `${CONFIG.SERVER_HOST}/api/auth/code`;
  public static deleteCode: string = `${CONFIG.SERVER_HOST}/api/auth/resetcode`;
  public static wsEndPointTanksAuth: string = `${CONFIG.SERVER_HOST}/tanks-auth`;
  public static wsTopicAuthTimer: string = '/tanks-client/auth-timer';
  public static wsSendAuthCode: string = '/vm/auth-timer';
}
