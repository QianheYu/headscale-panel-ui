<template>
  <el-row>
    <template v-if="standalone">
      <el-card style="margin: 20px">
        <div slot="header">
          <span>{{ $t('system.headscale.config') }}</span>
        </div>
        <YamlEditor v-model.trim="config.yaml" theme="rubyblue" />
        <el-row type="flex" justify="end">
          <el-col :span="2">
            <el-button type="success" style="margin-top: 20px;" @click="submitConfig">{{ $t('normal.save') }}</el-button>
          </el-col>
        </el-row>
      </el-card>
    </template>
    <template v-else>
      <el-card style="margin: 20px">
        <div slot="header">
          <span>grpc设置</span>
        </div>
        <el-form>
          <el-form-item label="grpc address">
            <el-input v-model="config.grpc_listen_addr" placeholder="example: 127.0.0.1:50443"/>
          </el-form-item>
          <el-form-item label="API Token" prop="password">
            <el-input v-model.trim="config.api_key" autocomplete="off" :type="tokenType" placeholder="API Token">
              <span class="show-pwd" @click="showToken">
                <svg-icon :icon-class="tokenType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-input>
          </el-form-item>
          <el-form-item label="Allow Insecure">
            <el-switch v-model="config.grpc_allow_insecure" />
          </el-form-item>
<!--          <el-form-item label="Server Name">-->
<!--            <el-input v-model.trim="config.server_name" auto-complete="off" placeholder="example: headscale.example.com" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="Cert">-->
<!--            <el-upload :file-list="fileListCert" :limit="1" :action="uploadUrl" :on-exceed="handleExceed">-->
<!--              <el-button size="small" type="primary">点击上传</el-button>-->
<!--              <div slot="tip" class="el-upload__tip">只能上传pem/crt文件</div>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="Key">-->
<!--            <el-upload :file-list="fileListKey" :limit="1" :action="uploadUrl" :on-exceed="handleExceed">-->
<!--              <el-button size="small" type="primary">点击上传</el-button>-->
<!--              <div slot="tip" class="el-upload__tip">只能上传pem/key文件</div>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="Use custom cert and key">-->
<!--            <el-switch v-model="config.custom_cert" />-->
<!--          </el-form-item>-->
<!--          <el-form-item v-if="!config.custom_cert" label="CA">-->
<!--            <el-upload :file-list="fileListCA" :limit="1" :action="uploadUrl" :on-exceed="handleExceed" :disabled="!config.custom_cert">-->
<!--              <el-button size="small" type="primary">点击上传</el-button>-->
<!--              <div slot="tip" class="el-upload__tip">只能上传pem/crt文件</div>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->
        </el-form>
        <el-row type="flex" justify="end">
          <el-col :span="2">
            <el-button type="success" style="margin-top: 20px;" @click="submitConfig">{{ $t('normal.save') }}</el-button>
          </el-col>
        </el-row>
      </el-card>
    </template>
  </el-row>
</template>

<script>
import YamlEditor from '@/components/YamlEditor/index.vue'
import { getHeadscaleConfig, postHeadscaleConfig } from '@/api/system/headscale'

export default {
  name: 'Headscale',
  components: { YamlEditor },
  data() {
    return {
      tokenType: 'password',
      standalone: true,
      fileListCert: [],
      fileListKey: [],
      fileListCA: [],
      config: {
        yaml: '',
        address: '',
        port: 0,
        apikey: '',
        tls: false,
        key: '',
        cert: ''
      }
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    async submitConfig() {
      await this.postConfig()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`Current limit of 1 file selected, ${files.length} files selected this time, ${files.length + fileList.length} files selected in total`)
    },
    handleSuccess(response, files, fileList) {
      this.$message.success(files)
    },
    // eslint-disable-next-line handle-callback-err
    handleError(err, file, fileList) {
      this.$message.error(file)
    },
    async getConfig() {
      const { code, data, message } = await getHeadscaleConfig()
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      if (typeof data === 'string') {
        this.config.yaml = data
      }
      if (typeof data === 'object') {
        this.config = data
        this.standalone = false
      }
    },
    async postConfig() {
      const { code, message } = await postHeadscaleConfig(this.config)
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.$message.success(message)
    },
    showToken() {
      if (this.tokenType === 'password') {
        this.tokenType = ''
      } else {
        this.tokenType = 'password'
      }
    }
  }
}
</script>

<style scoped>

</style>

