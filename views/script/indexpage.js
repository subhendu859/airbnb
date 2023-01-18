const getData = async () => {
    try {
        // fetch
        const fetchs = await fetch('http://localhost:3000/fetch');


        const data = await fetchs.json();


        for (let i = 0; i < data.length; i++) {
            const cardWrap = document.createElement('div');
            cardWrap.classList.add("cards", "col-sm-12", "col-md-6", "col-lg-3", "my-2");
            const card = `<a href="/property/${data[i]._id}" class="text-decoration-none text-black"><div class="img">
                <img class="card-img-top" src="${data[i].images.picture_url}" alt="Card image cap">
            </div>
            <div class="cards-detail my-2">
                <div class="card-heading d-flex justify-content-between">
                    <h5 class="card-title">${data[i].name}</h5>
                </div>
                <p class="card-text">${data[i].address.street}, ${data[i].address.country}</p>
                <p class="card-text"><strong><span><i class="fa-solid fa-indian-rupee-sign"></i></span>${data[i].price}</strong> night</p>
            </div></a>`;
            cardWrap.innerHTML = card;
            const wrap = document.querySelector('#wrap');

            wrap.append(cardWrap);
        }
    }
    catch (err) {

        console.log(err)
    }
}
// call
getData();
