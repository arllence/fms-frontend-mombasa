const domain = window.location.hostname;
let xserverurl
if ( domain === 'localhost'){
    xserverurl = 'http://127.0.0.1:8000';
} else {
    xserverurl = 'http://51.12.248.43:4003';
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


// mms
export let quote_url = serverurl + API_VERSION + 'mms/quote';
export let assign_quote_url = serverurl + API_VERSION + 'mms/assign';
export let close_quote_url = serverurl + API_VERSION + 'mms/close-quote';

// reports
export let quotation_report_url = serverurl + API_VERSION + 'mmqs-reports/quotation';

// analytics
export let quotation_general_analytics_url = serverurl + API_VERSION + 'mmqs-analytics/general';


// foundation
export let sector_url = serverurl + API_VERSION + 'foundation/sector';
export let sub_sector_url = serverurl + API_VERSION + 'foundation/sub-sector';
export let directorate_url = serverurl + API_VERSION + 'foundation/directorate';
export let title_url = serverurl + API_VERSION + 'foundation/title';
export let overseer_url = serverurl + API_VERSION + 'foundation/overseer';
export let thematic_area_url = serverurl + API_VERSION + 'foundation/thematic-areas';
export let rri_goals_url = serverurl + API_VERSION + 'foundation/rri-goals';
export let team_members_url = serverurl + API_VERSION + 'foundation/team-members';
export let achievements_url = serverurl + API_VERSION + 'foundation/achievements';
export let wave_url = serverurl + API_VERSION + 'foundation/waves';
export let weekly_reports_url = serverurl + API_VERSION + 'foundation/weekly-reports';
export let workplan_url = serverurl + API_VERSION + 'foundation/workplan';
export let result_chain_url = serverurl + API_VERSION + 'foundation/results-chain';
export let evaluate_url = serverurl + API_VERSION + 'foundation/evaluation';
export let assign_evaluate_url = serverurl + API_VERSION + 'foundation/assign-evaluation';
export let boroughs_url = serverurl + API_VERSION + 'foundation/boroughs';
export let sub_counties_url = serverurl + API_VERSION + 'foundation/sub-counties';
export let wards_url = serverurl + API_VERSION + 'foundation/wards';
export let estates_url = serverurl + API_VERSION + 'foundation/estates';
export let project_sub_category_url = serverurl + API_VERSION + 'foundation/project-sub-category';
export let objective_comments_url = serverurl + API_VERSION + 'foundation/objective-comments';

// reports
export let evaluation_report_url = serverurl + API_VERSION + 'reports/evaluation';

// analytics
export let general_analytics_url = serverurl + API_VERSION + 'analytics/general';
export let budget_analytics_url = serverurl + API_VERSION + 'analytics/budget';




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


export let validators_approved_documents_url = serverurl + API_VERSION + 'edms/validator-view/approved-documents';
export let validators_rejected_documents_url = serverurl + API_VERSION + 'edms/validator-view/rejected-documents';
export let validators_pending_validation_documents_url = serverurl + API_VERSION + 'edms/validator-view/pending-validation-documents';
export let validators_dashboard_url = serverurl + API_VERSION + 'edms/validator-view/analytics';
export let validators_approve_document_url = serverurl + API_VERSION + 'edms/validator-view/approve-document';
export let validators_reject_document_url = serverurl + API_VERSION + 'edms/validator-view/reject-document';
export let validators_submit_for_approval_document_url = serverurl + API_VERSION + 'edms/validator-view/submit-for-approval-document';
export let swap_document_url = serverurl + API_VERSION + 'edms/validator-view/swap-document';


export let filter_document_by_file_url = serverurl + API_VERSION + 'edms/document/filter-document-by-file-no';
export let filter_revoked_document_by_file_url = serverurl + API_VERSION + 'edms/document/filter-revoked-document-by-file-no';


export let fetch_document_records_url = serverurl + API_VERSION + 'edms/document/fetch-document-records';
export let fetch_document_record_details_url = serverurl + API_VERSION + 'edms/document/fetch-document-records-details';
export let fetch_user_document_types_url = serverurl + API_VERSION + 'edms/document-types/user-document-types';
export let fetch_document_type_fields_url = serverurl + API_VERSION + 'edms/document-types/get-document-fields';
export let post_document_fields_url = serverurl + API_VERSION + 'edms/clerk-view/post-document-records';
export let post_main_document_fields_url = serverurl + API_VERSION + 'edms/clerk-view/post-main-document-records';

export let edit_document_record_url = serverurl + API_VERSION + 'edms/clerk-view/edit-document-record';
export let edit_main_document_record_url = serverurl + API_VERSION + 'edms/clerk-view/edit-main-document-record';


export let document_status_analytics_url = serverurl + API_VERSION + 'analytics/list-document-status';

export let list_data_clerks_url = serverurl + API_VERSION + 'analytics/list-data-clerks';
export let list_data_validators_url = serverurl + API_VERSION + 'analytics/list-data-validators';
export let list_departments_url = serverurl + API_VERSION + 'analytics/list-departments';


export let data_clerk_analytics_url = serverurl + API_VERSION + 'analytics/data-clerk-analytics';
export let data_validators_analytics_url = serverurl + API_VERSION + 'analytics/data-validator-analytics';
export let data_department_analytics_url = serverurl + API_VERSION + 'analytics/department-analytics';
export let data_document_status_analytics_url = serverurl + API_VERSION + 'analytics/document-status-analytics';

export let list_document_by_file_number_url = serverurl + API_VERSION + 'edms/document/filter-document-by-file-no';




export let list_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/list-document-types';
export let create_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/create';
export let edit_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/edit-view';
export let delete_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/delete-view';
export let detail_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/detail-view';


export let list_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/list-document-fields';
export let create_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/create';
export let edit_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/edit-view';
export let delete_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/delete-view';
export let detail_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/detail-view';

export let list_input_types_url = serverurl + API_VERSION + 'edms/document-fields-config/list-input-types';
export let revoke_document_url = serverurl + API_VERSION + 'edms/document/revoke-document';

export let cleaner_post_validation_data_url = serverurl + API_VERSION + 'data-cleaning/post-cleaning-dataset-record';


export let award_user_role_url = serverurl + API_VERSION + 'ict-support/award-role';
export let revoke_user_role_url = serverurl + API_VERSION + 'ict-support/revoke-role';

export let data_cleaning_file_filter_url = serverurl + API_VERSION + 'data-cleaning/filter-document-by-file-no';



export let create_notifications_url = serverurl + API_VERSION + 'notices/create';
export let list_notifications_url = serverurl + API_VERSION + 'notices/list-notices';
export let delete_notifications_url = serverurl + API_VERSION + 'notices/create';
export let detail_notifications_url = serverurl + API_VERSION + 'notices/detail-view';
export let edit_notifications_url = serverurl + API_VERSION + 'notices/edit-view';
// ng serve --host 0.0.0.0


export let list_document_pending_revokation_url = serverurl + API_VERSION + 'edms/document-activity-view/pending-revokation-documents';
export let delete_document_records_details_url = serverurl + API_VERSION + 'edms/document-activity-view/delete-document-records-details';

export let post_document_swap_url = serverurl + API_VERSION + 'edms/document-types-config/swap-document-view';
export let document_approve_revoke_url = serverurl + API_VERSION + 'edms/document/approved-revoked-document';

export let create_document_comment_url = serverurl + API_VERSION + 'edms/validator-view/post-document-comment';


export let cleaning_create_document_types_url = serverurl + API_VERSION + 'data-cleaning/create-file-document-type-verified';
export let cleaning_update_document_types_url = serverurl + API_VERSION + 'data-cleaning/edit-file-document-type-verified';
export let cleaning_delete_document_types_url = serverurl + API_VERSION + 'data-cleaning/delete-file-document-type-verified';

export let data_cleaning_file_delete_url = serverurl + API_VERSION + 'data-cleaning/update-file';
export let data_cleaning_file_update_department = serverurl + API_VERSION + 'data-cleaning/update-file-department';



export let cleaning_create_parcel_information_url = serverurl + API_VERSION + 'data-cleaning/create-parcel-information';
export let cleaning_edit_parcel_information_url = serverurl + API_VERSION + 'data-cleaning/edit-parcel-information';


export let cleaning_create_parcel_owner_url = serverurl + API_VERSION + 'data-cleaning/create-parcel-owner-information';
export let cleaning_edit_parcel_owner_url = serverurl + API_VERSION + 'data-cleaning/edit-parcel-owner-information';
export let cleaning_delete_parcel_owner_url = serverurl + API_VERSION + 'data-cleaning/delete-parcel-owner-information';

export let list_entity_types_url = serverurl + API_VERSION + 'data-cleaning/list-entity-types';
export let start_data_cleaning_url = serverurl + API_VERSION + 'data-cleaning/start-data-cleaning';

export let change_data_cleaning_file_status_url = serverurl + API_VERSION + 'data-cleaning/post-file-status';
export let data_cleaning_file_comments_url = serverurl + API_VERSION + 'data-cleaning/file-comments';


export let data_cleaning_fetch_file_parcel_information_url = serverurl + API_VERSION + 'data-cleaning/file-parcel-information';

export let data_cleaning_fetch_document_type_verification_information_url = serverurl + API_VERSION + 'data-cleaning/file-document-type-verification-information';

export let list_cleaning_entity_types_url = serverurl + API_VERSION + 'data-cleaning/list-entity-types';
export let list_cleaning_parcel_numbering_types_url = serverurl + API_VERSION + 'data-cleaning/list-parcel-numbering-types';
export let list_cleaning_parcel_ownership_types_url = serverurl + API_VERSION + 'data-cleaning/list-parcel-ownership-types';
export let list_cleaning_parcel_status_url = serverurl + API_VERSION + 'data-cleaning/list-parcel-status';
export let list_cleaning_system_types_url = serverurl + API_VERSION + 'data-cleaning/list-cleaning-systems';
export let list_cleaning_ownership_rights_url = serverurl + API_VERSION + 'data-cleaning/list-ownership-rights';
export let list_cleaning_ownership_identification_types_url = serverurl + API_VERSION + 'data-cleaning/list-ownership-identification-types';
export let list_cleaning_file_status_url = serverurl + API_VERSION + 'data-cleaning/list-file-cleaning-status';


export let cleaning_create_parcel_beneficiary_url = serverurl + API_VERSION + 'data-cleaning/create-parcel-beneficiary';
export let cleaning_edit_parcel_beneficiary_url = serverurl + API_VERSION + 'data-cleaning/update-parcel-beneficiary';

export let cleaning_filter_parcel_owners_url = serverurl + API_VERSION + 'data-cleaning/filter-parcel-owners';
export let cleaning_filter_parcel_owners_beneficiaries_url = serverurl + API_VERSION + 'data-cleaning/filter-parcel-owners-beneficiaries';
export let cleaning_delete_parcel_beneficiary_url = serverurl + API_VERSION + 'data-cleaning/delete-parcel-owner-beneficiary';


