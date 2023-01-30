<template>
  <div>
    <a-card>
      <a-row>
        <a-col :span="8">
          <p class="welcome">{{ time }}，{{ nickname }}，准备吃点什么呢?</p>
          <p>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>
        </a-col>
        <a-col
          :xxl="{ span: 6, offset: 10 }"
          :xl="{ span: 8, offset: 8 }"
          class="todo"
        >
          <div>
            <span class="items">转化学员数</span>
            <p class="count">56</p>
          </div>
          <div>
            <span class="items">团队排名</span>
            <p class="count">5/23</p>
          </div>
          <div style="border: none">
            <span class="items">本月目标</span>
            <p class="count">2,345</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card class="mt">
      <div style="display: flex; flex-wrap: wrap">
        <div class="head-info">
          <span>我的待办</span>
          <p>8个任务</p>
        </div>
        <div class="head-info">
          <span>本周任务平均处理时间</span>
          <p>30分钟</p>
        </div>
        <div class="head-info">
          <span>本周对接学员数</span>
          <p>33个</p>
        </div>
      </div>
    </a-card>
    <a-row class="mt" :gutter="18">
      <a-col :span="18">
        <a-card>
          <a-calendar>
            <ul slot="dateCellRender" slot-scope="value" class="events">
              <li v-for="item in getListData(value)" :key="item.content">
                <a-badge :status="item.type" :text="item.content" />
              </li>
            </ul>
          </a-calendar>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="操作面板">
          <a-card-grid style="width: 25%; text-align: center">
            操作一
          </a-card-grid>
          <a-card-grid
            style="width: 25%; text-align: center"
            :hoverable="false"
          >
            操作二
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            操作三
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            操作四
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            操作五
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            操作六
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            操作七
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            操作八
          </a-card-grid>
        </a-card>
        <a-card class="mt">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://www.antdv.com/">{{
                  item.title
                }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 5",
  },
];
export default {
  data() {
    return {
      data,
    };
  },
  computed: {
    ...mapState(["nickname"]),
    time() {
      const date = new Date();
      const h = date.getHours();
      if (h <= 11) {
        return "上午好";
      } else if (h <= 13) {
        return "中午好";
      } else if (h <= 18) {
        return "下午好";
      } else {
        return "晚上好";
      }
    },
  },
  methods: {
    getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: "warning", content: "王皓的妈妈约回访" },
            { type: "success", content: "刘立签合同" },
          ];
          break;
        case 10:
          listData = [
            { type: "warning", content: "写月度总结" },
            { type: "success", content: "发工资" },
            { type: "error", content: "例会" },
          ];
          break;
        case 15:
          listData = [
            { type: "warning", content: "还房贷" },
            { type: "success", content: "下午去北京出差" },
            { type: "error", content: "去财务报销发票" },
            { type: "error", content: "招聘，新人培训" },
            { type: "error", content: "技术部的例会" },
            { type: "error", content: "销售部例会" },
          ];
          break;
        default:
      }
      return listData || [];
    },
  },
  //   mounted(){
  //       //const bread=this.$route.meta.bread?this.$route.meta.bread:[]
  //       const bread=this.$route.meta.bread||[]
  //       this.setBreadCrumb(bread)
  //   }
};
</script>

<style lang="less" scoped>
.welcome {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
}

.todo {
  display: flex;
  justify-content: space-around;
  text-align: center;
  div {
    border-right: 1px solid rgba(98, 98, 98, 0.2);
    padding: 0 24px;
    .items {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .count {
      color: rgba(0, 0, 0, 0.65);
      font-size: 24px;
      margin: 0;
    }
  }
}

.head-info {
  text-align: center;
  padding: 0 24px;
  flex-grow: 1;
  flex-shrink: 0;
  align-self: center;
  span {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 4px;
  }
  p {
    color: rgba(0, 0, 0, 0.65);
    font-size: 24px;
    margin: 0;
  }
}
</style>