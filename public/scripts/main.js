fetch('http://localhost:8080/api/products/paginate/')
    .then((data) => {
        return data.json()
    }).then((data) => {
        let template = data.cookies.email
        if (data.cookies.email) {
            document.querySelector('#userLogged').innerHTML = template
        }
    })