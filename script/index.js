const vitrine = document.getElementById("vitrine")
const cartList = document.querySelector("#cartList")
let quantidade = document.querySelector("#quantidade")
let quant = 0
let valor = 0


function productsList(list){
    vitrine.innerHTML = ""
    for(let i = 0; i < list.length; i++){
        let card = document.createElement("li")
        card.id = list[i].id
        card.classList.add("card-vitrine")

        let img = document.createElement("img")
        img.src = list[i].img
        img.alt = "Imagem do Produto"
        img.classList.add("img-vitrine")
        card.appendChild(img)

        let tipo = document.createElement("p")
        tipo.innerText = list[i].tag
        tipo.classList.add("tipo-Produto")
        card.appendChild(tipo)

        let titulo = document.createElement("h4")
        titulo.innerText = list[i].nameItem
        titulo.classList.add("titulo-Produto")
        card.appendChild(titulo)

        let descricao = document.createElement("span")
        descricao.innerText = list[i].description
        descricao.classList.add("descricao-Produto")
        card.appendChild(descricao)
        
        let valor = document.createElement("p")
        valor.innerText = `R$${list[i].value.toFixed(2)}`
        valor.classList.add("valor-produto")
        card.appendChild(valor)

        let botaoAdicionar = document.createElement("button")
        botaoAdicionar.innerText = "Adicionar ao carrinho"
        botaoAdicionar.type = "submit"
        botaoAdicionar.classList = "button"
        card.appendChild(botaoAdicionar)

        vitrine.appendChild(card)
    }
}
productsList(data)

function createCartList(id, list){
    for(let i = 0; i < list.length; i++){
        if(id == list[i].id){
            let duplicaProduto = {}
            duplicaProduto = list[i]

            let card = document.createElement("li")
            card.classList.add("card-cart")
            card.id = "li" + list[i].id
            
            let img = document.createElement("img")
            img.src = duplicaProduto.img
            img.alt = "Imagem do Produto"
            img.classList.add("imgCarrinho")
            card.appendChild(img)

            let divCart = document.createElement("div")
            divCart.classList.add("div-cart")

            let titulo = document.createElement("h4")
            titulo.innerText = duplicaProduto.nameItem
            titulo.classList.add("titulo-Produto")
            divCart.appendChild(titulo)

            let valor = document.createElement("p")
            valor.innerText = `R$${duplicaProduto.value.toFixed(2)}`
            valor.classList.add("valor-produto")
            divCart.appendChild(valor)

            let botaoRemover = document.createElement("button")
            botaoRemover.type = "submit"
            botaoRemover.innerHTML = "Remover Produto"
            botaoRemover.classList = "button"
            divCart.appendChild(botaoRemover)

            card.appendChild(divCart)
            cartList.appendChild(card)
        }            
    }
}

vitrine.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        idProduto = event.composedPath()[1].id
        for(let i = 0; i < data.length; i++){
            if(idProduto == data[i].id){
                quant++
                document.querySelector("#quantidade").innerHTML = `${quant}`
                
                createCartList(idProduto, data)
                
                let valorProduto = data[i].value
                valor += valorProduto
                document.querySelector("#valorTotal").innerHTML = `R$ ${valor},00`
            }
        }               
        let removeVazio = document.querySelector(".cart-empty")
        removeVazio.style.display = "none"
        let adicionaDetalhes = document.querySelector(".cart-details")
        adicionaDetalhes.style.display = "flex"
        let adicionaCarrinho = document.querySelector(".cart-products")
        adicionaCarrinho.style.display = "flex"
    }
})

cartList.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        idProduto = event.composedPath()[2].id.substring(2)
        console.log(idProduto)
        for(let i = 0; i < data.length; i++){
            if(idProduto == data[i].id){
                quant--
                document.querySelector("#quantidade").innerHTML = `${quant}`

                let valorProduto = data[i].value
                valor -= valorProduto
                document.querySelector("#valorTotal").innerHTML = `R$ ${valor},00`
            }
        }
        event.composedPath()[2].remove()     
    }
    if(quant == 0) {
        let adicionaVazio = document.querySelector(".cart-empty")
        adicionaVazio.style.display = "flex" 
        let removeDetalhes = document.querySelector(".cart-details")
        removeDetalhes.style.display = "none"
        let removeCarrinho = document.querySelector(".cart-products")
        removeCarrinho.style.display = "none"
    }
})

function filterCamisetas(list){
    let camisetas = []
    for(let i = 0; i < list.length; i++){
        if(list[i].tag[0].toUpperCase() == "camisetas".toUpperCase()){
            camisetas.push(list[i])
        }
    }

    productsList(camisetas)
}

function filterAcessorios(list){
    let acessorios = []
    for(let i = 0; i < list.length; i++){
        if(list[i].tag[0].toUpperCase() == "Acessórios".toUpperCase()){
            acessorios.push(list[i])
        }
    }
    productsList(acessorios)
}

let botaoCamisetas = document.querySelector(".camisetas")
botaoCamisetas.addEventListener("click", function(){
    filterCamisetas(data)
})

let botaoAcessorios = document.querySelector(".acessorios")
botaoAcessorios.addEventListener("click", function(){
    filterAcessorios(data)
})

let botaoTodos = document.querySelector(".todos")
botaoTodos.addEventListener("click", function(){
    productsList(data)
})

let pesquisar = document.querySelector(".search-button")
pesquisar.addEventListener("click", function(){
    let input = document.querySelector(".search-input").value
    let filtrado = []
    for(let i = 0; i <data.length; i++){
        if(data[i].tag[0].toUpperCase().includes(input.toUpperCase()) || data[i].nameItem.toUpperCase().includes(input.toUpperCase())){
            filtrado.push(data[i])
            productsList(filtrado)
        }
    }
})

