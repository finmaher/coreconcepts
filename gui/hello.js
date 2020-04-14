let holochain_connection = holochainclient.connect();

function get_agent_id() {
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'get_agent_id')({}).then(result =>
      show_output(result, 'agent_id'),
    );
  });
}

function show_output(r, id) {
  let el = document.getElementById(id);
  let output = JSON.parse(r);
  if (output.Ok) {
    el.textContent = ' ' + output.Ok;
  } else {
    alert(output.Err.Internal);
  }
}

function show_person(r) {
  let person = document.getElementById('person_output');
  let output = JSON.parse(r);
  if (output.Ok) {
    person.textContent = ' ' + output.Ok.name;
  } else {
    alert(output.Err.Internal);
  }
}

function hello() {
  holochain_connection.then(({callZome, close}) => {
    callZome(
      'test-instance',
      'hello',
      'hello_holo',
    )({args: {}}).then(result => show_output(result, 'output'));
  });
}

function create_person() {
  const name = document.getElementById('name').value;
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'create_person')({
      person: {name: name},
    }).then(result => show_output(result, 'address_output'));
  });
}

function retrieve_person() {
  let address = document.getElementById('address_in').value.trim();
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'retrieve_person')({
      address: address,
    }).then(result => show_person(result, 'person_output'));
  });
}
