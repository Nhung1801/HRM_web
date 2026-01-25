// src/app/services/schedule.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    private data = {
        shiftTableName: 'Phân ca 001',
        shiftCatalogId: 2,
        organizationId: 2,
        startDate: '2024-12-17T04:31:36.087',
        endDate: '2025-01-17T04:31:36.087',
        recurrenceType: 2,
        recurrenceCount: 4,
        isMonday: true,
        isTuesday: true,
        isWednesday: true,
        isThursday: true,
        isFriday: true,
        isSaturday: false,
        isSunday: false,
        applyObject: 0,
        shiftCatalog: {
            id: 2,
            organizationId: 2,
            code: 'C001',
            name: 'Ca 001',
            startTime: '08:00:00',
            endTime: '17:15:00',
            isTimeChecked: true,
            startTimeIn: '07:00:00',
            endTimeIn: '08:30:00',
            isBreak: true,
            startTimeOut: '17:00:00',
            endTimeOut: '19:15:00',
            takeABreak: true,
            startTakeABreak: '12:00:00',
            endTakeABreak: '13:15:00',
            workingHours: 8,
            workingDays: 1,
            regularMultiplier: 1,
            holidayMultiplier: 2,
            leaveDaysMultiplier: 2,
            deductIfNoStartTime: true,
            deductIfNoEndTime: true,
            allowEarlyLeave: true,
            allowedEarlyLeaveMinutes: 30,
            allowLateArrival: true,
            allowedLateArrivalMinutes: 30,
            allowOvertime: true,
            organization: {
                id: 2,
                organizationName: 'Phòng Marketing',
            },
        },
        organization: {
            id: 2,
            organizationName: 'Phòng Marketing',
        },
    };

    constructor() {}

    getScheduleData() {
        return this.data;
    }

    getDaysArray(start: Date, end: Date): Date[] {
        const arr = [];
        const dt = new Date(start);
        while (dt <= new Date(end)) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    isWorkingDay(date: Date): boolean {
        const day = date.getDay();
        return (
            (day === 1 && this.data.isMonday) ||
            (day === 2 && this.data.isTuesday) ||
            (day === 3 && this.data.isWednesday) ||
            (day === 4 && this.data.isThursday) ||
            (day === 5 && this.data.isFriday) ||
            (day === 6 && this.data.isSaturday) ||
            (day === 0 && this.data.isSunday)
        );
    }
}
