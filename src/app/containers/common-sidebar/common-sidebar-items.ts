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
    name: 'Main Menu',
    permission: [''],
  },
  // {
  //   name: 'Home',
  //   url: '/landing/home',
  //   icon: 'fa fa-home',
  //   permission: []
  // },
  {
    name: 'Dashboard',
    url: '/landing/home',
    icon: 'fa fa-th-large',
    permission: []
  },
  {
    name: 'Quotes',
    url: '/quotes/list',
    icon: 'fa fa-file-text-o',
    permission: ['USER_MANAGER','USER','MMD_MANAGER','MMD_STAFF','VIEWER']
  },
  {
    name: 'Reports',
    url: '/reports/quotation',
    icon: 'fa fa-files-o',
    permission: ['USER_MANAGER','MMD_MANAGER','MMD_STAFF','VIEWER']
  },
  {
    name: 'Departments',
    url: '/administration/department-listing',
    icon: 'fa fa-building-o',
    permission: ['USER_MANAGER','ADMIN','VIEWER']
  },
  {
    name: 'User Administration',
    url: '/administration/staff-listing',
    icon: 'fa fa-users',
    permission: ['USER_MANAGER','VIEWER'],
    // children: [
    //   {
    //     name: 'New Staff',
    //     url: '/administration/staff-registration',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['USER_MANAGER','VIEWER']
    //   },
    //   {
    //     name: 'Staff Listing',
    //     url: '/administration/staff-listing',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['USER_MANAGER','VIEWER']
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
