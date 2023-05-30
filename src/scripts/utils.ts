const delayTime = 1500;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type callBackFunction = () => any;

function delay(fn: callBackFunction, time?: number): Promise<string> {
  return new Promise(function (resolve) {
    return setTimeout(
      function () {
        return resolve(fn());
      },
      time ? time : getRandomInt(delayTime)
    );
  });
}
