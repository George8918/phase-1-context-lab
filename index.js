/* Your Code Here */
function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeesInfo) {
  return employeesInfo.map(employeeInfo => createEmployeeRecord(employeeInfo));
}


function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  });

  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');

  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  });

  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date).hour;
  const timeOut = this.timeOutEvents.find((event) => event.date === date).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(totalPay, employee) {
    return totalPay + allWagesFor.call(employee);
  }, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(employee) {
    return employee.firstName === firstName;
  });
}

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date
  })

  const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable
}
