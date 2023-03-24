<template>
  <div>
    <!--条件查询-->
    <a-card>
      <a-row :gutter="18">
        <a-col :span="6">
          <span class="label">考试名称：</span>
          <a-input
            class="search"
            v-model="form.name"
            placeholder="请输入学生姓名"
          />
        </a-col>
        <a-col :span="6">
          <span class="label">考试类别：</span>
          <a-select v-model="form.type" class="search">
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option value="1"> 摸底考试 </a-select-option>
            <a-select-option value="2"> 随堂测验</a-select-option>
            <a-select-option value="3"> 期中考试 </a-select-option>
            <a-select-option value="4"> 期末考试 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8">
          <span class="label">考试日期：</span>
          <a-range-picker @change="onChange" v-model="date" />
        </a-col>
        <a-col :span="4">
          <a-button type="primary" class="mr" @click="search">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-table :columns="columns" :data-source="data" :pagination="false"> </a-table>
      <a-pagination
        class="fr mt"
        show-quick-jumper
        :total="total"
        show-less-items
        show-size-changer
        @change="onChange"
        @showSizeChange="sizeChange"
      />
    </a-card>
  </div>
</template>

<script>
import bread from "@/mixins/breadCrumb.js";
import { examList } from "@/api/student.js";
import moment from "moment";
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    align: "center",
    width: 80,
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: 80,
  },
  {
    title: "类别",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "考试时间",
    dataIndex: "date",
    key: "date",
    width: 100,
    customRender(text) {
      return moment(text).format("YYYY-MM-DD");
    },
  },
  {
    title: "科目",
    dataIndex: "subject",
    key: "subject",
    width: 100,
  },
  {
    title: "成绩发布时间",
    dataIndex: "publishTime",
    key: "publishTime",
    customRender(text) {
      return moment(text).format("YYYY-MM-DD");
    },
    width: 100,
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: 120,
  },
  {
    title: "参与班级",
    dataIndex: "grade",
    key: "grade",
    width: 150,
  },
];

export default {
  mixins: [bread],
  data() {
    return {
      form: {
        name: "",
        type: "",
      },
      total: 0,
      date: [],
      pageData: {
        page: 1,
        pageSize: 10,
      },
      columns,
      data: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let startDate = this.date[0]
        ? moment(this.date[0]).format("YYYY-MM-DD")
        : "";
      let endDate = this.date[1]
        ? moment(this.date[1]).format("YYYY-MM-DD")
        : "";
      examList({
        ...this.form,
        ...this.pageData,
        startDate,
        endDate,
      }).then((res) => {
        this.data = res.data;
        this.total = res.total;
      });
    },
    search() {
      this.loadData();
    },
    reset() {
      this.form = {
        name: "",
        type: "",
      };
      this.pageData = {
        page: 1,
        pageSize: 10,
      };
      this.date = [];
      this.loadData();
    },
    onChange(page, pageSize) {
      this.pageData = { page, pageSize };
      this.loadData();
      // this.pageData.page=page;
      // this.pageData.pageSize=pageSize
      console.log(page, pageSize);
    },
    sizeChange(current, size) {
      this.pageData = { page: 1, pageSize: size };
      this.loadData();
    },
    
  },
};
</script>

<style lang="less" scoped>
</style>