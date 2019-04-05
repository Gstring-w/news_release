$(document).ready(function() {
  /*
    动态的根据nav li的字数来进行排列
    */
  $(".container nav ul li").each(function(index, item) {
    var _deviceWidth = $("body").width();
    if (
      $(item)
        .find("a")
        .html().length > 2
    ) {
      $(item).width(_deviceWidth / 3);
    } else {
      $(item).width(_deviceWidth / 6);
    }
  });

  $(window).resize(function() {
    $(".container nav ul li").each(function(index, item) {
      var _deviceWidth = $("body").width();
      if (
        $(item)
          .find("a")
          .html().length > 2
      ) {
        $(item).width(_deviceWidth / 3);
      } else {
        $(item).width(_deviceWidth / 6);
      }
    });
  });

  /*nav li点击后
    1.对应的ul显示，兄弟ul隐藏
    2.li a 显示下划线
    */
  $(".container nav ul li a").click(function() {
    $(this).addClass("choice");
    $(this)
      .parent()
      .siblings()
      .find("a")
      .removeClass("choice");
    var _list_item = "#" + $(this).attr("data") + "-item-list";
    /*alert(_list_item);
     */
    $(_list_item).removeClass("hide");
    $(_list_item)
      .siblings()
      .addClass("hide");
  });
  //   var isShow = false;
  //   $("#more").click(function() {
  //     if (!isShow) {
  //       $("#show").removeClass("hide-more");
  //       isShow = true;
  //     } else {
  //       $("#show").addClass("hide-more");
  //       isShow = false;
  //     }
  //   });

  function renderNav(arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
      str += `<ul>
        <li><a data="jingxuan" href="#">精选</a><i></i></li>
        <li><a data="baijia" href="#">百家</a><i></i></li>
        <li><a data="local" href="#">本地</a><i></i></li>
        <li><a data="entertainment" href="#">娱乐</a><i></i></li>
        <li><a data="shehui" href="#">社会</a><i></i></li>
        <li><a data="junshi" href="#">军事</a></li>
        <li><a data="women" href="#">女人</a><i></i></li>
        <li><a data="funny" href="#">搞笑</a><i></i></li>
        <li><a data="sciencs" href="#">科技</a><i></i></li>
        <li>
          <a data="more" id="more" href="#">更多</a
          ><span class="iconfont">&#xe610;</span>
        </li>
      </ul>`;
    }
  }
  var likeArr = [
    {
      title: "精选",
      data: "jingxuan"
    },
    {
      title: "百家",
      data: "baijia"
    },
    {
      title: "娱乐",
      data: "yule"
    },
    {
      title: "社会",
      data: "shehui"
    },
    {
      title: "军事",
      data: "junshi"
    },
    {
      title: "女人",
      data: "nvren"
    },
    ,
    "百家",
    "本地",
    "娱乐",
    "社会",
    "军事",
    "女人",
    "搞笑",
    "科技"
  ];
  var likePort = function() {};
});
