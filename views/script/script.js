const log = async () => {
    try {
        
        const logbtn = document.querySelector('.logbtn')
        const log = document.querySelector('.log')
        const linkHost = document.querySelector('.linkHost')

        
        logbtn.addEventListener('click', (e) => {
            log.classList.remove('d-none')
        })

        
        const logdatafetch = await fetch('http://localhost:3000/log');
        
        const logdata = await logdatafetch.json();

        
        for (let i = 0; i < logdata.length; i++) {
            const logLink = `<a href='/${logdata[i]}' class="text-decoration-none text-black">${logdata[i]}</a>`;
            const regLink = document.createElement('div');
            regLink.classList.add('regLink');
            regLink.innerHTML = logLink;
            linkHost.append(regLink)

        }
    } catch (error) {
        
        console.log(error);
    }
}

log();
