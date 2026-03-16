import * as fs from 'fs';
import * as path from 'path';

export class DataHelper {
  private static dataCache: Map<string, unknown> = new Map();

  static load<T>(fileName: string): T {
    if (this.dataCache.has(fileName)) {
      return this.dataCache.get(fileName) as T;
    }

    const filePath = path.resolve(__dirname, `../testdata/${fileName}`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Test data file not found: ${filePath}`);
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    this.dataCache.set(fileName, data);
    return data as T;
  }

  static getByName<T>(fileName: string, recordName: string): T {
    const data = this.load<Record<string, T>>(fileName);
    if (!(recordName in data)) {
      throw new Error(`Record '${recordName}' not found in ${fileName}`);
    }
    return data[recordName];
  }

  static getForEnvironment<T>(fileName: string, env?: string): T[] {
    const envName = env || process.env.ENV || 'dev';
    const allData = this.load<Array<T & { environment?: string }>>(fileName);

    if (!Array.isArray(allData)) {
      throw new Error(`${fileName} must contain an array for environment filtering`);
    }

    return allData.filter(
      (item) => !item.environment || item.environment === envName
    );
  }

  static generateUniqueId(prefix = 'AUTO'): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  static clearCache(): void {
    this.dataCache.clear();
  }
}
