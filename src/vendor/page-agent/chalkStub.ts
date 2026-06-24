type ChalkFn = ((value: unknown) => string) & Record<string, (value: unknown) => string>;

function passthrough(value: unknown) {
  return String(value);
}

const chalk = new Proxy(passthrough as ChalkFn, {
  get() {
    return passthrough;
  },
});

export default chalk;
