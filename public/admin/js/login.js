var $form = $("#form");

// 初始化校验
$form.bootstrapValidator({
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
    dataType: "json",
    data: $form.serialize(),
    success: function(res) {
      //   console.log(res);
      if (res.error === 1000) {
        // console.log("用户名错误");
      } else if (res.error === 1001) {
        // console.log("密码错误");
      } else if (res.success === true) {
        // console.log("登陆成功");
      }
    }
  });
});
