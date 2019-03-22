$(function() {
  //发送ajax请求,动态渲染数据
  // 渲染页面
  render(1);

  //点击添加分类按钮,显示模态框
  $(".btn-add").on("click", function() {
    $(".modal").modal("show");
  });

  //点击模态框的添加按钮,发送ajax请求,动态渲染列表
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

  //点击一级分类,时,获取它的内容,符合给按钮
  $(".dropdown-menu").on("click", "a", function() {
    // console.log($(this).text());

    // 点击一级分类的时候获取该分类的id,赋值给隐藏的表单域
    var id = $(this).attr("data-id");
    // console.log(id);
    $(".dropdown-toggle .btntext").text($(this).text());
    $('[name="categoryId"]').val(id);

    // // 然后更改表单的校验的状态
    // $("#form")
    //   .data("bootstrapValidator")
    //   .updateStatus("categoryId", "VALID");
  });

  // 进行表单校验
  //使用表单校验插件
  // $("#form").bootstrapValidator({
  //   // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
  //   excluded: [],

  //   //2. 指定校验时的图标显示，默认是bootstrap风格
  //   feedbackIcons: {
  //     valid: "glyphicon glyphicon-ok",
  //     invalid: "glyphicon glyphicon-remove",
  //     validating: "glyphicon glyphicon-refresh"
  //   },

  //   //3. 指定校验字段
  //   fields: {
  //     //校验用户名，对应name表单的name属性
  //     categoryId: {
  //       validators: {
  //         //不能为空
  //         notEmpty: {
  //           message: "请选择一级分类"
  //         }
  //       }
  //     }
  //   }
  // });
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
