window.onload = function () {
    var localStorageKeyArticulo = 'data';

    cargarLocalStorage();

    document.querySelector("#add").addEventListener('click', function () {
        var articulo = document.getElementById("articulo"),
            job = document.getElementById("job");

        // validar
        if (articulo.value.length === 0 || job.value.length === 0) return;

        var user = {
            articulo: articulo.value,
            job: job.value
        };

        // limpiar datos
        articulo.value = '';
        job.value = '';

        // Append to my localStorage
        añadirLocalStorage(user);
    })

    function añadirLocalStorage(obj) {
        var users = [],
            datosLocalStorage = localStorage.getItem(localStorageKeyArticulo);
        if (datosLocalStorage !== null) {
            users = JSON.parse(datosLocalStorage);
        }
        users.push(obj);
        localStorage.setItem(localStorageKeyArticulo, JSON.stringify(users));
        cargarLocalStorage();
    }

    function cargarLocalStorage() {
        var users = [],
            datosLocalStorage = localStorage.getItem(localStorageKeyArticulo),
            gridBody = document.querySelector("#grid tbody");
        if (datosLocalStorage !== null) {
            users = JSON.parse(datosLocalStorage);
        }

        // Draw TR from TBODY
        gridBody.innerHTML = '';
        users.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdArticulo = document.createElement("td"),
                tdJob = document.createElement("td"),
                enlace = document.createElement('a'),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button"),
                celdaenlace = document.createElement('td')
            enlace = document.createElement('a');


            //añade atributos al enlace para modificar
            celdaenlace.setAttribute('id', i);
            celdaenlace.setAttribute('class', 'modificar');

            //lleva a la página para modificar la página
            enlace.href = 'modificar.html?id' + '=' + i;

            tdArticulo.innerHTML = x.articulo;
            tdJob.innerHTML = x.job;

            btnRemove.textContent = 'Remove';
            btnRemove.className = 'btnRemove';
            enlace.textContent = 'modificar';
            enlace.className = 'btnModificar';

            //creación de los eventos que modificarán el localstorage
            btnRemove.addEventListener('click', function () {
                eliminarLocalStorage(i);
            });
            enlace.addEventListener('click', function () {
                modificarLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);

            tr.appendChild(tdArticulo);
            tr.appendChild(tdJob);
            tr.appendChild(tdRemove);

            gridBody.appendChild(tr);

            celdaenlace.appendChild(enlace);

            tr.appendChild(celdaenlace);

            gridBody.appendChild(tr);
        });
    }

    function eliminarLocalStorage(index) {
        var users = [],
            datosLocalStorage = localStorage.getItem(localStorageKeyArticulo);

        users = JSON.parse(datosLocalStorage);
        users.splice(index, 1);
        localStorage.setItem(localStorageKeyArticulo, JSON.stringify(users));
        cargarLocalStorage();
    }
}

//limpiarlo todo
document.querySelector("#clear").addEventListener('click', function () {
    var articulos = document.querySelector("tbody");
    localStorage.clear();
    alert("LocalStorage borrado");
    var first = articulos.firstElementChild;
    while (first) {
        first.remove();
        first = articulos.firstElementChild;
    }
})

//modificación de los datos del localstorage
function modificarLocalStorage(elemento) {
    /*if (localStorage.getItem('articulo') != null) {
        var articulo = JSON.parse(localStorage.getItem('articulo'));
        cantidad = JSON.parse(localStorage.getItem('cantidad'));
    }

    var id = cargarLocalStorage()['id'],
        articulo = articulo[id],
        cantidad = cantidad[id],
        btnModificar=document.*/
}