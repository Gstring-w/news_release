window.onload = function() {
  // 用户从右边划出
  hideToShowInfo();
  //检查是否登陆
  checkLogin();

  //没有登陆信息cookie
  toLoginWep();

  //绑定退出登陆
  var avater = document.getElementById("avater");
  var toLogin = document.getElementById("toLogin"),
    loginWap = document.getElementById("user1"),
    login = document.getElementById("login");
  var tologinEd = document.getElementById("tologinEd");
  tologinEd.onclick = function() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.clear();
    toLogin.innerText = "立即登陆";
    avater.src =
      "https://gss0.bdstatic.com/5foIcy0a2gI2n2jgoY3K/n/nvn/static/news/imgs/person_dcc8a01.png";

    toLogin.onclick = function() {
      loginWap.style.display = "none";
      login.style.transform = "translateX(0)";
    };
  };
};

function hideToShowInfo() {
  var infoUser = document.getElementById("user1");
  infoUser.style.transform = "translateX(0)";
}

function checkLogin() {
  var cookie = document.cookie;
  console.log(cookie);
  var key = cookie.split("=")[0],
    value = cookie.split("=")[1],
    toLogin = document.getElementById("toLogin"),
    loginWap = document.getElementById("user1"),
    login = document.getElementById("login"),
    avater = document.getElementById("avater");

  if (cookie && value !== "undefined") {
    avater.src = "./static/images/logined.png";
    toLogin.innerText = value.slice(0, 4) + "...";
    toLogin.title = value;
  } else {
    toLogin.onclick = function() {
      loginWap.style.display = "none";
      login.style.transform = "translateX(0)";
    };
  }
}

function toLoginWep() {
  var loginBtn = document.getElementById("login-btn");

  loginBtn.onclick = function() {
    var user = document.getElementById("user").value,
      pass = document.getElementById("pass").value;
    if (user === "" || pass === "") {
      alert("请不要皮！谢谢");
    } else {
      //展示遮罩层loading
      showWrapper("正在登陆中...");
      console.log({ username: user, password: pass });
      axios
        .post(window._href + "/login", { username: user, password: pass })
        .catch(err => {
          console.log(err);
        })
        .then(data => {
          console.log(data);
          if (data.data.err) {
            alert("登陆失败！！！");
            showWrapper("登陆");
            return;
          } else {
            showWrapper("登陆成功！");
            localStorage.setItem("username", data.data.data[0].username);
            document.cookie = "username=" + data.data.data[0].username;
            window.location.replace(window._href + "/index.html");
          }
        });
    }
  };
}

function showWrapper(text) {
  var loading = document.getElementById("login-btn");

  loading.innerText = text;
}
