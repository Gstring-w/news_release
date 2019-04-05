const baseUrl = "http://localhost/allNews";
var route = document.getElementById("route");
var flag = true;
var wrapLoading = document.getElementById("wrap-loading");
route.onclick = function(e) {
  var classNameDom = e.target.getAttribute("data");
  console.log(classNameDom);

  wrapLoading.style.display = "block";

  if (flag) {
    flag = false;
    setTimeout(() => {
      wrapLoading.style.display = "none";
      flag = true;
    }, 1000);

    //用户超时
    setTimeout(() => {
      flag = true;
      wrapLoading.style.display = "none";
    }, 8000);
  }

  // 加载数据
  // axios
  //   .get(baseUrl, { tag: "all" })
  //   .catch(e => {
  //     console.log(e);
  //   })
  //   .then(data => {
  //     console.log(data);
  //   });
};

scollLoad();
function scollLoad() {
  window.onscroll = function() {
    console.log(11);
  };
}
