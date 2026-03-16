import * as fs from 'fs';
import * as path from 'path';

export interface EnvironmentConfig {
  environment: string;
  baseUrl: string;
  apiVersion: string;
  timeout: {
    default: number;
    navigation: number;
    action: number;
    spinner: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  retries: number;
  headless: boolean;
  video: string;
  trace: string;
  screenshot: string;
}

export class ConfigLoader {
  private static config: EnvironmentConfig;

  static load(env?: string): EnvironmentConfig {
    if (this.config) return this.config;

    const envName = env || process.env.ENV || 'dev';
    const configPath = path.resolve(__dirname, `../config/env.${envName}.json`);

    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }

    this.config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return this.config;
  }

  static get baseUrl(): string {
    return this.load().baseUrl;
  }

  static get environment(): string {
    return this.load().environment;
  }

  static get timeouts() {
    return this.load().timeout;
  }
}
