<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="800px"
      cancelText="取消"
      okText="确认"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="性别" prop="gender">
              <a-select v-model="form.gender" placeholder="请选择性别">
                <a-select-option :value="1">男</a-select-option>
                <a-select-option :value="2">女</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="级别" prop="level">
              <a-select v-model="form.level" placeholder="请选择级别">
                <a-select-option :value="1">初级教师</a-select-option>
                <a-select-option :value="2">中级教师</a-select-option>
                <a-select-option :value="3">高级教师</a-select-option>
                <a-select-option :value="4">特级教师</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="年级" prop="grade">
              <a-input v-model="form.grade" placeholder="如初二、二年级等" />
            </a-form-model-item>
            <a-form-model-item label="科目" prop="subject">
              <a-input v-model="form.subject" />
            </a-form-model-item>
            <a-form-model-item label="入职日期" prop="date">
              <!-- 函数之所以写成这种形式是因为函数本身自带一个参数，而我们又想额外传入一个，如果正常写会覆盖掉原来自带的参数 -->
              <a-date-picker
                style="width: 100%"
                v-model="form.date"
                @change="(date) => onChange(date, 'date')"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="类型" prop="type">
              <a-radio-group v-model="form.type" name="radioGroup">
                <a-radio value="1"> 全职 </a-radio>
                <a-radio value="2"> 兼职</a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="tel">
              <a-input v-model="form.tel" />
            </a-form-model-item>
            <a-form-model-item label="毕业院校" prop="school">
              <a-input v-model="form.school" />
            </a-form-model-item>
            <a-form-model-item label="出生年月" prop="birth">
              <a-date-picker
                v-model="form.birth"
                style="width: 100%"
                @change="(date) => onChange(date, 'birth')"
              />
            </a-form-model-item>
            <a-form-model-item label="家庭住址" prop="address">
              <a-input v-model="form.address" />
            </a-form-model-item>
            <a-form-model-item ref="name" label="学历" prop="education">
              <a-input v-model="form.education" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import { addTeacher, editTeacher } from "@/api/teacher";
export default {
  props: {
    visible: Boolean,
    title: String,
  },
  data() {
    return {
      confirmLoading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        name: "",
        gender: "",
        level: "",
        grade: "",
        subject: "",
        date: "",
        type: 1,
        tel: "",
        school: "",
        birth: "",
        address: "",
        education: "",
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        gender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        level: [{ required: true, message: "级别不能为空", trigger: "blur" }],
        grade: [{ required: true, message: "年级不能为空", trigger: "blur" }],
        subject: [{ required: true, message: "学科不能为空", trigger: "blur" }],
        date: [{ required: true, message: "入职日期不能为空" }],
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        tel: [{ required: true, message: "电话不能为空", trigger: "blur" }],
        school: [
          { required: true, message: "毕业院校不能为空", trigger: "blur" },
        ],
        birth: [{ required: true, message: "生日不能为空" }],
        address: [
          { required: true, message: "家庭住址不能为空", trigger: "blur" },
        ],
        education: [
          { required: true, message: "学历不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState(["teacherDetail"]),
  },
  watch: {
    visible() {
      console.log("执行了");
      if (this.teacherDetail) {
        this.form = this.teacherDetail;
      } else {
        this.form = {
          name: "",
          gender: "",
          level: "",
          grade: "",
          subject: "",
          date: "",
          type: 1,
          tel: "",
          school: "",
          birth: "",
          address: "",
          education: "",
        };
      }
    },
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          if (this.title == "新增教师") {
            addTeacher(this.form).then((res) => {
              console.log(res)
              this.confirmLoading = false;
              this.form = {
                name: "",
                gender: "",
                level: "",
                grade: "",
                subject: "",
                date: "",
                type: "",
                tel: "",
                school: "",
                birth: "",
                address: "",
                education: "",
              };
              this.$emit("hide");
              this.$emit("reload");
            });
          } else {
            editTeacher(this.form).then(() => {
              this.confirmLoading = false;
              this.$emit("hide");
              this.$emit("reload");
            });
          }
        }
      });
    },
    handleCancel() {
      this.$emit("hide");
    },
    //日期选择
    onChange(date, a) {
      //console.log(date)
      console.log(a);
      this.form[a] = moment(date).format("YYYY-MM-DD");
      //console.log(moment(date).format("YYYY-MM-DD"));
    },
  },
};
</script>

<style lang="less" scoped>
</style>