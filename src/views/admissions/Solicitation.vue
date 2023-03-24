<template>
  <div>
    <a-card class="mt" style="text-align:right">
      <a-button type="primary" @click="back">返回</a-button>
    </a-card>
    <a-card class="mt">
      <a-row>
        <a-col>
          <h3>家长信息</h3>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>姓名：陈妍青</span>
        </a-col>
        <a-col :span="6">
          <span>电话：15789887654</span>
        </a-col>
        <a-col :span="6">
          <span>家庭住址：北京市朝阳区</span>
        </a-col>
        <a-col :span="6">
          <span>咨询课程：三年级数学</span>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>年龄：37</span>
        </a-col>
        <a-col :span="6">
          <span>文化程度：本科</span>
        </a-col>
        <a-col :span="6">
          <span>关系：母亲</span>
        </a-col>
        <a-col :span="6">
          <span>意向成度：2</span>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>满意因素：环境好，老师素质高</span>
        </a-col>
        <a-col :span="6">
          <span>不满意因素：费用贵</span>
        </a-col>
        <a-col :span="6">
          <span>其他意向机构：学而思</span>
        </a-col>
        <a-col :span="6">
          <span>备注：再考虑一下，预计一星期内回复</span>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-row>
        <a-col>
          <h3>学生信息</h3>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>姓名：罗梦雨</span>
        </a-col>
        <a-col :span="6">
          <span>性别： 女</span>
        </a-col>
        <a-col :span="6">
          <span>年龄：10</span>
        </a-col>
        <a-col :span="6">
          <span>年级：三年级</span>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>学校：育才小学</span>
        </a-col>
        <a-col :span="6">
          <span>班级排名：16</span>
        </a-col>
        <a-col :span="6">
          <span>弱势学科：数学</span>
        </a-col>
        <a-col :span="6">
          <span>优劣势：活泼好动，注意力不集中，有不认真的习惯</span>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>语文成绩：87</span>
        </a-col>
        <a-col :span="6">
          <span>数学成绩：45</span>
        </a-col>
        <a-col :span="6">
          <span>英语成绩：82</span>
        </a-col>
        <a-col :span="6">
          <span>备注：数学比较偏科，语文英语不够拔尖</span>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-row>
        <a-col>
          <h3>课程咨询师信息</h3>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>姓名：徐光华</span>
        </a-col>
        <a-col :span="6">
          <span>工号：2018070633</span>
        </a-col>
        <a-col :span="6">
          <span>职位：课程咨询师</span>
        </a-col>
        <a-col :span="6">
          <span>电话：16654378763</span>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>沟通时长：2小时</span>
        </a-col>
        <a-col :span="6">
          <span>服务态度：很好</span>
        </a-col>
        <a-col :span="6">
          <span>月单量：27</span>
        </a-col>
        <a-col :span="6">
          <span>客户投诉：无</span>
        </a-col>
      </a-row>
      <a-row class="mt">
        <a-col :span="6">
          <span>所属校区：中心校区</span>
        </a-col>
        <a-col :span="6">
          <span>入职年限：两年</span>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <a-steps :current="2">
        <a-step title="报名咨询" description="线上对接预约" />
        <a-step title="门店咨询" description="课程顾问李老师接待" />
        <a-step title="办理入学" description="安排校区及开课时间" />
        <a-step title="开课" description="安排班级" />
      </a-steps>
    </a-card>
  </div>
</template>

<script>
import bread from "@/mixins/breadCrumb.js";
export default {
  name:"other",
  mixins: [bread],
  methods:{
    back(){
      this.$router.push("/admissions/intentional")
    }
  }
};
</script>

<style lang="less" scoped>
</style>