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
    name: 'FMS Main Menu',
    permission: [''],
  },
  {
    name: 'Dashboard',
    url: '/landing/home',
    icon: 'fa fa-th-large',
    permission: []
  },
  {
    name: 'Feedbacks',
    url: '/requests/list',
    icon: 'fa fa-file-text-o',
    permission: []
  },
  {
    name: 'Reports',
    url: '/reports/requests',
    icon: 'fa fa-files-o',
    permission: [],
    children: [
      {
        name: 'Feedbacks',
        url: '/reports/feedbacks',
        icon: 'fa fa-angle-double-right',
        permission: []
      },
    ]
  },
  {
    name: 'Configuration',
    url: '#',
    icon: 'fa fa-cogs',
    permission: ['SUPERUSER','FMS_ADMIN'],
    children: [
      {
        name: 'Facilities',
        url: '/administration/facilities',
        icon: 'fa fa-angle-double-right',
        permission: ['SUPERUSER','FMS_ADMIN']
      },
      {
        name: 'Departments',
        url: '/administration/department-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['SUPERUSER','FMS_ADMIN']
      },
      {
        name: 'Platform Admins',
        url: '/administration/platform-admins',
        icon: 'fa fa-angle-double-right',
        permission: ['SUPERUSER','FMS_ADMIN']
      },

    ]
  },
  // {
  //   name: 'User Management',
  //   url: '/administration/staff-listing',
  //   icon: 'fa fa-users',
  //   permission: ['SUPERUSER', 'USER_MANAGER'],
  //   children: [
  //     {
  //       name: 'New Staff',
  //       url: '/administration/staff-registration',
  //       icon: 'fa fa-angle-double-right',
  //       permission: ['SUPERUSER','USER_MANAGER']
  //     },
  //     {
  //       name: 'Staff Listing',
  //       url: '/administration/staff-listing',
  //       icon: 'fa fa-angle-double-right',
  //       permission: ['SUPERUSER','USER_MANAGER']
  //     },
  //   ]
  // },

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
