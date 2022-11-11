export const getProducts = async () => {
  try {
    
    const response = await fetch(
      `https://api-harley-davidson.herokuapp.com/modelos`
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
    spinnerMain.style.display = 'none'
  }
};