import * as path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const inputs = fileLoader(path.join(__dirname, 'graphql/inputs'));
const schema = fileLoader(path.join(__dirname, 'graphql/schema'));
const types = fileLoader(path.join(__dirname, 'graphql/types'));

export default mergeTypes([...inputs, ...types, ...schema], { all: true });
