<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="8">
          <a-statistic-countdown
            title="模拟考倒计时"
            :value="deadline"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic-countdown
            title="测评日"
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic-countdown
            title="中考倒计时"
            :value="deadline"
            format="D 天 H 时 m 分 s 秒"
          />
        </a-col>
      </a-row>
    </a-card>
    <div class="card-list mt">
      <a-list
        :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
        :dataSource="dataSource"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <template>
            <a-card :hoverable="true">
              <a-card-meta>
                <div style="margin-bottom: 3px" slot="title">
                  教室： {{ item.classroom }}
                  <span class="fr" style="color: #666">{{
                    time(item.time)
                  }}</span>
                </div>
                <a-avatar
                  class="card-avatar"
                  slot="avatar"
                  :src="avatar"
                  size="large"
                />
                <div class="meta-content" slot="description">
                  <p>老师：{{ item.teacher }}</p>
                  <p>学科：{{ item.subject }}</p>
                  <p>
                    班型：{{
                      item.type == 1
                        ? "一对一"
                        : item.type == 2
                        ? "小班"
                        : item.type == 3
                        ? "大班"
                        : "精英班"
                    }}
                  </p>
                </div>
              </a-card-meta>
              <a slot="actions" @click="add">新增排课</a>
              <a slot="actions" @click="deletes(item.id)">删除排课</a>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
    </div>
    <a-modal
      title="新增排课"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="visible=false"
    >
      <a-form-model
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        :model="form"
        ref="addForm"
      >
        <a-form-model-item label="教室" prop="classroom" >
          <a-input v-model="form.classroom" placeholder="如A教101室"/>
        </a-form-model-item>
        <a-form-model-item label="老师" prop="teacher">
          <a-input v-model="form.teacher" />
        </a-form-model-item>
        <a-form-model-item label="学科" prop="subject">
          <a-input v-model="form.subject" />
        </a-form-model-item>
        <a-form-model-item label="上课时间" prop="time">
          <a-date-picker v-model="form.time" />
        </a-form-model-item>
        <a-form-model-item label="班型" prop="type" placeholder="如三年级语文">
          <a-select v-model="form.type" placeholder="如三年级语文">
            <a-select-option :value="1">一对一 </a-select-option>
            <a-select-option :value="2"> 小班 </a-select-option>
            <a-select-option :value="3"> 大班 </a-select-option>
            <a-select-option :value="4"> 精英班 </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getClassList, deleteClass,addClass } from "@/api/class";
import moment from "moment";
export default {
  data() {
    return {
      avatar:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F21%2F20150921173512_PehaH.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632629214&t=9306e40f281e43dc65e80566c3bc8bd3",
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      desc: "段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。",
      dataSource: [],
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      visible:false,
      form: {
        classroom: "",
        teacher: "",
        subject: "",
        time: "",
        type: 1,
      },
      rules: {
        classroom: [{ required: true, message: "不能为空", trigger: "blur" }],
        teacher: [{ required: true, message: "不能为空", trigger: "blur" }],
        subject: [{ required: true, message: "不能为空", trigger: "blur" }],
        time: [{ required: true, message: "不能为空", trigger: "change" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    time() {
      return (t) => moment(t).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
   this.loadData()
  },
  methods: {
    loadData(){
      getClassList().then((res) => {
        this.dataSource = res.data;
      });
    },
    deletes(id) {
      deleteClass({ id }).then((res) => {
        this.$message.success(res.msg);
        this.loadData()
      });
    },
    add(){
      this.visible=true;
      this.form= {
        classroom: "",
        teacher: "",
        subject: "",
        time: "",
        type: 1,
      }
    },
    handleOk() {
      this.$refs.addForm.validate(valid=>{
        if(valid){
          let time=this.form.time?moment(this.form.time).format("YYYY-MM-DD HH:mm:ss"):""
          addClass({...this.form,time}).then(res=>{
            this.$message.success(res.msg);
            this.visible=false;
            this.loadData()
          })
        }
      })
      
    },
  },
};
</script>

<style lang="less" scoped>
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.new-btn {
  border-radius: 2px;
  width: 100%;
  height: 187px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 100px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>