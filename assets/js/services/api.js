
export const getUsersAPi = async () => {
    try {
      const response = await fetch(
        `https://api-harley-davidson.herokuapp.com/users`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dataUsers.push(data);
    //   insertUsersDom(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        showConfirmButton: false,
        title: "Oops... no se pudo obtener data de usuarios",
        text: `${error}`,
      });
    }
  };