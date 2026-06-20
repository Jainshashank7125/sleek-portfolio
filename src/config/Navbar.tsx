export interface NavItem {
  label: string;
  href: string;
}

export const navbarConfig = {
  logo: {
    src: '/assets/logo.png',
    alt: 'logo',
    width: 100,
    height: 100,
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
