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
    name: 'Management',
    url: '/administration/staff-registration',
    icon: 'fa fa-cog',
    permission: ['USER_MANAGER', 'TEAM_LEADER'],
    children: [
      {
        name: 'Department Listing',
        url: '/administration/department-listing',
        icon: 'fa fa-microchip',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Staff Listing',
        url: '/administration/staff-listing',
        icon: 'fa fa-users',
        permission: ['USER_MANAGER', 'TEAM_LEADER', 'ICT_SUPPORT']
      },
      {
        name: 'New Staff',
        url: '/administration/staff-registration',
        icon: 'fa fa-user-plus',
        permission: ['USER_MANAGER']
      }
    ]



  },

  {
    name: 'Support',
    url: '/administration/revoke-document',
    icon: 'fa fa-phone',
    // permission: '',
    permission: ['ICT_SUPPORT'],
     children: [
      {
        name: 'Revoke Requests',
        url: '/administration/revoke-document',
        icon: 'fa fa-history',
        permission: ['ICT_SUPPORT']

      },
      // {
      //   name: 'Test',
      //   url: '/trust',
      //   icon: 'fa fa-history',
      //   permission: ['ICT_SUPPORT']

      // },

     ]
  },
  {
    name: 'Communication',
    url: '/cleaner-view/capture-data',
    icon: 'fa fa-bullhorn',
    // permission: '',
    permission: ['COMMUNICATION_MANAGER'],
     children: [
      {
        name: 'Notices',
        url: '/administration/notification-listing',
        icon: 'fa fa-video-camera',
        permission: ['COMMUNICATION_MANAGER']

      },

     ]
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
