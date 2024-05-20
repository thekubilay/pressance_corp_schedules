function NEXT<T>(arr: T[]): T | null {
  if (arr.length === 0) {
    return null;
  }
  return arr[0];
}


export default NEXT;