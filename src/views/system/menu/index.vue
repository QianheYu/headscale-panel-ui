<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="create">{{ $t('normal.create') }}</el-button>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">-->
        <!--            {{ $t('normal.delete') }}</el-button>-->
        <!--        </el-form-item>-->
      </el-form>

      <el-table v-loading="loading" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="ID" :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip prop="title" :label="$t('system.menu.title')" width="150" />
        <el-table-column show-overflow-tooltip prop="name" :label="$t('system.menu.name')" />
        <el-table-column show-overflow-tooltip prop="icon" :label="$t('system.menu.icon')" />
        <el-table-column show-overflow-tooltip prop="path" :label="$t('system.menu.path')" />
        <el-table-column show-overflow-tooltip prop="component" :label="$t('system.menu.component')" />
        <el-table-column show-overflow-tooltip prop="redirect" :label="$t('system.menu.redirect')" />
        <el-table-column show-overflow-tooltip prop="sort" :label="$t('system.menu.sort')" align="center" width="80" />
        <el-table-column show-overflow-tooltip prop="status" :label="$t('system.menu.status')" align="center" width="90">
          <template v-slot="scope">
            <el-tag size="small" :type="scope.row.status === 1 ? 'success':'danger'">{{ scope.row.status === 1 ? $t('normal.enabled'):$t('normal.disabled') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="hidden" :label="$t('system.menu.hidden')" align="center" width="80">
          <template v-slot="scope">
            <el-tag size="small" :type="scope.row.hidden === 1 ? 'danger':'success'">{{ scope.row.hidden === 1 ? $t('normal.yes'):$t('normal.no') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="cache" :label="$t('system.menu.cache')" align="center" width="80">
          <template v-slot="scope">
            <el-tag size="small" :type="scope.row.cache === 1 ? 'danger':'success'">{{ scope.row.cache === 1 ? $t('normal.no'):$t('normal.yes') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="activeMenu" :label="$t('system.menu.activeMenu')" />
        <el-table-column fixed="right" :label="$t('system.menu.operate')" align="center" width="120">
          <template v-slot="scope">
            <el-tooltip :content="$t('normal.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('normal.delete')" effect="dark" placement="top">
              <el-popconfirm :title="$t('system.menu.confirmDelete')" @confirm="singleDelete(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-delete" circle type="danger" />
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" :width="$device.mobile || $device.ipad || $device.android ? '90%' : '30%'">
        <el-form ref="dialogForm" :inline="true" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="80px">
          <el-form-item :label="$t('system.menu.title')" prop="title">
            <el-input v-model.trim="dialogFormData.title" :placeholder="$t('system.menu.title')+'(title)'" style="width: 440px" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.name')" prop="name">
            <el-input v-model.trim="dialogFormData.name" :placeholder="$t('system.menu.name')+'(name)'" style="width: 220px" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.sort')" prop="sort">
            <el-input-number v-model.number="dialogFormData.sort" controls-position="right" :min="1" :max="999" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.icon')" prop="icon">
            <el-popover
              placement="bottom-start"
              width="450"
              trigger="click"
              @show="$refs['iconSelect'].reset()"
            >
              <IconSelect ref="iconSelect" @selected="selected" />
              <el-input slot="reference" v-model="dialogFormData.icon" style="width: 440px;" :placeholder="$t('system.menu.iconPlaceholder')" readonly>
                <svg-icon v-if="dialogFormData.icon" slot="prefix" :icon-class="dialogFormData.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>
          <el-form-item :label="$t('system.menu.path')" prop="path">
            <el-input v-model.trim="dialogFormData.path" :placeholder="$t('system.menu.path')+'(path)'" style="width: 440px" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.component')" prop="component">
            <el-input v-model.trim="dialogFormData.component" :placeholder="$t('system.menu.component')+'(component)'" style="width: 440px" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.redirect')" prop="redirect">
            <el-input v-model.trim="dialogFormData.redirect" :placeholder="$t('system.menu.redirect')+'(redirect)'" style="width: 440px" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.status')" prop="status">
            <el-radio-group v-model="dialogFormData.status">
              <el-radio-button :label="$t('normal.yes')" />
              <el-radio-button :label="$t('normal.no')" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('system.menu.hidden')" prop="hidden">
            <el-radio-group v-model="dialogFormData.hidden">
              <el-radio-button :label="$t('normal.yes')" />
              <el-radio-button :label="$t('normal.no')" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('system.menu.alwaysShow')" prop="alwaysShow">
            <el-radio-group v-model="dialogFormData.alwaysShow">
              <el-radio-button :label="$t('normal.yes')" />
              <el-radio-button :label="$t('normal.no')" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('system.menu.breadcrumb')" prop="breadcrumb">
            <el-radio-group v-model="dialogFormData.breadcrumb">
              <el-radio-button :label="$t('normal.yes')" />
              <el-radio-button :label="$t('normal.no')" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('system.menu.cache')" prop="cache">
            <el-radio-group v-model="dialogFormData.cache">
              <el-radio-button :label="$t('normal.yes')" />
              <el-radio-button :label="$t('normal.no')" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('system.menu.activeMenu')" prop="activeMenu">
            <el-input v-model.trim="dialogFormData.activeMenu" :placeholder="$t('system.menu.activeMenu')+'(activeMenu)'" style="width: 440px" />
          </el-form-item>
          <el-form-item :label="$t('system.menu.dialog.parentId')" prop="parentId">
            <!-- <el-cascader
              v-model="dialogFormData.parentId"
              :show-all-levels="false"
              :options="treeselectData"
              :props="{ checkStrictly: true, label:'title', value:'ID', emitPath:false}"
              clearable
              filterable
            /> -->
            <treeselect
              v-model="dialogFormData.parentId"
              :options="treeselectData"
              :normalizer="normalizer"
              style="width:440px"
              @input="treeselectInput"
            />
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
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getMenuTree, createMenu, updateMenuById, batchDeleteMenuByIds } from '@/api/system/menu'

export default {
  name: 'Menu',
  components: {
    IconSelect,
    Treeselect
  },
  data() {
    return {
      // form data
      tableData: [],
      loading: false,

      // parent menu data
      treeselectData: [],
      treeselectValue: 0,

      // dialog
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        title: '',
        name: '',
        icon: '',
        path: '',
        component: 'Layout',
        redirect: '',
        sort: 999,
        status: this.$t('normal.no'),
        hidden: this.$t('normal.no'),
        cache: this.$t('normal.yes'),
        alwaysShow: this.$t('normal.no'),
        breadcrumb: this.$t('normal.yes'),
        activeMenu: '',
        parentId: 0
      },
      dialogFormRules: {
        title: [
          { required: true, message: this.$t('system.menu.message.enterTitle'), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('system.menu.message.titleLength'), trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('system.menu.message.enterName'), trigger: 'blur' },
          { min: 1, max: 100, message: this.$t('system.menu.message.nameLength'), trigger: 'blur' }
        ],
        path: [
          { required: true, message: this.$t('system.menu.message.enterPath'), trigger: 'blur' },
          { min: 1, max: 100, message: this.$t('system.menu.message.pathLength'), trigger: 'blur' }
        ],
        component: [
          { required: false, message: this.$t('system.menu.message.enterComponent'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('system.menu.message.componentLength'), trigger: 'blur' }
        ],
        redirect: [
          { required: false, message: this.$t('system.menu.message.enterRedirect'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('system.menu.message.redirectLength'), trigger: 'blur' }
        ],
        activeMenu: [
          { required: false, message: this.$t('system.menu.message.enterActiveMenu'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('system.menu.message.activeMenuLength'), trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: this.$t('system.menu.message.selectParentId'), trigger: 'change' }
        ]
      },

      // delete button popover
      popoverVisible: false,
      // form multiple selection
      multipleSelection: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // get form data
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getMenuTree()
        this.tableData = data.menuTree
        this.treeselectData = [{ ID: 0, title: this.$t('system.menu.dialog.topMenu'), children: data.menuTree }]
      } finally {
        this.loading = false
      }
    },

    // create
    create() {
      this.dialogFormTitle = this.$t('system.menu.dialog.new')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // edit
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.title = row.title
      this.dialogFormData.name = row.name
      this.dialogFormData.icon = row.icon
      this.dialogFormData.path = row.path
      this.dialogFormData.component = row.component
      this.dialogFormData.redirect = row.redirect
      this.dialogFormData.sort = row.sort
      this.dialogFormData.status = row.status === 1 ? this.$t('normal.yes') : this.$t('normal.no')
      this.dialogFormData.hidden = row.hidden === 1 ? this.$t('normal.yes') : this.$t('normal.no')
      this.dialogFormData.alwaysShow = row.alwaysShow === 1 ? this.$t('normal.yes') : this.$t('normal.no')
      this.dialogFormData.breadcrumb = row.breadcrumb === 1 ? this.$t('normal.yes') : this.$t('normal.no')
      this.dialogFormData.cache = row.cache === 1 ? this.$t('normal.no') : this.$t('normal.yes')
      this.dialogFormData.activeMenu = row.activeMenu
      this.dialogFormData.parentId = row.parentId

      this.dialogFormTitle = this.$t('system.menu.dialog.edit')
      this.dialogType = 'update'
      this.dialogFormVisible = true
    },

    // submit form
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.submitLoading = true

          if (this.dialogFormData.ID === this.dialogFormData.parentId) {
            return this.$message({
              showClose: true,
              message: this.$t('system.menu.message.pathErr'),
              type: 'error'
            })
          }

          if (this.dialogFormData.component === '') {
            this.dialogFormData.component = 'Layout'
          }

          this.dialogFormData.status = this.dialogFormData.status === this.$t('normal.yes') ? 1 : 2
          this.dialogFormData.hidden = this.dialogFormData.hidden === this.$t('normal.yes') ? 1 : 2
          this.dialogFormData.cache = this.dialogFormData.cache === this.$t('normal.yes') ? 2 : 1
          this.dialogFormData.alwaysShow = this.dialogFormData.alwaysShow === this.$t('normal.yes') ? 1 : 2
          this.dialogFormData.breadcrumb = this.dialogFormData.breadcrumb === this.$t('normal.yes') ? 1 : 2
          const dialogFormDataCopy = { ...this.dialogFormData, parentId: this.treeselectValue }
          let msg = ''
          try {
            if (this.dialogType === 'create') {
              const { message } = await createMenu(dialogFormDataCopy)
              msg = message
            } else {
              const { message } = await updateMenuById(dialogFormDataCopy.ID, dialogFormDataCopy)
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
            message: this.$t('system.menu.message.formValidationFailed'),
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
        title: '',
        name: '',
        icon: '',
        path: '',
        component: 'Layout',
        redirect: '',
        sort: 999,
        status: this.$t('normal.no'),
        hidden: this.$t('normal.no'),
        cache: this.$t('normal.yes'),
        alwaysShow: 2,
        breadcrumb: 1,
        activeMenu: '',
        parentId: 0
      }
    },

    // batch delete
    batchDelete() {
      this.$confirm(this.$t('system.menu.message.confirmDeletion'), this.$t('system.menu.message.prompt'), {
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const menuIds = []
        this.multipleSelection.forEach(x => {
          menuIds.push(x.ID)
        })
        let msg = ''
        try {
          const { message } = await batchDeleteMenuByIds({ menuIds: menuIds })
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
          message: this.$t('system.menu.confirm.cancelDelete')
        })
      })
    },

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 单个删除
    async singleDelete(Id) {
      this.loading = true
      let msg = ''
      try {
        const { message } = await batchDeleteMenuByIds({ menuIds: [Id] })
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

    // select icon
    selected(name) {
      this.dialogFormData.icon = name
    },

    // treeselect
    normalizer(node) {
      return {
        id: node.ID,
        label: node.title,
        children: node.children
      }
    },
    treeselectInput(value) {
      this.treeselectValue = value
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
</style>
