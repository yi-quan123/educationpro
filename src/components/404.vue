<template>
  <div class="exception-page">
    <div class="img">
      <img src='https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg' />
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在或仍在开发中</div>
      <div class="action">
        <a-button type="primary" @click="backHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExceptionPage',
  methods: {
    backHome() {
     
        this.$router.push("/index")
      
    }
  }
}
</script>

<style lang="less" scoped>
  .exception-page{
    margin-top: 100px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    .img{
      padding-right: 52px;
      zoom: 1;
      img{
        max-width: 430px;
      }
    }
    .content{
      h1{
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc{
        color:#999999;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }

</style>
