const bookDetail = async () => {
    try {
        // fetch 
        const fetchBookingData = await fetch(`http://localhost:3000/bookingdetails`);

        
        const bookingData = await fetchBookingData.json();
        console.log(bookingData);

        
        const propertyName = document.querySelector('#propertyName');
        const nop = document.querySelector('#nop');
        const price = document.querySelector('#price');
        const totalPrice = document.querySelector('#totalPrice');
        const checkIn = document.querySelector('#checkIn');
        const checkOut = document.querySelector('#checkOut');
        const non = document.querySelector('#non');

        
        propertyName.value = bookingData[7];
        totalPrice.value = bookingData[5];
        price.value = bookingData[4];
        non.value = bookingData[3];
        nop.value = bookingData[2];
        checkOut.value = bookingData[1];
        checkIn.value = bookingData[0];
    } catch (error) {
        
        console.log(error);
    }
}

bookDetail();
