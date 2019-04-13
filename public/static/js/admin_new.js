window.onload = function() {
  //获得新闻列表
  getUrlParamsInfo();
};

function render(data) {
  var tableBody = document.getElementById("tbody"),
    str = "",
    data = data.data;

  data.forEach(item => {
    str += `<tr>
        <th>${item.id}</th>
        <th>${item.tag === null ? "all" : item.tag}</th>
        <th>${item.title}</th>
        <th>${item.utime}</th>
        <th>${item.tag}</th>
        <th><a href="http://localhost:3000/newsDetails.html?id=${
          item.id
        }">具体细节</a></th>
        <th data-id=${item.id} id="delete">删除</th>
    </tr>`;
  });
  tableBody.innerHTML += str;
  bindEventDelete();
}

function bindEventDelete() {
  var deleteDom = document.getElementById("delete"),
    deltete_id = deleteDom.getAttribute("data-id");
  deleteDom.onclick = function() {
    axios
      .get("/delete?id=" + deltete_id)
      .catch(e => {
        console.log(e);
      })
      .then(data => {
        alert("success");
        window.location.reload();
      });
  };
}

function getUrlParamsInfo() {
  axios
    .get("/info?tag=all")
    .catch(err => {
      console.log(err);
    })
    .then(data => {
      render(data.data);
    });
}

function postArticle(data) {
  console.log(data);

  axios
    .post("/post_article", data)
    .catch(e => {
      console.log(e);
    })
    .then(data => {
      console.log(data);
    });
}
