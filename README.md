Running this app will yield a screen with a button. Clicking the button will produce a network request.

Using POSTMAN, have postman "Capture API Requests through Postman". This is an icon that looks like a
satellite dish. Have it capture to history, and note the post (Mine defaulted to 5555)

ember s --proxy=http://localhost:5555

Clicking the button you will see the network request in the browser and the request captured in Postman

Change the package.json to ember-cli 3.4.0-beta.1
yarn

ember s --proxy=http://localhost:5555

clicking the button again you will see the same request in the browser network, however I do NOT see the
request captured in Postman. I believe the request is malformed and Postman can not reconcile it.

Every looks the same in the browser network tab. The root of the problem seems to be that the request
that express is proxying out is mal-formed in some way.


When not using postman but sending the request to my actual back-end (Java Spring) I get the following
call stack. It appears that in appache, as it is trying to decipher the request, it errors. The request
is never sent to my rest end-point. Also normally it takes miliseconds to determine if the user/password 
is valid or not. With the 3.4.0-beta.1 branch, the request takes like 20 seconds before it eventually fails.


java.net.SocketTimeoutException
	org.apache.tomcat.util.net.NioBlockingSelector.read(NioBlockingSelector.java:201)
	org.apache.tomcat.util.net.NioSelectorPool.read(NioSelectorPool.java:235)
	org.apache.tomcat.util.net.NioSelectorPool.read(NioSelectorPool.java:216)
	org.apache.tomcat.util.net.NioEndpoint$NioSocketWrapper.fillReadBuffer(NioEndpoint.java:1241)
	org.apache.tomcat.util.net.NioEndpoint$NioSocketWrapper.read(NioEndpoint.java:1190)
	org.apache.coyote.http11.Http11InputBuffer.fill(Http11InputBuffer.java:717)
	org.apache.coyote.http11.Http11InputBuffer.access$300(Http11InputBuffer.java:40)
	org.apache.coyote.http11.Http11InputBuffer$SocketInputBuffer.doRead(Http11InputBuffer.java:1072)
	org.apache.coyote.http11.filters.IdentityInputFilter.doRead(IdentityInputFilter.java:140)
	org.apache.coyote.http11.Http11InputBuffer.doRead(Http11InputBuffer.java:261)
	org.apache.coyote.Request.doRead(Request.java:581)
	org.apache.catalina.connector.InputBuffer.realReadBytes(InputBuffer.java:326)
	org.apache.catalina.connector.InputBuffer.checkByteBufferEof(InputBuffer.java:642)
	org.apache.catalina.connector.InputBuffer.read(InputBuffer.java:349)
	org.apache.catalina.connector.CoyoteInputStream.read(CoyoteInputStream.java:183)
	java.io.BufferedInputStream.fill(BufferedInputStream.java:246)
	java.io.BufferedInputStream.read(BufferedInputStream.java:265)
	com.sun.jersey.spi.container.servlet.WebComponent.isEntityPresent(WebComponent.java:869)
	com.sun.jersey.spi.container.servlet.WebComponent.filterFormParameters(WebComponent.java:832)
	com.sun.jersey.spi.container.servlet.WebComponent.service(WebComponent.java:407)
	com.sun.jersey.spi.container.servlet.ServletContainer.service(ServletContainer.java:537)
	com.sun.jersey.spi.container.servlet.ServletContainer.service(ServletContainer.java:699)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:742)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)


 








# my-app

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd my-app`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
