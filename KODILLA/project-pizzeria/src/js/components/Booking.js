import { templates, select } from '/js/settings.js';
import utils from '/js/utils.js';
import AmountWidget from './AmountWidget.js';

class Booking {
    constructor(element){
        const thisBooking = this;

        thisBooking.render(element);
        thisBooking.initWidgets();
    }

    render(element){
        const thisBooking = this;

        const generatedHTML = templates.bookingWidget(element);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBooking.dom = {
            wrapper: element,
            peopleAmount: element.querySelector(select.booking.peopleAmount),
            hoursAmount: element.querySelector(select.booking.hoursAmount),
        };

        thisBooking.dom.wrapper.appendChild(generatedDOM);

        console.log(thisBooking.dom.wrapper);
        console.log(element.querySelector(select.booking.hoursAmount));
        console.log(thisBooking.dom.hoursAmount);
    }

    initWidgets(){
        const thisBooking = this;

        thisBooking.peopleAmount = new AmountWidget(document.querySelector(select.booking.peopleAmount));
        thisBooking.peopleAmount.setValue(thisBooking.amountPeople);

        thisBooking.hoursAmount = new AmountWidget(document.querySelector(select.booking.hoursAmount));
        thisBooking.hoursAmount.setValue(thisBooking.amountHours);
        
    }
}
export default Booking;