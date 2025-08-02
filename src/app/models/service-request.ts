/**
 * Defines the shape of a service request returned by the backend API.
 */
export interface ServiceRequest {
  id: string;
  userId: string;
  serviceTypeId: number;
  serviceDate: string;
  notes: string;
  status: string;
}

/**
 * DTO used when creating a new service request via the API.
 */
export interface CreateRequestDto {
  userId: string;
  serviceTypeId: number;
  serviceDate: string;
  notes?: string;
}