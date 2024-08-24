<template>
  <div>
    <el-card style="margin-bottom:20px;max-width: 580px;">
      <div slot="header" class="clearfix">
        <span>{{ $t('profile.changeAccountPassword') }}</span>
      </div>

      <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="100px">

        <el-form-item :label="$t('profile.oldPassword')" prop="oldPassword">
          <el-input v-model.trim="dialogFormData.oldPassword" autocomplete="on" :type="passwordTypeOld" :placeholder="$t('profile.message.enterOldPassword')" />
          <span class="show-pwd" @click="showPwdOld">
            <svg-icon :icon-class="passwordTypeOld === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item :label="$t('profile.newPassword')" prop="newPassword">
          <el-input v-model.trim="dialogFormData.newPassword" autocomplete="on" :type="passwordTypeNew" :placeholder="$t('profile.message.enterNewPassword')" />
          <span class="show-pwd" @click="showPwdNew">
            <svg-icon :icon-class="passwordTypeNew === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item :label="$t('profile.confirmNewPassword')" prop="confirmPassword">
          <el-input v-model.trim="dialogFormData.confirmPassword" autocomplete="on" :type="passwordTypeConfirm" :placeholder="$t('profile.message.confirmNewPassword')" />
          <span class="show-pwd" @click="showPwdConfirm">
            <svg-icon :icon-class="passwordTypeConfirm === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item>
          <el-button :loading="submitLoading" type="primary" @click="submitForm">{{ $t('normal.ok') }}</el-button>
          <el-button @click="cancelForm">{{ $t('normal.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changePwd } from '@/api/system/user'
import store from '@/store'
import JSEncrypt from 'jsencrypt'
import { publicKey } from '@/vendor/publickey'

export default {
  data() {
    const confirmPass = (rule, value, callback) => {
      if (value) {
        if (this.dialogFormData.newPassword !== value) {
          callback(new Error(this.$t('profile.message.passwordsInconsistent')))
        } else {
          callback()
        }
      } else {
        callback(new Error(this.$t('profile.message.reEnterNewPassword')))
      }
    }
    return {
      submitLoading: false,
      dialogFormData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      dialogFormRules: {
        oldPassword: [
          { required: true, message: this.$t('profile.message.enterOldPassword'), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('profile.message.length6to30'), trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: this.$t('profile.message.enterNewPassword'), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('profile.message.length6to30'), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: confirmPass, trigger: 'blur' }
        ]
      },
      publicKey: publicKey,
      passwordTypeOld: 'password',
      passwordTypeNew: 'password',
      passwordTypeConfirm: 'password'
    }
  },
  methods: {
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.dialogFormDataCopy = { ...this.dialogFormData }

          // Cipher RSA encryption processing
          const encryptor = new JSEncrypt()
          // Setting the public key
          encryptor.setPublicKey(this.publicKey)
          // encrypted password
          const oldPasswd = encryptor.encrypt(this.dialogFormData.oldPassword)
          const newPasswd = encryptor.encrypt(this.dialogFormData.newPassword)
          const confirmPasswd = encryptor.encrypt(this.dialogFormData.confirmPassword)
          this.dialogFormDataCopy.oldPassword = oldPasswd
          this.dialogFormDataCopy.newPassword = newPasswd
          this.dialogFormDataCopy.confirmPassword = confirmPasswd

          this.submitLoading = true
          const { code, message } = await changePwd(this.dialogFormDataCopy)

          this.submitLoading = false
          if (code !== 200) {
            return this.$message({
              showClose: true,
              message: message,
              type: 'error'
            })
          }
          this.resetForm()
          this.$message({
            showClose: true,
            message: this.$t('profile.message.passwordChangedLoginAgain'),
            type: 'success'
          })
          // log back in
          setTimeout(() => {
            store.dispatch('user/logout').then(() => {
              location.reload() // To re-instantiate the vue-router object Avoiding bugs
            })
          }, 1500)
        } else {
          this.$message({
            showClose: true,
            message: this.$t('profile.message.formValidationFailed'),
            type: 'error'
          })
          return false
        }
      })
    },
    cancelForm() {
      this.resetForm()
    },
    resetForm() {
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    showPwdOld() {
      if (this.passwordTypeOld === 'password') {
        this.passwordTypeOld = ''
      } else {
        this.passwordTypeOld = 'password'
      }
    },
    showPwdNew() {
      if (this.passwordTypeNew === 'password') {
        this.passwordTypeNew = ''
      } else {
        this.passwordTypeNew = 'password'
      }
    },
    showPwdConfirm() {
      if (this.passwordTypeConfirm === 'password') {
        this.passwordTypeConfirm = ''
      } else {
        this.passwordTypeConfirm = 'password'
      }
    }
  }
}
</script>

<style scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

</style>
