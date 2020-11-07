import createElement from "./vdom/createElement";
import mount from "./vdom/mount";
import render from "./vdom/render";

const createVApp = count => createElement("div", {
  attr: {
    id: "app",
    dataCount: count
  },
  children: [
    createElement('input'),
    'The current count is: ',  // represents TextNode
    String(count),
    createElement("div", {
      children: [
        createElement(
          "img", {
          attrs: {
            src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
          },
        })]   // represents ElementNode
    })
  ],
}); // represents ElementNode


let count = 0;
const vApp = createVApp(count);
const $app = render(vApp);

let $rootEl = mount($app, document.getElementById('app'));

// setInterval(() => {
//   count++;
//   $rootEl = mount(render(createVApp(count)), $rootEl);
// }, 1000);
// console.log($app);
