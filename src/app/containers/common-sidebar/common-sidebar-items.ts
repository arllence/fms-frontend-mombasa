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
  {
    name: 'Home',
    url: '/landing/home',
    icon: 'fa fa-home',
    permission: []
  },
  {
    name: 'Admin Tools',
    url: '#',
    icon: 'fa fa-wrench',
    permission: ['USER_MANAGER'],
    children: [
      {
        name: 'RRI',
        url: '/administration/waves',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Sectors',
        url: '/administration/sector-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Departments',
        url: '/administration/department-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Roles',
        url: '/administration/title-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Thematic Areas',
        url: '/administration/thematic-area',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Goals',
        url: '/administration/rri-goals',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
    ]
  },
  
  // {
  //   name: 'Results Chain',
  //   url: '/generics/view-results-chain',
  //   icon: 'fa  fa-microchip',
  //   permission: ['USER_MANAGER']
  // },
  {
    name: 'Evaluation',
    url: '/generics/evaluation',
    icon: 'fa  fa-legal',
    permission: ['USER_MANAGER','EVALUATOR']
  },
  {
    name: 'Reports',
    url: '#',
    icon: 'fa fa-clipboard',
    permission: ['USER_MANAGER'],
    children: [
      {
        name: 'Evaluation',
        url: '/reports/evaluation',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Goals',
        url: '/reports/goals',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
    ]
  },
  {
    name: 'Users',
    url: '/administration/staff-listing',
    icon: 'fa fa-users',
    permission: ['USER_MANAGER'],
    // children: [
    //   {
    //     name: 'New Staff',
    //     url: '/administration/staff-registration',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['USER_MANAGER']
    //   },
    //   {
    //     name: 'Staff Listing',
    //     url: '/administration/staff-listing',
    //     icon: 'fa fa-angle-double-right',
    //     permission: ['USER_MANAGER']
    //   },
    // ]
  },

  {
    name: 'Profile',
    url: '/profile',
    icon: 'fa fa-street-view',
    permission: []
  }




  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
