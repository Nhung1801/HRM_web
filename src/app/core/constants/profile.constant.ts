const profileConstant = {
    workingStatus: [
        {
            label: 'Tất cả nhân viên',
            value: null,
        },

        {
            label: 'Đang làm việc',
            value: '0',
        },
        {
            label: 'Đã nghỉ việc',
            value: '1',
        },
    ],

    genders: [
        {
            label: 'Nữ',
            value: '0',
        },
        {
            label: 'Nam',
            value: '1',
        },
    ],
};

export default profileConstant;

//Place
export const PLACE_HOME = 'Home';

//Type
export const TYPE_SLIDESHOW = 'SlideShow';

//Style
export const DEFAULT_PROPERTIES_BANNER = {
    props: {
        style: {
            '--cta-hover-color': '#6828fa',
            background: 'linear-gradient(to right, #6828fa, #ffbaa4)',
        },
    },
};
