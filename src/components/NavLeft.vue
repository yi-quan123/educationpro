<template>
  <div>
    <h1 class="title">好学教育</h1>
    <a-menu theme="dark" mode="inline">
      <template v-for="(item, index) in menuRoutes">
        <a-menu-item v-if="!item.children" :key="index">
          <router-link :to="item.path">
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="index" :menu="item"></sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubMenu from "./SubMenu.vue";
export default {
  computed: {
    ...mapGetters(["menuRoutes"]),
  },
  components: {
    SubMenu,
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 22px;
  margin-bottom: 0;
}
</style>