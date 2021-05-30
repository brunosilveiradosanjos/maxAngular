export class User {
  constructor(
    private _token: string,
    public id: string,
    public name: string,
    public email: string,
    public expirationDate: Date
  ) { }

  get token() {
    if (!this.expirationDate || new Date() > this.expirationDate) {
      return null;
    }
    return this._token;
  }

}
