export class User {
    public _refreshToken: string;
    public _token: string;

    constructor(_token: string, _refreshToken: string) {
        this._refreshToken = _refreshToken;
        this._token = _token;
    }

    get token() {
        return this._token;
    }

    get refreshToken() {
        return this._refreshToken;
    }
}
