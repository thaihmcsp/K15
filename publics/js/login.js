async function login() {
  const username = $("#username").val();
  const password = $("#password").val();
  console.log(username, password);

  const data = await $.ajax({
    url: "/user/login",
    type: "POST",
    data: { username, password },
  });
  console.log(data);
  window.localStorage.setItem("userInfo", data.user._id);
  if (data.status === 200) {
    window.location.href = "/profile";
  }
}
