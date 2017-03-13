process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  console.log('received data:', text);
  if (text === 'quit\r\n') {
    done();
  }
  try {
    eval(text); 
} catch (e) {
    console.log(e);
}
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}