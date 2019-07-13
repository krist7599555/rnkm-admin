import freshy from './freshy.database';
import * as _ from 'lodash';
import * as fp from 'lodash/fp';

export async function search({ field, page, perPage }) {
  console.log('call');
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!page) page = 1;
  if (!perPage) perPage = 15;
  if (!field) field = {};

  const freshyFilter = freshy.filter(o => {
    for (const [k, v] of _.toPairs(field)) {
      if (typeof v == 'string' && !o[k].includes(v)) return false;
      if (typeof v != 'string' && o[k] != v) return false;
    }
    return true;
  });

  const data = fp.flow(
    fp.chunk(perPage),
    fp.path(page - 1)
  )(freshyFilter);

  const res = {
    total: freshyFilter.length,
    page: page,
    data,
    perPage: perPage,
    maxPage: Math.ceil(freshyFilter.length / perPage)
  };
  console.info(res);
  return res;
}
