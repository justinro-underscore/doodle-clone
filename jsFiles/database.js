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
