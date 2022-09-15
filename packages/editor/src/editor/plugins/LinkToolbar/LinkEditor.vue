<template>
  <el-form
    ref="updateHttpUrlAttrs"
    :model="attrs"
    label-width="0"
    size="small"
    class="update-attr-layer link-bar-wrapper"
    :show-message="false"
    @keydown.enter="onKeydown"
  >
    <el-row type="flex" :gutter="10">
      <el-col :span="isCreate ? 12 : 11">
        <el-form-item prop="href">
          <el-input ref="input" placeholder="链接地址" v-model="attrs.href" />
        </el-form-item>
      </el-col>

      <el-col :span="isCreate ? 12 : 11">
        <el-form-item>
          <el-input ref="inputText" placeholder="链接标题" v-model="aText" />
        </el-form-item>
      </el-col>

      <el-col :span="2" v-if="!isCreate" class="link-bar-btns">
        <button class="link-btn" @click="onRemoveLinkClick">
          <i class="editor-font editor-trash" title="移除链接"></i>
        </button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { $emit } from '@natosoft/shared'
  import { ElForm, ElFormItem, ElCol, ElRow, ElInput } from 'element-plus'

  export default {
    name: 'LinkEditor',
    components: {
      ElForm,
      ElFormItem,
      ElInput,
      ElCol,
      ElRow,
    },
    props: {
      mark: {
        type: Object,
        required: true,
        default: () => ({ attrs: {}, text: '' }),
      },

      isCreate: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        attrs: { ...this.mark.attrs },
        aText: this.mark.text,
        rules: {
          href: { message: '', trigger: 'change', type: 'url' },
        },
      }
    },
    watch: {
      mark: function () {
        this.attrs = { ...this.mark.attrs }
        this.aText = this.mark.text
      },
    },
    computed: {
      isOpenClass: function () {
        return [
          'link-btn',
          {
            active: this.mark.attrs.openInNewTab,
          },
        ]
      },
    },
    methods: {
      onCloseClick(e) {
        e.stopPropagation()
        this.attrs.href = ''
        $emit(this, 'on-close')
      },

      toggleIsOpen(e) {
        e.stopPropagation()
        $emit(this, 'toggle-blank', { ...this.attrs, openInNewTab: !this.mark.attrs.openInNewTab })
        this.attrs.href = ''
      },

      onRemoveLinkClick(e) {
        e.preventDefault()
        e.stopPropagation()
        $emit(this, 'on-remove')
      },

      onKeydown(event) {
        event.preventDefault()
        var text = !this.aText ? this.mark.text : this.aText
        console.log(text)
        $emit(this, 'on-create', { ...this.attrs, text })
        this.attrs.href = ''
        this.aText = ''
      },

      focus() {
        this.$nextTick(() => {
          if (this.$refs.input || this.mark.attrs.href === '') {
            this.$refs.input.focus()
          }
        })
      },
    },
  }
</script>
