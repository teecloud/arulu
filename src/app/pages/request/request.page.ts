import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ServiceType } from '../../models/service-type';
import { ServiceRequest } from '../../models/service-request';
import { User } from '../../models/user';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss']
})
export class RequestPage implements OnInit {
  currentUser: User | null = null;
  services: ServiceType[] = [];
  selectedServiceId: number | null = null;
  serviceDate: string = '';
  notes: string = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.api.getServices().subscribe(services => {
      this.services = services;
    });
  }

  /**
   * Submit the new service request to the backend.
   */
  submit(): void {
    if (!this.currentUser) {
      this.errorMessage = 'You must be logged in to create a request.';
      return;
    }
    if (!this.selectedServiceId || !this.serviceDate) {
      this.errorMessage = 'Please select a service and date.';
      return;
    }
    const dto = {
      userId: this.currentUser.id,
      serviceTypeId: this.selectedServiceId,
      serviceDate: this.serviceDate,
      notes: this.notes
    };
    this.api.createRequest(dto).subscribe({
      next: (result) => {
        // Navigate back to home after successful creation
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.errorMessage = 'Failed to create request. Please try again later.';
      }
    });
  }
}