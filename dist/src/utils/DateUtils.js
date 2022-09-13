"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../errors/AppError");
class DateUtils {
    static periodToDate(period, startDate) {
        this.nowDate = startDate || new Date();
        this.periodType = (period.slice(period.length - 1, period.length).toLowerCase());
        this.periodTime = +period.slice(0, period.length - 1);
        if (this.periodTime === 0)
            throw new AppError_1.AppError("Invalid period", 400);
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
    static periodToDateString(period, startDate) {
        const date = this.periodToDate(period, startDate);
        return `${date.getFullYear()}-${date.getMonth() | 1}-${date.getDate() | 1}`;
    }
    static dateToString(date) {
        return date.toISOString().split("T")[0];
    }
}
DateUtils.ONE_DAY_IN_MS = 8.64e7;
DateUtils.ONE_WEEK_IN_MS = 6.048e8;
DateUtils.ONE_MONTH_IN_MS = 2.628e9;
DateUtils.ONE_YEAR_IN_MS = 3.154e10;
exports.default = DateUtils;
