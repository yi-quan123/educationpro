<template>
  <div>
    <a-result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <a-button key="console" type="primary"> Go Console </a-button>
        <a-button key="buy"> Buy Again </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>