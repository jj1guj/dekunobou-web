//1を黒石, 2を白石として処理を行う
class Board{
    constructor(){
        this.board=[];
        this.turn=false;//trueなら後手
        this.point;
        this.stone= [1,2];
        this.flip_limit;
        this.di=[0,0,-1,1,-1,1,-1,1];
        this.dj=[-1,1,0,0,1,1,-1,-1];

        this.init();
    }

    init(){
        for(var i=0;i<8;++i){
            let board_line=[];
            for(var j=0;j<8;++j)board_line.push(0);
            this.board.push(board_line);
        }
        this.board[3][3]=2;
        this.board[3][4]=1;
        this.board[4][3]=1;
        this.board[4][4]=2;
        this.point=[2,2];
    }

    is_gameover(){
    }

    push(move){
        if(0<=move&&move<=63){
            row=Math.floor(move/8);
            col=move%8;
            if(this.board[row][col]!=0)return -1;
            
            fliped=this.set_flip_limit(row,col);
            if(fliped==0)return -1;

            //石を返す
            this.board[row][col]=this.stone[this.turn];

            for(var dir=0;dir<8;++dir){
                for(var i=1;i<this.flip_limit[dir];++i){
                    this.board[row+this.di[dir]*i][col+this.dj[dir]*i]=this.stone[turn];
                }
            }

            //着手後の石の枚数を計算
            this.point[turn]+=fliped+1;
            this.point[!turn]-=fliped;

            this.turn=!this.turn;//手番を反転
            return 0;
        }
    }

    set_flip_limit(row,col){
        //返せる石の枚数が返り値
        var flip_count=0;
        //横左方向
        this.flip_limit=[];
        this.flip_limit.push(0);
        for(var i=1;i<=col;++i){
            if(this.board[row][col-i]!=this.stone[!turn]){
                if(board[row][col-i]==this.stone[turn])flip_limit[0]=i;
                break;
            }
        }
        if(flip_limit[0]>1)flip_count+=flip_limit[0]-1;

        //横右方向
        this.flip_limit.push(0);
        for(var i=1;i<=7-col;++i){
            if(this.board[row][col+i]!=this.stone[!turn]){
                if(board[row][col+i]==this.stone[turn])flip_limit[1]=i;
                break;
            }
        }
        if(flip_limit[1]>1)flip_count+=flip_limit[1]-1;

        //縦上方向
        this.flip_limit.push(0);
        for(var i=1;i<=row;++i){
            if(this.board[row-i][col]!=this.stone[!turn]){
                if(board[row-i][col]==this.stone[turn])flip_limit[2]=i;
                break;
            }
        }
        if(flip_limit[2]>1)flip_count+=flip_limit[2]-1;

        //縦下方向
        this.flip_limit.push(0);
        for(var i=1;i<=7-row;++i){
            if(this.board[row+i][col]!=this.stone[!turn]){
                if(board[row+i][col]==this.stone[turn])flip_limit[3]=i;
                break;
            }
        }
        if(flip_limit[3]>1)flip_count+=flip_limit[3]-1;

        //右斜め上方向
        this.flip_limit.push(0);
        for(var i=1;i<=Math.min(row,7-col);++i){
            if(this.board[row-i][col+i]!=this.stone[!turn]){
                if(board[row-i][col+i]==this.stone[turn])flip_limit[4]=i;
                break;
            }
        }
        if(flip_limit[4]>1)flip_count+=flip_limit[4]-1;

        //右斜め下方向
        this.flip_limit.push(0);
        for(var i=1;i<=Math.min(7-row,7-col);++i){
            if(this.board[row+i][col+i]!=this.stone[!turn]){
                if(board[row+i][col+i]==this.stone[turn])flip_limit[5]=i;
                break;
            }
        }
        if(flip_limit[5]>1)flip_count+=flip_limit[5]-1;

        //左斜め上方向
        this.flip_limit.push(0);
        for(var i=1;i<=Math.min(row,col);++i){
            if(this.board[row-i][col-i]!=this.stone[!turn]){
                if(board[row-i][col-i]==this.stone[turn])flip_limit[6]=i;
                break;
            }
        }
        if(flip_limit[6]>1)flip_count+=flip_limit[6]-1;

        //左斜め下方向
        this.flip_limit.push(0);
        for(var i=1;i<=Math.min(7-row,col);++i){
            if(this.board[row+i][col-i]!=this.stone[!turn]){
                if(board[row+i][col-i]==this.stone[turn])flip_limit[7]=i;
                break;
            }
        }
        if(flip_limit[7]>1)flip_count+=flip_limit[7]-1;
        return flip_limit;
    }
}

//合法手のリストを生成
function LegalMoveList(board){
    let movelist=[];
    for(var i=0;i<8;++i)for(var j=0;j<8;++j){
        if(board.board[i][j]==0){
            board.set_flip_limit(i,j);
            console.log(board.flip_limit)
            for(var k=0;k<8;++k){
                if(board.flip_limit[k]>1){
                    movelist.push(8*i+j);
                    break;
                }
            }
        }
    }
}

var board=new Board();
human_turn=false;

function makeMove(){
    id=Number(this.getAttribute("id"));
    if(!legalMoveList(board).includes(id)||board.turn!=human_turn)return;
    board.push(id);
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

var moves=LegalMoveList(board);
for(var i=0; i<8;++i){
    for(var j=0; j<8;++j){
        if(board.board[i][j]==1){
            document.getElementById(8*i+j).innerHTML="<span class='stone_black'></span>";
        }else if(board.board[i][j]==2){
            document.getElementById(8*i+j).innerHTML="<span class='stone_white'></span>";
        }
        if(moves.includes(8*i+j)){
            document.getElementById(8*i+j).innerHTML="<span class='can_put'></span>";
        }
    }
}
