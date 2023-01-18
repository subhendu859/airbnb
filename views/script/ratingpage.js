const ratingsAndReview = async () => {
    try {
        
        const allStar = document.querySelectorAll('.star');
        const submitBtn = document.querySelector('.submitBtn');
        var rating = document.querySelector('.ratingValue');
        var click;

        
        await allStar.forEach((stard, i) => {
            
            stard.onclick = () => { 
            
                click = i + 1;
                allStar.forEach((stard, j) => {
                    
                    if (click >= j + 1) {
                        stard.innerHTML = '&#9733;'
                        rating.innerHTML = `${click}`
    
                    } else {
                        stard.innerHTML = '&#9734;'
                    }
                });
                
                submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const rating = click;
                    const review = document.querySelector('#review');
                    const reviewheading = document.querySelector('#heading');
                    
                    const data = {
                        rating: rating,
                        reviewheading: reviewheading.value,
                        review: review.value
                    } 
                    
                    fetch('http://localhost:3000/reviewdata', {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(data),
                    })
         
                    window.location='/';
                    
                })
            }
    
        });
    } catch (error) {
        
        console.log(error);
    }
}

ratingsAndReview();
