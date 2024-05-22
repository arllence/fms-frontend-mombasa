const domain = window.location.hostname;
let xserverurl
if ( domain === 'localhost'){
    xserverurl = 'http://127.0.0.1:8000';
} else {
    xserverurl = 'http://172.20.0.42:4000';
}
export let serverurl  = xserverurl


// export let serverurl = 'http://20.102.106.83:5701';
// export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'https://test.youthadapt.africa/test_backend';

// ng build --configuration production

export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION + 'acl/login';
export let reset_user_password_url = serverurl + API_VERSION + 'acl/reset-user-password';

export let list_user_roles = serverurl + API_VERSION + 'account-management/list-roles';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';


// department
export let list_departments = serverurl + API_VERSION + 'department/department';
export let create_department_url = serverurl + API_VERSION + 'department/department';
export let edit_department_url = serverurl + API_VERSION + 'department/department';
export let list_department_url = serverurl + API_VERSION + 'department/department';
export let delete_department_url = serverurl + API_VERSION + 'department/department';
export let department_detail_url = serverurl + API_VERSION + 'department/department';
export let department_url = serverurl + API_VERSION + 'department/department';
export let upload_departments_url = serverurl + API_VERSION + 'department/upload';

// slt
export let slt_url = serverurl + API_VERSION + 'slt/slt';

// reports
export let requisitions_report_url = serverurl + API_VERSION + 'srrs-reports/requisitions';
export let replacement_report_url = serverurl + API_VERSION + 'trs-reports/transport';

// analytics
export let general_analytics_url = serverurl + API_VERSION + 'srrs-analytics/general';

// SRRS
export let recruit_url = serverurl + API_VERSION + 'srrs/recruit';
export let approval_url = serverurl + API_VERSION + 'srrs/approve-request';
export let hr_details_update_url = serverurl + API_VERSION + 'srrs/hr-details-update';
export let upload_budget_approval_url = serverurl + API_VERSION + 'srrs/attach-budget-approval';


// ACCOUNT MANAGEMENT
export let create_user_url = serverurl + API_VERSION + 'ict-support/create-user';
export let bulk_create_user_url = serverurl + API_VERSION + 'ict-support/bulk-create-user';
export let list_staff_url = serverurl + API_VERSION + 'account-management/filter-by-username';
export let swap_user_department_url = serverurl + API_VERSION + 'ict-support/swap-user-department';
export let suspend_user_url = serverurl + API_VERSION + 'ict-support/suspend-user';
export let unsuspend_user_url = serverurl + API_VERSION + 'ict-support/un-suspend-user';
export let reset_password_url = serverurl + API_VERSION + 'ict-support/reset-user-password';
export let complete_profile_url = serverurl + API_VERSION + 'ict-support/complete-profile';
export let get_user_details_url = serverurl + API_VERSION + 'account-management/get-user-details';
export let change_password_url = serverurl + API_VERSION + 'account-management/change-password';
export let users_with_role_url = serverurl + API_VERSION + 'account-management/list-users-with-role';
export let edit_user_url = serverurl + API_VERSION + 'ict-support/edit-user';
export let award_user_role_url = serverurl + API_VERSION + 'ict-support/award-role';
export let revoke_user_role_url = serverurl + API_VERSION + 'ict-support/revoke-role';
