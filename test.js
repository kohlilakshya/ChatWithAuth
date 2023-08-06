const moment = require('moment-timezone');
const notifier = require('node-notifier');

// Define the time zones and corresponding locations
const timeZones = {
  'America/New_York': 'New York',
  'Europe/London': 'London',
  'Asia/Tokyo': 'Tokyo',
};

// Function to display the current time in different time zones
const showWorldClock = () => {
  Object.entries(timeZones).forEach(([timeZone, location]) => {
    const currentTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    console.log(`${location}: ${currentTime}`);
  });
};

// Function to set an alarm for a specific time
const setAlarm = (alarmTime) => {
  const alarmMoment = moment(alarmTime, 'HH:mm');
  const now = moment();

  // Calculate the time remaining until the alarm
  const timeRemaining = alarmMoment.diff(now);

  if (timeRemaining > 0) {
    console.log(`Alarm set for ${alarmTime}`);

    // Schedule a system notification for the alarm time
    setTimeout(() => {
      notifier.notify({
        title: 'Alarm',
        message: `Alarm time reached: ${alarmTime}`,
        sound: true,
      });
    }, timeRemaining);
  } else {
    console.log('Invalid alarm time');
  }
};

// Display the world clock every second
setInterval(showWorldClock, 1000);

// Example usage: Set an alarm for 10:30 AM in the Tokyo time zone
setAlarm('10:30');
