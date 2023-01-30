<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card :bordered="false">
          <div class="title mb">
            <p>总销售额</p>
            <a-icon type="info-circle" />
          </div>
          <p class="income">¥ 1526,560</p>
          <div class="mb mt">
            <span>周同比 12%</span>
            <a-icon type="caret-up" class="ico_u" />
            <span class="ml">日同比 18%</span>
            <a-icon type="caret-down" class="ico_d" />
          </div>
          <div class="day">日销售额￥122,423</div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false">
          <div class="title mb">
            <p>访问量</p>
            <a-icon type="info-circle" />
          </div>
          <p class="income">1128</p>
          <div class="mb mt">
            <span>周同比 12%</span>
            <a-icon type="caret-up" class="ico_u" />
            <span class="ml">日同比 12%</span>
            <a-icon type="caret-down" class="ico_d" />
          </div>
          <div class="day">日均访问量 78</div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false">
          <div class="title mb">
            <p>支付笔数</p>
            <a-icon type="info-circle" />
          </div>
          <p class="income">337</p>
          <div class="mb mt">
            <span>周同比 3%</span>
            <a-icon type="caret-up" class="ico_u" />
            <span class="ml">日同比 12%</span>
            <a-icon type="caret-down" class="ico_d" />
          </div>
          <div class="day">转化率 74%</div>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :bordered="false">
          <div class="title mb">
            <p>流失学员</p>
            <a-icon type="info-circle" />
          </div>
          <p class="income">52</p>
          <div class="mb mt">
            <span>周同比 4%</span>
            <a-icon type="caret-down" class="ico_d" />
            <span class="ml">日同比 8%</span>
            <a-icon type="caret-down" class="ico_d" />
          </div>
          <div class="day">流失最多科目：英语</div>
        </a-card>
      </a-col>
    </a-row>
    <a-card class="mt">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="销售额">
          <a-row :gutter="64">
            <a-col :span="16">
              <div ref="sales" style="height: 300px"></div>
            </a-col>
            <a-col :span="8">
              <p class="rank">校区销售额排名</p>
              <ul>
                <li class="item">
                  <div class="num top3">1</div>
                  <p>北京校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num top3">2</div>
                  <p>深圳校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num top3">3</div>
                  <p>杭州校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">4</div>
                  <p>青岛校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">5</div>
                  <p>长沙校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">6</div>
                  <p>南京校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">7</div>
                  <p>上海校区</p>
                  <p class="count">321,223</p>
                </li>
              </ul>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="访问量" force-render>
          <a-row :gutter="64">
            <a-col :span="16">
              <div ref="visit" style="height: 300px"></div>
            </a-col>
            <a-col :span="8">
              <p class="rank">校区访问量排名</p>
              <ul>
                <li class="item">
                  <div class="num top3">1</div>
                  <p>北京校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num top3">2</div>
                  <p>深圳校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num top3">3</div>
                  <p>杭州校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">4</div>
                  <p>青岛校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">5</div>
                  <p>长沙校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">6</div>
                  <p>南京校区</p>
                  <p class="count">321,223</p>
                </li>
                <li class="item">
                  <div class="num">7</div>
                  <p>上海校区</p>
                  <p class="count">321,223</p>
                </li>
              </ul>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-row :gutter="16" class="mt">
      <a-col :span="12">
        <a-card title="操作动态">
          <a-timeline>
            <a-timeline-item color="green">
              <p>王刚结算了一门课程</p>
              <p>操作时间 2020-09-18</p>
            </a-timeline-item>
            <a-timeline-item color="green">
              <p>王刚新增了一名学员</p>
              <p>操作时间 2020-09-18</p>
            </a-timeline-item>
            <a-timeline-item color="red">
              <p>李梦如删除了排课记录</p>
              <p>操作时间 2020-09-18</p>
            </a-timeline-item>
            <a-timeline-item>
              <p>王丽丽审批了一笔订单</p>
              <p>操作时间 2020-09-18</p>
            </a-timeline-item>
            <a-timeline-item color="gray">
              <p>刘小浩登陆了系统</p>
              <p>操作时间 2020-09-18</p>
            </a-timeline-item>
            <a-timeline-item color="gray">
              <p>王志登陆了系统</p>
              <p>操作时间 2020-09-18</p>
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="销售额类别占比">
          <div ref="percent" style="height: 380px"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawBar();
    this.drawLine();
    this.drawPie();
  },
  methods: {
    //销售额柱状图
    drawBar() {
      const myChart = this.$echarts.init(this.$refs["sales"]);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [200, 500, 450, 460, 270, 1210, 830, 365, 227, 876, 336, 765],
            type: "bar",
            itemStyle: {
              color: "#75aff9",
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    //访问量折线图
    drawLine() {
      const myChart = this.$echarts.init(this.$refs["visit"]);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [200, 500, 450, 460, 270, 1210, 830, 365, 227, 876, 336, 765],
            type: "line",
            itemStyle: {
              color: "#75aff9",
            },
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
    },
    //各科目销售额占比
    drawPie() {
      const myChart = this.$echarts.init(this.$refs["percent"]);
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "学科",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "语文" },
              { value: 735, name: "数学" },
              { value: 580, name: "英语" },
              { value: 484, name: "物理" },
              { value: 300, name: "化学" },
              { value: 400, name: "生物" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.income {
  color: rgba(0, 0, 0, 0.85);
  font-size: 30px;
  line-height: 38px;
}
.ico_u {
  color: green;
  font-size: 12px;
}
.ico_d {
  color: red;
  font-size: 12px;
}
.day {
  font-size: 14px;
  line-height: 22px;
  margin-top: 8px;
  padding-top: 9px;
  border-top: 1px solid #f0f0f0;
}
p {
  margin: 0;
}
.rank {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  margin-bottom: 20px;
}
.item {
  display: flex;
  margin-bottom: 10px;
  .num {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #f4f4f4;
    line-height: 20px;
    text-align: center;
  }
  .count {
    margin-left: auto;
  }
  p {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 20px;
    margin-left: 20px;
  }
  .top3 {
    color: white;
    background-color: #314659;
  }
}
</style>