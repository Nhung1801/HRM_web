export enum PayrollStatus {
    Unlocked, // Chưa khóa
    Locked, // Đã khóa
}

export enum PayrollConfirmationStatus {
    NotSent, // Chưa gửi xác nhận
    NotConfirmed, // Chưa xác nhận
    Confirming, // Đang xác nhận
    Confirmed, // Đã xác nhận
}

export enum ApplicablePosition {
    AllPosition,
    Other,
}
