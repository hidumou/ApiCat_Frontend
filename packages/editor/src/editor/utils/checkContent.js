export default (content, schema) => {
  let unknownTypes = []
  let errorNodes = []

  if (content.type === 'doc' && content.content && content.content.length) {
    content.content = Array.from(content.content).filter((node) => {
      // 过滤错误类型的node
      if (node.type === 'code_block' && node.content && node.content.some((item) => !item.text)) {
        errorNodes.push(node)
        return false
      }

      if (schema.nodes[node.type] !== undefined) {
        return true
      }
      unknownTypes.push(node.type)
      return false
    })

    // unknownTypes.length && console.error('Unknown node type:', unknownTypes.join('、'))
    // errorNodes.length && console.error('error node schema:', errorNodes)
    return content
  }

  return content
}
