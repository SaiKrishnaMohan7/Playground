/* jshint ignore:start */
/**
 * Code starts execution in the Poll phase of the event loop
 *
 * -- Global Execution Context, storage global memory
 * label `doWhenDataReceived` is created and assigne
 */
function doWhenDataReceived(value) {
  returnNextElement.next(value);
}
function* createFlow() {
  const data = yield fetch("http://twitter.com/will/tweets/1");
  console.log(data);
}
const returnNextElement = createFlow();
const futureData = returnNextElement.next();
futureData.value.then(doWhenDataReceived);
