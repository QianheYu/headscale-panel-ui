export default {
  datetime: {
    seconds: 'seconds',
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
    weeks: 'weeks',
    months: 'months',
    years: 'years',
    week: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    },
    month: {
      jan: 'jan',
      feb: 'feb',
      mar: 'mar',
      apr: 'apr',
      may: 'may',
      jun: 'jun',
      jul: 'jul',
      aug: 'aug',
      sep: 'sep',
      oct: 'oct',
      nov: 'nov',
      dec: 'dec'
    }
  },
  normal: {
    time: 'Time',
    date: 'Date',
    datetime: 'DateTime',
    duration: 'Duration',
    operate: 'Operate',
    describe: 'Describe',
    status: 'Status',
    menu: 'Menu',
    ip: 'IP',
    path: 'Path',
    ok: 'OK',
    cancel: 'Cancel',
    edit: 'Edit',
    save: 'Save',
    delete: 'Delete',
    deleteAll: 'Delete All',
    copy: 'Copy',
    move: 'Move',
    upload: 'Upload',
    download: 'Download',
    yes: 'Yes',
    no: 'No',
    true: 'True',
    false: 'False',
    enable: 'Enable',
    disable: 'Disable',
    enabled: 'Enabled',
    disabled: 'Disabled',
    used: 'Used',
    login: 'Login',
    logout: 'Logout',
    search: 'Search',
    create: 'Create',
    update: 'Update',
    expire: 'Expire',
    expireTime: 'Expire Time',
    tag: 'Tag'
  },
  component: {
    iconSelect: {
      placeholder: {
        enterIconName: 'Please enter icon name'
      }
    }
  },
  account: {
    user: 'User',
    username: 'User Name',
    nickname: 'Nick Name',
    mobile: 'Mobile',
    email: 'Email',
    account: 'Account',
    password: 'Password',
    role: 'Role',
    permission: 'Permission',
    introduction: 'Introduction',
    avatar: 'Avatar'
  },
  login: {
    jwtFailed: 'JWT authentication failed',
    timeout: 'Login timeout, re-login or stay on the current page?',
    invalid: 'Login status has expired',
    reLogin: 'Re-login',
    stay: 'Stay'
  },
  page401: {
    back: 'Back',
    oops: 'Oops!',
    noPermission: 'You do not have permission to access this page.',
    contactLeader: 'Please contact your leader if you have any questions.',
    orYouCanGoTo: 'Or you can go to:',
    homePage: 'Home Page',
    altText: 'Girl has dropped her ice cream.',
    randomView: 'Random View'
  },
  pageName: {
    home: 'Home',
    profile: 'Profile'
  },
  profile: {
    aboutMe: 'About Me',
    changeAccountPassword: 'Change account password',
    oldPassword: 'Old',
    newPassword: 'New',
    confirmNewPassword: 'Confirm',
    message: {
      enterOldPassword: 'Please enter the old password',
      enterNewPassword: 'Please enter a new password',
      confirmNewPassword: 'Please confirm the new password',
      passwordsInconsistent: 'The two passwords entered are inconsistent',
      reEnterNewPassword: 'Please enter the new password again',
      length6to30: 'Length should be between 6 to 30 characters',
      passwordChangedLoginAgain: 'Password changed successfully, please log in again',
      formValidationFailed: 'Form validation failed'
    }
  },
  dashboard: {
    static: {
      headscaleStatus: 'Headscale status',
      serverContinuousRunning: 'Server has been running',
      serverTime: 'Server time',
      totalNetworkCardTraffic: 'Total network card traffic',
      connected: 'Connected',
      disconnected: 'Not connected',
      updateTo: 'Click to update to',
      newVersionFound: 'New version found',
      message: {
        error: 'Error',
        warning: 'Warning',
        success: 'Success',
        update: {
          confirm: 'Are you sure you want to update?',
          success: 'Update request submitted successfully'
        },
        install: {
          title: 'Installation',
          confirm: 'Are you sure you want to install?',
          success: 'Installation request submitted successfully'
        }
      }
    },
    network: {
      realTimeNetworkSpeed: 'Real-time network speed',
      uploadSpeed: 'Upload speed',
      downloadSpeed: 'Download speed'
    },
    info: {
      softwareInfo: 'Software Information',
      softwareVersion: 'Software Version',
      softwareBranch: 'Software Branch',
      buildTime: 'Build Time',
      goVersion: 'Go Version',
      os: 'OS',
      arch: 'Architecture'
    }
  },
  system: {
    users: {
      creator: 'Creator',
      newPassword: 'New Password',
      resetPassword: 'Reset Password',
      operate: 'Operate',
      placeholder: {
        selectRole: 'Select Role',
        selectStatus: 'Please select status'
      },
      dialog: {
        create: 'Create User',
        edit: 'Edit User'
      },
      confirmDelete: 'Are you sure to delete? ',
      message: {
        enterUserName: 'Please enter the user name',
        userNameLength: 'Length between 2 and 20 characters',
        enterPassword: 'Please enter the password',
        passwordLength: 'Length between 6 and 30 characters',
        enterNickName: 'Please enter the nickname',
        nickNameLength: 'Length between 2 and 20 characters',
        selectRole: 'Pleadse select the role',
        selectStatus: 'Please select the status',
        enterIntroduction: 'Please enter the introduction',
        introductionLength: 'Length between 0 and 100 characters',
        mobileEmpty: 'mobile can not be empty',
        mobileErr: 'Please enter the correct mobile phone number',
        emailEmpty: 'Please enter email address',
        emailErr: 'Please enter the correct email address',
        formValidationFailed: 'Form validation failed',

        prompt: 'Prompt',
        confirmDeletion: 'This operation will be permanently deleted, are you sure?',
        cancelDelete: 'Canceled Delete'
      }
    },
    roles: {
      name: 'Role Name',
      keyword: 'Keyword',
      level: 'Level',
      status: 'Status',
      creator: 'Creator',
      desc: 'Describe',
      operate: 'Operate',
      roleDialog: {
        new: 'New Role',
        edit: 'Edit Role',
        level: 'Level (1 Highest)'
      },
      permsDialog: {
        title: 'Edit Permission',
        menu: 'Role Menu',
        api: 'Role API'
      },
      confirmDelete: 'Are you sure to delete?',
      message: {
        enterRoleName: 'Please enter role name',
        roleNameLength: 'Length between 1 and 20 characters',
        enterKeyword: 'Please enter keyword',
        keywordLength: 'Length between 1 and 20 characters',
        selectRoleStatus: 'Please select role status',
        description: 'Description',
        descriptionLength: 'Length between 0 and 100 characters',
        formValidationFailed: 'Form validation failed',
        deleteRoleSuccess: 'Delete Role Success',
        deleteRoleFailed: 'Delete Role Failed',
        cancelDelete: 'Canceled deletion',
        confirmDeletion: 'This operation will permanently delete, do you want to continue?',
        prompt: 'Prompt',
        updateRoleMenuSuccess: 'Update role menu successful',
        updateRoleApiSuccess: 'Update role api successful'
      }
    },
    menu: {
      title: 'Menu Title',
      name: 'Name',
      icon: 'Icon',
      iconPlaceholder: 'click to choose icon',
      path: 'Routing',
      component: 'Component',
      redirect: 'Redirect',
      sort: 'Sort',
      status: 'Status',
      hidden: 'Hidden',
      cache: 'Cache',
      activeMenu: 'Active Menu',
      alwaysShow: 'Always Show',
      breadcrumb: 'Breadcrumb',
      operate: 'Operate',
      dialog: {
        new: 'New Menu',
        edit: 'Edit Menu',
        parentId: 'Parent Directory',
        topMenu: 'Top Menu'
      },
      confirmDelete: 'Are you sure to delete?',
      message: {
        enterTitle: 'Please enter menu title',
        titleLength: 'Length between 1 and 50 characters',
        enterName: 'Please enter menu name',
        nameLength: 'Length between 1 and 100 characters',
        enterPath: 'Please enter access path',
        pathLength: 'Length between 1 and 100 characters',
        enterComponent: 'Please enter component path',
        componentLength: 'Length between 0 and 100 characters',
        enterRedirect: 'Please enter redirect',
        redirectLength: 'Length between 0 and 100 characters',
        enterActiveMenu: 'Please enter active menu',
        activeMenuLength: 'Length between 0 and 100 characters',
        selectParentId: 'Please select parent directory',

        pathErr: 'Cannot select itself as its own parent directory',
        formValidationFailed: 'Form validation failed',

        prompt: 'Prompt',
        confirmDeletion: 'This operation will be permanently deleted, are you sure?',
        cancelDelete: 'Canceled Delete'
      }
    },
    api: {
      path: 'Access Path',
      category: 'Category',
      method: 'Method',
      creator: 'Creator',
      desc: 'Describe',
      operate: 'Operate',
      methods: {
        GET: 'GET[Retrieve]',
        POST: 'POST[Create]',
        PUT: 'PUT[Update All]',
        PATCH: 'PATCH[Update Patch]',
        DELETE: 'DELETE[Delete]'
      },
      dialog: {
        edit: 'Edit API',
        addNewAPI: 'Add New API',
        modifyAPI: 'Modify API'
      },
      confirmDelete: 'Are you sure to delete? ',
      message: {
        enterAccessPath: 'Please enter the access path',
        accessPathLength: 'Length should be between 1 and 100 characters',
        enterCategory: 'Please enter the category',
        categoryLength: 'Length should be between 1 and 50 characters',
        selectRequestMethod: 'Please select the request method',
        description: 'Description',
        descriptionLength: 'Length should be between 0 and 100 characters',
        formValidationFailed: 'Form validation failed',
        confirmDeletion: 'This operation will permanently delete, do you want to continue?',
        prompt: 'Prompt',
        cancelDelete: 'Deletion canceled'
      }
    },
    headscale: {
      config: 'Headscale Config',
      grpcaddress: 'gRPC Address',
      port: 'Port',
      tls: 'TLS',
      cert: 'Cert',
      key: 'Key'
    }
  },
  log: {
    username: 'User',
    startTime: 'Start Time',
    method: 'Method',
    ip: 'IP',
    path: 'Path',
    status: 'Status',
    timeCost: 'Time Cost(ms)',
    confirmDelete: 'Are you sure to delete?',
    message: {
      confirmDeletion: 'This operation will be permanently deleted, are you sure?',
      prompt: 'Prompt',
      cancelDelete: 'Canceled Delete'
    },
    confirm: {
      title: 'Tips',
      message: 'This operation will be permanently deleted, are you sure?',
      canceledDelete: 'Canceled Delete'
    }
  },
  console: {
    machines: {
      name: 'Machine Name',
      ip: 'IP Address',
      all: 'All',
      connected: 'Connected',
      disconnected: 'Disconnected',
      neverExpire: 'Never Expire',
      creator: 'Creator',
      lastSeen: 'Last Seen',
      registerMachine: 'Register Machine',
      nodekey: 'nodekey',
      machine: 'Machine',
      hostname: 'Hostname',
      registerMethod: 'Register Method',
      preAuthKey: 'PreAuthKey',
      route: 'Route',
      setTags: 'Set Tags',
      moveMachine: 'Move Machine',
      placeholder: {
        lowercase: 'Only supports lowercase',
        chooseTags: 'Please Choose ACL Tags'
      },
      message: {
        routeUnavailable: 'Route not available',
        userNotSelectedOrNotExist: 'User not selected or does not exist',
        deviceTagMustStartWithTag: 'The device tag must start with tag:',
        confirmDeletion: 'This operation will delete the machine, continue?',
        prompt: 'Prompt',
        deleteMachineSuccess: 'Delete success!',
        cancelDelete: 'Cancelled delete',
        addMachineSuccess: 'Add Machine Success'
      }
    },
    routes: {
      all: 'All',
      connected: 'Connected',
      disconnected: 'Disconnected',
      availability: 'Availability',
      available: 'Available',
      unavailable: 'Unavailable',
      route: 'Route',
      machine: 'Machine',
      hostname: 'Hostname',
      preAuthKey: 'PreAuthKey',
      tags: 'Tags',
      status: 'Status',
      via: 'Via',
      lastSeen: 'Last Seen',
      createdAt: 'Created At',
      switch: 'Switch',
      placeholder: {
        switch: 'Please select switch state',
        status: 'Please select status state',
        advertised: 'Please select advertised state'
      },
      message: {
        deleteRoleSuccess: 'Delete Role Seccess',
        deleteRoleFailed: 'Delete Role Failed',
        routeUnavailable: 'Route not available',
        prompt: 'Prompt',
        confirmDeletion: 'Are you sure to delete this route?'
      }
    },
    acl: {
      title: 'Access Control',
      save: 'Save',
      message: {
        saveACLSuccess: 'Save Success',
        prompt: 'Prompt',
        confirmSaveACL: 'This will restart the Headscale backend, continue?'
      }
    },
    settings: {
      preAuthKey: {
        key: 'Key',
        hiddenExpiredKeys: 'Hidden Expired Keys',
        hiddenUsedKeys: 'Hidden Used Keys',
        chooseDate: 'Choose a date',
        used: 'Used',
        reUsable: 'Reusable',
        ephemeral: 'Ephemeral',
        deviceTagMustStartWithTag: 'The device tag must start with tag:',
        copySucceeded: 'Copy Succeeded',
        copyFailed: 'Copy Failed'
      }
    }
  }
}
