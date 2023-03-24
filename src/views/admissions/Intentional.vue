<template>
  <div>
    <a-card>
      <a-row :gutter="18">
        <a-col :span="6">
          <span class="label">姓名：</span>
          <a-input
            class="search"
            v-model="form.name"
            placeholder="请输入教师姓名"
          />
        </a-col>
        <a-col :span="6">
          <span class="label">负责人：</span>
          <a-input
            class="search"
            v-model="form.principal"
            placeholder="请输入负责人姓名"
          />
        </a-col>
        <a-col :span="4">
          <a-button type="primary" class="mr" @click="search">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-button type="primary" class="mr">新增</a-button>
      <a-button type="danger" class="mr">删除</a-button>
      <a-button type="primary" class="mr">转化为正式学员</a-button>
      <a-button type="primary" class="mr">取消转化</a-button>
    </a-card>
    <a-card class="mt">
      <a-table
        :columns="columns"
        :data-source="data"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <!-- <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span> -->
        <span slot="gender" slot-scope="text">{{
          text == 1 ? "男" : "女"
        }}</span>
        <span slot="status" slot-scope="text">
          <a-tag color="#87d068" v-if="text == 1"> 转化成功 </a-tag>
          <a-tag color="#2db7f5" v-else-if="text == 2"> 待转化 </a-tag>
          <a-tag color="#f50" v-else>转化失败</a-tag>
        </span>
        <span slot="audition" slot-scope="text">
          <a-badge status="success" v-if="text == 1" text="已转试听" />
          <a-badge status="default" v-else-if="text == 2" text="未转试听" />
        </span>
        <span slot="operate">
          <a-button type="primary" size="small" @click="detail">详情</a-button>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import bread from "@/mixins/breadCrumb.js";
import { getStudentList } from "@/api/student";
export default {
  mixins: [bread],
  data() {
    const columns = [
      {
        title: "序号",
        customRender: (text, record, index) => `${index + 1}`,
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        scopedSlots: { customRender: "name" },
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        scopedSlots: { customRender: "gender" },
      },
      {
        title: "客户状态",
        dataIndex: "status",
        key: "status",
        scopedSlots: { customRender: "status" },
      },
      {
        title: "试听状态",
        key: "audition",
        dataIndex: "audition",
        scopedSlots: { customRender: "audition" },
      },
      {
        title: "招生来源",
        key: "source",
        dataIndex: "source",
      },
      {
        title: "手机号码",
        dataIndex: "tel",
        key: "tel",
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
      },
      {
        title: "意向级别",
        dataIndex: "level",
        key: "level",
      },
      {
        title: "主负责任人",
        dataIndex: "principal",
        key: "principal",
      },
      {
        title: "详情",
        scopedSlots: { customRender: "operate" },
      },
    ];
    return {
      form: {
        principal: "",
        name: "",
      },
      columns,
      data: [],
      selectedRowKeys: [],
    };
  },
  created() {
    getStudentList().then((res) => {
      this.data = res.data;
    });
    console.log(this.$route);
  },
  //设置如果是从详情页返回来的那么需要缓存，如果从其他页面过来不需要缓存
  beforeRouteEnter(to, from, next) {
    if (from.path == "/admissions/solicitation") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  //加了keep-alive组件所特有的生命周期
  activated() {
    //如果不是从详情页返回的，那么更新数据
    if (!this.$route.meta.isBack) {
      getStudentList().then((res) => {
        this.data = res.data;
      });
      this.$route.meta.isBack = false;
    }
  },
  methods: {
    search() {
      console.log("search");
    },
    reset() {
      console.log("reset");
    },
    onSelectChange() {
      console.log(1);
    },
    detail() {
      this.$router.push("/admissions/solicitation");
    },
  },
};
</script>

<style lang="less" scoped>
</style>