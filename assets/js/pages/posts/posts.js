document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector(".blog-contenido");
  const spinnerMain = document.querySelector('.spinnerMain')
  spinnerMain.style.display = 'none'

  const getPost = async () => {
    try {
      const response = await fetch(
        `https://api-harley-davidson.herokuapp.com/posts`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      spinnerMain.style.display = 'flex'
      const result = await response.json();
      setTimeout(function(){
        test(result)
        spinnerMain.style.display = 'none'
    },5000);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        showConfirmButton: false,
        title: "Oops... no se pudo obtener data de usuarios",
        text: `${error}`,
      });
      contentSpinnerLoading.style.display = 'none'
    }
  };
  getPost();

  const test = (items) => {
    return (root.innerHTML = `<div class="row blog-row">
      <h1>CONTENIDO DESTACADO</h1>
      ${items.map(
        (post) =>
          ` <article class="col-12 col-md-6 blog-post">
          <a
            href="post.html"
            class="effect-blog blog-post-link blog-pt-60"
          >
            <div class="blog-post-link-inner">
              <img
                src="../assets/images/${post.image}"
                alt="blog-1"
                class="img-fluid"
              />
            </div>
            ${post.new === true ?
                `<span class="rebote position-absolute blog-new-badge bounce"
              >New</span>` : ""}
            <h2 class="blog-pt-30 blog-color-primary blog-post-title">
              ${post.name}
            </h2>
          </a>
          <p class="blog-pt-30">
          ${post.description}
          </p>
          <div class="d-flex justify-content-between blog-pt-45">
            <span class="blog-color-primary">${post.tag}</span>
            <span class="blog-color-primary">${post.date}</span>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <span>${post.comments}</span>
            <span>${post.autor}</span>
          </div>
        </article>`
      )}
    </div>`);
  };
});
