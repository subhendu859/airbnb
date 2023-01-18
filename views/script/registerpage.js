const validation = async () => {
    // fetch 
    const error = await fetch('http://localhost:3000/registererror');
    
    const errorData = await error.json();
    console.log(errorData); 
    
    if (errorData.length > 0 ) {
        const userAlert = document.querySelector('.alertUser');
        const showErr = ` <p class="alert alert-danger" role="alert">${errorData}</p>`;
        userAlert.innerHTML = showErr;
    }
}

validation();
