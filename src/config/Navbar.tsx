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
      label: 'Work',
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
      label: 'Résumé',
      href: '/resume',
    },
  ] as NavItem[],
};
