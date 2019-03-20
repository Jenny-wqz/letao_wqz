//实例化图表
$(function() {
  // 基于准备好的dom，初始化echarts实例
  var chartLeft = echarts.init(document.querySelector(".chart-left"));
  var chartRight = echarts.init(document.querySelector(".chart-right"));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: "2018年注册人数"
    },
    tooltip: {},
    legend: {
      data: ["人数"]
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: [100, 200, 360, 1000, 800, 600]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  chartLeft.setOption(option1);

  var option2 = {
    title: {
      text: "某站点用户访问来源",
      subtext: "纯属虚构",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["耐克", "361度", "阿迪", "新百伦", "鸿星尔克"]
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "耐克" },
          { value: 310, name: "361度" },
          { value: 234, name: "阿迪" },
          { value: 135, name: "新百伦" },
          { value: 1548, name: "鸿星尔克" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  chartRight.setOption(option2);
});
