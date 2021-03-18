//console.log('agregado para ver si existe conecion')
var db = firebase.firestore();

//Agregar 
function agregar() {
    var NumeroS= document.getElementById('NumeroS').value;
    var Descripcion= document.getElementById('Descripcion').value;
    var Tamaño= document.getElementById('Tamaño').value;
    var SistemaO= document.getElementById('SistemaO').value;
    var Camara= document.getElementById('Camara').value;
    var RAM= document.getElementById('RAM').value;

db.collection("Dispositivo").add({
    NumeroS: NumeroS,
    Descripcion: Descripcion,
    Tamaño: Tamaño,
    SistemaO: SistemaO,
    Camara: Camara,
    RAM: RAM

})
.then(function(docRef)  {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('NumeroS').value ='';
    document.getElementById('Descripcion').value ='';
    document.getElementById('Tamaño').value ='';
    document.getElementById('SistemaO').value ='';
    document.getElementById('Camara').value ='';
    document.getElementById('RAM').value ='';

})
.catch(function(error)  {
    console.error("Error adding document: ", error);
});
}

var tabla1 = document.getElementById('tabla1');
db.collection("Dispositivo").onSnapshot((querySnapshot) => {
    tabla1.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla1.innerHTML +=`
        <tr>
        
        <th scope="row">${doc.data().NumeroS}</th>
        <th>${doc.data().Descripcion}</th>
        <th>${doc.data().Tamaño}</th>
        <th>${doc.data().SistemaO}</th>
        <th>${doc.data().Camara}</th>
        <th>${doc.data().RAM}</th>
        <th><button class="btn" onclick="eliminar('${doc.id}')">Eliminar</button></th>
        <th><button class="btn" onclick="editar('${doc.id}','${doc.data().NumeroS}','${doc.data().Descripcion}','${doc.data().Tamaño}','${doc.data().SistemaO}','${doc.data().Camara}','${doc.data().RAM}')">Editar</button></th>
    </tr> `
    });
});

//Borrar

function eliminar(id){
db.collection("Dispositivo").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

}


//editar

function editar(id, NumeroS, Descripcion, Tamaño, SistemaO, Camara, RAM){


    document.getElementById('NumeroS').value =NumeroS;
    document.getElementById('Descripcion').value =Descripcion;
    document.getElementById('Tamaño').value =Tamaño;
    document.getElementById('SistemaO').value =SistemaO;
    document.getElementById('Camara').value =Camara;
    document.getElementById('RAM').value =RAM;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("Dispositivo").doc(id);
        // Set the "capital" field of the city 'DC'
        var NumeroS = document.getElementById('NumeroS').value;
        var Descripcion = document.getElementById('Descripcion').value;
        var Tamaño= document.getElementById('Tamaño').value;
        var SistemaO= document.getElementById('SistemaO').value;
        var Camara = document.getElementById('Camara').value;
        var RAM = document.getElementById('RAM').value;
        return washingtonRef.update({
            NumeroS: NumeroS,
            Descripcion: Descripcion,
            Tamaño: Tamaño,
            SistemaO: SistemaO,
            Camara: Camara,
            RAM: RAM
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar'
            document.getElementById('NumeroS').value ='';
    document.getElementById('Descripcion').value ='';
    document.getElementById('Tamaño').value ='';
    document.getElementById('SistemaO').value ='';
    document.getElementById('Camara').value ='';
    document.getElementById('RAM').value ='';
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        }
        
    }
    