import { apiService } from './api';
import { Assignment, CreateAssignmentRequest, AssignmentType } from '../types';

class AssignmentService {
  async getAssignments(): Promise<Assignment[]> {
    return await apiService.get<Assignment[]>('/assignments');
  }

  async getAssignment(id: number): Promise<Assignment> {
    return await apiService.get<Assignment>(`/assignments/${id}`);
  }

  async createAssignment(assignment: CreateAssignmentRequest): Promise<Assignment> {
    return await apiService.post<Assignment>('/assignments', assignment);
  }

  async getAssignmentsByUser(userId: number): Promise<Assignment[]> {
    return await apiService.get<Assignment[]>(`/assignments/user/${userId}`);
  }

  async getAssignmentsByAsset(assetId: number): Promise<Assignment[]> {
    return await apiService.get<Assignment[]>(`/assignments/asset/${assetId}`);
  }

  async getActiveAssignment(assetId: number): Promise<Assignment> {
    return await apiService.get<Assignment>(`/assignments/asset/${assetId}/active`);
  }

  getTypeText(type: AssignmentType): string {
    switch (type) {
      case AssignmentType.Assignment:
        return 'Zimmet';
      case AssignmentType.Return:
        return 'İade';
      default:
        return 'Bilinmiyor';
    }
  }

  getTypeColor(type: AssignmentType): string {
    switch (type) {
      case AssignmentType.Assignment:
        return 'text-blue-600 bg-blue-100';
      case AssignmentType.Return:
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }
}

export const assignmentService = new AssignmentService(); 