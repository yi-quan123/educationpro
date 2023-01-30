<template>
  <div>
    <a-row>
      <a-col style="text-align: right">
        <a-badge count="25" class="tips">
          <a-icon type="bell" />
        </a-badge>
        <a-dropdown class="info">
          <a class="ant-dropdown-link"> 欢迎你，{{nickname}} <a-icon type="down" /> </a>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="user" />个人中心
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="export" />退出登陆
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed:{
        ...mapState(['nickname'])
    },
    methods:{
        handleMenuClick({key}){
            if(key==2){
                sessionStorage.clear();

                this.$router.push("/login");
                location.reload()
            }
        }
    }
};
</script>

<style lang="less" scoped>
.tips {
  font-size: 26px;
}
.info {
  margin: 0 20px;
}
</style>