let userid = window.localStorage.getItem("userInfo");

$.ajax({
  url: "/user/" + userid,
  type: "GET",
})
  .then(function (data) {
    if (data.status !== 200) {
      window.location.href = "/login";
    }
  })
  .catch(function (err) {
    console.log(err);
  });
