import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ServiceType } from '../../models/service-type';
import { ServiceRequest } from '../../models/service-request';
import { User } from '../../models/user';
import {IonHeader, IonToolbar, IonTitle, IonButton, IonItem, IonLabel, IonContent,IonButtons, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
   imports: [IonHeader, IonToolbar, IonTitle,IonButton, IonItem, IonLabel, IonContent,IonButtons,IonList, DatePipe],
})
export class HomePage implements OnInit {
  currentUser: User | null = null;
  services: ServiceType[] = [];
  requests: ServiceRequest[] = [];
  private api = inject(ApiService);
   private router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.api.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadRequests(user.id);
      }
    });
    this.loadServices();
  }

  /**
   * Fetch the list of lawn services from the backend.
   */
  loadServices(): void {
    this.api.getServices().subscribe(services => {
      this.services = services;
    });
  }

  /**
   * Fetch the requests for the current user.
   */
  loadRequests(userId: string): void {
    this.api.getRequests(userId).subscribe(requests => {
      this.requests = requests;
    });
  }

  /**
   * Navigate to the request page to create a new lawn service request.
   */
  newRequest(): void {
    this.router.navigateByUrl('/request');
  }

  /**
   * Navigate to login page if the user logs out.
   */
  logout(): void {
    this.api.setCurrentUser(null);
    this.router.navigateByUrl('/login');
  }
  getServiceName(id: number): string {
  const service = this.services.find(s => s.id === id);
  return service ? service.name : '';
}
 
 /*  getServiceIcon(id: number): string {
    const svc = this.services.find(s => s.id === id);
    return svc ? svc.icon : '';
  } 
   */
}