/* Your Code Here */
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    console.log(dateStamp);
    let [date, time] = dateStamp.split('');
    let  hour = parseInt(time, 10);

    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
  
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
      let [date, hour] = dateStamp.split(' ');
       hour = parseInt(hour, 10);


      employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
      });
    
      return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
      let timeInEvent = employee.timeInEvents.find(event => event.date === date);
      let timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    
      if (timeInEvent && timeOutEvent) {
        let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
      } else {
        return 0;
      }
  }
  
  function wagesEarnedOnDate(employee, date) {
      let hoursWorked = hoursWorkedOnDate(employee, date);
      let payRate = employee.payPerHour;
      let wagesEarned = hoursWorked * payRate;
    
      return wagesEarned;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
      return srcArray.find(record => record.firstName === firstName);
  }
  
  const allWagesFor = function () {
      const eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })
  
      const payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0)
  
      return payable
  }