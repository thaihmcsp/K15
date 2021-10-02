async function createAcc() {
  try {
    const username = $("#user").val();
    const password = $("#pass").val();
    const respone = await $.ajax({
      url: "/user",
      type: "POST",
      data: {
        username: username,
        password: password,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

let totalPage;
let view = 5;

async function render() {
  try {
    const listUser = await $.ajax({
      url: "http://localhost:3000/user",
      type: "GET",
    });

    renderButton(listUser, "changePage");

    for (let i = 0; i < view; i++) {
      let userItem = `
      <div>
        ${listUser[i].username}
      </div>
      `;
      $(".listUser").append(userItem);
    }

    const classList = await $.ajax({
      url: "/class",
      type: "GET",
    });
    for (let i = 0; i < classList.length; i++) {
      let option = `
      <option value="${classList[i]._id}">${classList[i].className}</option>
      `;

      $("#class").append(option);
    }
  } catch (error) {
    console.log(error);
  }
}

async function changePage(page) {
  try {
    const userList = await $.ajax({
      type: "GET",
      url: "/user/page/" + page + "?view=" + view,
    });
    $(".listUser").html("");

    for (let i = 0; i < userList.data.length; i++) {
      let userItem = `
      <div>
        ${userList.data[i].username}
      </div>
      `;
      $(".listUser").append(userItem);
    }
    if (page < totalPage) {
      $(".next").attr("onclick", `changePage(${page + 1})`);
    } else {
      $(".next").attr("onclick", `changePage(${totalPage})`);
    }

    if (page > 1) {
      $(".prev").attr("onclick", `changePage(${page - 1})`);
    } else {
      $(".prev").attr("onclick", `changePage(1)`);
    }

    $(`.listButton`).children().css({ background: "white" });
    $(`.page${page}`).css({ background: "green" });
  } catch (error) {
    console.log(error);
  }
}

function changeView() {
  view = $("#view").val();
  $(".listButton").html("");
  $(".listUser").html("");
  render();
}

async function changeClass() {
  try {
    const res = await $.ajax({
      type: "GET",
      url: "/user/getUserByClass/" + $("#class").val(),
    });

    $(".listUser").html("");
    for (let i = 0; i < view; i++) {
      let userItem = `
      <div>
        ${res.listUser[i].username}
      </div>
      `;
      $(".listUser").append(userItem);
    }

    $(".listButton").html("");
    renderButton(res.listUser, "changePageByClass", $("#class").val());
  } catch (error) {
    console.log(error);
  }
}

function renderButton(listUser, onclickEvent, id) {
  totalPage = Math.ceil(listUser.length / view);
  let prev = `<button class='prev' >prev</button>`;
  $(".listButton").append(prev);

  for (let i = 1; i <= totalPage; i++) {
    let button = `<button onclick='${onclickEvent}(${i},"${id}")' class='page${i}'>${i}</button>`;
    $(".listButton").append(button);
  }

  let next = `<button class='next' onclick='${onclickEvent}(2,"${id}")'>next</button>`;
  $(".listButton").append(next);
}

async function changePageByClass(page, id) {
  try {
    const userList = await $.ajax({
      type: "GET",
      url: "/user/pageUserByClass/" + id + "/" + page + "?view=" + view,
    });
    $(".listUser").html("");
    console.log(142, userList);

    for (let i = 0; i < userList.listUser.length; i++) {
      let userItem = `
      <div>
        ${userList.listUser[i].username}
      </div>
      `;
      $(".listUser").append(userItem);
    }
    if (page < totalPage) {
      $(".next").attr("onclick", `changePageByClass(${page + 1},"${id}")`);
    } else {
      $(".next").attr("onclick", `changePageByClass(${totalPage},"${id}")`);
    }

    if (page > 1) {
      $(".prev").attr("onclick", `changePageByClass(${page - 1},"${id}")`);
    } else {
      $(".prev").attr("onclick", `changePageByClass(1 ,"${id}"`);
    }

    $(`.listButton`).children().css({ background: "white" });
    $(`.page${page}`).css({ background: "green" });
  } catch (error) {
    console.log(error);
  }
}

render();
