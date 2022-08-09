import { faker } from '@faker-js/faker';
import { Generator, Configuration } from '@mangm/ts-mock-generator';

const generator = new Generator('./tsconfig.json');

function generateMock<T extends AnyProps>(
  typeName: string,
  maxRecursiveLoop?: number,
  customFields?: Partial<T>,
): Partial<T> {
  const config: Configuration = {
    includeAllProps: true,
    maxRecursiveLoop: maxRecursiveLoop || 10,
    primitiveValues: {
      'string[]': faker.lorem.words(Math.floor(Math.random() * 10)),
      string: faker.lorem.word(Math.floor(Math.random() * 10)),
      'number[]': new Array(10)
        .fill(0)
        .map(() => Number(faker.random.numeric(10))),
      number: Number(faker.random.numeric(10)),
      'boolean[]': new Array(10).fill(false).map(() => Math.random() > 0.5),
      boolean: Math.random() > 0.5,
    },
    fieldValues: customFields || ({} as Partial<T>),
  };
  const mockData = generator.generate<T>(typeName, config);
  return mockData;
}

function generatorAdd<T extends AnyProps>(
  typeName: string,
  propName: string,
  propValue: any,
): void {
  generator.add<T>(typeName, propName, propValue);
}

export { generator, generateMock, generatorAdd };
