<template>
  <el-card style="margin: 10px">
    <el-tabs :type="type">
      <el-tab-pane :label="label">
        <el-form size="mini" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-checkbox border>Hidden Expired Keys</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox border>Hidden Used Keys</el-checkbox>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="data" stripe style="width: 100%" @row-click="call">
          <!--            <el-table-column show-overflow-tooltip sortable prop="id" label="ID" />-->
          <el-table-column show-overflow-tooltip sortable prop="key" label="Key" />
          <el-table-column show-overflow-tooltip sortable prop="reusable" label="Reusable" />
          <el-table-column show-overflow-tooltip sortable prop="ephemeral" label="Ephemeral" />
          <el-table-column show-overflow-tooltip sortable prop="used" label="Used" />
          <el-table-column show-overflow-tooltip sortable prop="expireation" label="Expireation" />
          <el-table-column show-overflow-tooltip sortable prop="create_at" label="CreateAt" />
          <el-table-column show-overflow-tooltip sortable prop="acl_tags" label="Tags" />
          <el-table-column label="操作">
            <template v-scope="scope">
              <el-dropdown trigger="click">
                <!--              <span class="el-dropdown-link" style="color: #1890ff;">-->
                <!--                操作-->
                <!--                &lt;!&ndash;                <i class="el-icon-arrow-down el-icon&#45;&#45;right" />&ndash;&gt;-->
                <!--              </span>-->
                <el-button class="el-dropdown-link" type="primary" size="mini" plain>操作</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit"><i class="el-icon-edit el-icon" />编辑</el-dropdown-item>
                  <el-dropdown-item command="delete" style="color: red"><i class="el-icon-delete el-icon"/>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="test" />
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'CardTab',
  // eslint-disable-next-line vue/require-prop-types
  props: ['label', 'type', 'loading', 'data', 'call']
}
</script>

<style scoped>

</style>
