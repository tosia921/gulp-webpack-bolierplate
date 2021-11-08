export const func = () => {
  console.log('imported');
};

const doSomethingAsync = () => {
  console.log('asyncus!');
};

export const asyncFunc = async () => {
  await doSomethingAsync();
};
