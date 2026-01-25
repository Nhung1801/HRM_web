export enum TimeKeepingType {
    CheckIn,
    CheckOut,
}
export enum TimeKeepingLeaveStatus
{
    None,// Đi làm bình thường
    LeavePermission, // nghỉ có dùng phép hưởng lương
    LeaveNotPermission, // nghỉ không phép
    LeaveNotPermissionWithSalary // nghỉ không có phép nhưng có lương 
}