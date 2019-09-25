var Pusher = require('pusher');

var channels_client = new Pusher({
  appId: '854253',
  key: '8d2f85a46ed8e4abc837',
  secret: 'f9c521b70b7258538e77',
  cluster: 'ap2',
  encrypted: true
});

channels_client.trigger('my-channel', 'my-event', {
  "message": "hello world"
});