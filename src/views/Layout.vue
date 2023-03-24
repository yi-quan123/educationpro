<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible>
        <nav-left />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">  
          <headers/>  
        </a-layout-header>
        <a-layout-content style="margin: 0 16px;height:70vh">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item v-for="(item,index) in breadCrumb" :key="index">{{item}}</a-breadcrumb-item>
            <!-- <a-breadcrumb-item>Bill</a-breadcrumb-item> -->
          </a-breadcrumb>
          <div
            :style="{ minHeight: '360px' }"
          >
            <Content />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center"
          >Ant Design ©2018 Created by Ant UED</a-layout-footer
        >
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Content from "@/components/Content.vue";
import NavLeft from "@/components/NavLeft.vue";
import Headers from "@/components/Header.vue"
import {mapState} from "vuex"
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed:{
    ...mapState(['breadCrumb'])
  },
  components: {
    Content,
    NavLeft,
    Headers
  },
};
</script>

<style lang="less" scoped>
</style>