function displayCalendar() {

    //Declaring basic massives of data whick would be hard to assign without pre-existing sets.
    var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    //February's length in the array was set to default to avoid incurring any unnecessary calculations three quarters of time.
    var monthLength = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
    //Names stored in accordance with Western weekday notation (todo: fix/amend).
    var dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    //Acquiring a snapshot of current user's time and storing it in the 'Date()' object for easy access and, in part, to avoid asynchronyous acquisition if any lags occur.
    var dateNow = new Date();

    //Declaring relevant time-related variables and assigning values according to data stored in the container. 
    var yearNow = dateNow.getFullYear(); //Current year.
    var monthNow = dateNow.getMonth(); //Current month.
    var dayNow = dateNow.getDate(); //Current day of the month.
    var weekdayNow = dateNow.getDay(); //Current weekday.

    //If current month is February; this clause checks whether current year is a leap year and alters the length stored by default if it is. Put here after all the variables it refers to were declared to maintain continuity. Logical expression is unwieldy, but seems to do its job.
    if (((yearNow % 4) === 0) && ((yearNow % 100) !== 0) || ((yearNow % 400) === 0)) {
        monthLength[1] = 29;
    }

    //Declaring variables which will be used to store incremental and decremental time values.
    var yearInc; //Year incremental variable.
    var monthInc; //Month incremental variable.
    var monthDcr; //Month decremental variable.

    //Calculating and assigning values to our newly declared variables using conditional expression.
    //Addressing issues with direct incrementation and decrementation of data indices in the monthLength[] array.
    //Increasing and decreasing the values directly would have put values out of range when decrementing in January (resulting in a -1) and incrementing in December (resulting in a 12).
    if (monthNow == 11) {
        monthInc = 0;
    } else {
        monthInc = monthNow + 1;
    }

    if (monthNow == 0) {
        monthDcr = 11;
    } else {
        monthDcr = monthNow - 1;
    }

    //This conditional checks whether it's required to increment the year and next January for proper neighbouring day cell placement.
    //If current date is the 31th of December, it increments the year value, otherwise it assigns it the current year value from variable 'yearNow'.
    if ((monthNow == 11) && (dayNow == monthLength[monthNow])) {
        yearInc = yearNow + 1;
    } else {
        yearInc = yearNow
    }

    //Creating a new dataset stored in another 'Date()' object, which will be used later on to determine weekdays of next and previous months and calculate their cell placement.
    var dateNew = new Date(yearInc, monthInc); //Uses incremental values calculated above. 

    //Creates a variable for determining weekdays of the neighbouring month.
    var weekdayNew = dateNew.getDay();
    var dayNew = dateNew.getDate();


    //This variable is used as a temporary storage and will be referred to while placing cells in the table.
    var weekdayShuttle = weekdayNew; //Uses the new date values to determine neighbouring weekdays.

    //This variable acts as a temporary storage upon which all the HTML code blocks are appended in the next stage, and it will ultimately be used to form the final calendar table.
    var markupStorage = "";

    //This variable determines current month's length in days.
    var lenghtNow = monthLength[monthNow];

    //This is used as a temporary rewritable counter to compare with actual date settings.
    var dayShuttle = 1;
    var idGen = 0;
    //This is where all the relevant HTML code is generated with conditional loops that contain strings of preset markup tags.

    while (weekdayNew > 0) {
        markupStorage += "<div id='" + idGen + "', class='grid-item'></td>";
        weekdayNew--;
        idGen++;
    }


    while (dayShuttle <= lenghtNow) {


        if (weekdayShuttle > 6) {
            weekdayShuttle = 0;
            markupStorage += ">" + dayShuttle + "</div>";
        }



        if (dayShuttle == dayNow) {
            markupStorage += "<div id='" + idGen + "' class='dayNow'  onMouseOver='this.style.background=\"#FFFF00\"; this.style.color=\"#FFFFFF\"' " +
                "onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>" + dayShuttle + "</div>";
        } else {
            markupStorage += "<div id='" + idGen + "' class='monthNow' onMouseOver='this.style.background=\"#FFFF00\"'" +
                " onMouseOut='this.style.background=\"#FFFFFF\"'>" + dayShuttle + "</div>";

        }

        weekdayShuttle++;
        dayShuttle++;
    }

    var calendarBody = "<div class='grid-container'" +
        monthNames[monthNow] + " " + yearNow + "</th></tr>";
    calendarBody += "<div class='grid-item'>1</div>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>" +
        "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
    calendarBody += "<tr>";
    calendarBody += markupStorage;
    calendarBody += "</tr></table>";
    document.getElementById("calendar").innerHTML = calendarBody;
}

function assignIDs() {
  document.getElementsByTagName("table")[0].setAttribute("id","tableid")
}