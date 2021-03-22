import { format, resolveConfig } from 'prettier';
import { Project, SourceFile } from 'ts-morph';
import { generateRuntype } from '../main';

async function fmt(source: string) {
  const config = await resolveConfig(__filename);
  return format(source, config);
}

describe('runtype generation', () => {
  let project: Project;
  let file: SourceFile;

  beforeEach(() => {
    project = new Project();
    file = project.createSourceFile('./test.ts');
  });

  it('smoke test', async () => {
    generateRuntype(file, {
      name: 'smokeTest',
      fields: [
        { name: 'someBoolean', type: 'Boolean' },
        { name: 'someNever', type: 'Never' },
        { name: 'someNumber', type: 'Number' },
        { name: 'someString', type: 'String' },
        { name: 'someUnknown', type: 'Unknown' },
        { name: 'someVoid', type: 'Void' },
      ],
    });
    const raw = file.getText();
    const formatted = await fmt(raw);
    expect(formatted).toMatchInlineSnapshot(`
      "export const smokeTest = rt.Record({
        someBoolean: rt.Boolean,
        someNever: rt.Never,
        someNumber: rt.Number,
        someString: rt.String,
        someUnknown: rt.Unknown,
        someVoid: rt.Void,
      });
      "
    `);
  });

  it.todo('Array');
  it.todo('Boolean');
  it.todo('Brand');
  it.todo('Constrant');
  it.todo('Dictionary');
  it.todo('Function');
  it.todo('Literal');
  it.todo('Never');
  it.todo('Number');
  it.todo('Record');
  it.todo('String');
  it.todo('Symbol');
  it.todo('Tuple');
  it.todo('Union');
  it.todo('Unknown');
  it.todo('Void');
});
