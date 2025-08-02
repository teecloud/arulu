import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { ServiceType } from '../models/service-type';
import { ServiceRequest, CreateRequestDto } from '../models/service-request';

/**
 * ApiService provides an abstraction over the ASP.NET Core backend.  It
 * encapsulates all HTTP calls and exposes strongly typed methods for
 * authentication, retrieving services, and creating requests.  A
 * BehaviorSubject holds the currently logged in user so that other
 * components can subscribe for updates.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Stores the logged in user.  Components can subscribe to
   * currentUser$ to react to login/logout events.
   */
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  /**
   * Attempts to authenticate a user with the backend.  On success,
   * the returned user information is emitted via the observable.
   */
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/api/auth/login`, {
      username,
      password
    });
  }

  /**
   * Creates a new user account in the backend.
   */
  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/api/auth/register`, {
      username,
      password
    });
  }

  /**
   * Retrieves the list of lawn services offered by the backend.
   */
  getServices(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(`${environment.apiBaseUrl}/api/services`);
  }

  /**
   * Submits a new service request for the current user.
   */
  createRequest(dto: CreateRequestDto): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(`${environment.apiBaseUrl}/api/requests`, dto);
  }

  /**
   * Retrieves all service requests for the given user.
   */
  getRequests(userId: string): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${environment.apiBaseUrl}/api/requests/${userId}`);
  }

  /**
   * Retrieves all service requests (for administrators or providers).
   */
  getAllRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${environment.apiBaseUrl}/api/requests`);
  }
}