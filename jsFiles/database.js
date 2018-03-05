/**
 * Sends the event to google sheets
 * @param  {event object} eventObj The event we want to store
 * @return {None} returns nothing
 */
function postEvent(eventObj) {
  'use strict';
  let request;
  let eventData = JSON.stringify(eventObj);

  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbx5YzphchZuPi_D0U8FsleFgj8ngyDYb_nOkRCLh9iDZz4louOk/exec",
    type: "post",
    data: {
      'EventDate': eventObj.date,
      'EventName': eventObj.name,
      'EventData': eventData
    }
  });
  request.always(() => {
    loadEvents();
  });
}
/**
 * Overwrites the event that is stored in the google sheet
 * @param  {string} rowId    The index of the row where the event is stored
 * @param  {event object} eventObj The event object we are over writing
 * @return {None}          returns nothing
 */
function updateEvent(rowId, eventObj) {
  'use strict';
  let request;
  let eventData = JSON.stringify(eventObj);

  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbx5YzphchZuPi_D0U8FsleFgj8ngyDYb_nOkRCLh9iDZz4louOk/exec",
    type: "post",
    data: {
      'EventDate': eventObj.date,
      'EventName': eventObj.name,
      'EventData': eventData,
      'row_num': rowId
    }
  });
  request.always(() => {
    loadEvents();
  });
}

/**
 * Writes the user to the google sheet
 * @param  {user object} userObj The user object we are storing
 * @return {None}         returns nothing
 */
function postUser(userObj) {
  'use strict';
  let request;
  let userData = JSON.stringify(userObj);

  request = $.ajax({
    url: "https://script.google.com/macros/s/AKfycbzft_iTCdt-tMZVntY38OVfU-Q-UIXYjP-kja7xm1iGVNJQ10w0/exec",
    type: "post",
    data: {
      'username': userObj.username,
      'userdata': userData
    }
  });
  request.always(() => {
    loadUsers();
  });
}
