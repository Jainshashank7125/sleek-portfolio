export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  home: {
    label: 'Shashank Jain — Systems Field Notes',
    href: '/',
  },
  navItems: [
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Experience',
      href: '/work-experience',
    },
    {
      label: 'Writing',
      href: '/blog',
    },
    {
      label: 'Resume',
      href: '/resume',
    },
  ] as NavItem[],
};
