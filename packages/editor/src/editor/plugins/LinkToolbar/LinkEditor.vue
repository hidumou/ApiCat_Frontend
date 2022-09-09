<template>
  <div class="link-bar-wrapper">
    <input type="text" v-model="attrs.href" class="link-input" ref="input" placeholder="链接地址" @keydown.enter="onKeydown" />
    <hr />
    <input type="text" v-model="aText" class="link-input block" ref="inputText" placeholder="链接标题" @keydown.enter="onKeydown" />

    <div class="link-bar-btns" v-if="!isCreate">
      <button class="link-btn" @click="onRemoveLinkClick">
        <i class="editor-font editor-trash" title="移除链接"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import { $emit } from '@natosoft/shared'

  export default {
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
    name: 'LinkEditor',
    data() {
      return {
        attrs: { ...this.mark.attrs },
        aText: this.mark.text,
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
        this.$refs.input.value = ''
        $emit(this, 'on-close')
      },

      toggleIsOpen(e) {
        e.stopPropagation()
        $emit(this, 'toggle-blank', { ...this.attrs, openInNewTab: !this.mark.attrs.openInNewTab })
        this.$refs.input.value = ''
      },

      onRemoveLinkClick(e) {
        e.stopPropagation()
        $emit(this, 'on-remove')
      },

      onKeydown(event) {
        event.preventDefault()
        var text = !this.aText ? this.mark.text : this.aText
        console.log(text)
        $emit(this, 'on-create', { ...this.attrs, href: this.$refs.input.value, text })
        this.$refs.input.value = ''
        this.$refs.inputText.value = ''
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
