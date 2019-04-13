$(document).ready(function() {
  refreshNews();

  $("#edite-panel-button").click(function() {
    var _id = $(this).attr("dataIndex");
    updateNews(_id);
  });

  //编辑表单，input在失去焦点时进行校验
  $("#edite-panel form input").blur(function() {
    //remove父元素has-开头的class
    _classStr = $(this)
      .parent()
      .attr("class")
      .replace(/has-\w+/g, "");
    $(this)
      .parent()
      .attr("class", _classStr);
    //remove兄弟span中glypicon-开头的class
    _classStr = $(this)
      .siblings("span")
      .attr("class")
      .replace(/glyphicon-\w+/g, "");
    $(this)
      .siblings("span")
      .attr("class", _classStr);

    if ($(this).val() == "") {
      //添加需要的class
      $(this)
        .parent()
        .addClass("has-error has-feedback");
      $(this)
        .siblings("span")
        .addClass("glyphicon-remove");
    } else {
      $(this)
        .parent()
        .addClass("has-success has-feedback");
      $(this)
        .siblings("span")
        .addClass("glyphicon-ok");
    }
    $(this)
      .siblings("span")
      .removeClass("sr-only");
  });

  //添加表单，input在失去焦点时进行校验
  $("#add-panel form input").blur(function() {
    //remove父元素has-开头的class
    _classStr = $(this)
      .parent()
      .attr("class")
      .replace(/has-\w+/g, "");
    $(this)
      .parent()
      .attr("class", _classStr);
    //remove兄弟span中glypicon-开头的class
    _classStr = $(this)
      .siblings("span")
      .attr("class")
      .replace(/glyphicon-\w+/g, "");
    $(this)
      .siblings("span")
      .attr("class", _classStr);

    if ($(this).val() == "") {
      //添加需要的class
      $(this)
        .parent()
        .addClass("has-error has-feedback");
      $(this)
        .siblings("span")
        .addClass("glyphicon-remove");
    } else {
      $(this)
        .parent()
        .addClass("has-success has-feedback");
      $(this)
        .siblings("span")
        .addClass("glyphicon-ok");
    }
    $(this)
      .siblings("span")
      .removeClass("sr-only");
  });

  $("#add-panel-button").click(function() {
    addNews();
  });

  $(".nav.navbar-nav li").click(function() {
    $(this)
      .siblings()
      .removeClass("active");
    $(this).addClass("active");
    _type = $(this).attr("type");
    $("#" + _type + "-panel").show();
    $(this)
      .siblings()
      .each(function() {
        _type = $(this).attr("type");
        $("#" + _type + "-panel").hide();
      });
  });

  $("#news-table tbody").on("click", "th button", function() {
    if ($(this).attr("operation") == "edite") {
      var _id = $(this).attr("dataIndex");
      $("#edite-panel").hide();
      resetEditePanel();
      // $.ajax({
      //     type: "get",
      //     url: "/news/list/" + _id,
      //     dataType: "json",
      //     /*data: { "id": _id },*/
      //     success: function(data) {
      //         if (data != "") {
      //             $.each(data, function(index, item) {
      //                 $("#select_newType").find("option").each(function() {
      //                     if ($(this).attr("value") == item.newType) {
      //                         $(this).attr("selected", "selected");
      //                         $(this).siblings().removeAttr("selected");
      //                     }
      //                 })
      //                 $("#input-newImage").val(item.newImge);
      //                 $("#input-newTitle").val(item.newTitle);
      //                 $("#input-newPubDate").val(item.newPubDate);
      //                 $("#input-newMark").val(item.newMark);
      //                 $("#input-newurl").val(item.newurl);
      //                 $("#edite-panel-button").attr("dataIndex", _id);
      //             })
      //         }
      //         $("#edite-panel").show();
      //     },
      //     error: function(data) {
      //         console.log(data);
      //     }
      // })
    } else if ($(this).attr("operation") == "delete") {
      var _id = $(this).attr("dataIndex");
      // if (confirm('确实要删除' + _id + "新闻么")) {
      //     $.ajax({
      //         type: "get",
      //         url: "/news/delete/" + _id,
      //         dataType: "json",
      //         /*data: { "id": _id },*/
      //         success: function(data) {
      //             console.log(data);
      //             deleteNews(data);
      //         },
      //         error: function(data) {
      //             console.log(data);
      //         }
      //     })
      // }
    }
  });
});

function resetEditePanel() {
  _classStr = $("#edite-panel form")
    .find(".form-group")
    .attr("class")
    .replace(/has-\w+/g, "");
  $("#edite-panel")
    .find(".form-group")
    .attr("class", _classStr);
  _classStr = $("#edite-panel form .form-group")
    .find("span")
    .attr("class")
    .replace(/glyphicon-\w+/, "");
  $("#edite-panel form .form-group")
    .find("span")
    .attr("class", _classStr);
  //edite-result清空
  $("#edite-result").html("");
}

function deleteNews(id) {
  $("#news-table tbody #" + id).remove();
}

function resetAddPanel() {
  _classStr = $("#add-panel form")
    .find(".form-group")
    .attr("class")
    .replace(/has-\w+/g, "");
  $("#add-panel")
    .find(".form-group")
    .attr("class", _classStr);
  _classStr = $("#add-panel form .form-group")
    .find("span")
    .attr("class")
    .replace(/glyphicon-\w+/, "");
  $("#add-panel form .form-group")
    .find("span")
    .attr("class", _classStr);
  //edite-result清空
  $("#add-result").html("");
}

function addNews() {
  _newtype = $("#add-panel #select_newType option:selected").val();
  _newImge = $("#add-panel #input-newImage").val();
  _newTitle = $("#add-panel #input-newTitle").val();
  _newPubDate = $("#add-panel #input-newPubDate").val();
  _newMark = $("#add-panel #input-newMark").val();
  _newurl = $("#add-panel #input-newurl").val();

  var data = {
    newtype: _newtype,
    newImge: _newImge,
    newTitle: _newTitle,
    newPubDate: _newPubDate,
    newMark: _newMark,
    newurl: _newurl
  };
  //   console.log(data);

  postArticle(data);
  if (
    _newImge == "" ||
    _newTitle == "" ||
    _newPubDate == "" ||
    _newMark == "" ||
    _newurl == ""
  ) {
    $("#add-result").html("请认真填写表单！");
  }
  //     $.ajax({
  //         type: "post",
  //         url: "/news/add",
  //         data: {
  //             "newtype": _newtype,
  //             "newImge": _newImge,
  //             "newTitle": _newTitle,
  //             "newPubDate": _newPubDate,
  //             "newMark": _newMark,
  //             "newurl": _newurl
  //         },
  //         error: function(data) {
  //             console.log(data);
  //             $("#add-result").html("新增" + data.toString() + "新闻失败");
  //         },
  //         success: function(data) {
  //             console.log(data);
  //             $("#add-result").html("新增" + data.toString() + "新闻完成");
  //             refreshNews(); //刷新列表
  //         },
  //         dataType: "json"
  //     });
  // }
}

var updateNews = function(id) {
  _newtype = $("#select_newType option:selected").val();
  _newImge = $("#input-newImage").val();
  _newTitle = $("#input-newTitle").val();
  _newPubDate = $("#input-newPubDate").val();
  _newMark = $("#input-newMark").val();
  _newurl = $("#input-newurl").val();
  if (
    _newImge == "" ||
    _newTitle == "" ||
    _newPubDate == "" ||
    _newMark == "" ||
    _newurl == ""
  ) {
    $("#edite-result").html("请认真填写表单！");
  } else {
    $("#list-panel #edite-panel .locked").show(); //锁定
    $.ajax({
      type: "post",
      url: "/news/update/" + id,
      data: {
        id: id,
        newtype: _newtype,
        newImge: _newImge,
        newTitle: _newTitle,
        newPubDate: _newPubDate,
        newMark: _newMark,
        newurl: _newurl
      },
      error: function(data) {
        console.log(data);
        $("#edite-result").html("修改新闻" + data.toString() + "失败");
        $("#list-panel #edite-panel .locked").hide();
      },
      success: function(data) {
        console.log(data);
        $("#edite-result").html("修改新闻" + data.toString() + "成功");
        $("#list-panel #edite-panel .locked").hide();
        refreshNews(); //刷新列表
      },
      dataType: "json"
    });
  }
};

//获取所有新闻
var refreshNews = function() {
  $.ajax({
    type: "get",
    url: "/news/list",
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      console.log(data);
      $("#news-table tbody").empty();
      var _index = 1;
      $.each(data, function(index, item) {
        var th0 = $("<th></th>").html(item.id);
        var th1 = $("<th></th>").html(translateNewsType2Chinese(item.newType));
        /*var th2 = $("<th></th>").html(item.newImge);*/
        var th3 = $("<th></th>").html(item.newTitle);
        var th4 = $("<th></th>").html(item.newPubDate);
        var th5 = $("<th></th>").html(item.newMark);
        var th6 = $("<th></th>").html(item.newurl);
        var th7 = $("<th></th>");
        var button1 = $("<button></button>")
          .attr("type", "button")
          .attr("dataIndex", item.id)
          .attr("operation", "edite")
          .addClass("btn btn-info")
          .html("编辑");
        var button2 = $("<button></button>")
          .attr("type", "button")
          .attr("dataIndex", item.id)
          .attr("operation", "delete")
          .addClass("btn btn-danger")
          .html("删除");
        var _div = $("<div></div>")
          .addClass("operation")
          .append(button1, button2);
        th7.append(_div);
        var tr = $("<tr></tr>")
          .attr("id", item.id)
          .append(th0, th1, th3, th4, th5, th6, th7);
        $("#news-table tbody").append(tr);
      });
    },
    dataType: "json"
  });
};

function translateNewsType2Chinese(string) {
  var entityMap = {
    jingxuan: "精选",
    baijia: "百家",
    local: "本地",
    entertainment: "娱乐",
    shehui: "社会",
    junshi: "军事",
    women: "女人",
    funny: "搞笑",
    internet: "互联网",
    sciencs: "科学"
  };
  return entityMap[string];
}
