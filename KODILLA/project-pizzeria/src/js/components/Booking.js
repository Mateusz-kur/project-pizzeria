import { templates, select } from '/js/settings.js';
import utils from '/js/utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
    constructor(element){
        const thisBooking = this;

        thisBooking.render(element);
        thisBooking.initWidgets();
    }

    render(element){
        const thisBooking = this;

        const generatedHTML = templates.bookingWidget();

        thisBooking.dom = {};
        thisBooking.dom.wrapper = element;

        thisBooking.dom.wrapper.innerHTML = generatedHTML;

        thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
        thisBooking.dom.datePicker = document.querySelector(select.widgets.datePicker.wrapper);
        thisBooking.dom.hourPicker = document.querySelector(select.widgets.hourPicker.wrapper);
    }

    initWidgets(){
        const thisBooking = this;

        thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
        thisBooking.peopleAmount.setValue(thisBooking.amountPeople);

        thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
        thisBooking.hoursAmount.setValue(thisBooking.amountHours);
        
        thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
        thisBooking.datePicker.initPlugin(thisBooking.dom.datePicker);

        thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
        thisBooking.hourPicker.initPlugin(thisBooking.dom.hourPicker);
    }
}
export default Booking;