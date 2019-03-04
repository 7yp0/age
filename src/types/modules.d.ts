declare module 'store' {
  export default localStorage;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
