$(function() {
  //发送ajax请求,动态渲染数据
  // 渲染页面
  render(1);
  var arr = [];

  //点击添加商品按钮,显示模态框
  $(".btn-add").on("click", function() {
    $(".modal").modal("show");
  });

  //点击模态框的添加按钮,发送ajax请求,动态渲染一级分类列表
  $(".dropdown-toggle").on("click", function() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
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
    $('[name="brandId"]').val(id);

    $("#form")
      .data("bootstrapValidator")
      .updateStatus("brandId", "VALID");
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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d{0,2}$/,
            message: "库存不能少于1或者大于999!"
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^[3-4]\d{1}-[3-4]\d{1}$/,
            message: "请输入正确的尺码!"
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品原价"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d{0,3}$/,
            message: "请输入正确的价格!"
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品价格"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d{0,3}$/,
            message: "请输入正确的价格!"
          }
        }
      },
      status: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  //上传图片
  $("#fileupload").fileupload({
    done: function(e, data) {
      // console.log(data);
      var result = data.result;
      //把得到的图片路径以及信息存到数组中
      arr.unshift(result);
      $(".img-box").prepend('<img src="' + result.picAddr + '" width="60"> ');

      if (arr.length > 3) {
        arr.pop();
        $(".img-box img")
          .eq(3)
          .remove();
      }
      //   console.log(arr);
      if (arr.length === 3) {
        $("#form")
          .data("bootstrapValidator")
          .updateStatus("status", "VALID");
      }
    }
  });

  //取消表单自动提交数据的默认行为,并且发送ajax请求,渲染页面
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();
    // //点击添加按钮,获取所有的数据,发送ajax请求,关闭模态框,重置表单,渲染页面
    var data = $("#form").serialize();

    data += "&picArr=" + JSON.stringify(arr);

    // console.log(data);

    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: data,
      success: function(res) {
        if (res.success) {
          //   console.log("成功");

          // //重置表单
          $("#form")
            .data("bootstrapValidator")
            .resetForm(true);
          // //让下拉框的内容也重置
          $(".dropdown-toggle").text("请选择二级分类");
          // //让图片恢复成原来的
          $(".img-box img").remove();
          //清空数组
          arr = [];
          //关闭模态框
          $(".modal").modal("hide");
          // //重新渲染第一页的
          render(1);
        }
      }
    });
  });
});

function render(p) {
  $.ajax({
    url: "/product/queryProductDetailList",
    type: "get",
    data: {
      page: p,
      pageSize: 5
    },
    success: function(res) {
      //   console.log(res);

      //渲染模板引擎
      $("#lt-table tbody").html(template("tmp", res));

      // 渲染分页插件
      setPage(res, render);
    }
  });
}
