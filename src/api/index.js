import config from '../config';

const { DOCUMENT_SERVICE, SCHEDULE_SERVICE, EVENTS_SERVICE } = config;

export function addInvoice (invoice, uid, callback) {
  fetch(`${DOCUMENT_SERVICE}/documents`, {
    body: invoice,
    headers: {
      // No content-type should be specified, so that boundary is added automatically
      'X-Lichen-Token': uid,
    },
    method: 'POST',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};

export function getInvoice(path, callback) {
  fetch(`${DOCUMENT_SERVICE}${path}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};

export function scheduleInvoice(name, payload, callback) {
  fetch(`${SCHEDULE_SERVICE}/actions`, {
    body: JSON.stringify({
      name,
      payload,
    }),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};

export function subscribe(topics, callback) {
  fetch(`${EVENTS_SERVICE}/subscriptions`, {
    body: JSON.stringify({
      topics: ['xadf.compute.documents', 'xadf.compute.effective']
    }),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
  .then(response => response.json())
  .then((data) => {
    callback(data);
  }).catch((err) => {
    alert(`Error: ${err}`);
  });
};
