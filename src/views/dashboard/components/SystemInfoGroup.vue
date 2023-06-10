<template>
  <div>
    <el-descriptions :title="$t('dashboard.info.softwareInfo')">
      <el-descriptions-item :label="$t('dashboard.info.softwareVersion')">{{ info.version }}</el-descriptions-item>
      <el-descriptions-item :label="$t('dashboard.info.softwareBranch')">
        <el-tag size="small" type="primary">{{ info.branch }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item :label="$t('dashboard.info.buildTime')">{{ info.build_time }}</el-descriptions-item>
      <el-descriptions-item :label="$t('dashboard.info.goVersion')">{{ info.go_version }}</el-descriptions-item>
      <el-descriptions-item :label="$t('dashboard.info.os')">{{ info.os }}</el-descriptions-item>
      <el-descriptions-item :label="$t('dashboard.info.arch')">{{ info.arch }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

export default {
  props: ['value'],
  data() {
    return {
      info: {}
    }
  },
  watch: {
    value(value) {
      this.info = value
    }
  }
}
</script>

<style scoped lang="scss">

</style>
