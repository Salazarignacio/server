process.on("message", (message) => {
    let result = 0;
    for (let i = 0; i < 5e9; i++) {
      result += 1;
    }
    process.send(result);
  });
  