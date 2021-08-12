function makeMove(){
    id=Number(this.getAttribute("id"));
    console.log(id);
}

//盤面の生成
var table=document.createElement("table");
for(var i=0; i<8;++i){
    var tr=document.createElement('tr');
    for(var j=0;j<8;++j){
        var td=document.createElement('td');
        td.addEventListener('click',makeMove);
        td.setAttribute('id',8*i+j);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

document.getElementById('board').appendChild(table);