import navigation from './navigation';

export default {
  common: {
    actions: {
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
      required: 'This field is required'
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
  formBtn: {
    registration: 'New Registration',
    save: 'Save',
    cancel: 'Cancel',
  },
  areas: {
    title: 'Areas',
    subtitle: 'Description $$$$$$$',
    form: {
      area: 'Area*',
      description: 'Description*',
      branch: 'Branch*',
      noBranch: 'No Branch',
    },
    table: {
      title: 'Area Management',
      index: 'N°',
      name: 'Area',
      description: 'Description',
      branch: 'Branch',
      options: 'Options',
      recordsPerPage: "Record per Page:",
      of: "of",
    }
  },
};
