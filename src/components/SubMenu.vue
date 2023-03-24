
<template functional>
  <a-sub-menu>
    <span slot="title">
      <a-icon type="mail" /><span>{{ props.menu.meta.title }}</span>
    </span>
    <template v-for="item in props.menu.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <router-link :to="item.path">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu="item" />
    </template>
  </a-sub-menu>
</template>
<script>
/*
关于函数式组件
    无状态
    无法实例化
    内部没有任何生命周期处理函数
    轻量,渲染性能高,适合只依赖于外部数据传递而变化的组件(展示组件，无逻辑和状态修改)
    在template标签里标明functional
    只接受props值


<template functional>
      <div>
            <p v-for="(item,index) in props.items" :key="index" @click="props.itemClick(item)" />
      </div>
</template>
*/
export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
</style>