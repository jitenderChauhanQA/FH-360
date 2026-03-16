import { APIRequestContext, request } from '@playwright/test';

export class ApiHelper {
  private apiContext!: APIRequestContext;

  async init(baseUrl: string, accessToken: string): Promise<void> {
    this.apiContext = await request.newContext({
      baseURL: baseUrl,
      extraHTTPHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.apiContext.get(endpoint);
    if (!response.ok()) {
      throw new Error(`GET ${endpoint} failed: ${response.status()} ${response.statusText()}`);
    }
    return response.json() as T;
  }

  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const response = await this.apiContext.post(endpoint, { data });
    if (!response.ok()) {
      throw new Error(`POST ${endpoint} failed: ${response.status()} ${response.statusText()}`);
    }
    return response.json() as T;
  }

  async patch<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const response = await this.apiContext.patch(endpoint, { data });
    if (!response.ok()) {
      throw new Error(`PATCH ${endpoint} failed: ${response.status()} ${response.statusText()}`);
    }
    return response.json() as T;
  }

  async delete(endpoint: string): Promise<void> {
    const response = await this.apiContext.delete(endpoint);
    if (!response.ok()) {
      throw new Error(`DELETE ${endpoint} failed: ${response.status()} ${response.statusText()}`);
    }
  }

  // Salesforce-specific: Create a record via REST API
  async createSObject(objectType: string, fields: Record<string, unknown>): Promise<string> {
    const result = await this.post<{ id: string; success: boolean }>(
      `/services/data/v59.0/sobjects/${objectType}`,
      fields
    );
    return result.id;
  }

  // Salesforce-specific: Delete a record via REST API (teardown)
  async deleteSObject(objectType: string, recordId: string): Promise<void> {
    await this.delete(`/services/data/v59.0/sobjects/${objectType}/${recordId}`);
  }

  async dispose(): Promise<void> {
    await this.apiContext?.dispose();
  }
}
