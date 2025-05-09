const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const { allocateForAllUsers } = require('./allocate/autoAllocate');

exports.autoAllocateDailySavings = functions.pubsub.schedule('every day 00:00').onRun(async (context) => {
  await allocateForAllUsers();
  console.log('Auto-allocated daily savings for all users.');
  return null;
});
