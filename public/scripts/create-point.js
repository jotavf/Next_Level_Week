function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( ufs => {

            for( const uf of ufs ){
                ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`
            }

        } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value>Selecione a cidade</option>"
        citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            
            for( const city of cities ){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens de coleta abaixo:

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event){
    const itemLi = event.target

    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId // true or false
        return itemFound
    })
        //retorna true ou false se encontrar

    if (alreadySelected >= 0) {
        const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId // falso
            return itemIsDifferent
        })
        
        selectedItens = filteredItens
    } else {
        // se não estiver selecionado, adiciona à seleção
        selectedItens.push(itemId)
    }

    collectedItens.value = selectedItens
}