import * as fs from 'fs';
import * as path from 'path';

export class SessionUtils {
  private static authDir = path.resolve('./auth');

  static isSessionValid(profileName: string): boolean {
    const filePath = path.join(this.authDir, `${profileName}.json`);
    if (!fs.existsSync(filePath)) return false;

    const stats = fs.statSync(filePath);
    const ageMinutes = (Date.now() - stats.mtimeMs) / 60000;
    // Salesforce sessions typically expire after 2 hours
    return ageMinutes < 120;
  }

  static getSessionPath(profileName: string): string {
    return path.join(this.authDir, `${profileName}.json`);
  }

  static clearSession(profileName: string): void {
    const filePath = this.getSessionPath(profileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static clearAllSessions(): void {
    if (!fs.existsSync(this.authDir)) return;
    const files = fs.readdirSync(this.authDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      fs.unlinkSync(path.join(this.authDir, file));
    }
  }

  static listSessions(): string[] {
    if (!fs.existsSync(this.authDir)) return [];
    return fs.readdirSync(this.authDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''));
  }
}
