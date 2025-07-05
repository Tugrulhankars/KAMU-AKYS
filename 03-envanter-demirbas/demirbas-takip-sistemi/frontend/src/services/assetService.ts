import { apiService } from './api';
import { Asset, CreateAssetRequest, AssetStatus } from '../types';

class AssetService {
  async getAssets(): Promise<Asset[]> {
    return await apiService.get<Asset[]>('/assets');
  }

  async getAsset(id: number): Promise<Asset> {
    return await apiService.get<Asset>(`/assets/${id}`);
  }

  async createAsset(asset: CreateAssetRequest): Promise<Asset> {
    return await apiService.post<Asset>('/assets', asset);
  }

  async updateAsset(id: number, asset: Partial<CreateAssetRequest>): Promise<Asset> {
    return await apiService.put<Asset>(`/assets/${id}`, asset);
  }

  async deleteAsset(id: number): Promise<void> {
    return await apiService.delete<void>(`/assets/${id}`);
  }

  async getAssetsByStatus(status: AssetStatus): Promise<Asset[]> {
    return await apiService.get<Asset[]>(`/assets/by-status/${status}`);
  }

  async getAssetsByCategory(categoryId: number): Promise<Asset[]> {
    return await apiService.get<Asset[]>(`/assets/by-category/${categoryId}`);
  }

  async getAssignedAssets(userId: number): Promise<Asset[]> {
    return await apiService.get<Asset[]>(`/assets/user/${userId}/assigned`);
  }

  async updateAssetStatus(id: number, status: AssetStatus): Promise<void> {
    return await apiService.put<void>(`/assets/${id}/status`, { status });
  }

  getStatusText(status: AssetStatus): string {
    switch (status) {
      case AssetStatus.Available:
        return 'Müsait';
      case AssetStatus.Assigned:
        return 'Zimmetli';
      case AssetStatus.Maintenance:
        return 'Bakımda';
      case AssetStatus.Damaged:
        return 'Arızalı';
      case AssetStatus.Disposed:
        return 'İmha Edildi';
      default:
        return 'Bilinmiyor';
    }
  }

  getStatusColor(status: AssetStatus): string {
    switch (status) {
      case AssetStatus.Available:
        return 'text-green-600 bg-green-100';
      case AssetStatus.Assigned:
        return 'text-blue-600 bg-blue-100';
      case AssetStatus.Maintenance:
        return 'text-yellow-600 bg-yellow-100';
      case AssetStatus.Damaged:
        return 'text-red-600 bg-red-100';
      case AssetStatus.Disposed:
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }
}

export const assetService = new AssetService(); 