export function wordCount(s: string) {
  return s
    .replace(/(^\s*)|(\s*$)/gi,"") // trim white-space
    .replace(/\n/gi,' ') // convert line feed chars to space
    .replace(/\r/gi,' ') // convert carriage return chars to space
    .replace(/[ ]{2,}/gi," ") // 2 or more space to 1
    .split(' ')
    .length;
}