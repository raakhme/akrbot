import 'whatwg-fetch';
import { Fetcher } from 'openapi-typescript-fetch';

import { paths } from './swagger-paths';

const fetcher = Fetcher.for<paths>();

export default fetcher;
