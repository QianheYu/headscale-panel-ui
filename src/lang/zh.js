export default {
  datetime: {
    ago: '前',
    seconds: '秒',
    minutes: '分',
    hours: '小时',
    days: '天',
    weeks: '周',
    months: '月',
    years: '年',
    week: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    },
    month: {
      jan: '一月',
      feb: '二月',
      mar: '三月',
      apr: '四月',
      may: '五月',
      jun: '六月',
      jul: '七月',
      aug: '八月',
      sep: '九月',
      oct: '十月',
      nov: '十一月',
      dec: '十二月'
    }
  },
  normal: {
    nodata: '暂无数据',
    time: '时间',
    date: '日期',
    datetime: '日期时间',
    duration: '耗时',
    operate: '操作',
    describe: '描述',
    status: '状态',
    menu: '菜单',
    ip: 'IP地址',
    path: '路径',
    ok: '确定',
    cancel: '取消',
    edit: '编辑',
    save: '保存',
    delete: '删除',
    deleteAll: '删除所有',
    copy: '复制',
    move: '移动',
    upload: '上传',
    download: '下载',
    yes: '是',
    no: '否',
    true: '对',
    false: '错',
    enable: '启用',
    disable: '禁用',
    enabled: '已启用',
    disabled: '已禁用',
    used: '已使用',
    login: '登陆',
    logout: '退出登陆',
    search: '搜索',
    create: '新建',
    update: '更新',
    tag: '标签',
    expire: '过期',
    expireTime: '过期时间'
  },
  component: {
    iconSelect: {
      placeholder: {
        enterIconName: '请输入图标名称'
      }
    }
  },
  navbar: {
    language: '更改语言',
    size: '文字大小',
    client: '下载客户端'
  },
  account: {
    user: '用户',
    username: '用户名',
    nickname: '昵称',
    mobile: '手机号',
    email: '邮箱',
    account: '账号',
    password: '密码',
    role: '角色',
    permission: '权限',
    introduction: '简介',
    avatar: '头像'
  },
  login: {
    jwtFailed: 'JWT认证失败',
    timeout: '登录超时, 重新登录或继续停留在当前页？',
    invalid: '登录状态已失效',
    reLogin: '重新登录',
    stay: '继续停留'
  },
  page401: {
    back: '返回',
    oops: '糟糕！',
    noPermission: '您没有权限访问该页面。',
    contactLeader: '如有不满请联系你领导。',
    orYouCanGoTo: '或者你可以去：',
    homePage: '回首页',
    altText: '女孩掉了她的冰淇淋。',
    randomView: '随便看'
  },
  pageName: {
    home: '首页',
    profile: '个人中心'
  },
  profile: {
    aboutMe: '关于我',
    changeAccountPassword: '修改账户密码',
    oldPassword: '原密码',
    newPassword: '新密码',
    confirmNewPassword: '确认新密码',
    message: {
      enterOldPassword: '请输入原密码',
      enterNewPassword: '请输入新密码',
      confirmNewPassword: '请确认新密码',
      passwordsInconsistent: '两次输入的密码不一致',
      reEnterNewPassword: '请再次输入新密码',
      length6to30: '长度在 6 到 30 个字符',
      passwordChangedLoginAgain: '密码修改成功，请重新登录',
      formValidationFailed: '表单校验失败'
    }
  },
  dashboard: {
    static: {
      headscaleStatus: 'Headscale状态',
      serverContinuousRunning: '服务器已连续运行',
      serverTime: '服务器时间',
      totalNetworkCardTraffic: '网卡总流量',
      connected: '已连接',
      disconnected: '未连接',
      updateTo: '点击更新至',
      newVersionFound: '发现新版本',
      rollback: '回滚',
      message: {
        error: 'Error',
        warning: 'Warning',
        success: 'Success',
        update: {
          confirm: '确定要更新吗?',
          success: '提交更新请求成功'
        },
        install: {
          title: '安装',
          confirm: '确定要安装吗?',
          success: '提交安装请求成功'
        }
      }
    },
    network: {
      realTimeNetworkSpeed: '实时网速',
      uploadSpeed: '上传速度',
      downloadSpeed: '下载速度'
    },
    info: {
      softwareInfo: '软件信息',
      softwareVersion: '软件版本',
      softwareBranch: '软件分支',
      buildTime: '构建时间',
      goVersion: 'Go版本',
      os: '操作系统',
      arch: '架构'
    }
  },
  system: {
    users: {
      creator: '创建人',
      newPassword: '新密码',
      resetPassword: '重置密码',
      operate: '操作',
      placeholder: {
        selectRole: '选择角色',
        selectStatus: '请选择状态'
      },
      dialog: {
        create: '创建用户',
        edit: '修改用户'
      },
      confirmDelete: '确定删除吗？',
      message: {
        enterUserName: '请输入用户名',
        userNameLength: '长度在 2 到 20 个字符',
        enterPassword: '请输入密码',
        passwordLength: '长度在 6 到 30 个字符',
        enterNickName: '请输入昵称',
        nickNameLength: '长度在 2 到 20 个字符',
        selectRole: '请选择角色',
        selectStatus: '请选择状态',
        enterIntroduction: '请输入说明',
        introductionLength: '长度在 0 到 100 个字符',
        mobileEmpty: '手机号不能为空',
        mobileErr: '请输入正确的手机号',
        emailEmpty: '请输入邮箱',
        emailErr: '请输入正确的邮箱',
        formValidationFailed: '表单校验失败',

        prompt: '提示',
        confirmDelettion: '此操作将永久删除, 是否继续?',
        cancelDelete: '已取消删除'
      }
    },
    roles: {
      name: '角色名称',
      keyword: '关键字',
      level: '等级',
      status: '角色状态',
      creator: '创建人',
      desc: '说明',
      operate: '操作',
      roleDialog: {
        new: '新建角色',
        edit: '修改角色',
        level: '等级(1最高)'
      },
      permsDialog: {
        title: '修改权限',
        menu: '角色菜单',
        api: '角色接口'
      },
      confirmDelete: '确定删除吗？',
      message: {
        enterRoleName: '请输入角色名称',
        roleNameLength: '长度在 1 到 20 个字符',
        enterKeyword: '请输入关键字',
        keywordLength: '长度在 1 到 20 个字符',
        selectRoleStatus: '请选择角色状态',
        description: '说明',
        descriptionLength: '长度在 0 到 100 个字符',
        formValidationFailed: '表单校验失败',
        deleteRoleSuccess: '删除角色成功',
        deleteRoleFailed: '删除角色失败',
        cancelDelete: '已取消删除',
        confirmDeletion: '此操作将永久删除, 是否继续?',
        prompt: '提示',
        updateRoleMenuSuccess: '更新角色菜单成功',
        updateRoleApiSuccess: '更新角色接口成功'
      }
    },
    menu: {
      title: '菜单标题',
      name: '名称',
      icon: '图标',
      iconPlaceholder: '点击选择图标',
      path: '路由地址',
      component: '组件路径',
      redirect: '重定向',
      sort: '排序',
      status: '启用',
      hidden: '隐藏',
      cache: '缓存',
      activeMenu: '高亮菜单',
      alwaysShow: '总是显示',
      breadcrumb: '面包屑显示',
      operate: '操作',
      dialog: {
        new: '新建菜单',
        edit: '修改菜单',
        parentId: '上级目录',
        topMenu: '顶级目录'
      },
      confirmDelete: '确定删除吗？',
      message: {
        enterTitle: '请输入菜单标题',
        titleLength: '长度在 1 到 50 个字符',
        enterName: '请输入菜单名称',
        nameLength: '长度在 1 到 100 个字符',
        enterPath: '请输入访问路径',
        pathLength: '长度在 1 到 100 个字符',
        enterComponent: '请输入组件路径',
        componentLength: '长度在 0 到 100 个字符',
        enterRedirect: '请输入重定向',
        redirectLength: '长度在 0 到 100 个字符',
        enterActiveMenu: '请输入高亮菜单',
        activeMenuLength: '长度在 0 到 100 个字符',
        selectParentId: '请选择上级目录',

        pathErr: '不能选择自身作为自己的上级目录',
        formValidationFailed: '表单校验失败',

        Prompt: '提示',
        confirmDeletion: '此操作将永久删除, 是否继续?',
        cancelDelete: '已取消删除'
      }
    },
    api: {
      path: '访问路径',
      category: '所属类别',
      method: '请求方式',
      creator: '创建人',
      desc: '说明',
      operate: '操作',
      methods: {
        GET: 'GET[获取资源]',
        POST: 'POST[新增资源]',
        PUT: 'PUT[全部更新]',
        PATCH: 'PATCH[增量更新]',
        DELETE: 'DELETE[删除资源]'
      },
      dialog: {
        edit: '编辑API',
        addNewAPI: '新增API',
        modifyAPI: '修改API'
      },
      confirmDelete: '确定删除吗？',
      message: {
        enterAccessPath: '请输入访问路径',
        accessPathLength: '长度在 1 到 100 个字符',
        enterCategory: '请输入所属类别',
        categoryLength: '长度在 1 到 50 个字符',
        selectRequestMethod: '请选择请求方式',
        description: '说明',
        descriptionLength: '长度在 0 到 100 个字符',
        formValidationFailed: '表单校验失败',
        confirmDeletion: '此操作将永久删除, 是否继续?',
        prompt: '提示',
        cancelDelete: '已取消删除'
      }
    },
    headscale: {
      config: 'Headscale 配置',
      multipart: {
        grpcaddress: 'gRPC 地址',
        port: '端口',
        tls: 'TLS',
        cert: '证书',
        key: '私钥'
      }
    }
  },
  log: {
    username: '请求用户',
    startTime: '发起时间',
    method: '请求方法',
    ip: '请求IP',
    path: '请求路径',
    status: '请求状态',
    timeCost: '请求耗时(ms)',
    confirmDelete: '确定删除吗？',
    message: {
      confirmDeletion: '此操作将永久删除, 是否继续?',
      prompt: '提示',
      cancelDelete: '已取消删除'
    }
  },
  console: {
    machines: {
      name: '设备名称',
      ip: 'IP地址',
      all: '全部',
      connected: '已连接',
      disconnected: '已断开',
      neverExpire: '永不过期',
      creator: '所有者',
      lastSeen: '最后连接时间',
      registerMachine: '注册设备',
      nodekey: 'nodekey',
      machine: '设备',
      hostname: '主机名',
      registerMethod: '注册方式',
      registerMethodType: ['未知', '令牌', '命令行', '登陆认证'],
      // registerMethodType: {
      //   unspecified: "未知",
      //   authkey: "令牌",
      //   cli: "命令行",
      //   oidc: "登陆认证",
      // },
      preAuthKey: 'PreAuthKey',
      route: '路由',
      setTags: '设置标签',
      moveMachine: '移动设备',
      placeholder: {
        lowercase: '仅支持小写',
        chooseTags: '请选择ACL标签'
      },
      message: {
        routeUnavailable: '路由不可用',
        userNotSelectedOrNotExist: '未选择用户或用户不存在',
        deviceTagMustStartWithTag: '设备标签必须以tag:开头',
        confirmDeletion: '此操作将删除设备, 是否继续?',
        prompt: '提示',
        deleteMachineSuccess: '删除成功!',
        cancelDelete: '取消删除',
        addMachineSuccess: '添加设备成功'
      }
    },
    routes: {
      all: '全部',
      connected: '已连接',
      disconnected: '已断开',
      availability: '可用性',
      available: '可用',
      unavailable: '不可用',
      route: '路由',
      machine: '设备',
      hostname: '主机名',
      preAuthKey: 'PreAuthKey',
      tags: '标签',
      status: '状态',
      via: 'Via',
      lastSeen: '最后连接时间',
      createdAt: '创建时间',
      switch: '开关状态',
      placeholder: {
        switch: '请选择开关状态',
        status: '请选择状态',
        advertised: '请选择是否可用'
      },
      message: {
        routeUnavailable: '路由不可用',
        prompt: '提示',
        confirmDeletion: '确定删除?'
      }
    },
    acl: {
      title: '权限管理',
      save: '保存',
      description: '未设置或遇到错误',
      message: {
        saveACLSuccess: '保存成功',
        prompt: '注意',
        confirmSaveACL: '此操作将重启Headscale后端, 是否继续?'
      }
    },
    settings: {
      preAuthKey: {
        key: '密钥',
        hiddenExpiredKeys: '隐藏过期密钥',
        hiddenUsedKeys: '隐藏已使用密钥',
        chooseDate: '选择日期',
        used: '已使用',
        reUsable: '可重用',
        ephemeral: '短暂的',
        ephemeralTooltip: '当设备离线时，自动将其从尾网中删除',
        deviceTagMustStartWithTag: '设备标签必须以tag:开头',
        copySucceeded: '复制成功',
        copyFailed: '复制失败'
      }
    }
  }
}
