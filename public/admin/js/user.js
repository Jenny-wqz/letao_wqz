$(function() {
  var id;
  var isDelete;
  var p;
  //发送ajax请求,动态渲染页面
  render(1);
  // 渲染页面
  function render(p) {
    $.ajax({
      url: "/user/queryUser",
      type: "get",
      data: {
        page: p,
        pageSize: 5
      },
      success: function(res) {
        //   console.log(res);
        $("#lt-table tbody").html(template("tmp", res));

        // 渲染分页插件
        setPage(res, render);
      }
    });
  }

  //点击禁用或者启用按钮,弹出模态框
  $("#lt-table tbody").on("click", ".btn", function() {
    id = $(this)
      .parent()
      .data("id");
    // console.log(id);

      $(".modal").modal("show");

    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // console.log(isDelete);

    p = $(this)
      .parent()
      .attr("data-page");
    // console.log(p);
  });
  //点击模态框中的确定按钮,发送ajax请求,动态渲染页面
  $(".modal .modal-content .btn.confirm").on("click", function() {
    console.log(11);

    $.ajax({
      url: "/user/updateUser",
      type: "post",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(res) {
        if (res.success) {
          //   console.log(res);
          $(".modal").modal("hide");
          render(p);
        }
      }
    });
  });
});

//分页插件
function setPage(res, render) {
  $("#lt-paginator").bootstrapPaginator({
    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
    currentPage: res.page, //当前页
    totalPages: Math.ceil(res.total / res.size), //总页数
    size: "small", //设置控件的大小，mini, small, normal,large
    onPageClicked: function(event, originalEvent, type, page) {
      //为按钮绑定点击事件 page:当前点击的按钮值
      render(page);
    }
  });
}
