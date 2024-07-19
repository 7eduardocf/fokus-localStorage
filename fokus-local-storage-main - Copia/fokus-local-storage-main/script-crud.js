const botaoAdicionar = document.querySelector(".app__button--add-task")
const formulario = document.querySelector(".app__form-add-task")
const textArea = document.querySelector(".app__form-textarea")
const listaDeTarefas = document.querySelector(".app__section-task-list")
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
const botaoCancelar = document.querySelector(".app__form-footer__button--cancel")
const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description")
const btnLimparTarefasConcluidas = document.getElementById("btn-remover-concluidas")
const btnLimparTodasTarefas = document.getElementById("btn-remover-todas")
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefa(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function criarTarefa(tarefa){
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")
    const svg = document.createElement("svg")
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`
    const p = document.createElement("p")
    p.classList.add("app__section-task-list-item-description")
    p.textContent = tarefa.descricao
    const botao = document.createElement("button")
    botao.classList.add("app_button-edit")
    const img = document.createElement("img")
    img.setAttribute("src","imagens/edit.png")

    botao.onclick = () =>{
        const novoValor = prompt("Digite o novo valor")
        if(novoValor){
            p.textContent = novoValor
            tarefa.descricao = novoValor
            atualizarTarefa()
        }
    }
    li.append(svg)
    li.append(p)
    botao.append(img)
    li.append(botao)

    if(tarefa.completa){
        li.classList.add("app__section-task-list-item-complete")
        botao.setAttribute("disabled", "disabled")
    }else{
        li.onclick = () =>{
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
            
            document.querySelectorAll(".app__section-task-list-item-active").forEach(element =>{
                element.classList.remove("app__section-task-list-item-active")
            })
    
            if(tarefaSelecionada == tarefa){
                paragrafoDescricaoTarefa.textContent = ""
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            li.classList.add("app__section-task-list-item-active")
            
        }
    }

    return li
}
botaoCancelar.addEventListener("click", () =>{
    textArea.value = ""
    formulario.classList.add("hidden")
})
botaoAdicionar.addEventListener("click", () =>{
    formulario.classList.toggle("hidden")
})
formulario.addEventListener("submit", (evento) =>{
    evento.preventDefault()
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    atualizarTarefa()
    const elemento = criarTarefa(tarefa)
    listaDeTarefas.append(elemento)

    textArea.value = ""
    formulario.classList.add("hidden")
})
tarefas.forEach(element => {
    const elemento = criarTarefa(element)
    listaDeTarefas.append(elemento)
});
document.addEventListener("focoFinalizado", () =>{
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active")
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete")
        liTarefaSelecionada.querySelector("button").setAttribute("disabled", "disabled")
        tarefaSelecionada.completa = true
        atualizarTarefa()
    }
})

btnLimparTarefasConcluidas.addEventListener("click", () =>{
    let apagarTarefas = document.querySelectorAll(".app__section-task-list-item-complete")
    apagarTarefas.forEach(elemento =>{
        elemento.remove()
    })
    tarefas = tarefas.filter(element => !element.completa)
    atualizarTarefa()
})
btnLimparTodasTarefas.addEventListener("click", () =>{
    let apagarTarefas = document.querySelectorAll(".app__section-task-list-item")
    tarefas = apagarTarefas.forEach(element =>{
        element.remove()
    })
    atualizarTarefa()
    
})