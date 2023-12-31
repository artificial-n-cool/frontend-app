import { Injectable } from '@angular/core';
import { AuthResponse } from '../../types/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor() {}

  private userKey: string = 'currentUser';

  setCurrentUser(user: AuthResponse) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  removeCurrentUser(): void {
    localStorage.removeItem(this.userKey);
  }

  hasUser(): boolean {
    return localStorage.getItem(this.userKey) !== null;
  }

  update(updated: any): void {
    let user = this.getCurrentUser();
    if (user == null) {
      return;
    }
    user = {
      ...user,
      ime: updated.ime,
      username: updated.username,
      prezime: updated.prezime,
      email: updated.email,
      prebivaliste: updated.prebivaliste,
      jwt: updated.jwt
    };
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  hasAuthority(authority: string): boolean {
    const user = this.getCurrentUser();
    if (!user) {
      return false;
    }
    return user.authorities?.includes(authority);
  }

  getCurrentUser(): AuthResponse | null {
    const user: string | null = localStorage.getItem(this.userKey);
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}
