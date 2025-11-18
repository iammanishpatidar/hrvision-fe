export const CREATE_BUSINESS_ONBOARDING_ROUTE = '/business/register';
export const GET_BUSINESS_SETTING_ROUTE = '/business/fetch';
export const UPDATE_BUSINESS_SETTING_ROUTE = '/business/update';
export const DELETE_BUSINESS_SETTING_ROUTE = '/business/delete';
export const GET_ADMIN_EMPLOYEE_ROUTE = '/employee/fetch';
export const FETCH_BANK_DETAILS_ROUTE = '/bank-details/fetch';
export const CREATE_BANK_DETAILS_ROUTE = '/bank-details/create';
export const UPDATE_BANK_DETAILS_ROUTE = '/bank-details/update';
export const UPDATE_ADDRESS_DETAILS_ROUTE = '/address/update';
export const UPDATE_EMERGENCY_DETAILS_ROUTE = '/emergencyContact/update';
export const UPDATE_EMPLOYEE_DETAILS_ROUTE = '/employee/update';
export const FETCH_CURRENT_SALARY_ROUTE = '/compensation/employee/';
export const UPDATE_CURRENT_SALARY_ROUTE = '/compensation';

// Invite Employee
// POST
export const INVITE_EMPLOYEE = '/employee-invitation/invite'
export const VALIDATE_INVITATION_TOKEN = '/employee-invitation/details'
export const RESPOND_TO_INVITATION = '/employee-invitation/respond'
export const GET_ALL_ROLES = '/roles/all'
export const GET_ALL_DESIGNATIONS = '/designations/all'
export const GET_ALL_DEPARTMENTS = '/department/fetch/all'

// Leave Types Routes
// GET
export const FETCH_LEAVE_TYPES = '/leave-types/fetch/business';
// POST
export const CREATE_LEAVE_TYPES = '/leave-types/create';
// PUT
export const UPDATE_LEAVE_TYPES = '/leave-types/update';
// DELETE
export const DELETE_LEAVE_TYPES = '/leave-types/delete';

// Leave Routes
// GET
export const FETCH_EMPLOYEE_LEAVES = '/leaves/fetch';
export const FETCH_LEAVE_REQUEST_ROUTE = '/leaves/business';

// POST
export const CREATE_EMPLOYEE_LEAVES = '/leaves/apply';

export const UPLOAD_LOGO_ROUTE = '/business/upload-logo';

// PUT
export const UPDATE_EMPLOYEE_LEAVES = '/leaves/update';
export const UPDATE_LEAVE_STATUS_ROUTE = '/leaves/update-status';

// DELETE
export const DELETE_EMPLOYEE_LEAVES = '/leaves/delete';

// Holiday Api Routes
export const FETCH_HOLIDAYS_ROUTE = '/holidays/fetch';
export const CREATE_HOLIDAY_ROUTE = '/holidays/create';
export const UPDATE_HOLIDAY_ROUTE = '/holidays/update';
export const DELETE_HOLIDAY_ROUTE = '/holidays/delete';

// Working Days Routes
// GET
export const FETCH_WORKING_DAYS_ROUTE = '/working-days/fetch/business';
// GET
export const FETCH_ALL_WORKING_DAYS_ROUTE = '/working-days/fetch/all';
// POST
export const UPDATE_WORKING_DAYS_ROUTE = '/working-days/mapping';
export const FETCH_EMPLOYEE_BUSINESS_ROUTE = '/employee/business';


// Assets Routes
export const FETCH_ASSETS_ROUTE = '/assets/fetch';
export const ADD_ASSET_ROUTE = '/assets/create';
export const UPDATE_ASSET_ROUTE = '/assets/update';
export const DELETE_ASSET_ROUTE = '/assets/delete';
export const FETCH_ASSETS_REQUEST_ROUTE = '/asset-requests/fetch';
export const CREATE_ASSET_REQUEST_ROUTE = '/asset-requests/create';
export const UPDATE_ASSET_REQUEST_ROUTE = '/asset-requests';

// Category Routes
export const FETCH_CATEGORY_ROUTE = '/categories/fetch';
// PUT
export const APPROVE_EMPLOYEE_LEAVES = '/leaves/update-status';


// Job Titles Routes
export const CREATE_JOB_TITLE_ROUTE = '/job-titles/create';
export const UPDATE_JOB_TITLE_ROUTE = '/job-titles/update';
export const FETCH_JOB_TITLES_ROUTE = '/job-titles/fetch/business';

export const CREATE_TIME_TRACKING_ROUTE = '/time-tracking/create';
export const FETCH_TIME_TRACKING_ROUTE = '/time-tracking/all';
export const STOP_TIME_TRACKING_ROUTE = '/time-tracking/stop';