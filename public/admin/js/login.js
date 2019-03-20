var $form = $("#form");

// 初始化校验
$form.bootstrapValidator({
  // 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: "glyphicon glyphicon-ok",
    invalid: "glyphicon glyphicon-remove",
    validating: "glyphicon glyphicon-refresh"
  },

  // 指定校验字段
  fields: {
    //校验用户名,对应用户表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: "用户名不能为空"
        },
        stringLength: {
          min: 3,
          max: 9,
          message: "用户名长度必须在3到9之间"
        },
        callback: {
          message: "用户名不存在!"
        }
      }
    },

    //校验密码
    password: {
      validators: {
        //不能为空
        notEmpty: {
          message: "密码不能为空"
        },
        stringLength: {
          min: 6,
          max: 12,
          message: "密码长度必须在6-12之间"
        },
        callback: {
          message: "密码错误!"
        }
      }
    }
  }
});

$("#form").on("success.form.bv", function(e) {
  e.preventDefault();
  //使用ajax提交逻辑
  //   console.log("验证成功");
  $.ajax({
    url: "/employee/employeeLogin",
    type: "post",
    data: $form.serialize(),
    success: function(res) {
      //   console.log(res);
      if (res.error === 1000) {
        //如果失败了,提醒用户不存在
        $form
          .data("bootstrapValidator")
          .updateStatus("username", "INVALID", "callback");
      } else if (res.error === 1001) {
        //提醒用户密码错误
        $form
          .data("bootstrapValidator")
          .updateStatus("password", "INVALID", "callback");
      } else if (res.success === true) {
        // console.log("登陆成功");
        location.href = "index.html";
      }
    }
  });
});

//点击重置按钮,重置表单
$("[type=reset]").on("click", function() {
  //由于reset类型的表单能够自动清空表单中的内容,所以在这里不需要再传参
  // $form.data("bootstrapValidator").resetForm();
  //如果只是一个单纯的按钮,需要在resetForm方法中传一个true
  // $form.data("bootstrapValidator").resetForm();
  $form.data("bootstrapValidator").resetForm(true);
});
