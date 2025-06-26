export interface UserInfoListType {
  title: string;
  content: string;
  span?: number;
}

export const USER_INFO_LIST: Array<UserInfoListType> = [
  {
    title: 'pages.user.personalInfo.desc.mobile',
    content: '+86 13923734567',
  },
  {
    title: 'pages.user.personalInfo.desc.phone',
    content: '734567',
  },
  {
    title: 'pages.user.personalInfo.desc.email',
    content: 'Account@qq.com',
  },
  {
    title: 'pages.user.personalInfo.desc.seat',
    content: 'T32F 012',
  },
  {
    title: 'pages.user.personalInfo.desc.entity',
    content: 'Chern Blog',
  },
  {
    title: 'pages.user.personalInfo.desc.position',
    content: '管理员',
  },
  {
    title: 'pages.user.personalInfo.desc.joinDay',
    content: '2021-07-01',
  },
];
