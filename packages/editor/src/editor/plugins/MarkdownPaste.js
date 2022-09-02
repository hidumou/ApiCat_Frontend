import { Plugin } from 'prosemirror-state'
// import { toggleMark } from 'prosemirror-commands'
import Extension from '../lib/Extension'
// import { isUrl } from '../utils'

export default class MarkdownPaste extends Extension {
  get name() {
    return 'markdown-paste'
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handlePaste: () => {
            return false
          },
        },
      }),
    ]
  }
}
