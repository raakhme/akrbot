import 'whatwg-fetch';
import { Fetcher } from 'openapi-typescript-fetch';

import { generatePaths } from './generate';
import { paths } from '../assets/generated';

export const fetcher = Fetcher.for<paths>();

export { generatePaths };
