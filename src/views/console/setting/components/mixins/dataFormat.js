// eslint-disable-next-line no-unused-vars

import { today } from '@/utils/date'

export class PreAuthKey {
  constructor(id = '', key = '', reusable = false, ephemeral = false, used = false, expire = '', create_at = '', acl_tags = []) {
    this.id = id
    this.key = key
    this.reusable = reusable
    this.ephemeral = ephemeral
    this.used = used
    this.expire = expire
    this.create_at = create_at
    this.acl_tags = acl_tags
  }
  id = '';
  key = '';
  reusable = true;
  ephemeral = true;
  used = true;
  expire = '';
  create_at = '';
  acl_tags = [];
  toJson() {
    return {
      id: this.id,
      key: this.key,
      reusable: this.reusable,
      ephemeral: this.ephemeral,
      used: this.used,
      expire: this.expire,
      create_at: this.create_at,
      acl_tags: this.acl_tags
    }
  }
  static fromJson(json = {}) {
    return new PreAuthKey(
      json.id,
      json.key,
      json.reusable,
      json.ephemeral,
      json.used,
      json.expire,
      json.create_at,
      json.acl_tags
    )
  }
}
export class NewPreAuthKey {
  reusable = false;
  ephemeral = false;
  expire = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString();
  acl_tags = [];
  // expire = '';
  toJson() {
    return {
      expire: this.expire,
      reusable: this.reusable,
      ephemeral: this.ephemeral,
      acl_tags: this.acl_tags
    }
  }
  rule() {
    var validate = (rule, value, callback) => {
      // value format example "2023-04-07T16:00:00.000Z"
      console.debug('validate date')
      if (value.length <= 0) {
        return callback(new Error('日期不可为空'))
      }
      const reg = /^[0-9]{4}-[0|1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9].[0-9]{3}Z$/
      if (!reg.test(value)) {
        return callback(new Error('日期格式错误'))
      }
      const date = Date.parse(value)
      if (date < Date.now()) {
        return callback(new Error('日期不可在当前日期之前'))
      }
      return callback
    }
    return {
      expire: [
        { require: true, validate: validate, trigger: 'blur' }
      ]
    }
  }
}

