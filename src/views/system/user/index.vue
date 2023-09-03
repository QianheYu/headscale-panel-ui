<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('account.user')">
          <el-input v-model.trim="params.username" clearable :placeholder="$t('account.user')" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('account.nickname')">
          <el-input v-model.trim="params.nickname" clearable :placeholder="$t('account.nickname')" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('normal.status')">
          <el-select v-model.trim="params.status" clearable :placeholder="$t('normal.status')" @change="search" @clear="search">
            <el-option :label="$t('normal.enable')" value="1" />
            <el-option :label="$t('normal.disable')" value="2" />
          </el-select>
        </el-form-item>
        <!--        <el-form-item :label="$t('account.mobile')">-->
        <!--          <el-input v-model.trim="params.mobile" clearable :placeholder="$t('account.mobile')" @clear="search" />-->
        <!--        </el-form-item>-->
        <el-form-item :label="$t('account.email')">
          <el-input v-model.trim="params.email" clearable :placeholder="$t('account.email')" @clear="search" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('normal.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="create">{{ $t('normal.create') }}</el-button>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">-->
        <!--            {{ $t('normal.delete') }}</el-button>-->
        <!--        </el-form-item>-->
      </el-form>

      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <!--        <el-table-column type="selection" width="55" align="center" />-->
        <el-table-column show-overflow-tooltip sortable prop="username" :label="$t('account.username')" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="nickname" :label="$t('account.nickname')" align="center" />
        <el-table-column show-overflow-tooltip sortable :label="$t('account.permission')" align="center">
          <template slot-scope="scope">
            <template v-for="roleId in scope.row.roleIds">
              <el-tag :key="roleId" size="small" type="primary">{{ roles[roleId - 1].name }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="status" :label="$t('normal.status')" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="scope.row.status === 1 ? 'success':'danger'" disable-transitions>{{ scope.row.status === 1 ? $t('normal.enabled'):$t('normal.disabled') }}</el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column show-overflow-tooltip sortable prop="mobile" :label="$t('account.mobile')" />-->
        <el-table-column show-overflow-tooltip sortable prop="email" :label="$t('account.email')" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="creator" :label="$t('system.users.creator')" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="introduction" :label="$t('normal.describe')" align="center" />
        <el-table-column fixed="right" :label="$t('normal.operate')" align="center" width="120">
          <template slot-scope="scope">
            <el-tooltip :content="$t('normal.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('normal.delete')" effect="dark" placement="top">
              <el-popconfirm :title="$t('system.users.confirmDelete')" @confirm="singleDelete(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-delete" circle type="danger" />
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :total="total"
        :page-sizes="[1, 5, 10, 30]"
        layout="total, prev, pager, next, sizes"
        background
        style="margin-top: 10px;float:right;margin-bottom: 10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
        <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="100px">
          <el-form-item :label="$t('account.username')" prop="username">
            <el-input ref="password" v-model.trim="dialogFormData.username" :placeholder="$t('account.username')" />
          </el-form-item>
          <el-form-item :label="dialogType === 'create' ? $t('system.users.newPassword'):$t('system.users.resetPassword')" prop="password">
            <el-input v-model.trim="dialogFormData.password" autocomplete="off" :type="passwordType" :placeholder="dialogType === 'create' ? $t('system.users.newPassword'):$t('system.users.resetPassword')" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item :label="$t('account.nickname')" prop="nickname">
            <el-input v-model.trim="dialogFormData.nickname" :placeholder="$t('account.nickname')" />
          </el-form-item>
          <el-form-item :label="$t('account.email')" prop="email">
            <el-input v-model.trim="dialogFormData.email" :placeholder="$t('account.email')" />
          </el-form-item>
          <!--          <el-form-item :label="$t('account.mobile')" prop="mobile">-->
          <!--            <el-input v-model.trim="dialogFormData.mobile" :placeholder="$t('account.mobile')" />-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('account.role')" prop="roleIds">
            <el-select v-model.trim="dialogFormData.roleIds" multiple :multiple-limit="1" :placeholder="$t('system.users.placeholder.selectRole')" style="width:100%">
              <el-option
                v-for="item in roles"
                :key="item.ID"
                :label="item.name"
                :value="item.ID"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('normal.status')" prop="status">
            <el-select v-model.trim="dialogFormData.status" :placeholder="$t('system.users.placeholder.selectStatus')" style="width:100%">
              <el-option :label="$t('normal.enable')" :value="1" />
              <el-option :label="$t('normal.disable')" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('normal.describe')" prop="introduction">
            <el-input v-model.trim="dialogFormData.introduction" type="textarea" :placeholder="$t('account.introduction')" show-word-limit maxlength="100" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('normal.cancel') }}</el-button>
          <el-button size="mini" :loading="submitLoading" type="primary" @click="submitForm()">{{ $t('normal.ok') }}</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt'
import { getUsers, createUser, updateUserById, batchDeleteUserByIds } from '@/api/system/user'
import { getRoles } from '@/api/system/role'

export default {
  name: 'User',
  data() {
    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error(this.$t('system.users.message.mobileEmpty')))
    //   } else {
    //     const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    //     if (reg.test(value)) {
    //       callback()
    //     } else {
    //       return callback(new Error(this.$t('system.users.message.mobileErr')))
    //     }
    //   }
    // }
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('system.users.message.emailEmpty')))
      } else {
        // const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        const reg = /^(([a-zA-Z]|[0-9])+\.)?([a-zA-Z]|[0-9])+@[a-zA-Z0-9]+\.([a-zA-Z]{2,5})$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error(this.$t('system.users.message.emailErr')))
        }
      }
    }
    return {
      // search param
      params: {
        username: '',
        nickname: '',
        status: '',
        // mobile: '',
        email: '',
        pageNum: 1,
        pageSize: 10
      },
      // form data
      tableData: [],
      total: 0,
      loading: false,

      // roles
      roles: [],

      passwordType: 'password',

      publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsfk9FP4ZeVLYSzRMJpv4
MSzm1WzM+3c9zfi98ldcLa7aQADzDi7vnk0TqXNMPY2r5Dmykrvf6HtC8DCEg01b
oBapvkfJy0KdQ1XbGihOGrZKMqCvS6DUx8Gt1osc7ag13GcQC/pI+VNMrNO1wuZX
veGEKsd6K8sw8Xc8DtyJMr2m/GVZftWSzzDu6/dHWFglFQ5nbLogiA7PDJc9m3Pu
cMOWfHEHkeymvRTnTD0FlqjpWL7Dr42CdqtUqL4abQW6xJcbde5ow1SXzznO240m
5xDTnBxS5gh+uvz6NzENc2JUX1fP7W9zYwvV7/PMNoi47gQ61O5sp/H+vpmyXyV+
mwIDAQAB
-----END PUBLIC KEY-----`,
      // dialog
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        username: '',
        password: '',
        nickname: '',
        status: 1,
        // mobile: '',
        email: '',
        avatar: '',
        introduction: '',
        roleIds: ''
      },
      dialogFormRules: {
        username: [
          { required: true, message: this.$t('system.users.message.enterUserName'), trigger: 'blur' },
          { min: 2, max: 20, message: this.$t('system.users.message.userNameLength'), trigger: 'blur' }
        ],
        password: [
          { required: false, message: this.$t('system.users.message.enterPassword'), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('system.users.message.passwordLength'), trigger: 'blur' }
        ],
        nickname: [
          { required: false, message: this.$t('system.users.message.enterNickName'), trigger: 'blur' },
          { min: 2, max: 20, message: this.$t('system.users.message.nickNameLength'), trigger: 'blur' }
        ],
        roleIds: [
          { required: true, message: this.$t('system.users.message.selectRole'), trigger: 'change' }
        ],
        // mobile: [
        //   { required: true, validator: checkPhone, trigger: 'blur' }
        // ],
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('system.users.message.selectStatus'), trigger: 'change' }
        ],
        introduction: [
          { required: false, message: this.$t('system.users.message.enterIntroduction'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('system.users.message.introductionLength'), trigger: 'blur' }
        ]
      },

      // delete button popover
      popoverVisible: false,
      // Form multiple choice
      multipleSelection: []
    }
  },
  created() {
    this.getTableData()
    this.getRoles()
  },
  methods: {
    // search
    search() {
      this.params.pageNum = 1
      this.getTableData()
    },

    // get table data
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getUsers(this.params)
        this.tableData = data.users
        this.total = data.total
      } finally {
        this.loading = false
      }
    },

    // get role data
    async getRoles() {
      const res = await getRoles(null)

      this.roles = res.data.roles
    },

    // create
    create() {
      this.dialogFormData.username = ''
      this.dialogFormData.password = ''
      this.dialogFormData.nickname = ''
      this.dialogFormData.status = 1
      // this.dialogFormData.mobile = ''
      this.dialogFormData.email = ''
      this.dialogFormData.avatar = ''
      this.dialogFormData.introduction = ''
      this.dialogFormData.roleIds = []
      this.dialogFormTitle = this.$t('system.users.dialog.create')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // edit
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.username = row.username
      this.dialogFormData.password = ''
      this.dialogFormData.nickname = row.nickname
      this.dialogFormData.status = row.status
      // this.dialogFormData.mobile = row.mobile
      this.dialogFormData.email = row.email
      this.dialogFormData.introduction = row.introduction
      this.dialogFormData.roleIds = row.roleIds

      this.dialogFormTitle = this.$t('system.users.dialog.edit')
      this.dialogType = 'update'
      this.passwordType = 'password'
      this.dialogFormVisible = true
    },

    // submit form
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.submitLoading = true

          this.dialogFormDataCopy = { ...this.dialogFormData }
          if (this.dialogFormData.password !== '') {
          // password RSA encrypt operation
            const encryptor = new JSEncrypt()
            // setting public key
            encryptor.setPublicKey(this.publicKey)
            // Encrypt password
            const encPassword = encryptor.encrypt(this.dialogFormData.password)
            this.dialogFormDataCopy.password = encPassword
          }
          let msg = ''
          try {
            if (this.dialogType === 'create') {
              const { message } = await createUser(this.dialogFormDataCopy)
              msg = message
            } else {
              const { message } = await updateUserById(this.dialogFormDataCopy.ID, this.dialogFormDataCopy)
              msg = message
            }
          } finally {
            this.submitLoading = false
          }

          this.resetForm()
          this.getTableData()
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: this.$t('system.users.message.formValidationFailed'),
            type: 'error'
          })
          return false
        }
      })
    },

    // submit form
    cancelForm() {
      this.resetForm()
    },

    resetForm() {
      this.dialogFormVisible = false
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {
        username: '',
        password: '',
        nickname: '',
        status: 1,
        // mobile: '',
        email: '',
        avatar: '',
        introduction: '',
        roleIds: ''
      }
    },

    // Batch delete
    batchDelete() {
      this.$confirm(this.$t('system.users.message.confirmDeletion'), this.$t('system.users.message.prompt'), {
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const userIds = []
        this.multipleSelection.forEach(x => {
          userIds.push(x.ID)
        })
        let msg = ''
        try {
          const { message } = await batchDeleteUserByIds({ userIds: userIds })
          msg = message
        } finally {
          this.loading = false
        }

        this.getTableData()
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: this.$t('system.users.confirm.cancelDelete')
        })
      })
    },

    // Form Multiple Choice
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // single delete
    async singleDelete(Id) {
      this.loading = true
      let msg = ''
      try {
        const { message } = await batchDeleteUserByIds({ userIds: [Id] })
        msg = message
      } finally {
        this.loading = false
      }

      this.getTableData()
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      })
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    // 分页
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.params.pageNum = val
      this.getTableData()
    }
  }
}
</script>

<style scoped>
  .container-card{
    margin: 10px;
  }

  .delete-popover{
    margin-left: 10px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>
