document.addEventListener("DOMContentLoaded",function(){
  rellenaDatos();

  function rellenaDatos  (){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xhttp.open("GET","Carro.xml",true);
    xhttp.send();
  }
  //Funcio que crida e AJAX per a posar en cada lloc el node del xml que li correspon
  function myFunction(xml) {

    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("item");
    var i;

    for (i = 0; i <x.length; i++) {


      var div = document.createElement("div");
      var idProd = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
      div.setAttribute("id",idProd);
      div.setAttribute("class","item");
      div.setAttribute("onclick","anyadirElement(this)");
      var img =  document.createElement("img");
      var src = x[i].getElementsByTagName("img")[0].childNodes[0].nodeValue;
      img.setAttribute("src",src);

      var titulo = document.createElement("label");
      var titl = document.createTextNode(x[i].getElementsByTagName("titulo")[0].childNodes[0].nodeValue);
      titulo.appendChild(titl);
      titulo.setAttribute("class","title");

      var precio = document.createElement("label");
      var price = document.createTextNode(x[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue);
      precio.appendChild(price);
      precio.setAttribute("class","price");

      var stock = document.createElement("label");
      var stck = document.createTextNode(x[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue);
      stock.appendChild(stck);
      stock.setAttribute("class","stock");


      div.appendChild(img);
      div.appendChild(titulo);
      div.appendChild(precio);
      div.appendChild(stock);

      var dest = document.getElementById("destino");
      dest.appendChild(div);

    }
    var clear = document.createElement("div");
    clear.setAttribute("class","clear");
    dest.appendChild(clear);


    var divCart = document.createElement("div");
    divCart.setAttribute("id","cart_container");
    dest.appendChild(divCart);


    var divCartTitle = document.createElement("div");
    divCartTitle.setAttribute("id","cart_title");

    var text = document.createElement("span");
    var di = document.createTextNode("CARRITO");
    text.appendChild(di);
    divCartTitle.appendChild(text);
    var clear = document.createElement("div");
    clear.setAttribute("class","clear");

    divCart.appendChild(divCartTitle)
    divCart.appendChild(clear);

    var divCartToolbar = document.createElement("div");
    divCartToolbar.setAttribute("id","cart_toolbar");
    var divCartItems = document.createElement("div");
    divCartItems.setAttribute("id","cart_items");
    divCartItems.setAttribute("class","back");
    divCartItems.setAttribute("id","cart_items");

    divCartToolbar.appendChild(divCartItems);
    dest.appendChild(divCartToolbar);



    var nav = document.createElement("div");
    nav.setAttribute("id","navigate");

    var navleft = document.createElement("div");
    navleft.setAttribute("id","nav_left");


    var btCompra = document.createElement("button");
    btCompra.setAttribute("id","btn_comprar");
    btCompra.setAttribute("onclick","realizaCompra()");
    btCompra.setAttribute("title","Confirma la compra");
    var text = document.createTextNode("Comprar");
    btCompra.appendChild(text);
    navleft.appendChild(btCompra);

    var btClear = document.createElement("button");
    btClear.setAttribute("id","btn_clear");
    //btCompra.setAttribute("onclick","vaciaCarro()");
    btClear.setAttribute("title","Vacia el carrito");
    var text = document.createTextNode("Vaciar");
    btClear.appendChild(text);
    navleft.appendChild(btClear);

    nav.appendChild(navleft);


    var navright = document.createElement("div");
    navright.setAttribute("id","nav_right");

    var sp = document.createElement("span");
    sp.setAttribute("class","sptext");
    var lblC = document.createElement("Label");
    var txt = document.createTextNode("Compras");
    lblC.appendChild(txt);
    sp.appendChild(lblC);

    var inp = document.createElement("input");
    inp.setAttribute("id","citem");
    inp.setAttribute("readonly","");
    sp.appendChild(inp);



    navright.appendChild(sp);


    var sp2 = document.createElement("span");
    sp.setAttribute("class","sptext");
    var lblP = document.createElement("Label");
    var txt = document.createTextNode("Precio");
    lblP.appendChild(txt);
    sp2.appendChild(lblP);

    var inp2 = document.createElement("input");
    inp2.setAttribute("id","cprice");
    inp2.setAttribute("readonly","");
    sp2.appendChild(inp2);



    navright.appendChild(sp2);


    nav.appendChild(navright);
    dest.appendChild(nav);




  }

});

function anyadirElement(element){
  var copia = element.cloneNode(true);
  var carro = document.getElementById("cart_items");
  var cantitat = document.getElementById("citem").value;
  if(cantitat == ""){
    cantitat = 0;
  }
  var sumCant = parseInt(cantitat);
  sumCant++;
  document.getElementById("citem").value = sumCant;

  carro.insertBefore(copia,carro.firstChild);
  var id = copia.id;


peticio(id);

function peticio(id){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      myFunction2(this,id);
    }
  };
  xhttp.open("GET","Carro.xml",true);
  xhttp.send();
}

function myFunction2 (xml,id){
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("item");
  var i;

  for (i = 0; i <x.length; i++) {
    var identif = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
    if(identif == id){
      var preuElement = x[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;

      var acum = document.getElementById("cprice").value;
      if(acum == ""){
        acum =0;
      }
      var total = parseInt(preuElement) + parseInt(acum);

      document.getElementById("cprice").value = total;
    }
  }
}

}
function realizaCompra(){
  var dines = document.getElementById("cprice").value;
  var cant = document.getElementById("citem").value;
  alert("Se ha realizado la compra de "+cant+" Articulos, con un precio de: "+dines+" euros.")
}
/*
function vaciaCarro(){
  var d
  var divCartToolbar = document.createElement("div");
  divCartToolbar.setAttribute("id","cart_toolbar");
  var divCartItems = document.createElement("div");
  divCartItems.setAttribute("id","cart_items");
  divCartItems.setAttribute("class","back");
  divCartItems.setAttribute("id","cart_items");

  divCartToolbar.appendChild(divCartItems);

}
*/
