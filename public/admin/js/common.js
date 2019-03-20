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
