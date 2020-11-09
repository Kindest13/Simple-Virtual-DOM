import createElement from "./vdom/createElement";
import mount from "./vdom/mount";
import render from "./vdom/render";
import diff from './vdom/diff';

const createVApp = count => createElement("div", {
  attr: {
    id: "app",
    dataCount: count
  },
  children: [
    createElement('input'),
    'The current count is: ',  // represents TextNode
    String(count),
    ...Array.from({ length: count }, () => createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
      },
    })),
  ],
}); // represents ElementNode


let vApp = createVApp(0);
const $app = render(vApp);

let $rootEl = mount($app, document.getElementById('app'));

setInterval(() => {
  const n = Math.floor(Math.random() * 10);
  const vNewApp = createVApp(n);
  const patch = diff(vApp, vNewApp);

  // ми можемо замінити увесь $rootEl,
  // тому ми хочемо, щоб patch повертав нове значення $rootEl
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1000);