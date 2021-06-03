export class User {
  constructor(
    private _token: string,
    public id: string,
    public name: string,
    public email: string,
    private _expirationDate: Date
  ) { }

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return null;
    }
    return this._token;
  }

}
