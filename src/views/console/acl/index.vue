<template>
  <el-card style="margin: 10px">
    <div slot="header">
      <span>{{ this.$t('console.acl.title') }}</span>
    </div>
    <!--    <YamlEditor v-model="acl" theme="monokai" />-->
    <YamlEditor v-model="acl" theme="rubyblue" />
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button type="success" style="margin-top: 20px" @click="submit">{{ this.$t('console.acl.save') }}</el-button>
      </el-col>
      <!--      <el-col :span="2">-->
      <!--        <el-upload-->
      <!--          class="upload-demo"-->
      <!--          action="https://jsonplaceholder.typicode.com/posts/"-->
      <!--          accept=".yaml"-->
      <!--          :on-success="handleSuccess"-->
      <!--          :on-error="handleError"-->
      <!--          :limit="1"-->
      <!--          :on-exceed="handleExceed"-->
      <!--          :file-list="config.single.fileList"-->
      <!--        >-->
      <!--          <el-button type="primary" style="margin-top: 20px">上传</el-button>-->
      <!--          &lt;!&ndash;              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>&ndash;&gt;-->
      <!--        </el-upload>-->
      <!--      </el-col>-->
    </el-row>
  </el-card>
</template>

<script>
import YamlEditor from '@/components/YamlEditor/index.vue'
import { getACL, postACL } from '@/api/console/acl'

export default {
  name: 'ACL',
  components: { YamlEditor },
  data() {
    return {
      autoReload: false,
      acl: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    submit() {
      if (!this.autoReload) {
        this.confirm(this.postData)
      } else {
        this.postData()
      }
    },
    confirm(func) {
      this.$confirm(this.$t('console.acl.message.confirmSaveACL'), this.$t('console.acl.message.prompt'), {
        type: 'warning'
      }).then(() => {
        func()
      }).catch(() => {
      })
    },
    async postData() {
      const { code, message } = await postACL({ content: this.acl })
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.$message.success(this.$t('console.acl.message.saveACLSuccess'))
      await this.getData()
    },
    async getData() {
      const { code, data, message } = await getACL()
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.acl = data
    }
  }
}
</script>

<style scoped>

</style>
