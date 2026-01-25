export enum Section {
    Privilege, //Đặc quyền
    HumanResourcesInformation, //Thông tin nhân sự
    Timekeeping, //Chấm công
    Payroll, //Tính lương
}

export const SectionLabel = {
    data: [
        {
            key: Section.Privilege,
            label: 'Đặc quyền',
        },
        {
            key: Section.HumanResourcesInformation,
            label: 'Thông tin nhân sự',
        },
        {
            key: Section.Timekeeping,
            label: 'Chấm công',
        },
        {
            key: Section.Payroll,
            label: 'Tính lương',
        },
    ],
};
