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

function create_post() {
  const message = document.getElementById('post').value;
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'create_post')({
      message: message,
      timestamp: timestamp,
    }).then(result => show_output(result, 'address_output'));
  });
}

function display_post(result) {
  let list = document.getElementById('posts_output');
  list.innerHTML = "";
  let output = JSON.parse(result);
  if (output.Ok) {
    let posts = output.Ok.sort((a, b) => a.timestamp - b.timestamp);
    for (post of posts) {
      let node = document.createElement("LI");
      let textnode = document.createTextNode(post.message);
      node.appendChild(textnode);
      list.appendChild(node);
    }
  } else {
    alert(output.Err.Internal);
  }
}

function retrieve_posts() {
  let address = document.getElementById('address_in').value.trim();
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'retrieve_posts')({
      agent_address: address,
    }).then(result => display_post(result));
  });
}
