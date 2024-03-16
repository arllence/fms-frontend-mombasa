import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from './common-sidebar-items';
import { AuthenticationService } from '../../authentication/services/authentication.service';
@Component({
  selector: 'app-common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.css']
})



export class CommonSidebarComponent {
    tenant_tag: string;
    @Input() navItems: Array<any>;
    action_required_menu = true;
    @HostBinding('class.sidebar-nav') true: any;
    @HostBinding('attr.role') role:any;
    public sidebarMinimized = true;
    public show:boolean =false;
    defaultNavItems: Array<any>;
    constructor(public authService: AuthenticationService) {
     this.navItems = navItems;
     this.defaultNavItems = [
        {
            title: true,
            name: 'Action Required',
            permission: '',
          },

          {
            name: 'Change Password',
            url: '/profile',
            icon: 'fa fa-exclamation-triangle',
            permission: ''
          },

     ];

     this.action_required_menu  = this.authService.requiresPasswordChange();
     console.log(this.action_required_menu)



    }
    // ngAfterViewInit(){
    //   this.action_required_menu  = this.authService.requiresPasswordChange();
    //   console.log(this.action_required_menu)
    // }
    // toggle() {
    //   this.show = !this.show;
    // }
    isDivider(navItem:any) {
        return !!navItem.divider;
    }

    isTitle(navItem:any) {
        return !!navItem.title;
    }

    isHasChild(navItem:any) {
        //  alert(navItems.indexOf(navItem))
        return navItem.hasOwnProperty('children') && navItem.children.length > 0;
      
    }

    sideToggle(i:any){
      if(this.navItems[i].hasOwnProperty('children') && this.navItems[i].children.length > 0){
        if(this.navItems[i].show){
          for (let j = 0; j < this.navItems[i].children.length; j++) {
            if (this.navItems[i].children[j].show) {
              this.navItems[i].children[j].show = !this.navItems[i].children[j].show;
            }
          }
        }else{
          for (let j = 0; j < this.navItems[i].children.length; j++) {
            if (this.navItems[i].children[j].show) {
              this.navItems[i].children[j].show = !this.navItems[i].children[j].show;
            }
          }

        }
      }
      this.navItems[i].show = !this.navItems[i].show;
      console.log(this.navItems[i])



      } 



    }