let holochain_connection = holochainclient.connect();

// Render functions
function show_output(result, id) {
  let el = document.getElementById(id);
  let output = JSON.parse(result);
  if (output.Ok) {
    el.textContent = ' ' + output.Ok;
  } else {
    alert(output.Err.Internal);
  }
}

// Zome calls

function hello() {
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'hello_holo')({args: {}}).then(result =>
      show_output(result, 'output'),
    );
  });
}

function create_post() {
  const message = document.getElementById('post').value;
  const timestamp = Date.now();
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'create_post')({
      message: message,
      timestamp: timestamp,
    }).then(result => show_output(result, 'address_output'));
  });
}
function retrieve_posts() {
  let address = document.getElementById('address_in').value.trim();
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'retrieve_posts')({
      agent_address: address,
    }).then(result => display_posts(result));
  });
}
function get_agent_id() {
  holochain_connection.then(({callZome, close}) => {
    callZome('test-instance', 'hello', 'get_agent_id')({}).then(result =>
      show_output(result, 'agent_id'),
    );
  });
}
function display_posts(result) {
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
