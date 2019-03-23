$(function() {
  //发送ajax请求,动态渲染数据
  // 渲染页面
  render(1);

  //点击添加分类按钮,显示模态框
  $(".btn-add").on("click", function() {
    $(".modal").modal("show");
  });

  //点击模态框的添加按钮,发送ajax请求,动态渲染一级分类列表
  $(".dropdown-toggle").on("click", function() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 99
      },
      success: function(res) {
        // console.log(res);
        $(".dropdown-menu").html(template("tmplist", res));
      }
    });
  });

  //点击一级分类,时,获取它的内容,赋值给按钮
  $(".dropdown-menu").on("click", "a", function() {
    // console.log($(this).text());

    // 点击一级分类的时候获取该分类的id,赋值给隐藏的表单域
    var id = $(this).attr("data-id");
    // console.log(id);
    $(".dropdown-toggle .btntext").text($(this).text());
    $('[name="categoryId"]').val(id);

    $("#form")
      .data("bootstrapValidator")
      .updateStatus("categoryId", "VALID");

    // // 然后更改表单的校验的状态
    // $("#form")
    //   .data("bootstrapValidator")
    //   .updateStatus("categoryId", "VALID");
  });

  //上传图片
  $("#fileupload").fileupload({
    done: function(e, data) {
      // console.log(data);
      var result = data.result.picAddr;
      console.log(result);

      $(".img-box img").attr("src", result);
      $('[name="brandLogo"]').val(result);
      $("#form")
        .data("bootstrapValidator")
        .updateStatus("brandLogo", "VALID");
    }
  });

  //使用表单校验插件
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  //取消表单自动提交数据的默认行为
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();
    // //点击添加按钮,获取所有的数据,发送ajax请求,关闭模态框,重置表单,渲染页面
    var data = $("#form").serialize();
    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: data,
      success: function(res) {
        if (res.success) {
          //关闭模态框
          $(".modal").modal("hide");
          //重置表单
          $("#form")
            .data("bootstrapValidator")
            .resetForm(true);
          //让下拉框的内容也重置
          $(".dropdown-toggle").text("请选择一级分类");
          //让图片恢复成原来的
          $(".img-box img").attr("src", "./images/none.png");
          //重新渲染第一页的
          render(1);
        }
      }
    });
  });
});

function render(p) {
  $.ajax({
    url: "/category/querySecondCategoryPaging",
    type: "get",
    data: {
      page: p,
      pageSize: 5
    },
    success: function(res) {
      //渲染模板引擎
      $("#lt-table tbody").html(template("tmp", res));

      // 渲染分页插件
      setPage(res, render);
    }
  });
}
