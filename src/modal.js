const signbtn = document.querySelector(".form__modal-btn");
const closebtn = document.querySelector(".close");

if (signbtn) {
  signbtn.addEventListener("click", () => {
    console.log("sign up btn was clicked");
  });
}

if (closebtn) {
  closebtn.addEventListener("click", () => {
    alert('close btn')
  });
}
