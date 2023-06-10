<template>
  <div>
    <el-tabs>
      <el-tab-pane label="OIDC">
        <el-form size="small" label-width="100px" :rules="oidcDialog.rule()">
          <el-form-item label="Client ID">
            <el-input v-model="oidcDialog.client_id" />
          </el-form-item>
          <el-form-item label="Client Secret">
            <el-input v-model="oidcDialog.client_secret" />
          </el-form-item>
<!--          <el-form-item label="Redirect URI">-->
<!--            <el-input v-model="oidcDialog.redirect_uri" />-->
<!--          </el-form-item>-->
          <el-form-item label="Authorization Endpoint">
            <el-input v-model="oidcDialog.authorization_endpoint" placeholder="http(s)://your-domain">
              <template slot="append">/api/oidc/authorize</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Issuer">
            <el-input v-model="oidcDialog.issuer" placeholder="http(s)://your-domain">
              <!--              <template slot="prepend">https://</template>-->
            </el-input>
          </el-form-item>
          <el-form-item label="jwks_uri">
            <el-input v-model="oidcDialog.jwks_uri" placeholder="http(s)://your-domain">
              <template slot="append">/api/oidc/jwks</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Token Endpoint">
            <el-input v-model="oidcDialog.token_endpoint" placeholder="http(s)://your-domain">
              <template slot="append">/api/oidc/token</template>
            </el-input>
          </el-form-item>
          <el-form-item label="User Info Endpoint">
            <el-input v-model="oidcDialog.user_info_endpoint" placeholder="http(s)://your-domain">
              <template slot="append">/api/oidc/userinfo</template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="8" />
          <el-col :span="4">
            <el-button type="primary" @click="saveOidcConfig">保存</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="EMAIL">
        <el-form>
          <el-form-item label="Mailbox">
            <el-input v-model="email.mailbox" placeholder="no-repo@example.com" />
          </el-form-item>
          <el-form-item label="SMTP">
            <el-input v-model="email.smtp" placeholder="smtp.example.com:587" />
          </el-form-item>
          <el-form-item label="TLS">
            <el-switch v-model="email.tls" />
          </el-form-item>
          <el-form-item label="Account">
            <el-input v-model="email.account" placeholder="no-repo@example.com" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="email.password" type="password" />
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="8" />
          <el-col :span="2">
            <el-button type="primary" @click="saveEmailConfig">保存</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data() {
    return {
      oidcDialog: {
        client_id: '',
        client_secret: '',
        redirect_uri: '',
        scope: '',
        grant_type: '',
        issuer: '',
        jwks_uri: '',
        authorization_endpoint: '',
        token_endpoint: '',
        user_info_endpoint: ''
      },
      email: {
        mailbox: '',
        smtp: '',
        tls: false,
        account: '',
        password: ''
      }
    }
  },
  methods: {
    async saveOidcConfig() {
      // todo post request
      this.$message.success('保存成功')
      // todo refresh page
    },
    async saveEmailConfig() {
      // todo post request
      this.$message.success('保存成功')
      // todo refresh page
    }
  }
}
</script>

<style scoped>

</style>
