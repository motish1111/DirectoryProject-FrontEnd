import { AgePipe } from './age.pipe';

describe('AgePipe', () => {
  it('create an instance', () => {
    const pipe = new AgePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms `11-11-1997` to  22 years', () => {
    const pipe = new AgePipe();
    expect(pipe.transform('11-11-1997')).toEqual(22);
  });
});
