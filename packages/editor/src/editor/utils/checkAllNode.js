import { Fragment } from 'prosemirror-model'

export default function checkAllNode($node) {
  let children = []
  $node.forEach((child) => {
    try {
      child.check()
      children.push(child)
    } catch (error) {
      console.log('checkAllNode：', error)
    }
  })

  if (!children.length) {
    return null
  }

  return $node.copy(Fragment.from(children))
}
