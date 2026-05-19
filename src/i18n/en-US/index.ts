import navigation from './navigation';

export default {
  common: {
    actions: {
      asset: 'Asset',
      idle: 'Idle',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',
      register: 'Register',
      reload: 'Reload',
      search: 'Search',
      apply: 'Apply',
      clear: 'Clear',
      download: 'Download',
      close: 'Close',
      confirm: 'Confirm',
      deactivate: 'Deactivate',
      activate: 'Activate',
      add: 'Add',
      update: 'Update',
      report: 'Generate Report'
    },
    notifications: {
      failed: 'Action failed',
      success: 'Action successful',
    },
    labels: {
      actions: 'Actions',
      detail: 'Detail',
      mainMenu: 'MAIN MENU',
      reports: 'Reports',
      account: 'Account',
    },
    rules: {
      required: 'This field is required',
      numeric: 'It must be numerical',
      integer: 'It must be integer'
    },
    messages: {
      noData: 'No records found',
      loading: 'Loading',
      unknown: 'Unknown',
      items: 'item(s)',
      downloadSuccess: 'File downloaded successfully',
      all: 'All',
      noSection: 'No section',
      noResults: 'No results for "{query}"',
      more: 'More options',
      generatingReport: 'Generating report...',
      reportGenerated: 'Report generated successfully',
    },
    report: {
      recordsPerPage: 'Records per page',
      page: 'Page',
      of: 'of',
      dateTime: 'Report date time',
      responsible: 'RESPONSIBLE DATA',
      from: 'From',
      to: 'To',
      searchCriteria: 'Search criteria',
      filtersApplied: 'Filters applied',
      search: 'Search',
      type: 'Type',
      all: 'All',
      totalRecords: 'Total records',
      valid: 'Valid',
      expired: 'Expired',
      expiring: 'Expiring soon',
    },
    dialogs: {
      deleteTitle: 'Confirm Deletion',
    },
    timeUnits: {
      seconds: 'Seconds',
      minutes: 'Minutes',
      hours: 'Hours',
      days: 'Days',
      weeks: 'Weeks',
      months: 'Months',
      years: 'Years',
    }
  },
  errors: {
    fetchData: 'Error loading data from server',
    saveData: 'Error saving data',
    deleteData: 'Error deleting record',
    reportError: 'Error generating PDF report',
  },
  navigation,
  welcome: {
    title: 'Welcome to HR Management!',
    subtitle: 'Select an option from the side menu to get started.'
  },
  ///////////////////////////////////////////////////////////////////////////////////
  tables:{
    description: 'Description',
    status: 'Status',
    options: 'Options',
  },
  areas: {
    title: 'Areas',
    subtitle: 'Management of company areas and branches.',
    form: {
      formNew: 'New Area',
      formEdit: 'Edit Area',
      buttonRegister: 'New Area',
      name: 'Area',
      branch: 'Branch',
      noBranch: 'No Branch',
    }
  },
  entity:{
    title: 'Regulatory Bodies',
    subtitle: 'Management of contributions and regulations.',
    form: {
      formNew: 'New Regulatory Entity',
      formEdit: 'Edit Regulatory Entity',
      buttonRegister: 'New Regulatory Entity',
      buttonImport: 'Import Standard',
      name: 'Regulatory Body',
      percentage: 'Percentage',
      amount: 'Amount',
      order: 'Order'
    },
  }
};