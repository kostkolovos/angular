import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../apiEntities/user-entity.model';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userChanged = new Subject<User>();
    userUrl = environment.apiUrl + 'api/user';
    private user: User;

    constructor(private http: HttpClient) {
    }

    getUser() {
        if (this.user === undefined) {
            this.fetchUser();
        }
        return this.user;
    }

    fetchUser() {
        this.http.get<User>(this.userUrl + '/me').subscribe((newUser => {
            this.setUser(newUser);
        }));
    }

    setUser(newUser: User) {
        this.user = newUser;
        this.userChanged.next(this.user);
    }

}
