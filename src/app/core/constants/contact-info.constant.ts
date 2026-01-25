const contactInfoConstant = {
    workingStatus: [
        // Thì toàn bộ thông tin trong phần thông tin nghỉ việc disable,ngược lại chọn “Đã nghỉ việc” thì nhập được các thông tin
        {
            label: 'Đang làm việc',
            value: '0',
        },
        {
            label: 'Đã nghỉ việc',
            value: '1',
        },
    ],

    typeOfInsurance: [
        {
            label: 'Đang tham gia',
            value: 1,
        },
        {
            label: 'Đang nghỉ thai sản',
            value: 2,
        },
        {
            label: 'Đang nghỉ ốm',
            value: 3,
        },
        {
            label: 'Đang nghỉ không lương',
            value: 4,
        },
        {
            label: 'Đã nghỉ việc',
            value: 5,
        },
        {
            label: 'Không tham gia',
            value: 6,
        },
    ],

    relationship: [
        {
            label: 'Là cha',
            value: 1,
        },
        {
            label: 'Là mẹ',
            value: 2,
        },
        {
            label: 'Là con trai',
            value: 3,
        },
        {
            label: 'Là con gái',
            value: 4,
        },
        {
            label: 'Là anh trai',
            value: 5,
        },
        {
            label: 'Là chị gái',
            value: 6,
        },
        {
            label: 'Là em trai',
            value: 7,
        },
        {
            label: 'Là em gái',
            value: 8,
        },
        {
            label: 'Là ông nội',
            value: 9,
        },
        {
            label: 'Là bà nội',
            value: 10,
        },
        {
            label: 'Là ông ngoại',
            value: 11,
        },
        {
            label: 'Là bà ngoại',
            value: 12,
        },
        {
            label: 'Là cháu trai',
            value: 13,
        },
        {
            label: 'Là cháu gái',
            value: 14,
        },
        {
            label: 'Là bạn bè',
            value: 15,
        },
        {
            label: 'Là đồng nghiệp',
            value: 16,
        },
        {
            label: 'Là vợ',
            value: 17,
        },
        {
            label: 'Là chồng',
            value: 18,
        },
        {
            label: 'Là người yêu',
            value: 19,
        },
    ],
};

export default contactInfoConstant;
