import { AuthToken, AuthSession, BrowserTransport } from "@looker/sdk";

export class CorsSession extends AuthSession {
  fetchToken() {
    return fetch("");
  }
  activeToken = new AuthToken();
  constructor(settings, transport) {
    super(settings, transport || new BrowserTransport(settings));
  }
  isAuthenticated() {
    const token = this.activeToken;
    if (!(token && token.access_token)) return false;
    return token.isActive();
  }
  async getToken() {
    if (!this.isAuthenticated()) {
      const token = await this.fetchToken();
      this.activeToken.setToken(await token.json());
    }
    return this.activeToken;
  }
  async authenticate(props) {
    const token = await this.getToken();
    if (token && token.access_token) {
      props.mode = "cors";
      delete props.credentials;
      props.headers = {
        ...props.headers,
        Authorization: `Bearer ${this.activeToken.access_token}`
      };
    }
    return props;
  }
}

export class CorsSessionHelper extends CorsSession {

  accessToken;

  constructor(options) {
    super(options);
    this.accessToken = options.accessToken;
  }

  fetchToken() {
    return this.accessToken;
  }

  async getToken() {
    if (!this.isAuthenticated()) {
      this.activeToken.setToken(this.fetchToken());
    }
    return this.activeToken;
  }
}