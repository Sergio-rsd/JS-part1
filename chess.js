"use strict";
// пешка - pawn - &#9817; /  &#9823;
// ладья  - rook - &#9814; / &#9820;
// слон - eleph - &#9815; / &#9821;
// конь - horse - &#9816; / &#9822;
// ферзь - queen - &#9813; / &#9819;
// король - king &#9812; - белый, &#9818; - черный

let whiteCellValue = 'background-color:white;border:1px solid black;width:50px; height:50px; text-align: center;vertical-align: middle;';
let blackCellValue = 'background-color:grey;border:1px solid black;width:50px; height:50px; text-align: center;vertical-align: middle;';
let styleTable = 'border-collapse: collapse; font-size: 30px;font-family: Impact, sans-serif;';
let flagWhiteBkack = true; // true - white, false - black
let incriptionLetter = 'padding:10px; text-align:center;vertical-align: middle;';

// создание таблицы c фигурами

function chessDesk() {
    let emptyTable = document.createElement('table');
    emptyTable.id = "tableMain";
    emptyTable.style = styleTable;
    let letter = [ '','a','b','c','d','e','f','g','h','' ], //массив букв
    blackFigure8 = [ '8','&#9820;','&#9822;','&#9821;','&#9819;','&#9818;','&#9821;','&#9822;','&#9820;','8' ],//массив черных фигур на 8 линии
    blackFigure7 = [ '7','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','7' ],//массив черных фигур на 7 линии
    whiteFigure1 = [ '1','&#9814;','&#9816;','&#9815;','&#9813;','&#9812;','&#9821;','&#9815;','&#9814;','1' ],//массив белых фигур на 1 линии
    whiteFigure2 = [ '2','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','2' ];//массив белых фигур на 2 линии
    
    for (let i = 0, j = 9; i<10, j>=0; i++, j--) {
        let trCell = emptyTable.insertRow(i);
        for (let k = 0; k < 10; k++) {
            let tdCell = trCell.insertCell(k);
            if (k==0 || k == 9) { // цифры слева и справа
                tdCell.style = incriptionLetter;
                }
            switch (i) {
                case 0: // первая строка с буквами
                    tdCell.innerText = letter[k];
                    tdCell.style = "transform:rotate(180deg);" + incriptionLetter;
                    break;
                case 1: // вторая строка с черными
                    tdCell.innerHTML = blackFigure8[k];
                    break;
                case 2: // третья строка с черными пешками
                    tdCell.innerHTML = blackFigure7[k];
                    break;
                case 7: // белые пешки
                    tdCell.innerHTML = whiteFigure2[k];
                    break;
                case 8: // белые фигуры
                    tdCell.innerHTML = whiteFigure1[k];
                    break;
                case 9: // буквы снизу
                    tdCell.innerText = letter[k];
                    tdCell.style = incriptionLetter;
                    break;
                default:
                    if ( k== 0 || k == 9) {
                        tdCell.innerHTML = j;
                        tdCell.style = incriptionLetter;
                    }
                    break;
            }
        }
    }
    document.body.appendChild(emptyTable);
}

// раскраска ячеек
function chessCell() {
    let tableChess = document.getElementById('tableMain');

    for (let i = 1; i < tableChess.rows.length-1; i++) {
        let cellField = tableChess.rows[i];
        if (flagWhiteBkack) {
            for (let j =1; j < cellField.cells.length-1; j++) {
                let cell = cellField.cells[j];
                if (j%2 != 0) {                
                    cell.style = blackCellValue;
                }
                else {
                    cell.style = whiteCellValue;
                }
            }
            flagWhiteBkack = !flagWhiteBkack;
        }
        else {
            for (let j =1; j < cellField.cells.length-1; j++) {
                let cell = cellField.cells[j];
                if (j%2 == 0) {                
                    cell.style = blackCellValue;
                }
                else {
                    cell.style = whiteCellValue;
                }
            }
            flagWhiteBkack = !flagWhiteBkack;
        }
    }
}