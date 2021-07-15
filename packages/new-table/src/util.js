
export function treeMap(tree, fn, depth = 0) {
  depth += 1
  return tree.map((item, i) => {
    let ret = {
      ...item
    }

    fn(ret, depth, i)

    if (ret.children && ret.children.length) {
      ret.children = treeMap(ret.children, fn)
    }
    return ret
  })
}