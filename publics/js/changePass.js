async function changePass() {
  try {
    const username = $("#user").val();
    const password = $("#pass").val();
    const newPass = $("#newPass").val();
    const data = await $.ajax({
      url: "/user/getUser?username=" + username + "&password=" + password,
      type: "POST",
    });
    if (data.status === 200) {
      let id = data.user._id;
      const res = await $.ajax({
        url:
          "/user/" +
          id +
          "?username=" +
          username +
          "&password=" +
          password +
          "&newPass=" +
          newPass,
        type: "PUT",
      });
      console.log(23, res);
    } else {
      console.log(data.mess);
    }
  } catch (error) {
    console.log(error);
  }
}
