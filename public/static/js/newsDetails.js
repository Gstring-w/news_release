document.addEventListener("gesturestart", function(e) {
  e.preventDefault();
});
document.addEventListener("dblclick", function(e) {
  e.preventDefault();
});
document.addEventListener("touchstart", function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
});
var lastTouchEnd = 0;

var articleDetails = document.getElementById("articleDetails");
var search = window.location.search;
var id = search.split("=")[1];

document.addEventListener(
  "touchend",
  function(event) {
    var now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);

var response = document.getElementById("response"),
  input = document.getElementById("input"),
  container = document.getElementById("container"),
  inputText = document.getElementById("input-text"),
  wrappSh = document.getElementById("wrapp-sh"),
  responseBtn = document.getElementById("response-btn");

//点击回复
responseComment();

function responseComment() {
  var comment = document.getElementById("comment");

  comment.onclick = function(e) {
    var classNameDom = e.target.getAttribute("class"),
      responseName = e.target.getAttribute("data-target");

    var selfName = localStorage.getItem("username");

    if (selfName === null) {
      alert("你还没有登陆哦");
      return;
    }

    if (classNameDom === "response") {
      wrappSh.style.display = "block";

      input.style.transform = "rotateY(0deg)";

      inputText.focus();

      //取消回复
      wrappSh.onclick = function() {
        wrappSh.style.display = "none";
        input.style.transform = "rotateY(90deg)";
      };

      //输入回复信息
      responseBtn.onclick = function() {
        var value = inputText.value;
        if (value === "") {
          alert("不要输入空的字符串，这让我很难办o~");
        } else {
          //回复框消失
          wrappSh.style.display = "none";
          input.style.transform = "rotateY(90deg)";

          //插入回复
          var str = `<div class="comment-item">
          <div class="comment-item-info">
            <div class="info-title">
              <span class="response-target">${selfName}</span>
              回复 ${responseName}：
            </div>
            <div class="info-comment">${value}</div>
          </div>
          <div class="response" data-target="自伤">回复</div>
        </div>`;
          comment.innerHTML += str;

          var params = {
            article_id: id,
            content: value,
            ownername: selfName,
            toname: responseName
          };
          postCommentMessage(params);
        }
      };
    }
  };
}

//处理url
window.onload = function() {
  getUrlParamsInfo(id, renderData);
  getComment(id, renderComment);

  //绑定评论文章

  bindEvent(id);
};

//内容
function getUrlParamsInfo(id, cb) {
  axios
    .get(window._href + "/infoDetails?id=" + id)
    .catch(err => {
      console.log(err);
    })
    .then(data => {
      cb(data.data);
    });
}

function renderData(data) {
  var str = "";

  data.forEach(item => {
    str += `<h4>${item.title}</h4>
    <p>
     ${item.content}
    </p>`;
  });
  articleDetails.innerHTML += str;
}

//pinglun

function getComment(artcicle, cb) {
  axios
    .get(window._href + "/comment?articleId=" + artcicle)
    .catch(err => {
      console.log(err);
    })
    .then(data => {
      cb(data.data.data);
    });
}

function renderComment(data) {
  var comment;
  console.log(data);
  var str = "";
  var responArr = [];
  data.forEach(item => {
    // 回复
    console.log(!item.toname);
    if (!item.toname) {
      comment = document.getElementsByClassName("commentid")[0];

      str = `<div id=${item.ownername}>
      <div class="comment-item" >
      <div class="avater">
        <img src="./static/images/logined.png" alt="" />
      </div>
      <div class="comment-item-info">
        <div class="info-title">${item.ownername}：</div>
        <div class="info-comment">${item.content}</div>
      </div>
      <div class="response" id="response" data-target=${item.ownername}>
        回复
      </div>
    </div></div>`;

      comment.innerHTML += str;
    } else {
      responArr.push(item);
    }
  });
  responArr.forEach(item => {
    comment = document.getElementById(item.toname);
    str = ` <div class="comment-item" id=${item.ownername}>
    <div class="comment-item-info">
      <div class="info-title">
        <span class="response-target">${item.ownername}</span>
        回复 ${item.toname}：
      </div>
      <div class="info-comment">${item.content}</div>
    </div>
    <div class="response" data-target=${item.ownername}>回复</div>
  </div>`;
    comment.innerHTML += str;
    console.log(comment);
  });
}

function bindEvent(id) {
  var response = document.getElementById("res_comment");

  response.onclick = function(e) {
    var responseName = e.target.getAttribute("data-target");

    var selfName = localStorage.getItem("username");

    if (selfName === null) {
      alert("你还没有登陆哦");
      return;
    }

    wrappSh.style.display = "block";
    input.style.transform = "rotateY(0deg)";
    inputText.focus();

    //取消回复
    wrappSh.onclick = function() {
      wrappSh.style.display = "none";
      input.style.transform = "rotateY(90deg)";
    };

    //输入回复信息
    responseBtn.onclick = function() {
      var value = inputText.value;
      if (value === "") {
        alert("不要输入空的字符串，这让我很难办o~");
      } else {
        //回复框消失
        wrappSh.style.display = "none";
        input.style.transform = "rotateY(90deg)";

        //插入回复
        var str = `<div id=${selfName}>
        <div class="comment-item" >
        <div class="avater">
          <img src="./static/images/logined.png" alt="" />
        </div>
        <div class="comment-item-info">
          <div class="info-title">${selfName}</div>
          <div class="info-comment">${value}</div>
        </div>
        <div class="response" id="response" data-target=${selfName}>
          回复
        </div>
      </div></div>`;
        comment.innerHTML += str;
      }

      var params = {
        article_id: id,
        content: value,
        ownername: selfName,
        toname: null
      };
      postCommentMessage(params);
    };
  };
}

// {article_id,content,ownername,toname?}
function postCommentMessage(params) {
  axios
    .post(window._href + "/comment_post", params)
    .catch(err => {
      console.log(err);
    })
    .then(data => {
      console.log(data);
    });
}
