test('should save to localStorage', () => {
  const KEY = 'listItems',
  VALUE = [{id:1,title:'a',link:'a.com',point:0}];
  localStorage.setItem('listItems',JSON.stringify([{id:1,title:'a',link:'a.com',point:0}]));
  
  expect(localStorage.getItem(KEY)).toBe(JSON.stringify(VALUE));
  expect(JSON.parse(localStorage.getItem(KEY)).length).toBe(1);
});
