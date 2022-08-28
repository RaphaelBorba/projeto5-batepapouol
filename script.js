
let userName

/* FUNCTION THAT CHECKS IF THE USER NAME CAN BE USE OR DON'T*/

const startWeb = ()=>{
    
    let name = document.querySelector('#user-name').value;
    
    const promesse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ',{
        name: name
    })
    promesse.catch((err)=>{
        let erro = err.response.status;
        alert('Nome repetido ou em branco.')
    })

    

    
    promesse.then(()=>{
        userName= name;

        /* DELETE THE INITIAL SCREEN */
        let delScreen = document.querySelector('.initial-screen')
        delScreen.parentNode.removeChild(delScreen)

        /* CHECKS IF THE USER KEEPS ONLINE EVERY 5 SEC */
        setInterval(()=>{
            axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{
            name: name
        })
        }, 5000)
    })
    
}

/* FUNCTION TO MAKE THE MESSAGES */

let i=0

const showMessages =(dado)=>{
    let data = dado.data
    let ul = document.querySelector('ul')
    ul.innerHTML=''

    for(let i =0; i<data.length;i++){

        if(data[i].type === 'status'){

            ul.innerHTML+= `

            <li class="enter-leave-group">
                <span><span class="time">(${data[i].time})</span> <span class="name"> ${data[i].from} </span> ${data[i].text}</span>
            </li>`

        }else if(data[i].type === 'message' && (data[i].to === 'Todos' || data[i].to === userName)){

            ul.innerHTML+=`
           
            <li class="msg-everybody">
                <span><span class="time">(${data[i].time})</span> <span class="name"> ${data[i].from} </span>para <span class="name">${data[i].to}:</span> ${data[i].text}</span>
            </li>`
        }
    }
    if (i===0){
        ul.lastChild.scrollIntoView();
        i++
    }
}

/* FUNCTION TO LOAD THE MESSAGES */

const loadMessages = ()=>{
    const promesse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promesse.then(showMessages)
}

/* LOAD THE MESSAGES INTO TO UL */

setInterval(loadMessages, 3000)



/* FUNCTION ONCLICK TO SCROLL THE VIEW TO BOTTOM */

const scrollView = ()=>{
    document.querySelector('ul').lastChild.scrollIntoView()
}

/* FUNCTION ONCLICK TO SEND MESSAGE TO API */

const sendMessage = ()=>{

    let msg = document.querySelector('#msg').value;

    const promese = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',{
        from: userName,
        to: 'Todos',
        text: msg,
        type: 'message'
    })
    
    promese.then(loadMessages)
    promese.catch((er)=>{
        let erro = er.response.status
        alert(`Erro! Não é possivel enviar mensagem vazia!`)
    })
    document.querySelector('#msg').value = ''
}

/* PRESS ENTER FUNCTION */

document.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        const but = document.querySelector('#sendBtn')
        but.click()
    }
})