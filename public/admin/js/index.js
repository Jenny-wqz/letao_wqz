//实例化图表
$(function() {
  // var data1 = [100, 200, 360, 1000, 800, 600];
  // var data2 = [
  //   { value: 335, name: "耐克" },
  //   { value: 310, name: "361度" },
  //   { value: 234, name: "阿迪" },
  //   { value: 135, name: "新百伦" },
  //   { value: 1548, name: "鸿星尔克" }
  // ];

  var data = {
    title: "2018年注册人数",
    list: [
      { month: "1月", value1: 100 },
      { month: "2月", value1: 400 },
      { month: "3月", value1: 800 },
      { month: "4月", value1: 500 },
      { month: "5月", value1: 1000 },
      { month: "6月", value1: 300 }
    ]
  };

  var data2 = [
    { value: 350, name: "耐克" },
    { value: 450, name: "361度" },
    { value: 1000, name: "新百伦" },
    { value: 600, name: "鸿星尔克" },
    { value: 250, name: "匡威" }
  ];

  // 基于准备好的dom，初始化echarts实例
  var chartLeft = echarts.init(document.querySelector(".chart-left"));
  var chartRight = echarts.init(document.querySelector(".chart-right"));

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: data.title
    },
    tooltip: {},
    legend: {
      data: ["人数"]
    },
    xAxis: {
      data: data.list.map(item => item.month)
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: data.list.map(item => item.value1)
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
      data: data2.map(item => item.name)
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: data2,
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
