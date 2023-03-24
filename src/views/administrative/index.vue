<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="员工信息">
          <a-table :columns="columns" :data-source="data" :pagination="false">
            <span slot="setRole" slot-scope="text, record">
              <a-button type="primary" size="small" @click="setRole(record)"
                >设置权限</a-button
              >
            </span>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title>
          <a-descriptions bordered>
            <a-descriptions-item label="销售冠军"> 王明君 </a-descriptions-item>
            <a-descriptions-item label="课时冠军"> 萧琪琪 </a-descriptions-item>
            <a-descriptions-item label="金牌咨询师">
              郭诗云
            </a-descriptions-item>
            <a-descriptions-item label="统计起始时间">
              2018-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="统计截止时间" :span="2">
              2019-04-24 18:00:00
            </a-descriptions-item>
            <a-descriptions-item label="本月盈亏" :span="3">
              <a-badge status="processing" text="盈利320万元" />
            </a-descriptions-item>
            <a-descriptions-item label="收益科目"> 数学 </a-descriptions-item>
            <a-descriptions-item label="较差科目">语文</a-descriptions-item>
            <a-descriptions-item label="进步科目"> 数学 </a-descriptions-item>
            <a-descriptions-item label="备注">
              综合趋势有所下降，主要受国家政策影响，老师离职率较高，需要管控人员走动，
              数学是主要盈利科目，英语报名人数较少，英语老师有空闲，排班不满的情况
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      title="权限设置"
      :visible="visible"
      @ok="handleOk"
      @cancel="visible = false"
    >
      <a-radio-group name="radioGroup" v-model="roles">
        <a-radio value="admin">管理员/老板</a-radio>
        <a-radio value="teacher"> 老师/咨询师 </a-radio>
        <a-radio value="manager"> 部门经理 </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
import { getUserList, changeRole } from "@/api/user";
export default {
  data() {
    return {
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          width: 80,
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "手机号",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "昵称",
          dataIndex: "nickname",
          key: "nickname",
        },
        {
          title: "角色",
          dataIndex: "role",
          key: "role",
        },
        {
          title: "操作",
          dataIndex: "setRole",
          key: "setRole",
          scopedSlots: { customRender: "setRole" },
        },
      ],
      visible: false,
      data: [],
      roles: "",
      id: "",
    };
  },
  created() {
    getUserList().then((res) => {
      this.data = res.data;
    });
  },
  methods: {
    setRole(row) {
      this.visible = true;
      //用户权限
      this.roles = row.role;
      //用户id
      this.id = row.id;
      //console.log(2,row)
    },
    handleOk() {
      changeRole({ role: this.roles, id: this.id }).then((res) => {
        this.$message.success(res.msg);
        this.visible = false;
        getUserList().then((res) => {
          this.data = res.data;
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>