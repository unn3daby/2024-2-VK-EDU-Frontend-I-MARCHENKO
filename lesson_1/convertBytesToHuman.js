/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export function convertBytesToHuman(bytes) {
  console.log(bytes, Number.isFinite(bytes))
  if (!Number.isFinite(bytes) || bytes < 0) {
    return false;
  }

  if (bytes === 0){
    return '0 B';
  } 

  const humanSizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const sizeIndex = Math.min(humanSizes.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = (bytes / 1024 ** sizeIndex);

  const formattedValue = Number.isInteger(value) ? value.toString() : 1 * value.toFixed(2);

  return `${formattedValue} ${humanSizes[sizeIndex]}`;
}
