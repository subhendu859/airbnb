const validation = async () => {
    const error = await fetch('http://localhost:3000/loginerror');
    const errorData = await error.json();
    if (errorData.length > 0 ) {
        const userAlert = document.querySelector('.alertUser');
        const showErr = ` <p class="alert alert-danger" role="alert">${errorData}</p>`;
        userAlert.innerHTML = showErr;
    }
}
validation();
