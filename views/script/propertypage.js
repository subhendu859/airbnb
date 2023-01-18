const getpropertypage = async () => {
    try {
        // fetch
        const fetchData = await fetch(`http://localhost:3000/propertydata`);
        const getData = await fetchData.json();
        const ratCity = document.querySelector('.rat-City');
        const wrapperData = document.querySelector('.wrapperdata')
        const heading = document.querySelector('.heading');
        const bigImg = document.querySelector('.big-img');
        const smallImg = document.querySelector('.small-img');
        const propertyContent = document.querySelector('.propertyContent');
        const description = document.querySelector('.description');
        const price = document.querySelector('.price');
        const amenitiesLi = document.querySelector('.amenitiesLi')
        const aminitiesObj = getData.aminities;


        heading.innerText = `${getData.name}`;
        ratCity.innerHTML = ` <p><span class="mr-3"><i class="fa-solid fa-star"></i><span>4.5   <span class="mx-4"> ${getData.address.street},${getData.address.market},${getData.address.country}</span></p>`;
        bigImg.innerHTML = `<img src="${getData.images.picture_url}"
                        alt="Gallery image 1" class="ecommerce-gallery-main-img active" />`;
        smallImg.innerHTML = ` <div class="col-6 top">
                        <img src="${getData.images.picture_url}"
                        alt="Gallery image 1"/>
                        </div>
                        <div class="col-6 top">
                            <img src="${getData.images.picture_url}"
                                alt="Gallery image 2"/>
                        </div>
                        <div class="col-6 bottom">
                            <img src="${getData.images.picture_url}"
                                alt="Gallery image 3" />
                        </div>
                        <div class="col-6 bottom">
                            <img src="${getData.images.picture_url}"
                                alt="Gallery image 4"/>
                        </div>`;
        propertyContent.innerHTML = `<div class="col-lg-3 col-sm-6">
                                      <h6 class="h6">Guest: ${getData.guests_included}
                                      </h6>
                                  </div>
                                  <div class="col-lg-3 col-sm-6">
                                      <h6 class="h6">Bedroom: ${getData.bedrooms}
                                      </h6>
                                  </div>
                                  <div class="col-lg-3 col-sm-6">
                                      <h6 class="h6">Bed: ${getData.beds}
                                      </h6>
                                  </div>
                                  <div class="col-lg-3 col-sm-6">
                                      <h6 class="h6">Bathroom: ${getData.bathrooms}
                                      </h6>
                                  </div>`;
        description.innerHTML = `<p>${getData.description}</p>`;
        price.innerText = `${getData.price} night`;


        for (let i = 0; i < Object.keys(aminitiesObj).length; i++) {
            const key = Object.keys(aminitiesObj)[i];
            const value = Object.values(aminitiesObj)[i]
            if (value == 'False') {
                for (let j = 0; j < amenitiesLi.children.length; j++) {
                    const unavailable = amenitiesLi.children[j].textContent;
                    if (key.toLowerCase() == unavailable.toLowerCase()) {
                        amenitiesLi.children[j].classList.add('text-decoration-line-through')
                    }
                }
            }

        }



        const showalert = document.querySelector('.showalert');
        const error = await fetch(`http://localhost:3000/bookingerror`);
        const errorDatas = await error.json();
        if (errorDatas.length > 0) {
            const bookingAlert = document.querySelector('.alertUser');
            const showErr = ` <p class="alert alert-danger" role="alert">${errorDatas}</p>`;
            showalert.innerHTML = showErr;
        }
    } catch (error) {

        console.log(error);
    }
}

getpropertypage();