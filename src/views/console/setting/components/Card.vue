<template>
  <el-card style="margin:10px">
    <div slot="header" class="clearfix">
      <span>{{ label }}</span>
    </div>
    <el-form size="mini" :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-checkbox border>Hidden Expired Keys</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox border>Hidden Used Keys</el-checkbox>
      </el-form-item>
    </el-form>
    <el-table :data="data" stripe @row-click="call">
      <!--            <el-table-column show-overflow-tooltip sortable prop="id" label="ID" />-->
      <el-table-column show-overflow-tooltip sortable prop="key" label="Key" />
      <el-table-column show-overflow-tooltip sortable prop="reusable" label="Reusable" />
      <el-table-column show-overflow-tooltip sortable prop="ephemeral" label="Ephemeral" />
      <el-table-column show-overflow-tooltip sortable prop="used" label="Used" />
      <!--        <el-table-column show-overflow-tooltip sortable prop="expireation" label="Expireation" />-->
      <!--        <el-table-column show-overflow-tooltip sortable prop="create_at" label="CreateAt" />-->
      <!--        <el-table-column show-overflow-tooltip sortable prop="acl_tags" label="Tags" />-->
      <el-table-column label="操作">
        <template v-scope="scope">
          <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="color: #1890ff;">
                操作
                <!--                <i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit"><i class="el-icon-edit el-icon" />编辑</el-dropdown-item>
              <el-dropdown-item command="delete" style="color: red"><i class="el-icon-delete el-icon" />删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>

export default {
  name: 'Card',
  // eslint-disable-next-line vue/require-prop-types
  props: ['label', 'data', 'call']
}
</script>

<style scoped>

</style>
