$(function() {
  //发送ajax请求,动态渲染数据
  // 渲染页面
  render(1);

  //点击添加分类按钮,显示模态框
  $(".btn-add").on("click", function() {
    $(".modal").modal("show");
  });

  //点击模态框的添加按钮,获取文本框中的内容,发送ajax请求
  $(".confirm").on("click", function() {
    var categoryName = $('[class="form-control"]')
      .val()
      .trim();
    $('[class="form-control"]').val("");
    if (categoryName === "") {
      return;
    }
    $.ajax({
      url: "/category/addTopCategory",
      type: "post",
      data: {
        categoryName
      },
      success: function(res) {
        if (res.success) {
          //关闭模态框,动态渲染数据
          $(".modal").modal("hide");
          render(1);
        }
      }
    });
  });
});

function render(p) {
  $.ajax({
    url: "/category/queryTopCategoryPaging",
    type: "get",
    data: {
      page: p,
      pageSize: 5
    },
    success: function(res) {
      // console.log(res);
      $("#lt-table tbody").html(template("tmp", res));

      // 渲染分页插件
      setPage(res, render);
    }
  });
}
