<template>
  <div>
    <div id="myChart" ref="mychart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    this.getdata()
    // 调用绘制图表的方法
    // this.draw();
  },
  methods: {

    getdata(){
      this.$net
            .learnCondition()
            .then((res) => {
             console.log(res);
             this.draw(res)
            });
    },

    draw(res) {
      let obj = res?.data;
      let noStudy_list = []
      let unfinished_list = []
      let finished_list = []
      for (const key in obj) {
        noStudy_list.push(obj[key].noStudy)
        unfinished_list.push(obj[key].unfinished)
        finished_list.push(obj[key].finished)
      }
      console.log(noStudy_list,unfinished_list,finished_list);
      // 实例化echarts对象
      let myChart = echarts.init(this.$refs.mychart);

      // 绘制条形图
      myChart.setOption({
        title: {
          text: "学习情况折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["未学习人数", "未完成人数", "已完成人数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["第一月", "第二月", "第三月"],
        },
        yAxis: {
          type: "value",
        },
        series: [ {
            name: "已完成人数",
            type: "line",
            stack: "总量",
            data: finished_list,
          },
          {
            name: "未学习人数",
            type: "line",
            stack: "总量",
            data: noStudy_list,
          },
          {
            name: "未完成人数",
            type: "line",
            stack: "总量",
            data: unfinished_list,
          },
         
        ],
        
      });
    },
  },
};
</script>

 <style>
#myChart {
  width: 95%;
  height: 300px;
  margin: 20px auto;
  border: 1px solid #ccc;
}
</style>