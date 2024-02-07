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
    icon: 'fa fa-home',
    permission: []
  },
  {
    name: 'Project Tools',
    url: '#',
    icon: 'fa fa-wrench',
    permission: ['USER_MANAGER','VIEWER'],
    children: [
      {
        name: 'Projects',
        url: '/administration/waves',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Project Category',
        url: '/administration/project-sub-category',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Sectors',
        url: '/administration/sector-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Sub-sectors',
        url: '/administration/sub-sectors',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Directorates',
        url: '/administration/directorates',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      // {
      //   name: 'Departments',
      //   url: '/administration/department-listing',
      //   icon: 'fa fa-angle-double-right',
      //   permission: ['USER_MANAGER','VIEWER']
      // },
      {
        name: 'Roles',
        url: '/administration/title-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Project Goals',
        url: '/administration/thematic-area',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Project Objectives',
        url: '/administration/rri-goals',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Boroughs',
        url: '/administration/boroughs',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Sub-Counties',
        url: '/administration/sub-counties',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Wards',
        url: '/administration/wards',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      {
        name: 'Sub-sectors',
        url: '/administration/sub-sectors',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
    ]
  },

  {
    name: 'Evaluation Tools',
    url: '/generics/evaluation',
    icon: 'fa  fa-legal',
    permission: ['USER_MANAGER','VIEWER','EVALUATOR']
  },
  {
    name: 'Project Administration',
    url: '/reports/goals',
    icon: 'fa fa-cog',
    permission: ['USER_MANAGER','VIEWER']
  },
  {
    name: 'Reports',
    url: '#',
    icon: 'fa fa-clipboard',
    permission: ['USER_MANAGER','VIEWER'],
    children: [
      {
        name: 'Evaluation',
        url: '/reports/evaluation',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
      // {
      //   name: 'RRI / Project Objectives',
      //   url: '/reports/goals',
      //   icon: 'fa fa-angle-double-right',
      //   permission: ['USER_MANAGER','VIEWER']
      // },
      {
        name: 'Project Report',
        url: '/reports/projects',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER','VIEWER']
      },
    ]
  },
  {
    name: 'User Admin',
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
