import { AppError } from "../errors/AppError";

type PossiblePeriodTypes = "d" | "w" | "m" | "y";

class DateUtils {
  static readonly ONE_DAY_IN_MS: number = 8.64e7;
  static readonly ONE_WEEK_IN_MS: number = 6.048e8;
  static readonly ONE_MONTH_IN_MS: number = 2.628e9;
  static readonly ONE_YEAR_IN_MS: number = 3.154e10;

  private static periodType: PossiblePeriodTypes;
  private static periodTime: number;
  private static nowDate: Date;
  static periodToDate(period: string, startDate?: Date) {
    this.nowDate = startDate || new Date();
    this.periodType = <PossiblePeriodTypes>(
      period.slice(period.length - 1, period.length).toLowerCase()
    );
    this.periodTime = +period.slice(0, period.length - 1);
    if (this.periodTime === 0) throw new AppError("Invalid period", 400);

    switch (this.periodType) {
      default:
      case "d": {
        const daysInMS = DateUtils.ONE_DAY_IN_MS * this.periodTime;
        const finalDate = new Date(this.nowDate.getTime() - daysInMS);
        return finalDate;
      }
      case "w": {
        const weeksInMS = DateUtils.ONE_WEEK_IN_MS * this.periodTime;
        const finalDate = new Date(this.nowDate.getTime() - weeksInMS);
        return finalDate;
      }
      case "m": {
        const monthsInMS = DateUtils.ONE_MONTH_IN_MS * this.periodTime;
        const finalDate = new Date(this.nowDate.getTime() - monthsInMS);
        return finalDate;
      }
      case "y": {
        const yearsInMS = DateUtils.ONE_YEAR_IN_MS * this.periodTime;
        const finalDate = new Date(this.nowDate.getTime() - yearsInMS);
        return finalDate;
      }
    }
  }

  static periodToDateString(period: string, startDate?: Date) {
    const date = this.periodToDate(period, startDate);

    return `${date.getFullYear()}-${date.getMonth() | 1}-${date.getDate() | 1}`;
  }

  static dateToString(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}

export default DateUtils;
