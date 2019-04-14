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
        <th data-id=${item.id} class="delete">删除</th>
    </tr>`;
  });
  tableBody.innerHTML += str;
  bindEventDelete();
}

function bindEventDelete() {
  var deleteDom = document.getElementsByClassName("delete") || [],
    deleteDomArr = [].slice.call(deleteDom, 0),
    deltete_id;
  deleteDomArr.forEach(item => {
    item.onclick = function(e) {
      console.log(e.target);
      deltete_id = e.target.getAttribute("data-id");
      if (window.confirm(`确认删除ID为：${deltete_id} 的文章？`)) {
        axios
          .get("/delete?id=" + deltete_id)
          .catch(e => {
            console.log(e);
          })
          .then(data => {
            alert("删除成功");
            window.location.reload();
          });
      } else {
        return;
      }
    };
  });
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
      if (data.status === 200) {
        alert("上传成功！！");
        window.location.reload();
      }
    });
}
