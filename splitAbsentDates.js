
function splitAbsentDates(person) {
    //   const person = {
    //   name: "Tiras",
    //   absent:["12/11/2023",
    //           "21/01/2024",
    //           "30/09/2023",
    //           "25/08/2024"]
    // }
    var persons = [];


    person.absent.forEach((date) => {
        console.log(date);

        const newRecord = {
            name: person.name,
            absent: date,
        };
        persons.push(newRecord);
    });



    return persons;
}


module.exports = splitAbsentDates 