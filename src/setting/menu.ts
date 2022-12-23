export const menu = [
  {
    label: '首页',
    key: "dashboard",
    icon: 'icon-dashboard',
  },
  {
    label: '加解密',
    key: 'encdec',
    icon: 'icon-lock',
    children: [
      {
        label: 'AES',
        key: 'encdecAES',
        // icon: 'icon-dashboard',
      },
    ]
  },{
    label: '更多功能',
    key: 'more',
    icon: 'icon-more',
    children: [
      {
        label: '若离博客',
        key: 'https://blog.ruoli.cc',
        // icon: 'icon-dashboard',
      },
    ]
  }
]
