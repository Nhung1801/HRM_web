export enum DepartmentPermission {
    FullAccess = 1,
    Member = 2,
}

export const DepartmentPermissionConstant = [
    {
        key: DepartmentPermission.FullAccess,
        value: 'Toàn quyền',
    },
    {
        key: DepartmentPermission.Member,
        value: 'Thành viên',
    },
];
