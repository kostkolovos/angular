export class User {
    public id: number;
    public language: string;
    public username: string;
    public roles: string[];

    constructor(
        id: number,
        language: string,
        username: string,
        roles: string[]
    ) {
        this.id = id;
        this.language = language;
        this.username = username;
        this.roles = roles;
    }
}
