$(function() {
  //发送ajax请求,动态渲染数据
  // 渲染页面
  render(1);

  //点击添加分类按钮,显示模态框
  $(".btn-add").on("click", function() {
    $(".modal").modal("show");
  });

  //使用表单校验插件
  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "二级分类名不能为空"
          }
        }
      }
    }
  });

  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();

    // 发送ajax请求,关闭模态框,重置表单
    var categoryName = $('[name="categoryName"]').val();

    $.ajax({
      url: "/category/addTopCategory",
      type: "post",
      data: {
        categoryName: categoryName
      },
      success: function(res) {
        if (res.success) {
          // //关闭模态框,动态渲染数据
          $(".modal").modal("hide");
          //重置表单
          $("#form")
            .data("bootstrapValidator")
            .resetForm(true);
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
