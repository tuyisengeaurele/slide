// lets tests import a file's text with `?raw`
declare module '*?raw' {
  const text: string;
  export default text;
}
