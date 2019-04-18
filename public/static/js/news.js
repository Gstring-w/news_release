var route = document.getElementById("route");
var articleitem = document.getElementById("articleitem");
var flag = true;
var data;
var wrapLoading = document.getElementById("wrap-loading");
getNews("all", renderData);
route.onclick = function(e) {
  var classNameDom = e.target.getAttribute("data");
  console.log(classNameDom);

  wrapLoading.style.display = "block";

  if (flag) {
    flag = false;
    articleitem.innerHTML = "";
    if (classNameDom == "") {
      classNameDom = "all";
    }
    getNews(classNameDom, renderData);
    //用户超时
    setTimeout(() => {
      flag = true;
      wrapLoading.style.display = "none";
    }, 8000);
  }
};

scollLoad();
function scollLoad() {
  window.onscroll = function() {
    console.log(11);
  };
}

function getNews(tag, callback) {
  axios
    .get(window._href + "/info?tag=" + tag)
    .catch(err => {
      console.log(err);
    })
    .then(data => {
      callback(data.data.data);
    });
}

function renderData(data) {
  data = data;

  var str = "";
  data.forEach(item => {
    console.log(!item.img);
    if (!item.img) {
      str = `<div class="article-item no-image">
      <a href="./newsDetails.html?id=${item.id}">
      <h4>${item.title}</h4>
      <div class="article-item-details">
        <span class="author">${item.author}</span>
        <span class="tag">热门</span>
        <span class="tag">热门</span>
      </div>
      </a>
    </div>`;
    } else if (
      item.img &&
      typeof item.img === "string" &&
      typeof item.img1 !== "string"
    ) {
      str = `<div class="article-item one-image">
      <a href="./newsDetails.html?id=${item.id}">
      <div class="imageWrapper">
        <img src="${item.img}" alt="" />
        <h4>${item.title}</h4>
      </div>
      <div class="article-item-details">
        <span class="author">${item.author}</span>
        <span class="tag">热门</span>
      </div>
      </a>
    </div>`;
    } else if (
      item.img &&
      typeof item.img === "string" &&
      typeof item.img2 === "string"
    ) {
      str = `<div class="article-item">
      <a href="./newsDetails.html?id=${item.id}">
        <div class="three-image">
          <h4>
          ${item.title}
          </h4>
          <div class="three-image-wrap">
            <img src="${item.img}" alt="" />
            <img src="${item.img1}" alt="" />
            <img src="${item.img2}" alt="" />
          </div>
        </div>
        <div class="article-item-details">
          <span class="author">${item.author}</span>
          <span class="tag">热门</span>
        </div>
      </a>
    </div>`;
    }

    articleitem.innerHTML += str;
  });
  console.log(data.length);
  if (data.length == 0) {
    articleitem.innerHTML = "这个频道还没有数据";
  }
  wrapLoading.style.display = "none";
  flag = true;
}
