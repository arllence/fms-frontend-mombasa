export interface INavAttributes {
  [propName: string]: any;
}
export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}
export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}
export interface INavLabel {
  class?: string;
  variant: string;
}
export interface INavLinkProps {
  queryParams?: {
      [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: 'merge' | 'preserve' | '';
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
      [k: string]: any;
  };
  routerLinkActiveOptions?: {
      exact: boolean;
  };
  routerLinkActive?: string | string[];
}
export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  permission?: any[];
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
}

export const navItems: INavData[] = [

  {
    title: true,
    name: 'SRS Main Menu',
    permission: [''],
  },
  {
    name: 'Dashboard',
    url: '/landing/home',
    icon: 'fa fa-th-large',
    permission: []
  },
  {
    name: 'Requisitions',
    url: '/requests/list',
    icon: 'fa fa-file-text-o',
    permission: ['SUPERUSER','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
  },
  {
    name: 'Locums',
    url: '/generics/locum-list',
    icon: 'fa fa-vcard-o',
    permission: ['SUPERUSER','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
  },
  {
    name: 'Reports',
    url: '/reports/requests',
    icon: 'fa fa-files-o',
    permission: ['SUPERUSER','HHR','CEO', 'HOF','HR'],
    children: [
      {
        name: 'Requisitions',
        url: '/reports/requisitions',
        icon: 'fa fa-angle-double-right',
        permission: ['SUPERUSER','HHR','CEO', 'HOF','HR']
      },
      {
        name: 'Vacancy',
        url: '/reports/replacements',
        icon: 'fa fa-angle-double-right',
        permission: ['SUPERUSER','HHR','CEO', 'HOF','HR']
      },
      {
        name: 'New Hires',
        url: '/reports/hires',
        icon: 'fa fa-angle-double-right',
        permission: ['SUPERUSER','HHR','CEO', 'HOF','HR']
      },
    ]
  },
  {
    name: 'Configuration',
    url: '#',
    icon: 'fa fa-cogs',
    permission: ['ADMIN','VIEWER', 'USER_MANAGER'],
    children: [
      {
        name: 'Departments',
        url: '/administration/department-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['ADMIN','VIEWER', 'USER_MANAGER']
      },
      {
        name: 'Locations',
        url: '/administration/sub-departments',
        icon: 'fa fa-angle-double-right',
        permission: ['ADMIN','VIEWER', 'USER_MANAGER']
      },
      {
        name: 'OHCs',
        url: '/administration/ohcs',
        icon: 'fa fa-angle-double-right',
        permission: ['ADMIN','VIEWER', 'USER_MANAGER']
      },
    ]
  },
  {
    name: 'User Management',
    url: '/administration/staff-listing',
    icon: 'fa fa-users',
    permission: ['VIEWER', 'USER_MANAGER'],
    // children: [
    //   {
    //     name: 'New Staff',
    //     url: '/administration/staff-registration',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['SUPERUSER','VIEWER']
    //   },
    //   {
    //     name: 'Staff Listing',
    //     url: '/administration/staff-listing',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['SUPERUSER','VIEWER']
    //   },
    // ]
  },

  // {
  //   name: 'Profile',
  //   url: '/profile',
  //   icon: 'fa fa-street-view',
  //   permission: []
  // }




  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
