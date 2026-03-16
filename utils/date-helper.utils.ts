export class DateHelper {
  // Salesforce date format: MM/DD/YYYY
  static today(): string {
    return this.format(new Date());
  }

  static daysFromNow(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.format(date);
  }

  static daysAgo(days: number): string {
    return this.daysFromNow(-days);
  }

  static firstDayOfMonth(): string {
    const date = new Date();
    date.setDate(1);
    return this.format(date);
  }

  static lastDayOfMonth(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1, 0);
    return this.format(date);
  }

  static format(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  static toISO(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  static fromString(dateStr: string): Date {
    // Parse MM/DD/YYYY
    const [month, day, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}
