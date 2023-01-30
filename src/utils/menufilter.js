
export function filterMenu(data, role){
    return data.filter(item => {
      //首先找出一级菜单中meta权限跟用户权限匹配的，如果一级都不匹配就没必要继续进行判断里层了
      return item.meta.role.indexOf(role) > -1
    }).map(item => {
      if (item.children) {
        //递归调用，判断子集
        item.children = filterMenu(item.children, role)
      }
      return item
    })
  }