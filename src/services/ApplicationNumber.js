export let generateApplicationNo = () => {
  let randomNo = Math.floor(Math.random() * 10000);
  randomNo = randomNo.toString();
  return "APL-" + randomNo;
};
