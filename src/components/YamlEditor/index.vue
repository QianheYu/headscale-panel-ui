<template>
  <div class="yaml-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>

window.jsyaml = require('js-yaml')

import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/rubyblue.css'
// require('script-loader!jsonlint')
import 'codemirror/mode/yaml/yaml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'

// import all codemirror theme
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('codemirror/theme', false, /\.css$/)
requireAll(req)
export default {
  name: 'YamlEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value', 'theme'],
  data() {
    return {
      yamlEditor: false
    }
  },
  watch: {
    value(value) {
      const editorValue = this.yamlEditor.getValue()
      if (value !== editorValue) {
        this.yamlEditor.setValue(this.value)
      }
    }
  },
  mounted() {
    this.yamlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'text/x-yaml',
      gutters: ['CodeMirror-lint-markers'],
      // theme: 'rubyblue',
      theme: this.theme,
      lint: true
    })

    this.yamlEditor.setValue(this.value)
    this.yamlEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.yamlEditor.getValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.yaml-editor {
  height: 100%;
  position: relative;

  ::v-deep {
    .CodeMirror {
      height: auto;
      min-height: 300px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }
}
</style>
