<template>
  <el-form
    ref="updateHttpCodeAttrs"
    :model="attrs"
    :rules="rules"
    :show-message="false"
    label-width="0"
    size="small"
    class="update-attr-layer update-attr-http-code"
  >
    <el-form-item prop="code">
      <el-select filterable clearable v-model="attrs.code" placeholder="状态码" :teleported="false">
        <el-option v-for="item in httpCodeList" :key="item.code" :label="item.code + ' ' + item.desc" :value="item.code">
          {{ item.code }} {{ item.desc }}
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="intro">
      <el-input ref="intro" placeholder="Response Status Code:" v-model="attrs.intro" clearable />
    </el-form-item>
  </el-form>
</template>

<script>
  import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
  import setNode from './mixins/setNode'
  import { $emit } from '@natosoft/shared'
  import HttpCodeMap from '../../common/HttpCodeMap'

  export default {
    name: 'UpdateHttpCodeAttrs',
    mixins: [setNode],
    components: {
      ElForm,
      ElFormItem,
      ElInput,
      ElSelect,
      ElOption,
    },
    watch: {
      'attrs.code': function () {
        if (!this.attrs.intro) {
          this.onSubmit()
        }
      },
      node: function () {
        if (this.node) {
          this.intro = this.node.attrs.intro
          this.code = this.node.attrs.code
        }
      },
    },
    data() {
      return {
        httpCodeList: HttpCodeMap.concat([]),
        popper: null,
        intro: '',
        code: '',
        isEnterPressed: false,
        rules: {
          code: { required: true, message: '', trigger: 'change' },
          intro: { required: true, message: '', trigger: 'change' },
          codeDesc: { required: true, message: '', trigger: 'change' },
        },
      }
    },

    methods: {
      onHide(cb) {
        this.$refs['updateHttpCodeAttrs'].validate((valid) => {
          if (valid && this.node) {
            const attrs = { ...this.attrs }
            const codeInfo = this.httpCodeList.find((item) => item.code === this.attrs.code) || { desc: '' }

            // 对比是否改变，未改变不进行操作
            if (this.intro === attrs.intro && this.code === attrs.code && !this.isEnterPressed) {
              return
            }

            attrs.codeDesc = codeInfo.desc
            cb(this.isCreate, this.node, attrs)
          }
        })
      },
      onSubmit() {
        this.$refs['updateHttpCodeAttrs'].validate((valid) => {
          if (valid && this.node) {
            const attrs = { ...this.attrs }
            attrs.codeDesc = (this.httpCodeList.find((item) => item.code === this.attrs.code) || { desc: '' }).desc
            $emit(this, this.isCreate ? 'on-create' : 'on-update-attr', this.node, attrs)
          }
        })
      },

      focus() {
        this.$nextTick(() => {
          this.$refs['intro'].focus()
        })
      },

      handleKeyDown(event) {
        this.isEnterPressed = false
        if (['Enter', 'Escape'].indexOf(event.key) !== -1) {
          event.preventDefault()
          event.stopPropagation()
        }

        if (event.key === 'Enter') {
          this.isEnterPressed = true
          this.onSubmit()
          return
        }

        if (event.key === 'Escape') {
          this.close()
        }
      },
    },

    created() {
      this.isEnterPressed = false
      window.addEventListener('keydown', this.handleKeyDown)
    },

    unmounted() {
      window.removeEventListener('keydown', this.handleKeyDown)
    },
  }
</script>
