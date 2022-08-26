/* FUNCTION THAT START THE SITE */

const startWeb = (dado)=>{
    
    let name = askName()
    let arrayNames = dado.data

    while(true){

        let deny=0

        for(let i = 0; i<arrayNames.length; i++){
        
            if(name === arrayNames[i].name || name.length ===0){
        
                alert('Nome repetido')
        
                name = askName()
                deny=1
            }
        }
        if(deny ===0){
            break;
        }
    }
    const promesse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ',{
        name: name
    })

    /* CHECKS IF THE USER KEEPS ONLINE EVERY 5 SEG */
    setInterval(()=>{
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{
        name: name
    })
    }, 5000)
}

/* FUNCTION TO ASK NAME */

const askName = ()=>{
    let name = prompt('Digite seu nome:')
    return name
}

/* START THE SITE */

const promessa  = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
promessa.then(startWeb)

/* FUNCTION TO MAKE THE MESSAGES */

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

        }else if(data[i].type === 'message'){

            ul.innerHTML+=`
           
            <li class="msg-everybody">
                <span><span class="time">(${data[i].time})</span> <span class="name"> ${data[i].from} </span>para <span class="name">${data[i].to}:</span> ${data[i].text}</span>
            </li>`
        }
    }
}

/* FUNCTION TO LOAD THE MESSAGES */

const loadMessages = ()=>{
    const promesse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promesse.then(showMessages)
}

/* LOAD THE MESSAGES INTO TO UL */

setInterval(loadMessages, 3000)

/* FUNCTION TO SCROLL THE VIEW TO BOTTOM */

const scrollView = ()=>{
    document.querySelector('ul').lastChild.scrollIntoView()
}