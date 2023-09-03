<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('system.roles.name')">
          <el-input v-model.trim="params.name" clearable :placeholder="$t('system.roles.name')" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('system.roles.keyword')">
          <el-input v-model.trim="params.keyword" clearable :placeholder="$t('system.roles.keyword')" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('system.roles.status')">
          <el-select v-model.trim="params.status" clearable :placeholder="$t('system.roles.status')" @change="search" @clear="search">
            <el-option :label="$t('normal.enable')" :value="1" />
            <el-option :label="$t('normal.disable')" :value="2" />
          </el-select>
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
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="name" :label="$t('system.roles.name')" />
        <el-table-column show-overflow-tooltip sortable prop="keyword" :label="$t('system.roles.keyword')" />
        <el-table-column show-overflow-tooltip sortable prop="sort" :label="$t('system.roles.level')" />
        <el-table-column show-overflow-tooltip sortable prop="status" :label="$t('system.roles.status')" align="center">
          <template v-slot="scope">
            <el-tag size="small" :type="scope.row.status === 1 ? 'success':'danger'" disable-transitions>{{ scope.row.status === 1 ? $t('normal.enabled'):$t('normal.disabled') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="creator" :label="$t('system.roles.creator')" />
        <el-table-column show-overflow-tooltip sortable prop="desc" :label="$t('system.roles.desc')" />
        <el-table-column fixed="right" :label="$t('system.roles.operate')" align="center" width="140">
          <template v-slot="scope">
            <el-tooltip :content="$t('normal.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip :content="$t('account.permission')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-key" circle type="warning" @click="updatePermission(scope.row.ID)" />
            </el-tooltip>
            <el-tooltip :content="$t('normal.delete')" effect="dark" placement="top">
              <el-popconfirm style="margin-left:10px" :title="$t('system.roles.confirmDelete')" @confirm="singleDelete(scope.row.ID)">
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
        <el-form ref="dialogForm" :inline="true" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="100px">
          <el-form-item :label="$t('system.roles.name')" prop="name">
            <el-input v-model.trim="dialogFormData.name" :placeholder="$t('system.roles.name')" :style="inputWidth" />
          </el-form-item>
          <el-form-item :label="$t('system.roles.keyword')" prop="keyword">
            <el-input v-model.trim="dialogFormData.keyword" :placeholder="$t('system.roles.keyword')" :style="inputWidth" />
          </el-form-item>
          <el-form-item :label="$t('system.roles.status')" prop="status">
            <el-select v-model.trim="dialogFormData.status" :placeholder="$t('system.roles.status')" style="width: 180px">
              <el-option :label="$t('normal.enable')" :value="1" />
              <el-option :label="$t('normal.disable')" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('system.roles.roleDialog.level')" prop="sort">
            <el-input-number v-model.number="dialogFormData.sort" controls-position="right" :min="1" :max="999" />
          </el-form-item>
          <el-form-item :label="$t('system.roles.desc')" prop="desc">
            <el-input v-model.trim="dialogFormData.desc" :style="inputWidth" type="textarea" :placeholder="$t('system.roles.desc')" show-word-limit maxlength="100" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('normal.cancel') }}</el-button>
          <el-button size="mini" :loading="submitLoading" type="primary" @click="submitForm()">{{ $t('normal.ok') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="$t('system.roles.permsDialog.title')" :visible.sync="permsDialogVisible" custom-class="perms-dialog" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
        <el-tabs>
          <el-tab-pane>
            <span slot="label"><svg-icon icon-class="menu1" class-name="role-menu" /> {{ $t('system.roles.permsDialog.menu') }}</span>
            <el-tree
              ref="roleMenuTree"
              v-loading="menuTreeLoading"
              :props="{children: 'children',label: 'title'}"
              :data="menuTree"
              show-checkbox
              node-key="ID"
              check-strictly
              :default-checked-keys="defaultCheckedRoleMenu"
            />

          </el-tab-pane>

          <el-tab-pane>
            <span slot="label"><svg-icon icon-class="api1" class-name="role-menu" /> {{ $t('system.roles.permsDialog.api') }}</span>
            <el-tree
              ref="roleApiTree"
              v-loading="apiTreeLoading"
              :props="{children: 'children',label: 'desc'}"
              :data="apiTree"
              show-checkbox
              node-key="ID"
              :default-checked-keys="defaultCheckedRoleApi"
            />

          </el-tab-pane>
        </el-tabs>
        <div slot="footer">
          <el-button size="mini" :loading="permissionLoading" @click="cancelPermissionForm()">{{ $t('normal.cancel') }}</el-button>
          <el-button size="mini" type="primary" @click="submitPermissionForm()">{{ $t('normal.ok') }}</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { getRoles, createRole, updateRoleById, batchDeleteRoleByIds, getRoleMenusById, getRoleApisById, updateRoleMenusById, updateRoleApisById } from '@/api/system/role'
import { getMenuTree } from '@/api/system/menu'
import { getApiTree } from '@/api/system/api'

export default {
  name: 'Role',
  data() {
    return {
      inputWidth: this.$device.mobile ? '' : 'width: 420px;',
      // search param
      params: {
        name: '',
        keyword: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      // form data
      tableData: [],
      total: 0,
      loading: false,

      // dialog
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        name: '',
        keyword: '',
        status: 1,
        sort: 999,
        desc: ''
      },
      dialogFormRules: {
        name: [
          { required: true, message: this.$t('system.roles.message.enterRoleName'), trigger: 'blur' },
          { min: 1, max: 20, message: this.$t('system.roles.message.enterRoleNameLength'), trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: this.$t('system.roles.message.enterKeyword'), trigger: 'blur' },
          { min: 1, max: 20, message: this.$t('system.roles.message.KeywordLength'), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('system.roles.message.selectRoleStatus'), trigger: 'change' }
        ],
        desc: [
          { required: false, message: this.$t('system.roles.message.description'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('system.roles.message.descriptionLength'), trigger: 'blur' }
        ]
      },

      // delete button popover
      popoverVisible: false,
      // form multiple selection
      multipleSelection: [],

      // change permission
      permsDialogVisible: false,
      permissionLoading: false,
      menuTree: [],
      defaultCheckedRoleMenu: [],
      apiTree: [],
      defaultCheckedRoleApi: [],

      // role id for change permission
      roleId: 0
    }
  },
  created() {
    this.getTableData()
    this.getMenuTree()
    this.getApiTree()
  },
  methods: {
    // search
    search() {
      this.params.pageNum = 1
      this.getTableData()
    },

    // get form data
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getRoles(this.params)
        this.tableData = data.roles
        this.total = data.total
      } finally {
        this.loading = false
      }
    },

    // create
    create() {
      this.dialogFormTitle = this.$t('system.roles.roleDialog.new')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // edit
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.name = row.name
      this.dialogFormData.keyword = row.keyword
      this.dialogFormData.sort = row.sort
      this.dialogFormData.status = row.status
      this.dialogFormData.desc = row.desc

      this.dialogFormTitle = this.$t('system.roles.roleDialog.edit')
      this.dialogType = 'update'
      this.dialogFormVisible = true
    },
    // submit form
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.submitLoading = true
          let msg = ''
          try {
            if (this.dialogType === 'create') {
              const { message } = await createRole(this.dialogFormData)
              msg = message
            } else {
              const { message } = await updateRoleById(this.dialogFormData.ID, this.dialogFormData)
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
            message: this.$t('system.roles.message.formValidationFailed'),
            type: 'error'
          })
          return false
        }
      })
    },

    // cancel submit form
    cancelForm() {
      this.resetForm()
    },

    resetForm() {
      this.dialogFormVisible = false
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {
        name: '',
        keyword: '',
        status: 1,
        sort: 999,
        desc: ''
      }
    },

    // batch delete
    batchDelete() {
      this.$confirm(this.$t('system.roles.message.confirmDeletion'), this.$t('system.roles.message.prompt'), {
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const roleIds = []
        this.multipleSelection.forEach(x => {
          roleIds.push(x.ID)
        })
        let msg = ''
        try {
          const { message } = await batchDeleteRoleByIds({ roleIds: roleIds })
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
          type: 'info',
          message: this.$t('system.roles.message.cancelDelete')
        })
      })
    },

    // Form multiple choice
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // single delete
    async singleDelete(id) {
      this.loading = true
      try {
        const { code } = await batchDeleteRoleByIds({ roleIds: [id] })
        if (code === 200) {
          this.$message({
            showClose: true,
            message: this.$t('system.role.message.deleteRoleSuccess'),
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: this.$t('system.role.message.deleteRoleFailed'),
            type: 'error'
          })
        }
      } finally {
        this.loading = false
      }
      this.getTableData()
    },

    // Modify permissions button
    async updatePermission(roleId) {
      this.roleId = roleId
      this.permsDialogVisible = true
      this.getMenuTree()
      this.getApiTree()
      this.getRoleMenusById(roleId)
      this.getRoleApisById(roleId)
    },

    // Get menu tree
    async getMenuTree() {
      this.menuTreeLoading = true
      try {
        const { data } = await getMenuTree()
        this.menuTree = data.menuTree
      } finally {
        this.menuTreeLoading = false
      }
    },

    // Get API tree
    async getApiTree() {
      this.apiTreeLoading = true
      try {
        const { data } = await getApiTree()
        this.apiTree = data.apiTree
      } finally {
        this.apiTreeLoading = false
      }
    },

    // Get the permission menu of the role
    async getRoleMenusById(roleId) {
      this.permissionLoading = true
      let rseData = []
      try {
        const { data } = await getRoleMenusById(roleId)
        rseData = data
      } finally {
        this.permissionLoading = false
      }

      const menus = rseData.menus
      const ids = []
      menus.forEach(x => { ids.push(x.ID) })
      this.defaultCheckedRoleMenu = ids
      this.$refs.roleMenuTree.setCheckedKeys(this.defaultCheckedRoleMenu)
    },

    // Obtain the permission interface of the role
    async getRoleApisById(roleId) {
      this.permissionLoading = true
      let resData = []
      try {
        const { data } = await getRoleApisById(roleId)
        resData = data
      } finally {
        this.permissionLoading = false
      }

      const apis = resData.apis
      const ids = []
      apis.forEach(x => { ids.push(x.ID) })
      this.defaultCheckedRoleApi = ids
      this.$refs.roleApiTree.setCheckedKeys(this.defaultCheckedRoleApi)
    },

    // modify character menu
    async updateRoleMenusById() {
      this.permissionLoading = true
      let ids = this.$refs.roleMenuTree.getCheckedKeys()
      const idsHalf = this.$refs.roleMenuTree.getHalfCheckedKeys()
      ids = ids.concat(idsHalf)
      ids = [...new Set(ids)]

      try {
        await updateRoleMenusById(this.roleId, { menuIds: ids })
      } finally {
        this.permissionLoading = false
      }

      this.permsDialogVisible = false
      this.$message({
        showClose: true,
        message: this.$t('system.roles.message.updateRoleMenuSuccess'),
        type: 'success'
      })
    },

    // Modify role API
    async updateRoleApisById() {
      this.permissionLoading = true
      const ids = this.$refs.roleApiTree.getCheckedKeys(true)
      try {
        await updateRoleApisById(this.roleId, { apiIds: ids })
      } finally {
        this.permissionLoading = false
      }

      this.permsDialogVisible = false
      this.$message({
        showClose: true,
        message: this.$t('system.roles.message.updateRoleApiSuccess'),
        type: 'success'
      })
    },

    // Confirm modify role permissions
    submitPermissionForm() {
      this.updateRoleMenusById()
      this.updateRoleApisById()
    },

    // Cancel modify role permission
    cancelPermissionForm() {
      this.permsDialogVisible = false
    },

    // paging
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

<style scoped >
  .container-card{
    margin: 10px;
  }

  .role-menu{
    font-size: 15px;
  }
</style>

<style lang="scss">
  .perms-dialog > .el-dialog__body{
    padding-top: 0;
    padding-bottom: 15px;
  }
</style>

