<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('system.api.path')">
          <el-input v-model.trim="params.path" clearable :placeholder="$t('system.api.path')" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('system.api.category')">
          <el-input v-model.trim="params.category" clearable :placeholder="$t('system.api.category')" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('system.api.method')">
          <el-select v-model.trim="params.method" clearable :placeholder="$t('system.api.method')" @change="search" @clear="search">
            <el-option :label="$t('system.api.methods.GET')" value="GET" />
            <el-option :label="$t('system.api.methods.POST')" value="POST" />
            <el-option :label="$t('system.api.methods.PUT')" value="PUT" />
            <el-option :label="$t('system.api.methods.PATCH')" value="PATCH" />
            <el-option :label="$t('system.api.methods.DELETE')" value="DELETE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('system.api.creator')">
          <el-input v-model.trim="params.creator" clearable :placeholder="$t('system.api.creator')" @clear="search" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('normal.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="create">{{ $t('normal.create') }}</el-button>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">批量删除</el-button>-->
<!--        </el-form-item>-->
      </el-form>

      <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="path" :label="$t('system.api.path')" />
        <el-table-column show-overflow-tooltip sortable prop="category" :label="$t('system.api.category')" />
        <el-table-column show-overflow-tooltip sortable prop="method" :label="$t('system.api.method')" align="center">
          <template v-slot="scope">
            <el-tag size="small" :type="scope.row.method | methodTagFilter" disable-transitions>{{ scope.row.method }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="creator" :label="$t('system.api.creator')" />
        <el-table-column show-overflow-tooltip sortable prop="desc" :label="$t('system.api.desc')" />
        <el-table-column fixed="right" :label="$t('system.api.operate')" align="center" width="120">
          <template v-slot="scope">
            <el-tooltip :content="$t('normal.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('normal.delete')" effect="dark" placement="top">
              <el-popconfirm :title="$t('system.api.confirmDelete')" @confirm="singleDelete(scope.row.ID)">
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

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="120px">
          <el-form-item :label="$t('system.api.path')" prop="path">
            <el-input v-model.trim="dialogFormData.path" :placeholder="$t('system.api.path')" />
          </el-form-item>
          <el-form-item :label="$t('system.api.category')" prop="category">
            <el-input v-model.trim="dialogFormData.category" :placeholder="$t('system.api.category')" />
          </el-form-item>
          <el-form-item :label="$t('system.api.method')" prop="method">
            <el-select v-model.trim="dialogFormData.method" :placeholder="$t('system.api.method')">
              <el-option :label="$t('system.api.methods.GET')" value="GET" />
              <el-option :label="$t('system.api.methods.POST')" value="POST" />
              <el-option :label="$t('system.api.methods.PUT')" value="PUT" />
              <el-option :label="$t('system.api.methods.PATCH')" value="PATCH" />
              <el-option :label="$t('system.api.methods.DELETE')" value="DELETE" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('system.api.desc')" prop="desc">
            <el-input v-model.trim="dialogFormData.desc" type="textarea" :placeholder="$t('system.api.desc')" show-word-limit maxlength="100" />
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
import { getApis, createApi, updateApiById, batchDeleteApiByIds } from '@/api/system/api'

export default {
  name: 'Api',
  filters: {
    methodTagFilter(val) {
      if (val === 'GET') {
        return ''
      } else if (val === 'POST') {
        return 'success'
      } else if (val === 'PUT') {
        return 'info'
      } else if (val === 'PATCH') {
        return 'warning'
      } else if (val === 'DELETE') {
        return 'danger'
      } else {
        return 'info'
      }
    }
  },
  data() {
    return {
      // Enquiry parameters
      params: {
        path: '',
        method: '',
        category: '',
        creator: '',
        pageNum: 1,
        pageSize: 10
      },
      // Table data
      tableData: [],
      total: 0,
      loading: false,

      // dialog
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        path: '',
        category: '',
        method: '',
        desc: ''
      },
      dialogFormRules: {
        path: [
          { required: true, message: this.$t('system.api.message.enterAccessPath'), trigger: 'blur' },
          { min: 1, max: 100, message: this.$t('system.api.message.accessPathLength'), trigger: 'blur' }
        ],
        category: [
          { required: true, message: this.$t('system.api.message.enterCategory'), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('system.api.message.categoryLength'), trigger: 'blur' }
        ],
        method: [
          { required: true, message: this.$t('system.api.message.selectRequestMethod'), trigger: 'change' }
        ],
        desc: [
          { required: false, message: this.$t('system.api.message.description'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('system.api.message.descriptionLength'), trigger: 'blur' }
        ]
      },

      // delete button popup
      popoverVisible: false,
      // Form Multiple Choice
      multipleSelection: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // Inquire
    search() {
      this.params.pageNum = 1
      this.getTableData()
    },

    // Get form data
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getApis(this.params)
        this.tableData = data.apis
        this.total = data.total
      } finally {
        this.loading = false
      }
    },

    // Add
    create() {
      this.dialogFormTitle = this.$t('system.api.dialog.addNewAPI')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // modify
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.path = row.path
      this.dialogFormData.category = row.category
      this.dialogFormData.method = row.method
      this.dialogFormData.desc = row.desc

      this.dialogFormTitle = this.$t('system.api.dialog.modifyAPI')
      this.dialogType = 'update'
      this.dialogFormVisible = true
    },

    // submit Form
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          let msg = ''
          this.submitLoading = true
          try {
            if (this.dialogType === 'create') {
              const { message } = await createApi(this.dialogFormData)
              msg = message
            } else {
              const { message } = await updateApiById(this.dialogFormData.ID, this.dialogFormData)
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
            message: this.$t('system.api.message.formValidationFailed'),
            type: 'error'
          })
          return false
        }
      })
    },

    // submit Form
    cancelForm() {
      this.resetForm()
    },

    resetForm() {
      this.dialogFormVisible = false
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {
        path: '',
        category: '',
        method: '',
        desc: ''
      }
    },

    // batch delete
    batchDelete() {
      this.$confirm(this.$t('system.api.message.confirmDeletion'), this.$t('system.api.message.prompt'), {
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const apiIds = []
        this.multipleSelection.forEach(x => {
          apiIds.push(x.ID)
        })
        let msg = ''
        try {
          const { message } = await batchDeleteApiByIds({ apiIds: apiIds })
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
          message: this.$t('system.api.message.cancelDelete')
        })
      })
    },

    // Form multiple choice
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // single delete
    async singleDelete(Id) {
      this.loading = true
      let msg = ''
      try {
        const { message } = await batchDeleteApiByIds({ apiIds: [Id] })
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

<style scoped>
  .container-card{
    margin: 10px;
  }

  .delete-popover{
    margin-left: 10px;
  }
</style>
