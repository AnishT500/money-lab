export const routePaths = {
  home:'/', lessons:'/learn', lesson:'/learn/paycheck', quiz:'/quiz/paycheck',
  results:'/quiz/results', practice:'/practice', lab:'/practice/budget',
  scenarios:'/practice/scenario', outcome:'/practice/outcome',
  internship:'/internship', community:'/community', ask:'/community/ask',
  notebook:'/notebook', saving:'/learn/saving', credit:'/learn/credit'
};
export function pathFor(value){
  const [name,id]=value.split('?');
  if(name==='thread')return '/community/discussion/'+encodeURIComponent(decodeURIComponent(id||'sample-1'));
  return routePaths[name]||'/';
}
export function routeFor(pathname){
  const path=pathname.replace(/\/$/,'')||'/';
  if(/^\/community\/discussion\/[^/]+$/.test(path))return 'thread';
  return Object.keys(routePaths).find(key=>routePaths[key]===path)||'home';
}
export function validPath(pathname){
  return Object.values(routePaths).includes(pathname)||/^\/community\/discussion\/([a-zA-Z0-9_-]{1,128})$/.test(pathname);
}
