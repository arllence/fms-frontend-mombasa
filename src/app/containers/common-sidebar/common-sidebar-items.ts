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
    name: 'SRRS Main Menu',
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
    permission: ['USER_MANAGER','ADMINISTRATOR','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
  },
  {
    name: 'Reports',
    url: '/reports/requests',
    icon: 'fa fa-files-o',
    permission: ['USER_MANAGER','ADMINISTRATOR','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR'],
    children: [
      {
        name: 'General',
        url: '/reports/requisitions',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','ADMINISTRATOR','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
      },
      // {
      //   name: 'Replacements',
      //   url: '/reports/replacements',
      //   icon: 'fa fa-angle-double-right',
      //   permission: ['USER_MANAGER','ADMINISTRATOR','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
      // },
      // {
      //   name: 'Flights',
      //   url: '/reports/flights',
      //   icon: 'fa fa-angle-double-right',
      //   permission: ['USER_MANAGER','ADMINISTRATOR','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
      // },
      // {
      //   name: 'Journeys',
      //   url: '/reports/journeys',
      //   icon: 'fa fa-angle-double-right',
      //   permission: ['USER_MANAGER','ADMINISTRATOR','HHR','VIEWER','HOD','SLT', 'CEO', 'HOF','HR']
      // },
    ]
  },
  {
    name: 'SLTs',
    url: '/administration/slt',
    icon: 'fa fa-cubes',
    permission: ['USER_MANAGER','ADMIN','VIEWER']
  },
  {
    name: 'Departments',
    url: '/administration/department-listing',
    icon: 'fa fa-building-o',
    permission: ['USER_MANAGER','ADMIN','VIEWER']
  },
  {
    name: 'User Management',
    url: '/administration/staff-listing',
    icon: 'fa fa-users',
    permission: ['USER_MANAGER','VIEWER'],
    // children: [
    //   {
    //     name: 'New Staff',
    //     url: '/administration/staff-registration',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['USER_MANAGER','ADMINISTRATOR','VIEWER']
    //   },
    //   {
    //     name: 'Staff Listing',
    //     url: '/administration/staff-listing',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['USER_MANAGER','ADMINISTRATOR','VIEWER']
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
