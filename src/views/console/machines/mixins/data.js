import { PreAuthKey } from '@/views/console/setting/components/mixins/dataFormat'

export class Machine {
  id = '';
  name = '';
  machine_key = '';
  node_key = '';
  disco_key = '';
  ip_addresses = [];

  last_seen = { seconds: 0, nanos: 0 };
  last_successful_update = { seconds: 0, nanos: 0 };
  expiry = { seconds: 0, nanos: 0 };

  pre_auth_key = new PreAuthKey();
  create_at = { seconds: 0, nanos: 0 };
  register_method = '';

  forced_tags = [];
  invalid_tags = [];
  valid_tags = [];
  given_name = '';
  online = false;
}

export class RegisterMachine {
  nodekey = '';
}

export class Route {
  constructor(id = '', machine = null, prefix = '', advertised = false, enabled = false, is_primary = false, createdAt = '', updatedAt = '', deletedAt = '') {
    this.id = id
    this.machine = machine
    this.prefix = prefix
    this.advertised = advertised
    this.enabled = enabled
    this.is_primary = is_primary
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
  }

  static fromJson(json = {}) {
    return new Route(json.id, json.machine, json.prefix, json.advertised, json.enabled, json.is_primary, json.createdAt, json.updatedAt, json.deletedAt)
  }
}
