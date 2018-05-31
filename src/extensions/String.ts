/* tslint:disable:no-parameter-reassignment */
/* tslint:disable:no-bitwise */
interface String {
  firstAndLastCharacters(amount: number): string
  trimLeftByPattern(pattern: string): string
}

String.prototype.firstAndLastCharacters = function(amount: number) {
  return this.slice(0, amount) + '...' + this.slice(-amount)
}

if (!String.prototype.padEnd)
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0 // floor if number or convert non-number to 0;
    padString = String(padString || ' ')
    if (this.length > targetLength) return String(this)

    targetLength = targetLength - this.length
    // append to original to ensure we are longer than needed
    if (targetLength > padString.length) padString += padString.repeat(targetLength / padString.length)

    return String(this) + padString.slice(0, targetLength)
  }

String.prototype.trimLeftByPattern = function(pattern: string) {
  return this.replace(new RegExp(`^(${pattern})*`, 'i'), '')
}
