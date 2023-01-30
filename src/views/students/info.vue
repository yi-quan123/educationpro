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
            placeholder="请输入学生姓名"
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
          <span class="label">年级：</span>
          <a-select v-model="form.grade" class="search">
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option value="一年级"> 一年级 </a-select-option>
            <a-select-option value="二年级"> 二年级 </a-select-option>
            <a-select-option value="三年级"> 三年级 </a-select-option>
            <a-select-option value="四年级"> 四年级 </a-select-option>
            <a-select-option value="五年级"> 五年级 </a-select-option>
            <a-select-option value="六年级"> 六年级 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2">
          <a-dropdown @click.native="expand">
            <a class="ant-dropdown-link">
              {{ toggle ? "展开" : "收起" }}
              <a-icon :type="toggle ? 'down' : 'up'" />
            </a>
          </a-dropdown>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" class="mr" @click="search">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
      <a-row class="mt" :gutter="18" v-show="!toggle">
        <a-col :span="6">
          <span class="label">班型：</span>
          <a-select v-model="form.type" class="search">
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option value="1"> 一对一 </a-select-option>
            <a-select-option value="2"> 小班 </a-select-option>
            <a-select-option value="3"> 大班 </a-select-option>
            <a-select-option value="4"> 精英班 </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <span class="label">家长姓名：</span>
          <a-input
            class="search"
            v-model="form.parent"
            placeholder="请输入家长姓名"
          />
        </a-col>
        <a-col :span="6">
          <span class="label">班主任：</span>
          <a-input
            class="search"
            v-model="form.headTeacher"
            placeholder="请输入班主任姓名"
          />
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-radio-group v-model="form.campus" button-style="solid" @change="loadData">
        <a-radio-button value=""> 全部 </a-radio-button>
        <a-radio-button value="1"> 中心校区 </a-radio-button>
        <a-radio-button value="2"> 顺义校区 </a-radio-button>
        <a-radio-button value="3"> 大兴校区 </a-radio-button>
        <a-radio-button value="4"> 昌平校区 </a-radio-button>
      </a-radio-group>
    </a-card>
    <!--数据表格-->
    <a-card class="mt">
      <a-table
        :columns="columns"
        :data-source="data"
        :rowKey="(record) => record.id"
        :scroll="{ x: 1000, y: 450 }"
        :pagination="false"
      >
        <template slot="percent" slot-scope="text">
          <a-progress :percent="text" size="small"  v-if="text<=20" strokeColor="red"/>
          <a-progress :percent="text" size="small" v-else/>
        </template>
        <template slot="action" slot-scope="text, scope">
          <!-- <a-button type="primary" size="small" @click="edit(scope)"
            >编辑</a-button
          > -->
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
  </div>
</template>

<script>
import bread from "@/mixins/breadCrumb.js";
import { mapMutations } from "vuex";
import { studentList,deleteStudent } from "@/api/student";
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
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 80,
  },
  {
    title: "年级",
    dataIndex: "grade",
    key: "grade",
    width: 100,
  },
  { title: "科目", dataIndex: "subject", key: "4", width: 100 },
  {
    title: "班型",
    dataIndex: "type",
    key: "type",
    width: 100,
    customRender: (text) => {
      if (text == 1) {
        return "一对一";
      } else if (text == 2) {
        return "小班";
      } else if (text == 3) {
        return "大班";
      } else {
        return "精英班";
      }
    },
  },
  { title: "家长姓名", dataIndex: "parentname", key: "parentname", width: 100 },
  { title: "家长电话", dataIndex: "parenttel", key: "parenttel", width: 180 },
  {
    title: "班主任姓名",
    dataIndex: "classteacher",
    key: "classteacher",
    width: 120,
  },
  {
    title: "校区",
    dataIndex: "campus",
    key: "campus",
    width: 100,
    customRender(text) {
      if (text == 1) {
        return "中心校区";
      } else if (text == 2) {
        return "顺义校区";
      } else if (text == 3) {
        return "昌平校区";
      } else {
        return "大兴校区";
      }
    },
  },
  {
    title: "剩余课时",
    dataIndex: "percent",
    key: "percent",
    width: 150,
    scopedSlots: { customRender: "percent" },
  },
  { title: "已缴费用", dataIndex: "charge", key: "charge", width: 100 },
  {
    title: "课程有效期",
    dataIndex: "validperiod",
    key: "validperiod",
    width: 150,
  },
  { title: "课程顾问", dataIndex: "consultant", key: "consultant", width: 100 },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  mixins: [bread],
  data() {
    return {
      show: false,
      toggle: true,
      columns,
      data: [],
      title: "新建教师",
      form: {
        name: "", //姓名
        subject: "", //学科
        grade: "", //年级
        type: "", //班型
        headTeacher: "", //班主任
        parent: "", //家长姓名
        campus: "", //校区
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
      studentList({ ...this.pageData, ...this.form }).then((res) => {
        console.log(22, res);
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
      this.form ={
        name: "", //姓名
        subject: "", //学科
        grade: "", //年级
        type: "", //班型
        headTeacher: "", //班主任
        parent: "", //家长姓名
        campus: "", //校区
      },
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
      deleteStudent({ id }).then((res) => {
        this.$message.success(res.msg);
        this.loadData();
      });
    },
    // edit(scope) {
    //   this.show = true;
    //   //复制一份数据，不然如果直接使用scope,将来直接修改弹框表单会导致表格中数据也发生变化，因为是复制了指针。
    //   const nscope = Object.assign({}, scope);
    //   this.title = "编辑教师";
    //   this.editTeacher(nscope);
    // },
    expand() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style lang="less" scoped>
</style>