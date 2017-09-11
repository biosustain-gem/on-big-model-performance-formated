webpackJsonp([2],{"./app/components/H1/index.js":function(e,t,a){"use strict";function n(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var r=a("./node_modules/styled-components/dist/styled-components.es.js"),s=n(["\n  font-size: 2em;\n  margin-bottom: 0.25em;\n"],["\n  font-size: 2em;\n  margin-bottom: 0.25em;\n"]),o=r.a.h1(s);t.a=o},"./app/containers/FeaturePage/List.js":function(e,t,a){"use strict";function n(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var r=a("./node_modules/styled-components/dist/styled-components.es.js"),s=n(["\n  font-family: Georgia, Times, 'Times New Roman', serif;\n  padding-left: 1.75em;\n"],["\n  font-family: Georgia, Times, 'Times New Roman', serif;\n  padding-left: 1.75em;\n"]),o=r.a.ul(s);t.a=o},"./app/containers/FeaturePage/ListItem.js":function(e,t,a){"use strict";function n(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var r=a("./node_modules/styled-components/dist/styled-components.es.js"),s=n(["\n  margin: 1em 0;\n"],["\n  margin: 1em 0;\n"]),o=r.a.li(s);t.a=o},"./app/containers/FeaturePage/ListItemTitle.js":function(e,t,a){"use strict";function n(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var r=a("./node_modules/styled-components/dist/styled-components.es.js"),s=n(["\n  font-weight: bold;\n"],["\n  font-weight: bold;\n"]),o=r.a.p(s);t.a=o},"./app/containers/FeaturePage/index.js":function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=a("./node_modules/react/react.js"),i=a.n(o);Object.defineProperty(t,"__esModule",{value:!0});var l=a("./node_modules/react-helmet/lib/Helmet.js"),c=a.n(l),d=a("./node_modules/react-intl/lib/index.es.js"),u=a("./app/components/H1/index.js"),f=a("./app/containers/FeaturePage/messages.js"),p=a("./app/containers/FeaturePage/List.js"),g=a("./app/containers/FeaturePage/ListItem.js"),m=a("./app/containers/FeaturePage/ListItemTitle.js"),b=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,a,n,r){var s=t&&t.defaultProps,o=arguments.length-3;if(a||0===o||(a={}),a&&s)for(var i in s)void 0===a[i]&&(a[i]=s[i]);else a||(a=s||{});if(1===o)a.children=r;else if(o>1){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+3];a.children=l}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:a,_owner:null}}}(),h=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),v=function(e){function t(){return n(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),h(t,[{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return b("div",{},void 0,b(c.a,{title:"Feature Page",meta:[{name:"description",content:"Feature page of React.js Boilerplate application"}]}),b(u.a,{},void 0,i.a.createElement(d.c,f.a.header)),b(p.a,{},void 0,b(g.a,{},void 0,b(m.a,{},void 0,i.a.createElement(d.c,f.a.scaffoldingHeader)),b("p",{},void 0,i.a.createElement(d.c,f.a.scaffoldingMessage))),b(g.a,{},void 0,b(m.a,{},void 0,i.a.createElement(d.c,f.a.feedbackHeader)),b("p",{},void 0,i.a.createElement(d.c,f.a.feedbackMessage))),b(g.a,{},void 0,b(m.a,{},void 0,i.a.createElement(d.c,f.a.routingHeader)),b("p",{},void 0,i.a.createElement(d.c,f.a.routingMessage))),b(g.a,{},void 0,b(m.a,{},void 0,i.a.createElement(d.c,f.a.networkHeader)),b("p",{},void 0,i.a.createElement(d.c,f.a.networkMessage))),b(g.a,{},void 0,b(m.a,{},void 0,i.a.createElement(d.c,f.a.intlHeader)),b("p",{},void 0,i.a.createElement(d.c,f.a.intlMessage)))))}}]),t}(i.a.Component);t.default=v},"./app/containers/FeaturePage/messages.js":function(e,t,a){"use strict";var n=a("./node_modules/react-intl/lib/index.es.js");t.a=a.i(n.d)({header:{id:"boilerplate.containers.FeaturePage.header",defaultMessage:"Features"},scaffoldingHeader:{id:"boilerplate.containers.FeaturePage.scaffolding.header",defaultMessage:"Quick scaffolding"},scaffoldingMessage:{id:"boilerplate.containers.FeaturePage.scaffolding.message",defaultMessage:"Automate the creation of components, containers, routes, selectors\n  and sagas - and their tests - right from the CLI!"},feedbackHeader:{id:"boilerplate.containers.FeaturePage.feedback.header",defaultMessage:"Instant feedback"},feedbackMessage:{id:"boilerplate.containers.FeaturePage.feedback.message",defaultMessage:"\n      Enjoy the best DX and code your app at the speed of thought! Your\n    saved changes to the CSS and JS are reflected instantaneously\n    without refreshing the page. Preserve application state even when\n    you update something in the underlying code!\n    "},stateManagementHeader:{id:"boilerplate.containers.FeaturePage.state_management.header",defaultMessage:"Predictable state management"},stateManagementMessages:{id:"boilerplate.containers.FeaturePage.state_management.message",defaultMessage:"\n      Unidirectional data flow allows for change logging and time travel\n    debugging.\n    "},javascriptHeader:{id:"boilerplate.containers.FeaturePage.javascript.header",defaultMessage:"Next generation JavaScript"},javascriptMessage:{id:"boilerplate.containers.FeaturePage.javascript.message",defaultMessage:"Use template strings, object destructuring, arrow functions, JSX\n    syntax and more, today."},cssHeader:{id:"boilerplate.containers.FeaturePage.css.header",defaultMessage:"Features"},cssMessage:{id:"boilerplate.containers.FeaturePage.css.message",defaultMessage:"Next generation CSS"},routingHeader:{id:"boilerplate.containers.FeaturePage.routing.header",defaultMessage:"Industry-standard routing"},routingMessage:{id:"boilerplate.containers.FeaturePage.routing.message",defaultMessage:"\n      Write composable CSS that's co-located with your components for\n    complete modularity. Unique generated class names keep the\n    specificity low while eliminating style clashes. Ship only the\n    styles that are on the page for the best performance.\n    "},networkHeader:{id:"boilerplate.containers.FeaturePage.network.header",defaultMessage:"Offline-first"},networkMessage:{id:"boilerplate.containers.FeaturePage.network.message",defaultMessage:"\n      The next frontier in performant web apps: availability without a\n      network connection from the instant your users load the app.\n    "},intlHeader:{id:"boilerplate.containers.FeaturePage.internationalization.header",defaultMessage:"Complete i18n Standard Internationalization & Pluralization"},intlMessage:{id:"boilerplate.containers.FeaturePage.internationalization.message",defaultMessage:"Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`."}})}});