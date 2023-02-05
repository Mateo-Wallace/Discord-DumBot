// var messageWords = ["1d20", "+", "2d2", "-", "1"];
// var messageWords = [];
// var messageWords = ["1d2"];
var messageWords = ["1d2", "+", "1"];

if (messageWords.length === 0) {
  // /roll
  const sum = Math.floor(Math.random() * 20) + 1;
  console.log(
    `**Result**: 1d20(${
      sum == 1 || sum == 20 ? `**${sum}**` : sum
    }) \n **Total**: ${sum}`
  );
} else {
  messageWords.map((word) => {
    return console.log(word);
  });
}
