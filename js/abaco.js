const LarguraCelula = "70px";
const AlturaCelula = "30px";
// const LarguraCelula = "35px"; // para testar no telemóvel
// const AlturaCelula = "15px";
const tabu = [];  // este array tem valor 1 nas posições com conta, 0 nas posições sem conta e 2 nas posições parede
const tdes = [];  // este array guarda todas as células da tabela na sequência exata em que ela é criada
const timg = [];  // tentativa de acesso direto aos elementos de imagem na tabela
// const cursor = [[9,2],[13,13]]; // o cursor começa com a peça onde está o zero (antes do um)
// Talvez seja melhor trocar os cursores para um formato superior e inferior, ficaria mais compreensível
// const topo = [[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];  // cursor decrescente > sobe no tabuleiro
// const base = [[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]];  // cursor crescente > desce no tabuleiro

const curso0 = [[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];  // cursor decrescente > sobe no tabuleiro
const curso1 = [[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];  // cursor crescente > desce no tabuleiro
let gnum = 0;  // valor decimal do número que está representado
let baseCalc = 10;  // modo de cáculo pode ter um de três valores: 10 - decimal, 2 - binário e 16 - hexadecimal 
const numar = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  // array com os número de cada coluna -> tem que passar a carater ou não  10:A 11:B 12:C 13:D 14:E 15:F só na escrita de ecrã
const maxcol = 13;
const mincol = 1;
let workcol = 13;  // há de guardar a coluna de referência das unidades para operações inteiras e para 0 das casas decimais
let inicio = 0;
// const worknum = 0;
const imgs = ['imagens/cxte.png',     // 0 
                'imagens/cxtop.png',  // 1
                'imagens/cxtd.png',   // 2
                'imagens/cxv.png',    // 3
                'imagens/cxce.png',   // 4
                'imagens/cxcd.png',   // 5
                'imagens/cxde.png',   // 6
                'imagens/cxdd.png',   // 7
                'imagens/eixo.png',   // 8
                'imagens/conta.png',  // 9
                'imagens/conta0.png']; // 10
function chamAlerta(){ // sinalizador durante os testes
    alert("chamei");
}
function limpaColuna(item, indice, arr){  // coloca os valores da coluna a zero
    switch (baseCalc){
    case 2:
        if (item > 0) subirContaSuperior(indice);
        break;
    case 10:
        if (item > 4) subirContaSuperior(indice);
        switch (item){
        case 9: case 4:
            descerContaInferior(indice);
        case 8: case 3:
            descerContaInferior(indice);
        case 7: case 2:
            descerContaInferior(indice);
        case 6: case 1:
            descerContaInferior(indice);
            break;
        default:
        }
        break;
    case 16:
        break;
    default:
    }
    arr[indice] = 0;
    curso0[0][indice] = curso1[0][indice] = 9;  // valores base do tabuleiro
    curso0[1][indice] = curso1[1][indice] = 2;  // valores base do tabuleiro
}
function limpar(){  // coloca os valores do tabuleiro a zero
    numar.forEach(limpaColuna);
    gnum = 0;
    atualizarNum();
    document.getElementById("limpar").disabled = (gnum == 0);
    document.getElementById("subtrair1").disabled = (gnum == 0);
}
function mostraCol(item, indice){  // atualiza grafismo de uma coluna para um dado número decimal
    if (item > 4) descerContaSuperior(indice);
    console.log("indice "+indice+" item "+item);
    switch (item){
        case 9: case 4:
            subirContaInferior(indice);
        case 8: case 3:
            subirContaInferior(indice);
        case 7: case 2:
            subirContaInferior(indice);
        case 6: case 1:
            subirContaInferior(indice);
            break;
        default:
    }
}
function escreveNum(num){   // transcreve número decimal em ábaco precisa ser adaptado ao binário e hexa
    let tnum = num.toString()
    let lnum = tnum.length;
    let bnum = 14-lnum;
    for (let i = lnum-1; i >= 0; i--){
        numar[i+bnum] = parseInt(tnum[i]);
        mostraCol(numar[i+bnum], i+bnum);
    } 
    atualizarNum();
}
function subirContaSuperior(coluna){
    let a = curso1[1][coluna];
    for (let i = 0; i < 2; i++){
        tabu[a-1][coluna] = 1;
        timg[a-1][coluna].src = imgs[9];
        ativaMousover(true, timg[a-1][coluna]);
        tdes[a-1][coluna].onclick = function() { moveConta(this.id); };
        tdes[a-1][coluna].className = "conta";
        tabu[a][coluna] = 0;
        timg[a][coluna].src = imgs[8];
        ativaMousover(false, timg[a][coluna]);
        tdes[a][coluna].removeAttribute("onclick");
        tdes[a][coluna].className = "";
        a--;
    }
    curso0[1][coluna] += 1;
    curso1[1][coluna] = a;
}
function descerContaSuperior(coluna){
    let a = curso0[1][coluna];
    for (let i = 0; i < 2; i++){
        tabu[a+1][coluna] = 1;
        timg[a+1][coluna].src = imgs[9];
        ativaMousover(true, timg[a+1][coluna]);
        tdes[a+1][coluna].onclick = function() { moveConta(this.id); };
        tdes[a+1][coluna].className = "conta";
        tabu[a][coluna] = 0;
        timg[a][coluna].src = imgs[8];
        ativaMousover(false, timg[a][coluna]);
        tdes[a][coluna].removeAttribute("onclick");
        tdes[a][coluna].className = "";
        a++;
    }
    curso0[1][coluna] -= 1;
    curso1[1][coluna] = a;
}
function subirContaInferior(coluna){
    let a = curso1[0][coluna];
    for (let i = 0; i < 3; i++){
        tabu[a-1][coluna] = 1;
        timg[a-1][coluna].src = imgs[9];
        ativaMousover(true, timg[a-1][coluna]);
        tdes[a-1][coluna].onclick = function() { moveConta(this.id); };
        tdes[a-1][coluna].className = "conta";
        tabu[a][coluna] = 0;
        timg[a][coluna].src = imgs[8];
        ativaMousover(false, timg[a][coluna]);
        tdes[a][coluna].removeAttribute("onclick");
        tdes[a][coluna].className = "";
        a--;
    }
    curso0[0][coluna] = a;
    curso1[0][coluna] += 1;
}
function descerContaInferior(coluna){
    let a = curso0[0][coluna];
    for (let i = 0; i < 3; i++){
        tabu[a+1][coluna] = 1;
        timg[a+1][coluna].src = imgs[9];
        ativaMousover(true, timg[a+1][coluna]);
        tdes[a+1][coluna].onclick = function() { moveConta(this.id); };
        tdes[a+1][coluna].className = "conta";
        tabu[a][coluna] = 0;
        timg[a][coluna].src = imgs[8];
        ativaMousover(false, timg[a][coluna]);
        tdes[a][coluna].removeAttribute("onclick");
        tdes[a][coluna].className = "";
        a++;
    }
    curso0[0][coluna] -= 1;
    curso1[0][coluna] = a;
}
function somar1(parcela){   // para já está apenas em decimal
    let coluna = workcol;
    let num = numar[coluna];
    if (parcela > 0){  // adição
        somaCol(coluna, num);
        gnum++;
    } else {  // subtração
        subCol(coluna, num);
        gnum--;
    }
    atualizarNum();
}
const sleep = (time) => {  // função esquisita que arranjei na Internet para conseguir pausar a execução e dar a impressão de movimento. deve haver uma maneira melhor do que utilizar promises
    return new Promise((resolve) => setTimeout(resolve, time))
}
const somaCol = async (coluna, num) =>{      // function somaCol(coluna, num){  // está construída para decimal
    if ( num == 9 ){ // mudança de coluna
        subirContaSuperior(coluna);
        for (let j = 0; j < 4; j++ ) descerContaInferior(coluna);
        numar[coluna] = 0;
        somaCol(coluna-1,numar[coluna-1]);     // soma recursiva
    } else {
        if (num == 4) {      // mudança de lado
            descerContaSuperior(coluna);
            for (let j = 0; j < 4; j++ ) descerContaInferior(coluna);
        } else {  // soma normal
            subirContaInferior(coluna);
        }
        numar[coluna]++;
    }
    await sleep(30);       // controlador de velocidade...
}
function subCol(coluna, num){  // está construída para subtrair em decimal
    if ( num == 0 ){ // mudança de coluna: a solução afeta a coluna à esquerda
        descerContaSuperior(coluna);
        for (let j = 0; j < 4; j++ ) subirContaInferior(coluna);
        numar[coluna] = 9;
        subCol(coluna-1,numar[coluna-1]);   // subtração recursiva
    } else {
        if (num == 5) {      // mudança de lado: a solução afeta o lado superior
            subirContaSuperior(coluna);
            for (let j = 0; j < 4; j++ ) subirContaInferior(coluna);
        } else {  // subtração normal
            descerContaInferior(coluna);
        }
        numar[coluna]--;
        // gnum--;
    }
}
function atualizarNum(){   // aparentemente funciona para qualquer base, o gnum é sempre decimal
    gnum = 0;
    for (coluna = 1; coluna < 14; coluna++) {
        tdes[16][coluna].innerHTML = baseCalc == 16 ? numar[coluna] > 9 ? String.fromCharCode(numar[coluna]+55) : numar[coluna] : numar[coluna];
        gnum += numar[coluna] * (baseCalc ** ( 13-coluna ));
    }
    document.getElementById("limpar").disabled = (gnum == 0);
    document.getElementById("subtrair1").disabled = (gnum == 0);
    document.getElementById("gnum").innerText = `Em decimal: ${gnum}`;
}
function idToLinCol(thisID){  // converte o ID da célula nas respetivas coordenadas de matriz (97 é o ascii da letra 'a')
    let l = thisID[0].charCodeAt() - 97; 
    let c = thisID[1].charCodeAt() - 97;
    return [l, c];
}
function moveConta(thisID){  // precisa ser adaptado ao modo de cálculo  // movimento 'manual' de contas
    let pos = idToLinCol(thisID);  // coordenadas da conta clicada
    let saltoGrande = baseCalc == 2 ? 1 : 5;  // distingue base 2 de bases 10 e 16
    // somar1(1);
    if (tabu[pos[0]][pos[1]] == 1){  // verifica se é uma conta válida  (é provável que este controlo nem seja necessário por haver validação na dom)
        if (pos[0] < 5 ) {   // movimento manual na parte superior do tabuleiro
            console.log("numar: "+numar[pos[1]]+" curso1: "+curso1[1][pos[1]]+" curso0: "+curso0[1][pos[1]]);
            switch (baseCalc) {
            case 2:    // binário
                if ( curso1[1][pos[1]] == 2 ){
                    descerContaSuperior(pos[1]);
                    numar[pos[1]] += 1;
                } else {
                    subirContaSuperior(pos[1]);
                    numar[pos[1]] -= 1;
                }
                break;
            case 10:    // decimal
                if ( curso1[1][pos[1]] == 2 ){
                    descerContaSuperior(pos[1]);
                    numar[pos[1]] += 5;
                } else {
                    subirContaSuperior(pos[1]);
                    numar[pos[1]] -= 5;
                }
                break;
            case 16:    // hexadecimal
                switch (curso1[1][pos[1]]){
                case 1:         
                case 2:
                    descerContaSuperior(pos[1]);
                    numar[pos[1]] += 5;
                    break;
                case 4:
                    subirContaSuperior(pos[1]);
                    numar[pos[1]] -= 5;
                    // break;
                case 3:
                    subirContaSuperior(pos[1]);
                    numar[pos[1]] -= 5;
                    break;
                default:
                }
                /*if ( curso1[1][pos[1]] == 2 ){
                    descerContaSuperior(pos[1]);
                    numar[pos[1]] += 5;
                } else {
                    subirContaSuperior(pos[1]);
                    numar[pos[1]] -= 5;
                } */
                break;
            default:
            }
        } else {  // movimento manual na parte inferior do tabuleiro
            if (baseCalc == 18 ) {
                let nivel = curso1[0][pos[1]];  // este valor é unívoco em relação aos comportamentos possíveis
                let nConta = pos[0];
                switch (nivel){
                case 9:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 11:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 10:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 9:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 10:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 11:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 10:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 11:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 11:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 7:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 12:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 7:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 8:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 13:
                    switch (nConta) {
                    case 6: case 13:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 7:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 8:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 9:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    // case 13:
                    //    break;
                    default:
                    }
                    if (nConta == 13) {  /// tem bug: baixa a segunda conta de cima
                        if (numar[pos[1]] <5 ){
                            descerContaSuperior(pos[1]);
                            numar[pos[1]] = 5;
                        }
                    }
                    break;
                default:
                }
            } else {  // hexadecimal
                let nivel = curso1[0][pos[1]];  // este valor é unívoco em relação aos comportamentos possíveis
                let nConta = pos[0];  // linha da conta clicada
                console.log("nivel: "+nivel+" nConta: "+nConta);
                switch (nivel){
                case 9:
                    switch (nConta) {
                    case 13:
                        if (numar[pos[1]]==10) {
                            subirContaInferior(pos[1]);
                            numar[pos[1]]++;
                        }
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 11:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 10:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 9:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    // case 13:
                    //    break;
                    default:
                    }
                    break;
                case 10:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 11:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 10:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 11:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    case 11:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 7:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 12:
                    switch (nConta) {
                    case 12:
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                        break;
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 7:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 8:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    case 13:
                        break;
                    default:
                    }
                    break;
                case 13:
                    if (numar[pos[1]] == 14) {
                        subirContaInferior(pos[1]);
                        numar[pos[1]]++;
                    } else { 
                        switch (nConta) {
                        case 6: case 13:
                            descerContaInferior(pos[1]);
                            numar[pos[1]]--;
                        case 7:
                            descerContaInferior(pos[1]);
                            numar[pos[1]]--;
                        case 8:
                            descerContaInferior(pos[1]);
                            numar[pos[1]]--;
                        case 9:
                            descerContaInferior(pos[1]);
                            numar[pos[1]]--;
                            break;
                        // case 13:
                        //    break;
                        default:
                        }
                        if (nConta == 13) {  //
                            if (numar[pos[1]] <5 ){
                                descerContaSuperior(pos[1]);
                                numar[pos[1]] = 5;
                            } else {
                                if (baseCalc == 16){
                                    descerContaSuperior(pos[1]);
                                    numar[pos[1]] = 10;
                                }
                            }
                        }
                    }
                    break;
                case 14:    // aparentemente só acontece quando ocorre o 15 hexadecimal
                    switch (nConta){
                    case 6:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 7:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 8:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 9:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                    case 10:
                        descerContaInferior(pos[1]);
                        numar[pos[1]]--;
                        break;
                    default:
                    }
                    break;
                default:
                }
            }
        }
        atualizarNum();
        console.log("thisID: " + thisID + " linha: " + pos[0] + " coluna: " + pos[1]);
    }  // caso contrário não tem nada para fazer
}
function ativaMousover(sim, imagem){
    if (sim){
        imagem.onmouseover = function() { mouseHover(this); };
        imagem.onmouseout = function() { mouseOut(this); }; 

    } else {
        imagem.onmouseover = function() { };
        imagem.onmouseout = function() { }; 
    }
}
function sensibilidade(quanta) {
    for (let i = 9; i < 14; i++) {
        for (let j = 1; j < 14; j++) {
            ativaMousover(quanta, timg[i][j]);
            if (quanta) {
                tdes[i][j].onclick = function() { moveConta(this.id); };
            } else {
                tdes[i][j].onclick = function() {};
            }
        }
    }
}
function toDecimal(){  // coloca o tabuleiro em modo decimal  {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
    limpar();
    baseCalc = 10;
    document.getElementById("binario").disabled = false;
    document.getElementById("hexa").disabled = false;
    document.getElementById("decimal").disabled = true;
    sensibilidade(true);
}
function toBinario(){  // coloca o tabuleiro em modo binário  {0, 1}
    limpar();
    baseCalc = 2;
    document.getElementById("gnum").innerText = `Em decimal: ${gnum}`;
    document.getElementById("binario").disabled = true;
    document.getElementById("hexa").disabled = false;
    document.getElementById("decimal").disabled = false;
    sensibilidade(false);
}
function toHexa() {  // coloca o tabuleiro em modo hexadecimal  {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F}
    limpar();
    baseCalc = 16;
    document.getElementById("gnum").innerText = `Em decimal: ${gnum}`;
    document.getElementById("binario").disabled = false;
    document.getElementById("hexa").disabled = true;
    document.getElementById("decimal").disabled = false;
    sensibilidade(true);
}
function mouseHover(elemento) {
    elemento.src = imgs[10];
}
function mouseOut(elemento) {
    elemento.src = imgs[9];
}
function tabuleiro() { // cria a tabela 
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const abaco = document.getElementById("abaco");
    let contImg = imgs[8];
    let pecaImg = 0;  // 0 - eixo; 1 - conta; 2 - outra
    for (let i = 0; i < 17; i++) {          // cria todas a células linha a linha
        const row = document.createElement("tr"); // cria uma linha da tabela
        tabu[i] = [];
        tdes[i] = [];
        timg[i] = [];
        for (let j = 0; j < 15; j++) {  // cria as células da linha
            const cell = document.createElement("td");  // cria um elemento <td> (uma célula da tabela) 
            if (j>0 && j<14){ 
                switch (i){
                    case 0: case 5: case 14:  // peças de madeira
                        contImg = imgs[1];
                        pecaImg = 2;
                        break; 
                    case 3: case 4: case 6: case 7: case 8:  // paus de deslocamento das contas
                        contImg = imgs[8];
                        pecaImg = 0;
                        break;
                    case 15: case 16:   // linhas sem imagem para escrita de números
                        break;
                    default:         // contas
                        contImg = imgs[9];
                        pecaImg = 1;
                }
            } else {
                pecaImg = 2;
                if (i == 0 && j == 0){  // canto superior esquerdo
                    contImg = imgs[0];
                } else {
                    if (i == 0 && j == 14) { // canto superior direito
                        contImg = imgs[2];
                    } else {
                        if (i == 14 && j == 0) { // canto inferior esquerdo
                            contImg = imgs[6];
                        } else {
                            if (i == 14 && j == 14){ // canto inferior direito
                                contImg = imgs[7];
                            } else {
                                if (i == 5 && j == 0){ // centro esquerdo
                                    contImg = imgs[4];
                                } else {
                                    if (i == 5 && j == 14){ // centro direito
                                        contImg = imgs[5];
                                    } else {
                                        if (i > 14){
                                            contImg = "";
                                        } else {
                                            contImg = imgs[3];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
            cell.style.width = LarguraCelula;
            cell.style.height = AlturaCelula;
            const cellImg = document.createElement('img');  // cria espaço para uma imagem na célula da tabela
            cellImg.src = contImg;   // atribui imagem à célula
            if ( i < 16 ) {
                cell.id = String.fromCharCode(i+97)+String.fromCharCode(j+97);  // gera um ID diferente para cada célula da tabela
            } else {
                cell.className = "arabe";
            }
            tabu[i][j] = pecaImg;
            tdes[i][j] = cell;
            timg[i][j] = cellImg;
            cell.appendChild(cellImg);
            if ( pecaImg == 1 ) {
                cell.onclick = function() { moveConta(this.id); };
                ativaMousover(true, cellImg);
            }
            row.appendChild(cell);
        }
        tblBody.appendChild(row);  // adiciona a linha no fim da tabela
    }
    tbl.appendChild(tblBody);    // coloca o corpo da tabela na tabela
    abaco.appendChild(tbl);    // adiciona a nova tabela ao corpo da página
    tbl.setAttribute("font-size", "40px");
    // separador
    const linhaH = [];
    const riscoH = [];
    linhaH[0] = document.createElement("br");
    abaco.appendChild(linhaH[0]);
    riscoH[0] = document.createElement("hr");
    abaco.appendChild(riscoH[0]);
    linhaH[1] = document.createElement("br");
    abaco.appendChild(linhaH[1]);
    // botões
    const btnLimpar = document.createElement("button");
    const btnSomar1 = document.createElement("button");
    const btnSomarN = document.createElement("button");
    const btnSubt1 = document.createElement("button");
    const btnDecimal = document.createElement("button");
    const btnBinar = document.createElement("button");
    const btnHexa = document.createElement("button");

    btnLimpar.innerText = "Limpar";
    btnLimpar.id = "limpar"; 
    btnLimpar.onclick = function() { limpar(); };
    abaco.appendChild(btnLimpar);

    btnSomar1.innerText = "Somar1";
    btnSomar1.id = "somar1"; 
    btnSomar1.onclick = function() { somar1(1); };
    abaco.appendChild(btnSomar1);

    btnSomarN.innerText = "SomarN";
    btnSomarN.id = "somarn"; 
    btnSomarN.onclick = function() { somarn(100); };
    abaco.appendChild(btnSomarN);

    btnSubt1.innerText = "Subtrair1";
    btnSubt1.id = "subtrair1"; 
    btnSubt1.onclick = function() { somar1(-1); };
    abaco.appendChild(btnSubt1);

    btnDecimal.innerText = "Decimal";
    btnDecimal.id = "decimal";
    btnDecimal.disabled = true;
    btnDecimal.onclick = function() { toDecimal(); };
    abaco.appendChild(btnDecimal);

    btnBinar.innerText = "Binário";
    btnBinar.id = "binario";
    btnBinar.onclick = function() { toBinario(); };
    abaco.appendChild(btnBinar);

    btnHexa.innerText = "Hexadecimal";
    btnHexa.id = "hexa";
    btnHexa.onclick = function() { toHexa(); };
    abaco.appendChild(btnHexa);

    linhaH[2] = document.createElement("br");
    abaco.appendChild(linhaH[2]);
    linhaH[3] = document.createElement("br");
    abaco.appendChild(linhaH[3]);
    riscoH[1] = document.createElement("hr");
    abaco.appendChild(riscoH[1]);
    linhaH[4] = document.createElement("br");
    abaco.appendChild(linhaH[4]);
    // input
    const obterNumero = document.createElement("input");
    obterNumero.type = "number";
    obterNumero.name = "numero";
    obterNumero.min = "0";
    obterNumero.max = "9999999999999";
    obterNumero.maxlength = "13";
    abaco.appendChild(obterNumero);
    const btnInput = document.createElement("button");
    btnInput.type = "submit";
    btnInput.onclick = function() { lerInput(0); };
    btnInput.innerText = "Enviar";
    abaco.appendChild(btnInput);
    // outro input
    const outroNumero = document.createElement("input");
    outroNumero.type = "number";
    outroNumero.name = "numero";
    outroNumero.min = "0";
    outroNumero.max = "9999999999999";
    outroNumero.maxlength = "13";
    abaco.appendChild(outroNumero);
    const btn2Input = document.createElement("button");
    btn2Input.type = "submit";
    btn2Input.onclick = function() { lerInput(1); };
    btn2Input.innerText = "Somará?";
    abaco.appendChild(btn2Input);
    linhaH[5] = document.createElement("br");
    abaco.appendChild(linhaH[5]);
    linhaH[6] = document.createElement("br");
    abaco.appendChild(linhaH[6]);
    riscoH[2] = document.createElement("hr");
    abaco.appendChild(riscoH[2]);
    linhaH[7] = document.createElement("br");
    abaco.appendChild(linhaH[7]);

    // um output
    const numGnum = document.createElement("div");
    numGnum.id = "gnum";
    abaco.appendChild(numGnum);
}
const somarn = async (n) =>{ // somar n animado
    for (i = 0; i < n; i++) {
        somar1(1);
        await sleep(100);
    }
}
function lerInput(qual){
    let num = document.getElementsByName("numero")[qual].value;
    limpar();
    escreveNum(num);
    gnum = num;
    document.getElementById("limpar").disabled = false;
    document.getElementById("subtrair1").disabled = false;
}
function comecar(){
    if (inicio == 0) tabuleiro();
    inicio = 1;
    document.getElementById("limpar").disabled = true;
    document.getElementById("subtrair1").disabled = true;
}