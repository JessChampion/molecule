export const LOAD_DATA = 'LOAD_DATA';
export function loadData(data) {
  return {
    data,
    type: LOAD_DATA
  };
}
