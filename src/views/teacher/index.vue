<template>
  <div>
    <!--条件查询-->
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
          <span class="label">科目：</span>
          <a-select v-model="form.subject" class="search">
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option value="语文"> 语文 </a-select-option>
            <a-select-option value="数学"> 数学 </a-select-option>
            <a-select-option value="英语"> 英语 </a-select-option>
            <a-select-option value="物理"> 物理 </a-select-option>
            <a-select-option value="化学"> 化学 </a-select-option>
            <a-select-option value="生物"> 生物 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <span class="label">手机号：</span>
          <a-input
            class="search"
            v-model="form.tel"
            placeholder="请输入手机号"
          />
        </a-col>
        <a-col :span="4">
          <a-button type="primary" class="mr" @click="search">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-button type="primary" class="mr" @click="add">新建员工</a-button>
      <a-button
        type="danger"
        @click="deleteSome"
        :disabled="!selectedRowKeys.length"
        >批量删除</a-button
      >
    </a-card>
    <!--数据表格-->
    <a-card class="mt">
      <a-table
        :columns="columns"
        :data-source="data"
        :rowKey="(record) => record.id"
        :scroll="{ x: 1000, y: 450 }"
        :pagination="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <template slot="action" slot-scope="text, scope">
          <a-button type="primary" size="small" @click="edit(scope)"
            >编辑</a-button
          >
          <a-popconfirm
            title="确定要删除吗?"
            ok-text="是"
            cancel-text="否"
            @confirm="deletesItem(scope.id)"
          >
            <a-button type="danger" size="small" class="ml">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
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
    <!-- 新增员工弹窗 -->
    <add-modal
      :visible="show"
      @hide="show = false"
      @reload="loadData"
      :title="title"
    ></add-modal>
  </div>
</template>

<script>
import addModal from "./addModal.vue";
import { mapMutations } from "vuex";
import { getTeacherList, deletes, batchDelete } from "@/api/teacher";
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    align: "center",
    width: 80,
    customRender: (text, record, index) => `${index + 1}`,
  },
  { title: "姓名", dataIndex: "name", key: "name", width: 80 },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    width: 80,
    customRender: (text) => (text == 1 ? "男" : "女"),
  },
  {
    title: "级别",
    dataIndex: "level",
    key: "2",
    width: 100,
    customRender: (text) => {
      if (text == 1) {
        return "初级教师";
      } else if (text == 2) {
        return "中级教师";
      } else if (text == 3) {
        return "高级教师";
      } else {
        return "特级教师";
      }
    },
  },
  { title: "年级", dataIndex: "grade", key: "3", width: 100 },
  { title: "科目", dataIndex: "subject", key: "4", width: 100 },
  { title: "入职日期", dataIndex: "date", key: "5", width: 180 },
  {
    title: "类型",
    dataIndex: "type",
    key: "6",
    width: 100,
    customRender: (text) => (text == 1 ? "全职" : "兼职"),
  },
  { title: "手机号码", dataIndex: "tel", key: "7", width: 180 },
  { title: "毕业院校", dataIndex: "school", key: "8", width: 100 },
  { title: "出生年月", dataIndex: "birth", key: "9", width: 180 },
  { title: "家庭住址", dataIndex: "address", key: "10", width: 180 },
  { title: "学历", dataIndex: "education", key: "11", width: 100 },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
      show: false,
      columns,
      data: [],
      title: "新建教师",
      form: {
        name: "",
        subject: "",
        tel: "",
      },
      total: 0,
      pageData: {
        page: 1,
        pageSize: 10,
      },
      selectedRowKeys: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapMutations(["editTeacher"]),
    add() {
      this.show = true;
      this.title = "新增教师";
      this.editTeacher(null);
    },
    loadData() {
      getTeacherList({ ...this.pageData, ...this.form }).then((res) => {
        this.data = res.data;
        this.total = res.total;
      });
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
    search() {
      this.loadData();
    },
    reset() {
      this.form = {
        name: "",
        subject: "",
        tel: "",
      };
      this.pageData = {
        page: 1,
        pageSize: 10,
      };
      this.loadData();
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    deletesItem(id) {
      deletes({ id }).then((res) => {
        this.$message.success(res.msg);
        this.loadData();
      });
    },
    //批量删除
    deleteSome() {
      batchDelete({ ids: this.selectedRowKeys }).then((res) => {
        this.$message.success(res.msg);
        this.loadData();
        this.selectedRowKeys=[]
      });
    },
    edit(scope) {
      this.show = true;
      //复制一份数据，不然如果直接使用scope,将来直接修改弹框表单会导致表格中数据也发生变化，因为是复制了指针。
      const nscope = Object.assign({}, scope);
      this.title = "编辑教师";
      this.editTeacher(nscope);
    },
  },
  components: {
    addModal,
  },
};
</script>

<style lang="less" scoped>

</style>