// var messageWords = ["1d20", "+", "2d2", "-", "1"];
// var messageWords = [];
var messageWords = ["1d2", "-", "4d2", "+", "1d20", "-", "5", "-", "2d20"];
// var messageWords = ["1d2", "+", "1", "hello"];

// console.log(messageWords);

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
      let sides = 20; // !roll 20
      let rolls = 1;
      if (!isNaN(word[0] / 1) && word.includes("d")) {
        // !roll 4d20
        rolls = word.split("d")[0] / 1;
        sides = word.split("d")[1];
      } else if (word[0] == "d") {
        // !roll d20
        sides = sides.slice(1);
      }
      sides = sides / 1; // convert to number
      if (isNaN(sides) || isNaN(rolls)) {
        return resultWords.push(`error`);
      } else {
        if (rolls > 1) {
          const rollResults = [];
          for (let i = 0; i < rolls; i++) {
            rollResults.push(Math.floor(Math.random() * sides) + 1);
          }
          const sum = rollResults.reduce((a, b) => a + b);
          rollResults.push(sum);
          return resultWords.push(rollResults);
        } else {
          return resultWords.push(Math.floor(Math.random() * sides) + 1);
        }
      }
    } else if (word == "+" || word == "-") {
      return resultWords.push(word);
    } else if (!isNaN(word / 1)) {
      return resultWords.push(word / 1);
    } else {
      return resultWords.push("error");
    }
  });
  // console.log(resultWords);
  if (resultWords.includes("error")) {
    console.log("oh no");
  } else {
    // console.log(resultWords.length);
    var result = [];
    var total = [];
    for (let i = 0; i < resultWords.length; i++) {
      if (messageWords[i].includes("d") && !isNaN(resultWords[i] / 1)) {
        total.push(resultWords[i]);
        result.push(
          `${messageWords[i]}(${
            resultWords[i] == 1 || resultWords[i] == messageWords[i].split("d")[1] / 1
              ? `**${resultWords[i]}**`
              : resultWords[i]
          })`
        );
      } else if (resultWords[i] == "+" || resultWords[i] == "-") {
        total.push(resultWords[i]);
        result.push(`${resultWords[i]}`);
      } else if (!isNaN(resultWords[i] / 1)) {
        total.push(resultWords[i]);
        result.push(
          `${
            resultWords[i] == 1 || resultWords[i] == messageWords[i].split("d")[1] / 1
              ? `**${resultWords[i]}**`
              : resultWords[i]
          }`
        );
      } else if (resultWords[i].constructor === Array) {
        var popped = resultWords[i].pop();
        total.push(popped);
        var arr = [];
        for (let j = 0; j < resultWords[i].length; j++) {
          if (j == resultWords[i].length - 1) {
            arr.push(
              ` ${
                resultWords[i][j] == 1 || resultWords[i][j] == messageWords[i].split("d")[1] / 1
                  ? `**${resultWords[i][j]}**`
                  : resultWords[i][j]
              }`
            );
          } else if (j == 0) {
            arr.push(
              `${
                resultWords[i][j] == 1 || resultWords[i][j] == messageWords[i].split("d")[1] / 1
                  ? `**${resultWords[i][j]}**`
                  : resultWords[i][j]
              }`
            );
          } else {
            arr.push(
              ` ${
                resultWords[i][j] == 1 || resultWords[i][j] == messageWords[i].split("d")[1] / 1
                  ? `**${resultWords[i][j]}**`
                  : resultWords[i][j]
              }`
            );
          }
        }
        result.push(`${messageWords[i]}(${arr})`);
      } else {
        result.push("error");
      }
    }

    console.log(total);
    console.log(result)
  }
}
