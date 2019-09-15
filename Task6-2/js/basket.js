'use strict';
// слайдер
// стрелка влево &#10094;
// стрелка вправо &#10095;
let btn_prev = document.querySelector("#slide .buttons .prev");
let btn_next = document.querySelector("#slide .buttons .next");
let images = document.querySelectorAll("#slide .photos img");
let i = 0;

btn_prev.onclick = function() {
	images[i].style.display = "none";
	i--;//индекс предыдущей картинки

	if(i == -1){
		i = images.length-1;//определили индекс последней картинки если кликнули назад на 1ой картинке
	}
	images[i].style.display = "block";
}

btn_next.onclick = function() {
	images[i].style.display = "none";
	i++;

	if(i >= images.length){
		i = 0;
	}
	images[i].style.display = "block";
}
// окончание слайдер
// товары в каталоге
let i1 = {
    name: "Ждун и Лиса",
    imgSrc: "img/img_small/1.jpg",
    price: 60000,
    unit: 0,
    sumUnit:0
};

let i2 = {
    name: "Ждун на даче",
    imgSrc: "img/img_small/2.jpg",
    price: 51000,
    unit: 0,
    sumUnit:0
};

let i3 = {
    name: "Ждун дома",
    imgSrc: "img/img_small/3.jpg",
    price: 49000,
    unit: 0,
    sumUnit:0
};

let itemsArray = [i1, i2, i3];
let sum = 0;

function init() {
    let catalog = document.getElementsByClassName("catalog")[0];
    let i, item, itemText, itemImg, itemBtn, clearButton;
// рисование каталога
    for (i=0;i<itemsArray.length; i++){
        item = document.createElement("div");
        item.setAttribute("class", "div_item");
        
        itemText = document.createElement("p");
        itemText.insertAdjacentHTML("beforeend", itemsArray[i].name);
        item.appendChild(itemText);

        itemImg = document.createElement("img");
        itemImg.src = itemsArray[i].imgSrc;
        item.appendChild(itemImg);

        item.appendChild(document.createTextNode(itemsArray[i].price + "\u20bd"));

        itemBtn = document.createElement("button");
        itemBtn.textContent = "buy";
        itemBtn.setAttribute("id", "btn_"+i);
        itemBtn.onclick = addItem;
        item.appendChild(itemBtn);

        catalog.appendChild(item);
    }
// очистка корзины
    clearButton = document.querySelector(".emptyBasket");
    clearButton.onclick = cleareBasketAll;
}
function addItem(obj){
	let selectIdGood = obj.target.id.split("_")[1];
    let selectedItem = itemsArray[selectIdGood];
    selectedItem.unit +=1;
    selectedItem.sumUnit += selectedItem.price;

    sum += selectedItem.price;
    drawTable();
    document.getElementsByClassName("sum")[0].textContent = "Итого: " + sum + "\u20bd";
}
// рисование таблицы
function drawTable() {
    let selectedItems = document.getElementsByClassName("selected")[0];
    let flagTable = document.querySelector("tr");
    if (flagTable != null) {
        let lengthRowsTable = selectedItems.rows.length;

// удаляем всю таблицу, если в таблице есть строки
        for (let k=1;  k <= lengthRowsTable; k++) {
            selectedItems.deleteRow(-1);
        }
// рисуем новую таблицу
        for (let i=0; i < itemsArray.length; i++) { // прогоняем все обьекты
            if (itemsArray[i].unit != 0) {
                let tr = selectedItems.insertRow(-1);
                let td = tr.insertCell(-1);
                td.appendChild(document.createTextNode(itemsArray[i].name));
                td = tr.insertCell(-1);
                td.style.textAlign = "center";
                td.style.width = "100px";
                td.appendChild(document.createTextNode(itemsArray[i].price + "\u20bd"));
                td = tr.insertCell(-1);
                td.appendChild(document.createTextNode(itemsArray[i].unit));
                td = tr.insertCell(-1);
                td.appendChild(document.createTextNode(itemsArray[i].sumUnit + "\u20bd"));
                }
        }
    }
// таблица пустая, рисуем новую
    else {
        for (let i=0; i < itemsArray.length; i++) {
            if (itemsArray[i].unit != 0) {
                let tr = selectedItems.insertRow(-1);
                let td = tr.insertCell(-1);
                td.appendChild(document.createTextNode(itemsArray[i].name));
                td = tr.insertCell(-1);
                td.style.textAlign = "center";
                td.style.width = "100px";
                td.appendChild(document.createTextNode(itemsArray[i].price + "\u20bd"));
                td = tr.insertCell(-1);
                td.appendChild(document.createTextNode(itemsArray[i].unit));
                td = tr.insertCell(-1);
                td.appendChild(document.createTextNode(itemsArray[i].sumUnit + "\u20bd"));
                }
        }
    }
}
// очистка корзины
function cleareBasketAll(event) {
    let selectedItems = document.getElementsByClassName("selected")[0];
    let lengthRowsTable = selectedItems.rows.length;

// удаляем всю таблицу на экране
    for (let k=1;  k <= lengthRowsTable; k++) {
        selectedItems.deleteRow(-1);
    }
// удаляем данные из товаров
    for (let i=0; i < itemsArray.length; i++) { // прогоняем все обьекты
        itemsArray[i].unit = 0;
        itemsArray[i].sumUnit = 0;
    }
    document.getElementsByClassName("sum")[0].textContent = "";
    sum = 0;
}
window.onload = init;