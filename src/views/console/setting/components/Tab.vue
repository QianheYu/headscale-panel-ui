<template>
  <div>
    <el-tabs :type="type" style="margin: 10px">
      <el-tab-pane :label="label">
        <el-form size="mini" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-checkbox-group v-model="checkboxes" @change="handleChange">
              <el-checkbox-button border label="Hidden Expired Keys" />
              <el-checkbox-button border label="Hidden Used Keys" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="preAuthKeyVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="data" header-align="center" @row-click="call">
          <!--            <el-table-column show-overflow-tooltip sortable prop="id" label="ID" />-->
          <el-table-column show-overflow-tooltip sortable prop="key" label="Key" align="center" />
          <el-table-column show-overflow-tooltip sortable prop="reusable" label="Reusable" align="center" />
          <el-table-column show-overflow-tooltip sortable prop="ephemeral" label="Ephemeral" align="center" />
          <el-table-column show-overflow-tooltip sortable prop="used" label="Used" align="center" />
          <el-table-column v-slot="scope" show-overflow-tooltip sortable prop="expire" label="Expire" align="center">
            {{ UtilsDateFormat.fromParse(scope.row.expire).toDateTimeString() }}
          </el-table-column>
          <!--<el-table-column show-overflow-tooltip sortable prop="create_at" label="CreateAt" align="center" />-->
          <!--<el-table-column show-overflow-tooltip sortable prop="acl_tags" label="Tags" align="center" />-->
          <el-table-column show-overflow-tooltip sortable prop="operate" label="Operate" align="center">
            <template v-slot="scope">
              <el-button size="mini" type="danger" :disabled="!(Date.now() < Date.parse(scope.row.expire))" @click="expirePreAuthKey(scope.$index, scope.row)">Expire</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="test" />
    </el-tabs>
    <!--  Dialog-->
    <el-dialog title="New PreAuthKey" :visible.sync="preAuthKeyVisible">
      <el-form size="small" label-width="100px" :rules="preAuthKeysDialog.rule()">
        <el-form-item label="Expire Time">
          <el-date-picker
            v-model="preAuthKeysDialog.expire"
            type="date"
            :picker-options="pickerOptions"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="preAuthKeysDialog.reusable" label="Reusable" />
          <el-checkbox v-model="preAuthKeysDialog.ephemeral" label="Ephemeral" />
        </el-form-item>
        <el-form-item label="ACL Tags">
          <el-select v-model.trim="preAuthKeysDialog.acl_tags" multiple placeholder="Please Choose ACL Tags" style="width:100%">
            <el-option
              v-for="item in acls"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleCreatePreAuthKey">取 消</el-button>
        <el-button type="primary" @click="createPreAuthKey">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createPreAuthKey, expirePreAuthKey } from '@/api/console/preauthkey'
import { NewPreAuthKey } from './mixins/dataFormat'
import { UtilsDateFormat } from '@/utils/date'
export default {
  name: 'Tab',
  computed: {
    UtilsDateFormat() {
      return UtilsDateFormat
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['loading', 'label', 'type', 'data', 'call'],
  data() {
    return {
      checkboxes: [],
      acls: ['test1', 'test2'],
      preAuthKeyVisible: false,
      preAuthKeysDialog: new NewPreAuthKey(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    }
  },
  methods: {
    handleChange(value) {
      console.debug(value)
      console.debug(this.checkboxes)
    },
    cancleCreatePreAuthKey() {
      this.preAuthKeyVisible = false
    },
    async createPreAuthKey() {
      this.preAuthKeyVisible = false
      console.debug(this.preAuthKeysDialog)
      // eslint-disable-next-line no-unused-vars
      const { code, message } = await createPreAuthKey(this.preAuthKeysDialog)
      // if (code !== 200) {
      //   this.$message.error(message)
      // }
      // todo 刷新
    },
    async expirePreAuthKey(index, row) {
      console.debug(row)
      console.debug(Date.now() < Date.parse(row.expire))
      const { code, message } = await expirePreAuthKey(row.key)
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      // todo 刷新
    }
  }
}
</script>

<style scoped>

</style>
