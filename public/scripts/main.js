fetch('http://localhost:8080/api/products/paginate/')
    .then((data) => {
        return data.json()
    }).then((data) => {
        console.log(data.cookies);
        let template = `${data.cookies.email}`
        if (data.cookies.email) {
            document.querySelector('#userLogged').innerHTML = template
        }
    })