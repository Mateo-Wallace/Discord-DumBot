// var messageWords = ["1d20", "+", "2d2", "-", "1"];
// var messageWords = [];
// var messageWords = ["1d2"];
var messageWords = ["1d2", "+", "1", "hello"];

console.log(messageWords);

if (messageWords.length === 0) {
  // /roll
  const sum = Math.floor(Math.random() * 20) + 1;
  console.log(
    `**Result**: 1d20(${
      sum == 1 || sum == 20 ? `**${sum}**` : sum
    }) \n **Total**: ${sum}`
  );
} else {
  var resultWords = [];
  messageWords.map((word) => {
    if (word.includes("d")) {
      return resultWords.push(word);
    } else if (word == "+" || word == "-") {
      return resultWords.push("math");
    } else if (!isNaN(word / 1)) {
      return resultWords.push("num");
    } else {
      return resultWords.push("error");
    }
  });
  console.log(resultWords);
}
