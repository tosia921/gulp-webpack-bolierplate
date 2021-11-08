export const func = () => {
    console.log("imported");
}

const doSomethingAsync = () => {
    console.log("async!");
}

export const asyncFunc = async () => {
    await doSomethingAsync();
  }

