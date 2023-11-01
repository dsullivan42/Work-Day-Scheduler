// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Makes sure that the script doesn't run until the DOM is fully loaded
$(document).ready(function () {

//creating variables for the current day and time
var currentDay = document.querySelector("#currentDay");

var today = dayjs().format("dddd, MMMM Do YYYY, h:mm:ss a");

currentDay.textContent = today;

// this code assigns the saveBtn class to the save button, with a click event, which stores the time and the text in local storage
$(".saveBtn").on("click", function() {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, text);
});

// this code gets the current number of hours
function hourTracker() {
    var currentHour = dayjs().hour();

    // this code loops over the time blocks
    $(".hour-row").each(function() {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);

        // this code checks the time and adds the appropriate class
        if (blockHour < currentHour) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
        else if (blockHour === currentHour) {
            $(this).removeClass("past");
            $(this).addClass("present");
            $(this).removeClass("future");
        }
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    });
}
// this code calls the hourTracker function
hourTracker();

// this code loads the saved data from local storage
function loadSchedule() {
    $(".hour-row").each(function() {
        var id = $(this).attr("id");
        var schedule = localStorage.getItem(id);

        if (schedule !== null) {
            $(this).children(".description").val(schedule);
        }
    });
}
// this code calls the loadSchedule function
loadSchedule();
  });
  