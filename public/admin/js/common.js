$(function() {
  NProgress.configure({ showSpinner: false });
  //显示进度条
  $(document).ajaxStart(function() {
    NProgress.start();
    NProgress.configure({ trickleSpeed: 200 });
  });

  $(document).ajaxStop(function() {
    setTimeout(function() {
      NProgress.done();
    }, 3000);
  });

  //点击一级菜单的时候让二级菜单显示
  $(".category")
    .prev()
    .on("click", function() {
      //   console.log(this);
      $(this)
        .next()
        .stop()
        .slideToggle();
    });

  //点击菜单按钮让侧边栏显示或者隐藏
  $("#menu").on("click", function() {
    $(".lt-aside,.lt-section,.lt-section .head").toggleClass("now");
  });

  $("#retreat").on("click", function() {
    $(".modal.fade").modal("show");
  });

  //点击确定退出按钮,发送ajax请求,,退回到登陆页面
  $(".modal .logout").on("click", function() {
    $.ajax({
      url: "/employee/employeeLogout",
      type: "get",
      success: function(res) {
        // console.log(res);
        if (res.success) {
          location.href = "login.html";
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

// // 渲染页面
// function render(p) {
//   $.ajax({
//     url: "/user/queryUser",
//     type: "get",
//     data: {
//       page: p,
//       pageSize: 5
//     },
//     success: function(res) {
//       console.log(res);
//       $("#lt-table tbody").html(template("tmp", res));

//       // 渲染分页插件
//       // setPage(res, render);
//
//     }
//   });
// }
