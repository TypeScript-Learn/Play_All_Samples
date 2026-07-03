import {
    BindingSource,
    ElementHandleForTag, EvaluationArgument,
    PageFunction,
    PageFunctionOn,
    SmartHandle
} from "playwright-core/types/structs";
import {
    Accessibility, APIRequestContext,
    BrowserContext, Clock,
    ConsoleMessage, Coverage,
    Dialog,
    Download,
    ElementHandle,
    FileChooser,
    Frame, FrameLocator,
    JSHandle, Keyboard, Locator, Mouse, PageScreenshotOptions,
    Request,
    Response, Route, Touchscreen, Video, WebSocket, Worker
} from "playwright-core";

export interface Page {
    /**
     * Returns the value of the `pageFunction` invocation.
     *
     * If the function passed to the
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) returns a [Promise],
     * then [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) would wait for
     * the promise to resolve and return its value.
     *
     * If the function passed to the
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) returns a
     * non-[Serializable] value, then
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) resolves to
     * `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`:
     * `-0`, `NaN`, `Infinity`, `-Infinity`.
     *
     * **Usage**
     *
     * Passing argument to `pageFunction`:
     *
     * ```js
     * const result = await page.evaluate(([x, y]) => {
     *   return Promise.resolve(x * y);
     * }, [7, 8]);
     * console.log(result); // prints "56"
     * ```
     *
     * A string can also be passed in instead of a function:
     *
     * ```js
     * console.log(await page.evaluate('1 + 2')); // prints "3"
     * const x = 10;
     * console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
     * ```
     *
     * {@link ElementHandle} instances can be passed as an argument to the
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate):
     *
     * ```js
     * const bodyHandle = await page.evaluate('document.body');
     * const html = await page.evaluate<string, HTMLElement>(([body, suffix]) =>
     *   body.innerHTML + suffix, [bodyHandle, 'hello']
     * );
     * await bodyHandle.dispose();
     * ```
     *
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    evaluate<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<R>;
    /**
     * Returns the value of the `pageFunction` invocation.
     *
     * If the function passed to the
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) returns a [Promise],
     * then [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) would wait for
     * the promise to resolve and return its value.
     *
     * If the function passed to the
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) returns a
     * non-[Serializable] value, then
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) resolves to
     * `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`:
     * `-0`, `NaN`, `Infinity`, `-Infinity`.
     *
     * **Usage**
     *
     * Passing argument to `pageFunction`:
     *
     * ```js
     * const result = await page.evaluate(([x, y]) => {
     *   return Promise.resolve(x * y);
     * }, [7, 8]);
     * console.log(result); // prints "56"
     * ```
     *
     * A string can also be passed in instead of a function:
     *
     * ```js
     * console.log(await page.evaluate('1 + 2')); // prints "3"
     * const x = 10;
     * console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
     * ```
     *
     * {@link ElementHandle} instances can be passed as an argument to the
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate):
     *
     * ```js
     * const bodyHandle = await page.evaluate('document.body');
     * const html = await page.evaluate<string, HTMLElement>(([body, suffix]) =>
     *   body.innerHTML + suffix, [bodyHandle, 'hello']
     * );
     * await bodyHandle.dispose();
     * ```
     *
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    evaluate<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<R>;

    /**
     * Returns the value of the `pageFunction` invocation as a {@link JSHandle}.
     *
     * The only difference between
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) and
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) is that
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) returns
     * {@link JSHandle}.
     *
     * If the function passed to the
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) returns
     * a [Promise], then
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) would
     * wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * // Handle for the window object.
     * const aWindowHandle = await page.evaluateHandle(() => Promise.resolve(window));
     * ```
     *
     * A string can also be passed in instead of a function:
     *
     * ```js
     * const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
     * ```
     *
     * {@link JSHandle} instances can be passed as an argument to the
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle):
     *
     * ```js
     * const aHandle = await page.evaluateHandle(() => document.body);
     * const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
     * console.log(await resultHandle.jsonValue());
     * await resultHandle.dispose();
     * ```
     *
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    evaluateHandle<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<SmartHandle<R>>;
    /**
     * Returns the value of the `pageFunction` invocation as a {@link JSHandle}.
     *
     * The only difference between
     * [page.evaluate(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate) and
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) is that
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) returns
     * {@link JSHandle}.
     *
     * If the function passed to the
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) returns
     * a [Promise], then
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle) would
     * wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * // Handle for the window object.
     * const aWindowHandle = await page.evaluateHandle(() => Promise.resolve(window));
     * ```
     *
     * A string can also be passed in instead of a function:
     *
     * ```js
     * const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
     * ```
     *
     * {@link JSHandle} instances can be passed as an argument to the
     * [page.evaluateHandle(pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-evaluate-handle):
     *
     * ```js
     * const aHandle = await page.evaluateHandle(() => document.body);
     * const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
     * console.log(await resultHandle.jsonValue());
     * await resultHandle.dispose();
     * ```
     *
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    evaluateHandle<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<SmartHandle<R>>;

    /**
     * Adds a script which would be evaluated in one of the following scenarios:
     * - Whenever the page is navigated.
     * - Whenever the child frame is attached or navigated. In this case, the script is evaluated in the context of the
     *   newly attached frame.
     *
     * The script is evaluated after the document was created but before any of its scripts were run. This is useful to
     * amend the JavaScript environment, e.g. to seed `Math.random`.
     *
     * **Usage**
     *
     * An example of overriding `Math.random` before the page loads:
     *
     * ```js
     * // preload.js
     * Math.random = () => 42;
     * ```
     *
     * ```js
     * // In your playwright script, assuming the preload.js file is in same directory
     * await page.addInitScript({ path: './preload.js' });
     * ```
     *
     * ```js
     * await page.addInitScript(mock => {
     *   window.mock = mock;
     * }, mock);
     * ```
     *
     * **NOTE** The order of evaluation of multiple scripts installed via
     * [browserContext.addInitScript(script[, arg])](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script)
     * and [page.addInitScript(script[, arg])](https://playwright.dev/docs/api/class-page#page-add-init-script) is not
     * defined.
     * @param script Script to be evaluated in the page.
     * @param arg Optional argument to pass to `script` (only supported when passing a function).
     */
    addInitScript<Arg>(script: PageFunction<Arg, any> | { path?: string, content?: string }, arg?: Arg): Promise<void>;

    /**
     * **NOTE** Use locator-based [page.locator(selector[, options])](https://playwright.dev/docs/api/class-page#page-locator)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * The method finds an element matching the specified selector within the page. If no elements match the selector, the
     * return value resolves to `null`. To wait for an element on the page, use
     * [locator.waitFor([options])](https://playwright.dev/docs/api/class-locator#locator-wait-for).
     * @param selector A selector to query for.
     * @param options
     */
    $<K extends keyof HTMLElementTagNameMap>(selector: K, options?: { strict: boolean }): Promise<ElementHandleForTag<K> | null>;
    /**
     * **NOTE** Use locator-based [page.locator(selector[, options])](https://playwright.dev/docs/api/class-page#page-locator)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * The method finds an element matching the specified selector within the page. If no elements match the selector, the
     * return value resolves to `null`. To wait for an element on the page, use
     * [locator.waitFor([options])](https://playwright.dev/docs/api/class-locator#locator-wait-for).
     * @param selector A selector to query for.
     * @param options
     */
    $(selector: string, options?: { strict: boolean }): Promise<ElementHandle<SVGElement | HTMLElement> | null>;

    /**
     * **NOTE** Use locator-based [page.locator(selector[, options])](https://playwright.dev/docs/api/class-page#page-locator)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * The method finds all elements matching the specified selector within the page. If no elements match the selector,
     * the return value resolves to `[]`.
     * @param selector A selector to query for.
     */
    $$<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K>[]>;
    /**
     * **NOTE** Use locator-based [page.locator(selector[, options])](https://playwright.dev/docs/api/class-page#page-locator)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * The method finds all elements matching the specified selector within the page. If no elements match the selector,
     * the return value resolves to `[]`.
     * @param selector A selector to query for.
     */
    $$(selector: string): Promise<ElementHandle<SVGElement | HTMLElement>[]>;

    /**
     * **NOTE** This method does not wait for the element to pass actionability checks and therefore can lead to the flaky tests.
     * Use
     * [locator.evaluate(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-locator#locator-evaluate),
     * other {@link Locator} helper methods or web-first assertions instead.
     *
     * The method finds an element matching the specified selector within the page and passes it as a first argument to
     * `pageFunction`. If no elements match the selector, the method throws an error. Returns the value of `pageFunction`.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$eval(selector, pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-eval-on-selector)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const searchValue = await page.$eval('#search', el => el.value);
     * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
     * const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
     * // In TypeScript, this example requires an explicit type annotation (HTMLLinkElement) on el:
     * const preloadHrefTS = await page.$eval('link[rel=preload]', (el: HTMLLinkElement) => el.href);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     * @param options
     */
    $eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], Arg, R>, arg: Arg): Promise<R>;
    /**
     * **NOTE** This method does not wait for the element to pass actionability checks and therefore can lead to the flaky tests.
     * Use
     * [locator.evaluate(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-locator#locator-evaluate),
     * other {@link Locator} helper methods or web-first assertions instead.
     *
     * The method finds an element matching the specified selector within the page and passes it as a first argument to
     * `pageFunction`. If no elements match the selector, the method throws an error. Returns the value of `pageFunction`.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$eval(selector, pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-eval-on-selector)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const searchValue = await page.$eval('#search', el => el.value);
     * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
     * const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
     * // In TypeScript, this example requires an explicit type annotation (HTMLLinkElement) on el:
     * const preloadHrefTS = await page.$eval('link[rel=preload]', (el: HTMLLinkElement) => el.href);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     * @param options
     */
    $eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, Arg, R>, arg: Arg): Promise<R>;
    /**
     * **NOTE** This method does not wait for the element to pass actionability checks and therefore can lead to the flaky tests.
     * Use
     * [locator.evaluate(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-locator#locator-evaluate),
     * other {@link Locator} helper methods or web-first assertions instead.
     *
     * The method finds an element matching the specified selector within the page and passes it as a first argument to
     * `pageFunction`. If no elements match the selector, the method throws an error. Returns the value of `pageFunction`.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$eval(selector, pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-eval-on-selector)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const searchValue = await page.$eval('#search', el => el.value);
     * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
     * const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
     * // In TypeScript, this example requires an explicit type annotation (HTMLLinkElement) on el:
     * const preloadHrefTS = await page.$eval('link[rel=preload]', (el: HTMLLinkElement) => el.href);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     * @param options
     */
    $eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], void, R>, arg?: any): Promise<R>;
    /**
     * **NOTE** This method does not wait for the element to pass actionability checks and therefore can lead to the flaky tests.
     * Use
     * [locator.evaluate(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-locator#locator-evaluate),
     * other {@link Locator} helper methods or web-first assertions instead.
     *
     * The method finds an element matching the specified selector within the page and passes it as a first argument to
     * `pageFunction`. If no elements match the selector, the method throws an error. Returns the value of `pageFunction`.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$eval(selector, pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-eval-on-selector)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const searchValue = await page.$eval('#search', el => el.value);
     * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
     * const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
     * // In TypeScript, this example requires an explicit type annotation (HTMLLinkElement) on el:
     * const preloadHrefTS = await page.$eval('link[rel=preload]', (el: HTMLLinkElement) => el.href);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     * @param options
     */
    $eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, void, R>, arg?: any): Promise<R>;

    /**
     * **NOTE** In most cases,
     * [locator.evaluateAll(pageFunction[, arg])](https://playwright.dev/docs/api/class-locator#locator-evaluate-all),
     * other {@link Locator} helper methods and web-first assertions do a better job.
     *
     * The method finds all elements matching the specified selector within the page and passes an array of matched
     * elements as a first argument to `pageFunction`. Returns the result of `pageFunction` invocation.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$$eval(selector, pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const divCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    $$eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], Arg, R>, arg: Arg): Promise<R>;
    /**
     * **NOTE** In most cases,
     * [locator.evaluateAll(pageFunction[, arg])](https://playwright.dev/docs/api/class-locator#locator-evaluate-all),
     * other {@link Locator} helper methods and web-first assertions do a better job.
     *
     * The method finds all elements matching the specified selector within the page and passes an array of matched
     * elements as a first argument to `pageFunction`. Returns the result of `pageFunction` invocation.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$$eval(selector, pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const divCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    $$eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], Arg, R>, arg: Arg): Promise<R>;
    /**
     * **NOTE** In most cases,
     * [locator.evaluateAll(pageFunction[, arg])](https://playwright.dev/docs/api/class-locator#locator-evaluate-all),
     * other {@link Locator} helper methods and web-first assertions do a better job.
     *
     * The method finds all elements matching the specified selector within the page and passes an array of matched
     * elements as a first argument to `pageFunction`. Returns the result of `pageFunction` invocation.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$$eval(selector, pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const divCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    $$eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], void, R>, arg?: any): Promise<R>;
    /**
     * **NOTE** In most cases,
     * [locator.evaluateAll(pageFunction[, arg])](https://playwright.dev/docs/api/class-locator#locator-evaluate-all),
     * other {@link Locator} helper methods and web-first assertions do a better job.
     *
     * The method finds all elements matching the specified selector within the page and passes an array of matched
     * elements as a first argument to `pageFunction`. Returns the result of `pageFunction` invocation.
     *
     * If `pageFunction` returns a [Promise], then
     * [page.$$eval(selector, pageFunction[, arg])](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all)
     * would wait for the promise to resolve and return its value.
     *
     * **Usage**
     *
     * ```js
     * const divCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
     * ```
     *
     * @param selector A selector to query for.
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     */
    $$eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], void, R>, arg?: any): Promise<R>;

    /**
     * Returns when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.
     *
     * **Usage**
     *
     * The
     * [page.waitForFunction(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-wait-for-function)
     * can be used to observe viewport size change:
     *
     * ```js
     * const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
     *
     * (async () => {
     *   const browser = await webkit.launch();
     *   const page = await browser.newPage();
     *   const watchDog = page.waitForFunction(() => window.innerWidth < 100);
     *   await page.setViewportSize({ width: 50, height: 50 });
     *   await watchDog;
     *   await browser.close();
     * })();
     * ```
     *
     * To pass an argument to the predicate of
     * [page.waitForFunction(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-wait-for-function)
     * function:
     *
     * ```js
     * const selector = '.foo';
     * await page.waitForFunction(selector => !!document.querySelector(selector), selector);
     * ```
     *
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     * @param options
     */
    waitForFunction<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg, options?: PageWaitForFunctionOptions): Promise<SmartHandle<R>>;
    /**
     * Returns when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.
     *
     * **Usage**
     *
     * The
     * [page.waitForFunction(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-wait-for-function)
     * can be used to observe viewport size change:
     *
     * ```js
     * const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
     *
     * (async () => {
     *   const browser = await webkit.launch();
     *   const page = await browser.newPage();
     *   const watchDog = page.waitForFunction(() => window.innerWidth < 100);
     *   await page.setViewportSize({ width: 50, height: 50 });
     *   await watchDog;
     *   await browser.close();
     * })();
     * ```
     *
     * To pass an argument to the predicate of
     * [page.waitForFunction(pageFunction[, arg, options])](https://playwright.dev/docs/api/class-page#page-wait-for-function)
     * function:
     *
     * ```js
     * const selector = '.foo';
     * await page.waitForFunction(selector => !!document.querySelector(selector), selector);
     * ```
     *
     * @param pageFunction Function to be evaluated in the page context.
     * @param arg Optional argument to pass to `pageFunction`.
     * @param options
     */
    waitForFunction<R>(pageFunction: PageFunction<void, R>, arg?: any, options?: PageWaitForFunctionOptions): Promise<SmartHandle<R>>;

    /**
     * **NOTE** Use web assertions that assert visibility or a locator-based
     * [locator.waitFor([options])](https://playwright.dev/docs/api/class-locator#locator-wait-for) instead. Read more
     * about [locators](https://playwright.dev/docs/locators).
     *
     * Returns when element specified by selector satisfies `state` option. Returns `null` if waiting for `hidden` or
     * `detached`.
     *
     * **NOTE** Playwright automatically waits for element to be ready before performing an action. Using {@link Locator}
     * objects and web-first assertions makes the code wait-for-selector-free.
     *
     * Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If
     * at the moment of calling the method `selector` already satisfies the condition, the method will return immediately.
     * If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.
     *
     * **Usage**
     *
     * This method works across navigations:
     *
     * ```js
     * const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.
     *
     * (async () => {
     *   const browser = await chromium.launch();
     *   const page = await browser.newPage();
     *   for (const currentURL of ['https://google.com', 'https://bbc.com']) {
     *     await page.goto(currentURL);
     *     const element = await page.waitForSelector('img');
     *     console.log('Loaded image: ' + await element.getAttribute('src'));
     *   }
     *   await browser.close();
     * })();
     * ```
     *
     * @param selector A selector to query for.
     * @param options
     */
    waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options?: PageWaitForSelectorOptionsNotHidden): Promise<ElementHandleForTag<K>>;
    /**
     * **NOTE** Use web assertions that assert visibility or a locator-based
     * [locator.waitFor([options])](https://playwright.dev/docs/api/class-locator#locator-wait-for) instead. Read more
     * about [locators](https://playwright.dev/docs/locators).
     *
     * Returns when element specified by selector satisfies `state` option. Returns `null` if waiting for `hidden` or
     * `detached`.
     *
     * **NOTE** Playwright automatically waits for element to be ready before performing an action. Using {@link Locator}
     * objects and web-first assertions makes the code wait-for-selector-free.
     *
     * Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If
     * at the moment of calling the method `selector` already satisfies the condition, the method will return immediately.
     * If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.
     *
     * **Usage**
     *
     * This method works across navigations:
     *
     * ```js
     * const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.
     *
     * (async () => {
     *   const browser = await chromium.launch();
     *   const page = await browser.newPage();
     *   for (const currentURL of ['https://google.com', 'https://bbc.com']) {
     *     await page.goto(currentURL);
     *     const element = await page.waitForSelector('img');
     *     console.log('Loaded image: ' + await element.getAttribute('src'));
     *   }
     *   await browser.close();
     * })();
     * ```
     *
     * @param selector A selector to query for.
     * @param options
     */
    waitForSelector(selector: string, options?: PageWaitForSelectorOptionsNotHidden): Promise<ElementHandle<SVGElement | HTMLElement>>;
    /**
     * **NOTE** Use web assertions that assert visibility or a locator-based
     * [locator.waitFor([options])](https://playwright.dev/docs/api/class-locator#locator-wait-for) instead. Read more
     * about [locators](https://playwright.dev/docs/locators).
     *
     * Returns when element specified by selector satisfies `state` option. Returns `null` if waiting for `hidden` or
     * `detached`.
     *
     * **NOTE** Playwright automatically waits for element to be ready before performing an action. Using {@link Locator}
     * objects and web-first assertions makes the code wait-for-selector-free.
     *
     * Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If
     * at the moment of calling the method `selector` already satisfies the condition, the method will return immediately.
     * If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.
     *
     * **Usage**
     *
     * This method works across navigations:
     *
     * ```js
     * const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.
     *
     * (async () => {
     *   const browser = await chromium.launch();
     *   const page = await browser.newPage();
     *   for (const currentURL of ['https://google.com', 'https://bbc.com']) {
     *     await page.goto(currentURL);
     *     const element = await page.waitForSelector('img');
     *     console.log('Loaded image: ' + await element.getAttribute('src'));
     *   }
     *   await browser.close();
     * })();
     * ```
     *
     * @param selector A selector to query for.
     * @param options
     */
    waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options: PageWaitForSelectorOptions): Promise<ElementHandleForTag<K> | null>;
    /**
     * **NOTE** Use web assertions that assert visibility or a locator-based
     * [locator.waitFor([options])](https://playwright.dev/docs/api/class-locator#locator-wait-for) instead. Read more
     * about [locators](https://playwright.dev/docs/locators).
     *
     * Returns when element specified by selector satisfies `state` option. Returns `null` if waiting for `hidden` or
     * `detached`.
     *
     * **NOTE** Playwright automatically waits for element to be ready before performing an action. Using {@link Locator}
     * objects and web-first assertions makes the code wait-for-selector-free.
     *
     * Wait for the `selector` to satisfy `state` option (either appear/disappear from dom, or become visible/hidden). If
     * at the moment of calling the method `selector` already satisfies the condition, the method will return immediately.
     * If the selector doesn't satisfy the condition for the `timeout` milliseconds, the function will throw.
     *
     * **Usage**
     *
     * This method works across navigations:
     *
     * ```js
     * const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.
     *
     * (async () => {
     *   const browser = await chromium.launch();
     *   const page = await browser.newPage();
     *   for (const currentURL of ['https://google.com', 'https://bbc.com']) {
     *     await page.goto(currentURL);
     *     const element = await page.waitForSelector('img');
     *     console.log('Loaded image: ' + await element.getAttribute('src'));
     *   }
     *   await browser.close();
     * })();
     * ```
     *
     * @param selector A selector to query for.
     * @param options
     */
    waitForSelector(selector: string, options: PageWaitForSelectorOptions): Promise<null|ElementHandle<SVGElement | HTMLElement>>;

    /**
     * The method adds a function called `name` on the `window` object of every frame in this page. When called, the
     * function executes `callback` and returns a [Promise] which resolves to the return value of `callback`. If the
     * `callback` returns a [Promise], it will be awaited.
     *
     * The first argument of the `callback` function contains information about the caller: `{ browserContext:
     * BrowserContext, page: Page, frame: Frame }`.
     *
     * See
     * [browserContext.exposeBinding(name, callback[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding)
     * for the context-wide version.
     *
     * **NOTE** Functions installed via
     * [page.exposeBinding(name, callback[, options])](https://playwright.dev/docs/api/class-page#page-expose-binding)
     * survive navigations.
     *
     * **Usage**
     *
     * An example of exposing page URL to all frames in a page:
     *
     * ```js
     * const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
     *
     * (async () => {
     *   const browser = await webkit.launch({ headless: false });
     *   const context = await browser.newContext();
     *   const page = await context.newPage();
     *   await page.exposeBinding('pageURL', ({ page }) => page.url());
     *   await page.setContent(`
     *     <script>
     *       async function onClick() {
     *         document.querySelector('div').textContent = await window.pageURL();
     *       }
     *     </script>
     *     <button onclick="onClick()">Click me</button>
     *     <div></div>
     *   `);
     *   await page.click('button');
     * })();
     * ```
     *
     * @param name Name of the function on the window object.
     * @param callback Callback function that will be called in the Playwright's context.
     * @param options
     */
    exposeBinding(name: string, playwrightBinding: (source: BindingSource, arg: JSHandle) => any, options: { handle: true }): Promise<void>;
    /**
     * The method adds a function called `name` on the `window` object of every frame in this page. When called, the
     * function executes `callback` and returns a [Promise] which resolves to the return value of `callback`. If the
     * `callback` returns a [Promise], it will be awaited.
     *
     * The first argument of the `callback` function contains information about the caller: `{ browserContext:
     * BrowserContext, page: Page, frame: Frame }`.
     *
     * See
     * [browserContext.exposeBinding(name, callback[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding)
     * for the context-wide version.
     *
     * **NOTE** Functions installed via
     * [page.exposeBinding(name, callback[, options])](https://playwright.dev/docs/api/class-page#page-expose-binding)
     * survive navigations.
     *
     * **Usage**
     *
     * An example of exposing page URL to all frames in a page:
     *
     * ```js
     * const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
     *
     * (async () => {
     *   const browser = await webkit.launch({ headless: false });
     *   const context = await browser.newContext();
     *   const page = await context.newPage();
     *   await page.exposeBinding('pageURL', ({ page }) => page.url());
     *   await page.setContent(`
     *     <script>
     *       async function onClick() {
     *         document.querySelector('div').textContent = await window.pageURL();
     *       }
     *     </script>
     *     <button onclick="onClick()">Click me</button>
     *     <div></div>
     *   `);
     *   await page.click('button');
     * })();
     * ```
     *
     * @param name Name of the function on the window object.
     * @param callback Callback function that will be called in the Playwright's context.
     * @param options
     */
    exposeBinding(name: string, playwrightBinding: (source: BindingSource, ...args: any[]) => any, options?: { handle?: boolean }): Promise<void>;
    /**
     * Emitted when the page closes.
     */
    on(event: 'close', listener: (page: Page) => any): this;

    /**
     * Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.
     *
     * The arguments passed into `console.log` are available on the {@link ConsoleMessage} event handler argument.
     *
     * **Usage**
     *
     * ```js
     * page.on('console', async msg => {
     *   const values = [];
     *   for (const arg of msg.args())
     *     values.push(await arg.jsonValue());
     *   console.log(...values);
     * });
     * await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
     * ```
     *
     */
    on(event: 'console', listener: (consoleMessage: ConsoleMessage) => any): this;

    /**
     * Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page
     * crashes, ongoing and subsequent operations will throw.
     *
     * The most common way to deal with crashes is to catch an exception:
     *
     * ```js
     * try {
     *   // Crash might happen during a click.
     *   await page.click('button');
     *   // Or while waiting for an event.
     *   await page.waitForEvent('popup');
     * } catch (e) {
     *   // When the page crashes, exception message contains 'crash'.
     * }
     * ```
     *
     */
    on(event: 'crash', listener: (page: Page) => any): this;

    /**
     * Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must**
     * either [dialog.accept([promptText])](https://playwright.dev/docs/api/class-dialog#dialog-accept) or
     * [dialog.dismiss()](https://playwright.dev/docs/api/class-dialog#dialog-dismiss) the dialog - otherwise the page
     * will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the
     * dialog, and actions like click will never finish.
     *
     * **Usage**
     *
     * ```js
     * page.on('dialog', dialog => dialog.accept());
     * ```
     *
     * **NOTE** When no [page.on('dialog')](https://playwright.dev/docs/api/class-page#page-event-dialog) or
     * [browserContext.on('dialog')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-dialog)
     * listeners are present, all dialogs are automatically dismissed.
     */
    on(event: 'dialog', listener: (dialog: Dialog) => any): this;

    /**
     * Emitted when the JavaScript
     * [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.
     */
    on(event: 'domcontentloaded', listener: (page: Page) => any): this;

    /**
     * Emitted when attachment download started. User can access basic file operations on downloaded content via the
     * passed {@link Download} instance.
     */
    on(event: 'download', listener: (download: Download) => any): this;

    /**
     * Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can
     * respond to it via setting the input files using
     * [fileChooser.setFiles(files[, options])](https://playwright.dev/docs/api/class-filechooser#file-chooser-set-files)
     * that can be uploaded after that.
     *
     * ```js
     * page.on('filechooser', async fileChooser => {
     *   await fileChooser.setFiles(path.join(__dirname, '/tmp/myfile.pdf'));
     * });
     * ```
     *
     */
    on(event: 'filechooser', listener: (fileChooser: FileChooser) => any): this;

    /**
     * Emitted when a frame is attached.
     */
    on(event: 'frameattached', listener: (frame: Frame) => any): this;

    /**
     * Emitted when a frame is detached.
     */
    on(event: 'framedetached', listener: (frame: Frame) => any): this;

    /**
     * Emitted when a frame is navigated to a new url.
     */
    on(event: 'framenavigated', listener: (frame: Frame) => any): this;

    /**
     * Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.
     */
    on(event: 'load', listener: (page: Page) => any): this;

    /**
     * Emitted when an uncaught exception happens within the page.
     *
     * ```js
     * // Log all uncaught errors to the terminal
     * page.on('pageerror', exception => {
     *   console.log(`Uncaught exception: "${exception}"`);
     * });
     *
     * // Navigate to a page with an exception.
     * await page.goto('data:text/html,<script>throw new Error("Test")</script>');
     * ```
     *
     */
    on(event: 'pageerror', listener: (error: Error) => any): this;

    /**
     * Emitted when the page opens a new tab or window. This event is emitted in addition to the
     * [browserContext.on('page')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-page), but
     * only for popups relevant to this page.
     *
     * The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
     * popup with `window.open('http://example.com')`, this event will fire when the network request to
     * "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen
     * to this network request, use
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
     * and
     * [browserContext.on('request')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-request)
     * respectively instead of similar methods on the {@link Page}.
     *
     * ```js
     * // Start waiting for popup before clicking. Note no await.
     * const popupPromise = page.waitForEvent('popup');
     * await page.getByText('open the popup').click();
     * const popup = await popupPromise;
     * console.log(await popup.evaluate('location.href'));
     * ```
     *
     * **NOTE** Use
     * [page.waitForLoadState([state, options])](https://playwright.dev/docs/api/class-page#page-wait-for-load-state) to
     * wait until the page gets to a particular state (you should not need it in most cases).
     */
    on(event: 'popup', listener: (page: Page) => any): this;

    /**
     * Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests,
     * see [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) or
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route).
     */
    on(event: 'request', listener: (request: Request) => any): this;

    /**
     * Emitted when a request fails, for example by timing out.
     *
     * ```js
     * page.on('requestfailed', request => {
     *   console.log(request.url() + ' ' + request.failure().errorText);
     * });
     * ```
     *
     * **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request
     * will complete with
     * [page.on('requestfinished')](https://playwright.dev/docs/api/class-page#page-event-request-finished) event and not
     * with [page.on('requestfailed')](https://playwright.dev/docs/api/class-page#page-event-request-failed). A request
     * will only be considered failed when the client cannot get an HTTP response from the server, e.g. due to network
     * error net::ERR_FAILED.
     */
    on(event: 'requestfailed', listener: (request: Request) => any): this;

    /**
     * Emitted when a request finishes successfully after downloading the response body. For a successful response, the
     * sequence of events is `request`, `response` and `requestfinished`.
     */
    on(event: 'requestfinished', listener: (request: Request) => any): this;

    /**
     * Emitted when [response] status and headers are received for a request. For a successful response, the sequence of
     * events is `request`, `response` and `requestfinished`.
     */
    on(event: 'response', listener: (response: Response) => any): this;

    /**
     * Emitted when {@link WebSocket} request is sent.
     */
    on(event: 'websocket', listener: (webSocket: WebSocket) => any): this;

    /**
     * Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned
     * by the page.
     */
    on(event: 'worker', listener: (worker: Worker) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'close', listener: (page: Page) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'console', listener: (consoleMessage: ConsoleMessage) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'crash', listener: (page: Page) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'dialog', listener: (dialog: Dialog) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'domcontentloaded', listener: (page: Page) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'download', listener: (download: Download) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'filechooser', listener: (fileChooser: FileChooser) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'frameattached', listener: (frame: Frame) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'framedetached', listener: (frame: Frame) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'framenavigated', listener: (frame: Frame) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'load', listener: (page: Page) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'pageerror', listener: (error: Error) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'popup', listener: (page: Page) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'request', listener: (request: Request) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'requestfailed', listener: (request: Request) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'requestfinished', listener: (request: Request) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'response', listener: (response: Response) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'websocket', listener: (webSocket: WebSocket) => any): this;

    /**
     * Adds an event listener that will be automatically removed after it is triggered once. See `addListener` for more information about this event.
     */
    once(event: 'worker', listener: (worker: Worker) => any): this;

    /**
     * Emitted when the page closes.
     */
    addListener(event: 'close', listener: (page: Page) => any): this;

    /**
     * Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.
     *
     * The arguments passed into `console.log` are available on the {@link ConsoleMessage} event handler argument.
     *
     * **Usage**
     *
     * ```js
     * page.on('console', async msg => {
     *   const values = [];
     *   for (const arg of msg.args())
     *     values.push(await arg.jsonValue());
     *   console.log(...values);
     * });
     * await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
     * ```
     *
     */
    addListener(event: 'console', listener: (consoleMessage: ConsoleMessage) => any): this;

    /**
     * Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page
     * crashes, ongoing and subsequent operations will throw.
     *
     * The most common way to deal with crashes is to catch an exception:
     *
     * ```js
     * try {
     *   // Crash might happen during a click.
     *   await page.click('button');
     *   // Or while waiting for an event.
     *   await page.waitForEvent('popup');
     * } catch (e) {
     *   // When the page crashes, exception message contains 'crash'.
     * }
     * ```
     *
     */
    addListener(event: 'crash', listener: (page: Page) => any): this;

    /**
     * Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must**
     * either [dialog.accept([promptText])](https://playwright.dev/docs/api/class-dialog#dialog-accept) or
     * [dialog.dismiss()](https://playwright.dev/docs/api/class-dialog#dialog-dismiss) the dialog - otherwise the page
     * will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the
     * dialog, and actions like click will never finish.
     *
     * **Usage**
     *
     * ```js
     * page.on('dialog', dialog => dialog.accept());
     * ```
     *
     * **NOTE** When no [page.on('dialog')](https://playwright.dev/docs/api/class-page#page-event-dialog) or
     * [browserContext.on('dialog')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-dialog)
     * listeners are present, all dialogs are automatically dismissed.
     */
    addListener(event: 'dialog', listener: (dialog: Dialog) => any): this;

    /**
     * Emitted when the JavaScript
     * [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.
     */
    addListener(event: 'domcontentloaded', listener: (page: Page) => any): this;

    /**
     * Emitted when attachment download started. User can access basic file operations on downloaded content via the
     * passed {@link Download} instance.
     */
    addListener(event: 'download', listener: (download: Download) => any): this;

    /**
     * Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can
     * respond to it via setting the input files using
     * [fileChooser.setFiles(files[, options])](https://playwright.dev/docs/api/class-filechooser#file-chooser-set-files)
     * that can be uploaded after that.
     *
     * ```js
     * page.on('filechooser', async fileChooser => {
     *   await fileChooser.setFiles(path.join(__dirname, '/tmp/myfile.pdf'));
     * });
     * ```
     *
     */
    addListener(event: 'filechooser', listener: (fileChooser: FileChooser) => any): this;

    /**
     * Emitted when a frame is attached.
     */
    addListener(event: 'frameattached', listener: (frame: Frame) => any): this;

    /**
     * Emitted when a frame is detached.
     */
    addListener(event: 'framedetached', listener: (frame: Frame) => any): this;

    /**
     * Emitted when a frame is navigated to a new url.
     */
    addListener(event: 'framenavigated', listener: (frame: Frame) => any): this;

    /**
     * Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.
     */
    addListener(event: 'load', listener: (page: Page) => any): this;

    /**
     * Emitted when an uncaught exception happens within the page.
     *
     * ```js
     * // Log all uncaught errors to the terminal
     * page.on('pageerror', exception => {
     *   console.log(`Uncaught exception: "${exception}"`);
     * });
     *
     * // Navigate to a page with an exception.
     * await page.goto('data:text/html,<script>throw new Error("Test")</script>');
     * ```
     *
     */
    addListener(event: 'pageerror', listener: (error: Error) => any): this;

    /**
     * Emitted when the page opens a new tab or window. This event is emitted in addition to the
     * [browserContext.on('page')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-page), but
     * only for popups relevant to this page.
     *
     * The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
     * popup with `window.open('http://example.com')`, this event will fire when the network request to
     * "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen
     * to this network request, use
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
     * and
     * [browserContext.on('request')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-request)
     * respectively instead of similar methods on the {@link Page}.
     *
     * ```js
     * // Start waiting for popup before clicking. Note no await.
     * const popupPromise = page.waitForEvent('popup');
     * await page.getByText('open the popup').click();
     * const popup = await popupPromise;
     * console.log(await popup.evaluate('location.href'));
     * ```
     *
     * **NOTE** Use
     * [page.waitForLoadState([state, options])](https://playwright.dev/docs/api/class-page#page-wait-for-load-state) to
     * wait until the page gets to a particular state (you should not need it in most cases).
     */
    addListener(event: 'popup', listener: (page: Page) => any): this;

    /**
     * Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests,
     * see [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) or
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route).
     */
    addListener(event: 'request', listener: (request: Request) => any): this;

    /**
     * Emitted when a request fails, for example by timing out.
     *
     * ```js
     * page.on('requestfailed', request => {
     *   console.log(request.url() + ' ' + request.failure().errorText);
     * });
     * ```
     *
     * **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request
     * will complete with
     * [page.on('requestfinished')](https://playwright.dev/docs/api/class-page#page-event-request-finished) event and not
     * with [page.on('requestfailed')](https://playwright.dev/docs/api/class-page#page-event-request-failed). A request
     * will only be considered failed when the client cannot get an HTTP response from the server, e.g. due to network
     * error net::ERR_FAILED.
     */
    addListener(event: 'requestfailed', listener: (request: Request) => any): this;

    /**
     * Emitted when a request finishes successfully after downloading the response body. For a successful response, the
     * sequence of events is `request`, `response` and `requestfinished`.
     */
    addListener(event: 'requestfinished', listener: (request: Request) => any): this;

    /**
     * Emitted when [response] status and headers are received for a request. For a successful response, the sequence of
     * events is `request`, `response` and `requestfinished`.
     */
    addListener(event: 'response', listener: (response: Response) => any): this;

    /**
     * Emitted when {@link WebSocket} request is sent.
     */
    addListener(event: 'websocket', listener: (webSocket: WebSocket) => any): this;

    /**
     * Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned
     * by the page.
     */
    addListener(event: 'worker', listener: (worker: Worker) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'close', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'console', listener: (consoleMessage: ConsoleMessage) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'crash', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'dialog', listener: (dialog: Dialog) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'domcontentloaded', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'download', listener: (download: Download) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'filechooser', listener: (fileChooser: FileChooser) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'frameattached', listener: (frame: Frame) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'framedetached', listener: (frame: Frame) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'framenavigated', listener: (frame: Frame) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'load', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'pageerror', listener: (error: Error) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'popup', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'request', listener: (request: Request) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'requestfailed', listener: (request: Request) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'requestfinished', listener: (request: Request) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'response', listener: (response: Response) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'websocket', listener: (webSocket: WebSocket) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    removeListener(event: 'worker', listener: (worker: Worker) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'close', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'console', listener: (consoleMessage: ConsoleMessage) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'crash', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'dialog', listener: (dialog: Dialog) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'domcontentloaded', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'download', listener: (download: Download) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'filechooser', listener: (fileChooser: FileChooser) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'frameattached', listener: (frame: Frame) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'framedetached', listener: (frame: Frame) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'framenavigated', listener: (frame: Frame) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'load', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'pageerror', listener: (error: Error) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'popup', listener: (page: Page) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'request', listener: (request: Request) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'requestfailed', listener: (request: Request) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'requestfinished', listener: (request: Request) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'response', listener: (response: Response) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'websocket', listener: (webSocket: WebSocket) => any): this;

    /**
     * Removes an event listener added by `on` or `addListener`.
     */
    off(event: 'worker', listener: (worker: Worker) => any): this;

    /**
     * Emitted when the page closes.
     */
    prependListener(event: 'close', listener: (page: Page) => any): this;

    /**
     * Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.
     *
     * The arguments passed into `console.log` are available on the {@link ConsoleMessage} event handler argument.
     *
     * **Usage**
     *
     * ```js
     * page.on('console', async msg => {
     *   const values = [];
     *   for (const arg of msg.args())
     *     values.push(await arg.jsonValue());
     *   console.log(...values);
     * });
     * await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
     * ```
     *
     */
    prependListener(event: 'console', listener: (consoleMessage: ConsoleMessage) => any): this;

    /**
     * Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page
     * crashes, ongoing and subsequent operations will throw.
     *
     * The most common way to deal with crashes is to catch an exception:
     *
     * ```js
     * try {
     *   // Crash might happen during a click.
     *   await page.click('button');
     *   // Or while waiting for an event.
     *   await page.waitForEvent('popup');
     * } catch (e) {
     *   // When the page crashes, exception message contains 'crash'.
     * }
     * ```
     *
     */
    prependListener(event: 'crash', listener: (page: Page) => any): this;

    /**
     * Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must**
     * either [dialog.accept([promptText])](https://playwright.dev/docs/api/class-dialog#dialog-accept) or
     * [dialog.dismiss()](https://playwright.dev/docs/api/class-dialog#dialog-dismiss) the dialog - otherwise the page
     * will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the
     * dialog, and actions like click will never finish.
     *
     * **Usage**
     *
     * ```js
     * page.on('dialog', dialog => dialog.accept());
     * ```
     *
     * **NOTE** When no [page.on('dialog')](https://playwright.dev/docs/api/class-page#page-event-dialog) or
     * [browserContext.on('dialog')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-dialog)
     * listeners are present, all dialogs are automatically dismissed.
     */
    prependListener(event: 'dialog', listener: (dialog: Dialog) => any): this;

    /**
     * Emitted when the JavaScript
     * [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.
     */
    prependListener(event: 'domcontentloaded', listener: (page: Page) => any): this;

    /**
     * Emitted when attachment download started. User can access basic file operations on downloaded content via the
     * passed {@link Download} instance.
     */
    prependListener(event: 'download', listener: (download: Download) => any): this;

    /**
     * Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can
     * respond to it via setting the input files using
     * [fileChooser.setFiles(files[, options])](https://playwright.dev/docs/api/class-filechooser#file-chooser-set-files)
     * that can be uploaded after that.
     *
     * ```js
     * page.on('filechooser', async fileChooser => {
     *   await fileChooser.setFiles(path.join(__dirname, '/tmp/myfile.pdf'));
     * });
     * ```
     *
     */
    prependListener(event: 'filechooser', listener: (fileChooser: FileChooser) => any): this;

    /**
     * Emitted when a frame is attached.
     */
    prependListener(event: 'frameattached', listener: (frame: Frame) => any): this;

    /**
     * Emitted when a frame is detached.
     */
    prependListener(event: 'framedetached', listener: (frame: Frame) => any): this;

    /**
     * Emitted when a frame is navigated to a new url.
     */
    prependListener(event: 'framenavigated', listener: (frame: Frame) => any): this;

    /**
     * Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.
     */
    prependListener(event: 'load', listener: (page: Page) => any): this;

    /**
     * Emitted when an uncaught exception happens within the page.
     *
     * ```js
     * // Log all uncaught errors to the terminal
     * page.on('pageerror', exception => {
     *   console.log(`Uncaught exception: "${exception}"`);
     * });
     *
     * // Navigate to a page with an exception.
     * await page.goto('data:text/html,<script>throw new Error("Test")</script>');
     * ```
     *
     */
    prependListener(event: 'pageerror', listener: (error: Error) => any): this;

    /**
     * Emitted when the page opens a new tab or window. This event is emitted in addition to the
     * [browserContext.on('page')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-page), but
     * only for popups relevant to this page.
     *
     * The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
     * popup with `window.open('http://example.com')`, this event will fire when the network request to
     * "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen
     * to this network request, use
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
     * and
     * [browserContext.on('request')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-request)
     * respectively instead of similar methods on the {@link Page}.
     *
     * ```js
     * // Start waiting for popup before clicking. Note no await.
     * const popupPromise = page.waitForEvent('popup');
     * await page.getByText('open the popup').click();
     * const popup = await popupPromise;
     * console.log(await popup.evaluate('location.href'));
     * ```
     *
     * **NOTE** Use
     * [page.waitForLoadState([state, options])](https://playwright.dev/docs/api/class-page#page-wait-for-load-state) to
     * wait until the page gets to a particular state (you should not need it in most cases).
     */
    prependListener(event: 'popup', listener: (page: Page) => any): this;

    /**
     * Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests,
     * see [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) or
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route).
     */
    prependListener(event: 'request', listener: (request: Request) => any): this;

    /**
     * Emitted when a request fails, for example by timing out.
     *
     * ```js
     * page.on('requestfailed', request => {
     *   console.log(request.url() + ' ' + request.failure().errorText);
     * });
     * ```
     *
     * **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request
     * will complete with
     * [page.on('requestfinished')](https://playwright.dev/docs/api/class-page#page-event-request-finished) event and not
     * with [page.on('requestfailed')](https://playwright.dev/docs/api/class-page#page-event-request-failed). A request
     * will only be considered failed when the client cannot get an HTTP response from the server, e.g. due to network
     * error net::ERR_FAILED.
     */
    prependListener(event: 'requestfailed', listener: (request: Request) => any): this;

    /**
     * Emitted when a request finishes successfully after downloading the response body. For a successful response, the
     * sequence of events is `request`, `response` and `requestfinished`.
     */
    prependListener(event: 'requestfinished', listener: (request: Request) => any): this;

    /**
     * Emitted when [response] status and headers are received for a request. For a successful response, the sequence of
     * events is `request`, `response` and `requestfinished`.
     */
    prependListener(event: 'response', listener: (response: Response) => any): this;

    /**
     * Emitted when {@link WebSocket} request is sent.
     */
    prependListener(event: 'websocket', listener: (webSocket: WebSocket) => any): this;

    /**
     * Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned
     * by the page.
     */
    prependListener(event: 'worker', listener: (worker: Worker) => any): this;

    /**
     * When testing a web page, sometimes unexpected overlays like a "Sign up" dialog appear and block actions you want to
     * automate, e.g. clicking a button. These overlays don't always show up in the same way or at the same time, making
     * them tricky to handle in automated tests.
     *
     * This method lets you set up a special function, called a handler, that activates when it detects that overlay is
     * visible. The handler's job is to remove the overlay, allowing your test to continue as if the overlay wasn't there.
     *
     * Things to keep in mind:
     * - When an overlay is shown predictably, we recommend explicitly waiting for it in your test and dismissing it as
     *   a part of your normal test flow, instead of using
     *   [page.addLocatorHandler(locator, handler[, options])](https://playwright.dev/docs/api/class-page#page-add-locator-handler).
     * - Playwright checks for the overlay every time before executing or retrying an action that requires an
     *   [actionability check](https://playwright.dev/docs/actionability), or before performing an auto-waiting assertion check. When overlay
     *   is visible, Playwright calls the handler first, and then proceeds with the action/assertion. Note that the
     *   handler is only called when you perform an action/assertion - if the overlay becomes visible but you don't
     *   perform any actions, the handler will not be triggered.
     * - After executing the handler, Playwright will ensure that overlay that triggered the handler is not visible
     *   anymore. You can opt-out of this behavior with `noWaitAfter`.
     * - The execution time of the handler counts towards the timeout of the action/assertion that executed the handler.
     *   If your handler takes too long, it might cause timeouts.
     * - You can register multiple handlers. However, only a single handler will be running at a time. Make sure the
     *   actions within a handler don't depend on another handler.
     *
     * **NOTE** Running the handler will alter your page state mid-test. For example it will change the currently focused
     * element and move the mouse. Make sure that actions that run after the handler are self-contained and do not rely on
     * the focus and mouse state being unchanged. <br /> <br /> For example, consider a test that calls
     * [locator.focus([options])](https://playwright.dev/docs/api/class-locator#locator-focus) followed by
     * [keyboard.press(key[, options])](https://playwright.dev/docs/api/class-keyboard#keyboard-press). If your handler
     * clicks a button between these two actions, the focused element most likely will be wrong, and key press will happen
     * on the unexpected element. Use
     * [locator.press(key[, options])](https://playwright.dev/docs/api/class-locator#locator-press) instead to avoid this
     * problem. <br /> <br /> Another example is a series of mouse actions, where
     * [mouse.move(x, y[, options])](https://playwright.dev/docs/api/class-mouse#mouse-move) is followed by
     * [mouse.down([options])](https://playwright.dev/docs/api/class-mouse#mouse-down). Again, when the handler runs
     * between these two actions, the mouse position will be wrong during the mouse down. Prefer self-contained actions
     * like [locator.click([options])](https://playwright.dev/docs/api/class-locator#locator-click) that do not rely on
     * the state being unchanged by a handler.
     *
     * **Usage**
     *
     * An example that closes a "Sign up to the newsletter" dialog when it appears:
     *
     * ```js
     * // Setup the handler.
     * await page.addLocatorHandler(page.getByText('Sign up to the newsletter'), async () => {
     *   await page.getByRole('button', { name: 'No thanks' }).click();
     * });
     *
     * // Write the test as usual.
     * await page.goto('https://example.com');
     * await page.getByRole('button', { name: 'Start here' }).click();
     * ```
     *
     * An example that skips the "Confirm your security details" page when it is shown:
     *
     * ```js
     * // Setup the handler.
     * await page.addLocatorHandler(page.getByText('Confirm your security details'), async () => {
     *   await page.getByRole('button', { name: 'Remind me later' }).click();
     * });
     *
     * // Write the test as usual.
     * await page.goto('https://example.com');
     * await page.getByRole('button', { name: 'Start here' }).click();
     * ```
     *
     * An example with a custom callback on every actionability check. It uses a `<body>` locator that is always visible,
     * so the handler is called before every actionability check. It is important to specify `noWaitAfter`, because the
     * handler does not hide the `<body>` element.
     *
     * ```js
     * // Setup the handler.
     * await page.addLocatorHandler(page.locator('body'), async () => {
     *   await page.evaluate(() => window.removeObstructionsForTestIfNeeded());
     * }, { noWaitAfter: true });
     *
     * // Write the test as usual.
     * await page.goto('https://example.com');
     * await page.getByRole('button', { name: 'Start here' }).click();
     * ```
     *
     * Handler takes the original locator as an argument. You can also automatically remove the handler after a number of
     * invocations by setting `times`:
     *
     * ```js
     * await page.addLocatorHandler(page.getByLabel('Close'), async locator => {
     *   await locator.click();
     * }, { times: 1 });
     * ```
     *
     * @param locator Locator that triggers the handler.
     * @param handler Function that should be run once `locator` appears. This function should get rid of the element that blocks actions
     * like click.
     * @param options
     */
    addLocatorHandler(locator: Locator, handler: ((locator: Locator) => Promise<any>), options?: {
        /**
         * By default, after calling the handler Playwright will wait until the overlay becomes hidden, and only then
         * Playwright will continue with the action/assertion that triggered the handler. This option allows to opt-out of
         * this behavior, so that overlay can stay visible after the handler has run.
         */
        noWaitAfter?: boolean;

        /**
         * Specifies the maximum number of times this handler should be called. Unlimited by default.
         */
        times?: number;
    }): Promise<void>;

    /**
     * Adds a `<script>` tag into the page with the desired url or content. Returns the added tag when the script's onload
     * fires or when the script content was injected into frame.
     * @param options
     */
    addScriptTag(options?: {
        /**
         * Raw JavaScript content to be injected into frame.
         */
        content?: string;

        /**
         * Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative
         * to the current working directory.
         */
        path?: string;

        /**
         * Script type. Use 'module' in order to load a Javascript ES6 module. See
         * [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
         */
        type?: string;

        /**
         * URL of a script to be added.
         */
        url?: string;
    }): Promise<ElementHandle>;

    /**
     * Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the
     * content. Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.
     * @param options
     */
    addStyleTag(options?: {
        /**
         * Raw CSS content to be injected into frame.
         */
        content?: string;

        /**
         * Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
         * current working directory.
         */
        path?: string;

        /**
         * URL of the `<link>` tag.
         */
        url?: string;
    }): Promise<ElementHandle>;

    /**
     * Brings page to front (activates tab).
     */
    bringToFront(): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.check([options])](https://playwright.dev/docs/api/class-locator#locator-check) instead.
     * Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method checks an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is
     *    already checked, this method returns immediately.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.mouse](https://playwright.dev/docs/api/class-page#page-mouse) to click in the center of the
     *    element.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
     * 1. Ensure that the element is now checked. If not, this method throws.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    check(selector: string, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.click([options])](https://playwright.dev/docs/api/class-locator#locator-click) instead.
     * Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method clicks an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.mouse](https://playwright.dev/docs/api/class-page#page-mouse) to click in the center of the
     *    element, or the specified `position`.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    click(selector: string, options?: {
        /**
         * Defaults to `left`.
         */
        button?: "left"|"right"|"middle";

        /**
         * defaults to 1. See [UIEvent.detail].
         */
        clickCount?: number;

        /**
         * Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
         */
        delay?: number;

        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
         * current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to
         * "Control" on Windows and Linux and to "Meta" on macOS.
         */
        modifiers?: Array<"Alt"|"Control"|"ControlOrMeta"|"Meta"|"Shift">;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * If `runBeforeUnload` is `false`, does not run any unload handlers and waits for the page to be closed. If
     * `runBeforeUnload` is `true` the method will run unload handlers, but will **not** wait for the page to close.
     *
     * By default, `page.close()` **does not** run `beforeunload` handlers.
     *
     * **NOTE** if `runBeforeUnload` is passed as true, a `beforeunload` dialog might be summoned and should be handled
     * manually via [page.on('dialog')](https://playwright.dev/docs/api/class-page#page-event-dialog) event.
     * @param options
     */
    close(options?: {
        /**
         * The reason to be reported to the operations interrupted by the page closure.
         */
        reason?: string;

        /**
         * Defaults to `false`. Whether to run the
         * [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) page handlers.
         */
        runBeforeUnload?: boolean;
    }): Promise<void>;

    /**
     * Gets the full HTML contents of the page, including the doctype.
     */
    content(): Promise<string>;

    /**
     * Get the browser context that the page belongs to.
     */
    context(): BrowserContext;

    /**
     * **NOTE** Use locator-based [locator.dblclick([options])](https://playwright.dev/docs/api/class-locator#locator-dblclick)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method double clicks an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.mouse](https://playwright.dev/docs/api/class-page#page-mouse) to double click in the center of the
     *    element, or the specified `position`.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set. Note that if
     *    the first click of the `dblclick()` triggers a navigation event, this method will throw.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     *
     * **NOTE** `page.dblclick()` dispatches two `click` events and a single `dblclick` event.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    dblclick(selector: string, options?: {
        /**
         * Defaults to `left`.
         */
        button?: "left"|"right"|"middle";

        /**
         * Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
         */
        delay?: number;

        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
         * current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to
         * "Control" on Windows and Linux and to "Meta" on macOS.
         */
        modifiers?: Array<"Alt"|"Control"|"ControlOrMeta"|"Meta"|"Shift">;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based
     * [locator.dispatchEvent(type[, eventInit, options])](https://playwright.dev/docs/api/class-locator#locator-dispatch-event)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element,
     * `click` is dispatched. This is equivalent to calling
     * [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).
     *
     * **Usage**
     *
     * ```js
     * await page.dispatchEvent('button#submit', 'click');
     * ```
     *
     * Under the hood, it creates an instance of an event based on the given `type`, initializes it with `eventInit`
     * properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.
     *
     * Since `eventInit` is event-specific, please refer to the events documentation for the lists of initial properties:
     * - [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
     * - [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
     * - [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
     * - [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
     * - [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
     * - [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
     * - [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
     * - [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
     * - [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
     * - [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)
     *
     * You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:
     *
     * ```js
     * // Note you can only create DataTransfer in Chromium and Firefox
     * const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
     * await page.dispatchEvent('#source', 'dragstart', { dataTransfer });
     * ```
     *
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param type DOM event type: `"click"`, `"dragstart"`, etc.
     * @param eventInit Optional event-specific initialization properties.
     * @param options
     */
    dispatchEvent(selector: string, type: string, eventInit?: EvaluationArgument, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * This method drags the source element to the target element. It will first move to the source element, perform a
     * `mousedown`, then move to the target element and perform a `mouseup`.
     *
     * **Usage**
     *
     * ```js
     * await page.dragAndDrop('#source', '#target');
     * // or specify exact positions relative to the top-left corners of the elements:
     * await page.dragAndDrop('#source', '#target', {
     *   sourcePosition: { x: 34, y: 7 },
     *   targetPosition: { x: 10, y: 20 },
     * });
     * ```
     *
     * @param source A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will
     * be used.
     * @param target A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first
     * will be used.
     * @param options
     */
    dragAndDrop(source: string, target: string, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not
         * specified, some visible point of the element is used.
         */
        sourcePosition?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Drops on the target element at this point relative to the top-left corner of the element's padding box. If not
         * specified, some visible point of the element is used.
         */
        targetPosition?: {
            x: number;

            y: number;
        };

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * This method changes the `CSS media type` through the `media` argument, and/or the `'prefers-colors-scheme'` media
     * feature, using the `colorScheme` argument.
     *
     * **Usage**
     *
     * ```js
     * await page.evaluate(() => matchMedia('screen').matches);
     * // → true
     * await page.evaluate(() => matchMedia('print').matches);
     * // → false
     *
     * await page.emulateMedia({ media: 'print' });
     * await page.evaluate(() => matchMedia('screen').matches);
     * // → false
     * await page.evaluate(() => matchMedia('print').matches);
     * // → true
     *
     * await page.emulateMedia({});
     * await page.evaluate(() => matchMedia('screen').matches);
     * // → true
     * await page.evaluate(() => matchMedia('print').matches);
     * // → false
     * ```
     *
     * ```js
     * await page.emulateMedia({ colorScheme: 'dark' });
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
     * // → true
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
     * // → false
     * await page.evaluate(() => matchMedia('(prefers-color-scheme: no-preference)').matches);
     * // → false
     * ```
     *
     * @param options
     */
    emulateMedia(options?: {
        /**
         * Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`.
         * Passing `null` disables color scheme emulation.
         */
        colorScheme?: null|"light"|"dark"|"no-preference";

        /**
         * Emulates `'forced-colors'` media feature, supported values are `'active'` and `'none'`. Passing `null` disables
         * forced colors emulation.
         */
        forcedColors?: null|"active"|"none";

        /**
         * Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`. Passing
         * `null` disables CSS media emulation.
         */
        media?: null|"screen"|"print";

        /**
         * Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. Passing
         * `null` disables reduced motion emulation.
         */
        reducedMotion?: null|"reduce"|"no-preference";
    }): Promise<void>;

    /**
     * The method adds a function called `name` on the `window` object of every frame in the page. When called, the
     * function executes `callback` and returns a [Promise] which resolves to the return value of `callback`.
     *
     * If the `callback` returns a [Promise], it will be awaited.
     *
     * See
     * [browserContext.exposeFunction(name, callback)](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-function)
     * for context-wide exposed function.
     *
     * **NOTE** Functions installed via
     * [page.exposeFunction(name, callback)](https://playwright.dev/docs/api/class-page#page-expose-function) survive
     * navigations.
     *
     * **Usage**
     *
     * An example of adding a `sha256` function to the page:
     *
     * ```js
     * const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
     * const crypto = require('crypto');
     *
     * (async () => {
     *   const browser = await webkit.launch({ headless: false });
     *   const page = await browser.newPage();
     *   await page.exposeFunction('sha256', text =>
     *     crypto.createHash('sha256').update(text).digest('hex'),
     *   );
     *   await page.setContent(`
     *     <script>
     *       async function onClick() {
     *         document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
     *       }
     *     </script>
     *     <button onclick="onClick()">Click me</button>
     *     <div></div>
     *   `);
     *   await page.click('button');
     * })();
     * ```
     *
     * @param name Name of the function on the window object
     * @param callback Callback function which will be called in Playwright's context.
     */
    exposeFunction(name: string, callback: Function): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.fill(value[, options])](https://playwright.dev/docs/api/class-locator#locator-fill)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method waits for an element matching `selector`, waits for [actionability](https://playwright.dev/docs/actionability) checks,
     * focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string
     * to clear the input field.
     *
     * If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an
     * error. However, if the element is inside the `<label>` element that has an associated
     * [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled
     * instead.
     *
     * To send fine-grained keyboard events, use
     * [locator.pressSequentially(text[, options])](https://playwright.dev/docs/api/class-locator#locator-press-sequentially).
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param value Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.
     * @param options
     */
    fill(selector: string, value: string, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.focus([options])](https://playwright.dev/docs/api/class-locator#locator-focus) instead.
     * Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method fetches an element with `selector` and focuses it. If there's no element matching `selector`, the
     * method waits until a matching element appears in the DOM.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    focus(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * Returns frame matching the specified criteria. Either `name` or `url` must be specified.
     *
     * **Usage**
     *
     * ```js
     * const frame = page.frame('frame-name');
     * ```
     *
     * ```js
     * const frame = page.frame({ url: /.*domain.*\/ });
     * ```
     *
     * @param frameSelector Frame name or other frame lookup options.
     */
    frame(frameSelector: string|{
        /**
         * Frame name specified in the `iframe`'s `name` attribute. Optional.
         */
        name?: string;

        /**
         * A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object. Optional.
         */
        url?: string|RegExp|((url: URL) => boolean);
    }): null|Frame;

    /**
     * When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements
     * in that iframe.
     *
     * **Usage**
     *
     * Following snippet locates element with text "Submit" in the iframe with id `my-frame`, like `<iframe
     * id="my-frame">`:
     *
     * ```js
     * const locator = page.frameLocator('#my-iframe').getByText('Submit');
     * await locator.click();
     * ```
     *
     * @param selector A selector to use when resolving DOM element.
     */
    frameLocator(selector: string): FrameLocator;

    /**
     * An array of all frames attached to the page.
     */
    frames(): Array<Frame>;

    /**
     * **NOTE** Use locator-based
     * [locator.getAttribute(name[, options])](https://playwright.dev/docs/api/class-locator#locator-get-attribute)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns element attribute value.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param name Attribute name to get the value for.
     * @param options
     */
    getAttribute(selector: string, name: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<null|string>;

    /**
     * Allows locating elements by their alt text.
     *
     * **Usage**
     *
     * For example, this method will find the image by alt text "Playwright logo":
     *
     * ```html
     * <img alt='Playwright logo'>
     * ```
     *
     * ```js
     * await page.getByAltText('Playwright logo').click();
     * ```
     *
     * @param text Text to locate the element for.
     * @param options
     */
    getByAltText(text: string|RegExp, options?: {
        /**
         * Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a
         * regular expression. Note that exact match still trims whitespace.
         */
        exact?: boolean;
    }): Locator;

    /**
     * Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the
     * `aria-label` attribute.
     *
     * **Usage**
     *
     * For example, this method will find inputs by label "Username" and "Password" in the following DOM:
     *
     * ```html
     * <input aria-label="Username">
     * <label for="password-input">Password:</label>
     * <input id="password-input">
     * ```
     *
     * ```js
     * await page.getByLabel('Username').fill('john');
     * await page.getByLabel('Password').fill('secret');
     * ```
     *
     * @param text Text to locate the element for.
     * @param options
     */
    getByLabel(text: string|RegExp, options?: {
        /**
         * Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a
         * regular expression. Note that exact match still trims whitespace.
         */
        exact?: boolean;
    }): Locator;

    /**
     * Allows locating input elements by the placeholder text.
     *
     * **Usage**
     *
     * For example, consider the following DOM structure.
     *
     * ```html
     * <input type="email" placeholder="name@example.com" />
     * ```
     *
     * You can fill the input after locating it by the placeholder text:
     *
     * ```js
     * await page
     *     .getByPlaceholder('name@example.com')
     *     .fill('playwright@microsoft.com');
     * ```
     *
     * @param text Text to locate the element for.
     * @param options
     */
    getByPlaceholder(text: string|RegExp, options?: {
        /**
         * Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a
         * regular expression. Note that exact match still trims whitespace.
         */
        exact?: boolean;
    }): Locator;

    /**
     * Allows locating elements by their [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles),
     * [ARIA attributes](https://www.w3.org/TR/wai-aria-1.2/#aria-attributes) and
     * [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
     *
     * **Usage**
     *
     * Consider the following DOM structure.
     *
     * ```html
     * <h3>Sign up</h3>
     * <label>
     *   <input type="checkbox" /> Subscribe
     * </label>
     * <br/>
     * <button>Submit</button>
     * ```
     *
     * You can locate each element by it's implicit role:
     *
     * ```js
     * await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
     *
     * await page.getByRole('checkbox', { name: 'Subscribe' }).check();
     *
     * await page.getByRole('button', { name: /submit/i }).click();
     * ```
     *
     * **Details**
     *
     * Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback
     * about the ARIA guidelines.
     *
     * Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings)
     * that is recognized by the role selector. You can find all the
     * [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend**
     * duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.
     * @param role Required aria role.
     * @param options
     */
    getByRole(role: "alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem", options?: {
        /**
         * An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.
         *
         * Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
         */
        checked?: boolean;

        /**
         * An attribute that is usually set by `aria-disabled` or `disabled`.
         *
         * **NOTE** Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about
         * [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
         */
        disabled?: boolean;

        /**
         * Whether `name` is matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when `name` is a
         * regular expression. Note that exact match still trims whitespace.
         */
        exact?: boolean;

        /**
         * An attribute that is usually set by `aria-expanded`.
         *
         * Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
         */
        expanded?: boolean;

        /**
         * Option that controls whether hidden elements are matched. By default, only non-hidden elements, as
         * [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.
         *
         * Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
         */
        includeHidden?: boolean;

        /**
         * A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values
         * for `<h1>-<h6>` elements.
         *
         * Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
         */
        level?: number;

        /**
         * Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is
         * case-insensitive and searches for a substring, use `exact` to control this behavior.
         *
         * Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
         */
        name?: string|RegExp;

        /**
         * An attribute that is usually set by `aria-pressed`.
         *
         * Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
         */
        pressed?: boolean;

        /**
         * An attribute that is usually set by `aria-selected`.
         *
         * Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).
         */
        selected?: boolean;
    }): Locator;

    /**
     * Locate element by the test id.
     *
     * **Usage**
     *
     * Consider the following DOM structure.
     *
     * ```html
     * <button data-testid="directions">Itinéraire</button>
     * ```
     *
     * You can locate the element by it's test id:
     *
     * ```js
     * await page.getByTestId('directions').click();
     * ```
     *
     * **Details**
     *
     * By default, the `data-testid` attribute is used as a test id. Use
     * [selectors.setTestIdAttribute(attributeName)](https://playwright.dev/docs/api/class-selectors#selectors-set-test-id-attribute)
     * to configure a different test id attribute if necessary.
     *
     * ```js
     * // Set custom test id attribute from @playwright/test config:
     * import { defineConfig } from '@playwright/test';
     *
     * export default defineConfig({
     *   use: {
     *     testIdAttribute: 'data-pw'
     *   },
     * });
     * ```
     *
     * @param testId Id to locate the element by.
     */
    getByTestId(testId: string|RegExp): Locator;

    /**
     * Allows locating elements that contain given text.
     *
     * See also [locator.filter([options])](https://playwright.dev/docs/api/class-locator#locator-filter) that allows to
     * match by another criteria, like an accessible role, and then filter by the text content.
     *
     * **Usage**
     *
     * Consider the following DOM structure:
     *
     * ```html
     * <div>Hello <span>world</span></div>
     * <div>Hello</div>
     * ```
     *
     * You can locate by text substring, exact string, or a regular expression:
     *
     * ```js
     * // Matches <span>
     * page.getByText('world');
     *
     * // Matches first <div>
     * page.getByText('Hello world');
     *
     * // Matches second <div>
     * page.getByText('Hello', { exact: true });
     *
     * // Matches both <div>s
     * page.getByText(/Hello/);
     *
     * // Matches second <div>
     * page.getByText(/^hello$/i);
     * ```
     *
     * **Details**
     *
     * Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into
     * one, turns line breaks into spaces and ignores leading and trailing whitespace.
     *
     * Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For
     * example, locating by text `"Log in"` matches `<input type=button value="Log in">`.
     * @param text Text to locate the element for.
     * @param options
     */
    getByText(text: string|RegExp, options?: {
        /**
         * Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a
         * regular expression. Note that exact match still trims whitespace.
         */
        exact?: boolean;
    }): Locator;

    /**
     * Allows locating elements by their title attribute.
     *
     * **Usage**
     *
     * Consider the following DOM structure.
     *
     * ```html
     * <span title='Issues count'>25 issues</span>
     * ```
     *
     * You can check the issues count after locating it by the title text:
     *
     * ```js
     * await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
     * ```
     *
     * @param text Text to locate the element for.
     * @param options
     */
    getByTitle(text: string|RegExp, options?: {
        /**
         * Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a
         * regular expression. Note that exact match still trims whitespace.
         */
        exact?: boolean;
    }): Locator;

    /**
     * Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of
     * the last redirect. If can not go back, returns `null`.
     *
     * Navigate to the previous page in history.
     * @param options
     */
    goBack(options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<null|Response>;

    /**
     * Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of
     * the last redirect. If can not go forward, returns `null`.
     *
     * Navigate to the next page in history.
     * @param options
     */
    goForward(options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<null|Response>;

    /**
     * Returns the main resource response. In case of multiple redirects, the navigation will resolve with the first
     * non-redirect response.
     *
     * The method will throw an error if:
     * - there's an SSL error (e.g. in case of self-signed certificates).
     * - target URL is invalid.
     * - the `timeout` is exceeded during navigation.
     * - the remote server does not respond or is unreachable.
     * - the main resource failed to load.
     *
     * The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404
     * "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling
     * [response.status()](https://playwright.dev/docs/api/class-response#response-status).
     *
     * **NOTE** The method either throws an error or returns a main resource response. The only exceptions are navigation
     * to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
     *
     * **NOTE** Headless mode doesn't support navigation to a PDF document. See the
     * [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
     * @param url URL to navigate page to. The url should include scheme, e.g. `https://`. When a `baseURL` via the context options
     * was provided and the passed URL is a path, it gets merged via the
     * [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
     * @param options
     */
    goto(url: string, options?: {
        /**
         * Referer header value. If provided it will take preference over the referer header value set by
         * [page.setExtraHTTPHeaders(headers)](https://playwright.dev/docs/api/class-page#page-set-extra-http-headers).
         */
        referer?: string;

        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<null|Response>;

    /**
     * **NOTE** Use locator-based [locator.hover([options])](https://playwright.dev/docs/api/class-locator#locator-hover) instead.
     * Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method hovers over an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.mouse](https://playwright.dev/docs/api/class-page#page-mouse) to hover over the center of the
     *    element, or the specified `position`.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    hover(selector: string, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
         * current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to
         * "Control" on Windows and Linux and to "Meta" on macOS.
         */
        modifiers?: Array<"Alt"|"Control"|"ControlOrMeta"|"Meta"|"Shift">;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.innerHTML([options])](https://playwright.dev/docs/api/class-locator#locator-inner-html)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns `element.innerHTML`.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    innerHTML(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<string>;

    /**
     * **NOTE** Use locator-based [locator.innerText([options])](https://playwright.dev/docs/api/class-locator#locator-inner-text)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns `element.innerText`.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    innerText(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<string>;

    /**
     * **NOTE** Use locator-based
     * [locator.inputValue([options])](https://playwright.dev/docs/api/class-locator#locator-input-value) instead. Read
     * more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.
     *
     * Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated
     * [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the
     * control.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    inputValue(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<string>;

    /**
     * **NOTE** Use locator-based [locator.isChecked([options])](https://playwright.dev/docs/api/class-locator#locator-is-checked)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns whether the element is checked. Throws if the element is not a checkbox or radio input.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    isChecked(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<boolean>;

    /**
     * Indicates that the page has been closed.
     */
    isClosed(): boolean;

    /**
     * **NOTE** Use locator-based
     * [locator.isDisabled([options])](https://playwright.dev/docs/api/class-locator#locator-is-disabled) instead. Read
     * more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns whether the element is disabled, the opposite of [enabled](https://playwright.dev/docs/actionability#enabled).
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    isDisabled(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<boolean>;

    /**
     * **NOTE** Use locator-based
     * [locator.isEditable([options])](https://playwright.dev/docs/api/class-locator#locator-is-editable) instead. Read
     * more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns whether the element is [editable](https://playwright.dev/docs/actionability#editable).
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    isEditable(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<boolean>;

    /**
     * **NOTE** Use locator-based [locator.isEnabled([options])](https://playwright.dev/docs/api/class-locator#locator-is-enabled)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns whether the element is [enabled](https://playwright.dev/docs/actionability#enabled).
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    isEnabled(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<boolean>;

    /**
     * **NOTE** Use locator-based [locator.isHidden([options])](https://playwright.dev/docs/api/class-locator#locator-is-hidden)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns whether the element is hidden, the opposite of [visible](https://playwright.dev/docs/actionability#visible).  `selector` that
     * does not match any elements is considered hidden.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    isHidden(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * @deprecated This option is ignored.
         * [page.isHidden(selector[, options])](https://playwright.dev/docs/api/class-page#page-is-hidden) does not wait for
         * the element to become hidden and returns immediately.
         */
        timeout?: number;
    }): Promise<boolean>;

    /**
     * **NOTE** Use locator-based [locator.isVisible([options])](https://playwright.dev/docs/api/class-locator#locator-is-visible)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns whether the element is [visible](https://playwright.dev/docs/actionability#visible). `selector` that does not match any elements
     * is considered not visible.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    isVisible(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * @deprecated This option is ignored.
         * [page.isVisible(selector[, options])](https://playwright.dev/docs/api/class-page#page-is-visible) does not wait for
         * the element to become visible and returns immediately.
         */
        timeout?: number;
    }): Promise<boolean>;

    /**
     * The method returns an element locator that can be used to perform actions on this page / frame. Locator is resolved
     * to the element immediately before performing an action, so a series of actions on the same locator can in fact be
     * performed on different DOM elements. That would happen if the DOM structure between those actions has changed.
     *
     * [Learn more about locators](https://playwright.dev/docs/locators).
     * @param selector A selector to use when resolving DOM element.
     * @param options
     */
    locator(selector: string, options?: {
        /**
         * Narrows down the results of the method to those which contain elements matching this relative locator. For example,
         * `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
         *
         * Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not
         * the document root. For example, you can find `content` that has `div` in
         * `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article
         * div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
         *
         * Note that outer and inner locators must belong to the same frame. Inner locator must not contain {@link
         * FrameLocator}s.
         */
        has?: Locator;

        /**
         * Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the
         * outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
         *
         * Note that outer and inner locators must belong to the same frame. Inner locator must not contain {@link
         * FrameLocator}s.
         */
        hasNot?: Locator;

        /**
         * Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element.
         * When passed a [string], matching is case-insensitive and searches for a substring.
         */
        hasNotText?: string|RegExp;

        /**
         * Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When
         * passed a [string], matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches
         * `<article><div>Playwright</div></article>`.
         */
        hasText?: string|RegExp;
    }): Locator;

    /**
     * The page's main frame. Page is guaranteed to have a main frame which persists during navigations.
     */
    mainFrame(): Frame;

    /**
     * Returns the opener for popup pages and `null` for others. If the opener has been closed already the returns `null`.
     */
    opener(): Promise<null|Page>;

    /**
     * Pauses script execution. Playwright will stop executing the script and wait for the user to either press 'Resume'
     * button in the page overlay or to call `playwright.resume()` in the DevTools console.
     *
     * User can inspect selectors or perform manual steps while paused. Resume will continue running the original script
     * from the place it was paused.
     *
     * **NOTE** This method requires Playwright to be started in a headed mode, with a falsy `headless` value in the
     * [browserType.launch([options])](https://playwright.dev/docs/api/class-browsertype#browser-type-launch).
     */
    pause(): Promise<void>;

    /**
     * Returns the PDF buffer.
     *
     * **NOTE** Generating a pdf is currently only supported in Chromium headless.
     *
     * `page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call
     * [page.emulateMedia([options])](https://playwright.dev/docs/api/class-page#page-emulate-media) before calling
     * `page.pdf()`:
     *
     * **NOTE** By default, `page.pdf()` generates a pdf with modified colors for printing. Use the
     * [`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust)
     * property to force rendering of exact colors.
     *
     * **Usage**
     *
     * ```js
     * // Generates a PDF with 'screen' media type.
     * await page.emulateMedia({ media: 'screen' });
     * await page.pdf({ path: 'page.pdf' });
     * ```
     *
     * The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as
     * pixels.
     *
     * A few examples:
     * - `page.pdf({width: 100})` - prints with width set to 100 pixels
     * - `page.pdf({width: '100px'})` - prints with width set to 100 pixels
     * - `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.
     *
     * All possible units are:
     * - `px` - pixel
     * - `in` - inch
     * - `cm` - centimeter
     * - `mm` - millimeter
     *
     * The `format` options are:
     * - `Letter`: 8.5in x 11in
     * - `Legal`: 8.5in x 14in
     * - `Tabloid`: 11in x 17in
     * - `Ledger`: 17in x 11in
     * - `A0`: 33.1in x 46.8in
     * - `A1`: 23.4in x 33.1in
     * - `A2`: 16.54in x 23.4in
     * - `A3`: 11.7in x 16.54in
     * - `A4`: 8.27in x 11.7in
     * - `A5`: 5.83in x 8.27in
     * - `A6`: 4.13in x 5.83in
     *
     * **NOTE** `headerTemplate` and `footerTemplate` markup have the following limitations: > 1. Script tags inside
     * templates are not evaluated. > 2. Page styles are not visible inside templates.
     * @param options
     */
    pdf(options?: {
        /**
         * Display header and footer. Defaults to `false`.
         */
        displayHeaderFooter?: boolean;

        /**
         * HTML template for the print footer. Should use the same format as the `headerTemplate`.
         */
        footerTemplate?: string;

        /**
         * Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
         */
        format?: string;

        /**
         * HTML template for the print header. Should be valid HTML markup with following classes used to inject printing
         * values into them:
         * - `'date'` formatted print date
         * - `'title'` document title
         * - `'url'` document location
         * - `'pageNumber'` current page number
         * - `'totalPages'` total pages in the document
         */
        headerTemplate?: string;

        /**
         * Paper height, accepts values labeled with units.
         */
        height?: string|number;

        /**
         * Paper orientation. Defaults to `false`.
         */
        landscape?: boolean;

        /**
         * Paper margins, defaults to none.
         */
        margin?: {
            /**
             * Top margin, accepts values labeled with units. Defaults to `0`.
             */
            top?: string|number;

            /**
             * Right margin, accepts values labeled with units. Defaults to `0`.
             */
            right?: string|number;

            /**
             * Bottom margin, accepts values labeled with units. Defaults to `0`.
             */
            bottom?: string|number;

            /**
             * Left margin, accepts values labeled with units. Defaults to `0`.
             */
            left?: string|number;
        };

        /**
         * Whether or not to embed the document outline into the PDF. Defaults to `false`.
         */
        outline?: boolean;

        /**
         * Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
         */
        pageRanges?: string;

        /**
         * The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to the current working
         * directory. If no path is provided, the PDF won't be saved to the disk.
         */
        path?: string;

        /**
         * Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format`
         * options. Defaults to `false`, which will scale the content to fit the paper size.
         */
        preferCSSPageSize?: boolean;

        /**
         * Print background graphics. Defaults to `false`.
         */
        printBackground?: boolean;

        /**
         * Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.
         */
        scale?: number;

        /**
         * Whether or not to generate tagged (accessible) PDF. Defaults to `false`.
         */
        tagged?: boolean;

        /**
         * Paper width, accepts values labeled with units.
         */
        width?: string|number;
    }): Promise<Buffer>;

    /**
     * **NOTE** Use locator-based [locator.press(key[, options])](https://playwright.dev/docs/api/class-locator#locator-press)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Focuses the element, and then uses
     * [keyboard.down(key)](https://playwright.dev/docs/api/class-keyboard#keyboard-down) and
     * [keyboard.up(key)](https://playwright.dev/docs/api/class-keyboard#keyboard-up).
     *
     * `key` can specify the intended
     * [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character
     * to generate the text for. A superset of the `key` values can be found
     * [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:
     *
     * `F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
     * `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`,
     * etc.
     *
     * Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`,
     * `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.
     *
     * Holding down `Shift` will type the text that corresponds to the `key` in the upper case.
     *
     * If `key` is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective
     * texts.
     *
     * Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When
     * specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.
     *
     * **Usage**
     *
     * ```js
     * const page = await browser.newPage();
     * await page.goto('https://keycode.info');
     * await page.press('body', 'A');
     * await page.screenshot({ path: 'A.png' });
     * await page.press('body', 'ArrowLeft');
     * await page.screenshot({ path: 'ArrowLeft.png' });
     * await page.press('body', 'Shift+O');
     * await page.screenshot({ path: 'O.png' });
     * await browser.close();
     * ```
     *
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param key Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
     * @param options
     */
    press(selector: string, key: string, options?: {
        /**
         * Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
         */
        delay?: number;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * This method reloads the current page, in the same way as if the user had triggered a browser refresh. Returns the
     * main resource response. In case of multiple redirects, the navigation will resolve with the response of the last
     * redirect.
     * @param options
     */
    reload(options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<null|Response>;

    /**
     * Removes all locator handlers added by
     * [page.addLocatorHandler(locator, handler[, options])](https://playwright.dev/docs/api/class-page#page-add-locator-handler)
     * for a specific locator.
     * @param locator Locator passed to
     * [page.addLocatorHandler(locator, handler[, options])](https://playwright.dev/docs/api/class-page#page-add-locator-handler).
     */
    removeLocatorHandler(locator: Locator): Promise<void>;

    /**
     * Routing provides the capability to modify network requests that are made by a page.
     *
     * Once routing is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or
     * aborted.
     *
     * **NOTE** The handler will only be called for the first url if the response is a redirect.
     *
     * **NOTE** [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) will not
     * intercept requests intercepted by Service Worker. See [this](https://github.com/microsoft/playwright/issues/1090)
     * issue. We recommend disabling Service Workers when using request interception by setting
     * `Browser.newContext.serviceWorkers` to `'block'`.
     *
     * **NOTE** [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) will not
     * intercept the first request of a popup page. Use
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
     * instead.
     *
     * **Usage**
     *
     * An example of a naive handler that aborts all image requests:
     *
     * ```js
     * const page = await browser.newPage();
     * await page.route('**\/*.{png,jpg,jpeg}', route => route.abort());
     * await page.goto('https://example.com');
     * await browser.close();
     * ```
     *
     * or the same snippet using a regex pattern instead:
     *
     * ```js
     * const page = await browser.newPage();
     * await page.route(/(\.png$)|(\.jpg$)/, route => route.abort());
     * await page.goto('https://example.com');
     * await browser.close();
     * ```
     *
     * It is possible to examine the request to decide the route action. For example, mocking all requests that contain
     * some post data, and leaving all other requests as is:
     *
     * ```js
     * await page.route('/api/**', async route => {
     *   if (route.request().postData().includes('my-string'))
     *     await route.fulfill({ body: 'mocked-data' });
     *   else
     *     await route.continue();
     * });
     * ```
     *
     * Page routes take precedence over browser context routes (set up with
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route))
     * when request matches both handlers.
     *
     * To remove a route with its handler you can use
     * [page.unroute(url[, handler])](https://playwright.dev/docs/api/class-page#page-unroute).
     *
     * **NOTE** Enabling routing disables http cache.
     * @param url A glob pattern, regex pattern or predicate receiving [URL] to match while routing. When a `baseURL` via the context
     * options was provided and the passed URL is a path, it gets merged via the
     * [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
     * @param handler handler function to route the request.
     * @param options
     */
    route(url: string|RegExp|((url: URL) => boolean), handler: ((route: Route, request: Request) => Promise<any>|any), options?: {
        /**
         * How often a route should be used. By default it will be used every time.
         */
        times?: number;
    }): Promise<void>;

    /**
     * If specified the network requests that are made in the page will be served from the HAR file. Read more about
     * [Replaying from HAR](https://playwright.dev/docs/mock#replaying-from-har).
     *
     * Playwright will not serve requests intercepted by Service Worker from the HAR file. See
     * [this](https://github.com/microsoft/playwright/issues/1090) issue. We recommend disabling Service Workers when
     * using request interception by setting `Browser.newContext.serviceWorkers` to `'block'`.
     * @param har Path to a [HAR](http://www.softwareishard.com/blog/har-12-spec) file with prerecorded network data. If `path` is a
     * relative path, then it is resolved relative to the current working directory.
     * @param options
     */
    routeFromHAR(har: string, options?: {
        /**
         * - If set to 'abort' any request not found in the HAR file will be aborted.
         * - If set to 'fallback' missing requests will be sent to the network.
         *
         * Defaults to abort.
         */
        notFound?: "abort"|"fallback";

        /**
         * If specified, updates the given HAR with the actual network information instead of serving from file. The file is
         * written to disk when
         * [browserContext.close([options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-close) is
         * called.
         */
        update?: boolean;

        /**
         * Optional setting to control resource content management. If `attach` is specified, resources are persisted as
         * separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.
         */
        updateContent?: "embed"|"attach";

        /**
         * When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page,
         * cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
         */
        updateMode?: "full"|"minimal";

        /**
         * A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the
         * pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.
         */
        url?: string|RegExp;
    }): Promise<void>;

    /**
     * Returns the buffer with the captured screenshot.
     * @param options
     */
    screenshot(options?: PageScreenshotOptions): Promise<Buffer>;

    /**
     * **NOTE** Use locator-based
     * [locator.selectOption(values[, options])](https://playwright.dev/docs/api/class-locator#locator-select-option)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method waits for an element matching `selector`, waits for [actionability](https://playwright.dev/docs/actionability) checks, waits
     * until all specified options are present in the `<select>` element and selects these options.
     *
     * If the target element is not a `<select>` element, this method throws an error. However, if the element is inside
     * the `<label>` element that has an associated
     * [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used
     * instead.
     *
     * Returns the array of option values that have been successfully selected.
     *
     * Triggers a `change` and `input` event once all the provided options have been selected.
     *
     * **Usage**
     *
     * ```js
     * // Single selection matching the value or label
     * page.selectOption('select#colors', 'blue');
     *
     * // single selection matching the label
     * page.selectOption('select#colors', { label: 'Blue' });
     *
     * // multiple selection
     * page.selectOption('select#colors', ['red', 'green', 'blue']);
     *
     * ```
     *
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param values Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise
     * only the first option matching one of the passed options is selected. String values are matching both values and
     * labels. Option is considered matching if all specified properties match.
     * @param options
     */
    selectOption(selector: string, values: null|string|ElementHandle|ReadonlyArray<string>|{
        /**
         * Matches by `option.value`. Optional.
         */
        value?: string;

        /**
         * Matches by `option.label`. Optional.
         */
        label?: string;

        /**
         * Matches by the index. Optional.
         */
        index?: number;
    }|ReadonlyArray<ElementHandle>|ReadonlyArray<{
        /**
         * Matches by `option.value`. Optional.
         */
        value?: string;

        /**
         * Matches by `option.label`. Optional.
         */
        label?: string;

        /**
         * Matches by the index. Optional.
         */
        index?: number;
    }>, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<Array<string>>;

    /**
     * **NOTE** Use locator-based
     * [locator.setChecked(checked[, options])](https://playwright.dev/docs/api/class-locator#locator-set-checked)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method checks or unchecks an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
     * 1. If the element already has the right checked state, this method returns immediately.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.mouse](https://playwright.dev/docs/api/class-page#page-mouse) to click in the center of the
     *    element.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
     * 1. Ensure that the element is now checked or unchecked. If not, this method throws.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param checked Whether to check or uncheck the checkbox.
     * @param options
     */
    setChecked(selector: string, checked: boolean, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * This method internally calls [document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write),
     * inheriting all its specific characteristics and behaviors.
     * @param html HTML markup to assign to the page.
     * @param options
     */
    setContent(html: string, options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<void>;

    /**
     * This setting will change the default maximum navigation time for the following methods and related shortcuts:
     * - [page.goBack([options])](https://playwright.dev/docs/api/class-page#page-go-back)
     * - [page.goForward([options])](https://playwright.dev/docs/api/class-page#page-go-forward)
     * - [page.goto(url[, options])](https://playwright.dev/docs/api/class-page#page-goto)
     * - [page.reload([options])](https://playwright.dev/docs/api/class-page#page-reload)
     * - [page.setContent(html[, options])](https://playwright.dev/docs/api/class-page#page-set-content)
     * - [page.waitForNavigation([options])](https://playwright.dev/docs/api/class-page#page-wait-for-navigation)
     * - [page.waitForURL(url[, options])](https://playwright.dev/docs/api/class-page#page-wait-for-url)
     *
     * **NOTE**
     * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
     * takes priority over
     * [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout),
     * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
     * and
     * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout).
     * @param timeout Maximum navigation time in milliseconds
     */
    setDefaultNavigationTimeout(timeout: number): void;

    /**
     * This setting will change the default maximum time for all the methods accepting `timeout` option.
     *
     * **NOTE**
     * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
     * takes priority over
     * [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout).
     * @param timeout Maximum time in milliseconds
     */
    setDefaultTimeout(timeout: number): void;

    /**
     * The extra HTTP headers will be sent with every request the page initiates.
     *
     * **NOTE**
     * [page.setExtraHTTPHeaders(headers)](https://playwright.dev/docs/api/class-page#page-set-extra-http-headers) does
     * not guarantee the order of headers in the outgoing requests.
     * @param headers An object containing additional HTTP headers to be sent with every request. All header values must be strings.
     */
    setExtraHTTPHeaders(headers: { [key: string]: string; }): Promise<void>;

    /**
     * **NOTE** Use locator-based
     * [locator.setInputFiles(files[, options])](https://playwright.dev/docs/api/class-locator#locator-set-input-files)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then
     * they are resolved relative to the current working directory. For empty array, clears the selected files. For inputs
     * with a `[webkitdirectory]` attribute, only a single directory path is supported.
     *
     * This method expects `selector` to point to an
     * [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside
     * the `<label>` element that has an associated
     * [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param files
     * @param options
     */
    setInputFiles(selector: string, files: string|ReadonlyArray<string>|{
        /**
         * File name
         */
        name: string;

        /**
         * File type
         */
        mimeType: string;

        /**
         * File content
         */
        buffer: Buffer;
    }|ReadonlyArray<{
        /**
         * File name
         */
        name: string;

        /**
         * File type
         */
        mimeType: string;

        /**
         * File content
         */
        buffer: Buffer;
    }>, options?: {
        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * In the case of multiple pages in a single browser, each page can have its own viewport size. However,
     * [browser.newContext([options])](https://playwright.dev/docs/api/class-browser#browser-new-context) allows to set
     * viewport size (and more) for all pages in the context at once.
     *
     * [page.setViewportSize(viewportSize)](https://playwright.dev/docs/api/class-page#page-set-viewport-size) will resize
     * the page. A lot of websites don't expect phones to change size, so you should set the viewport size before
     * navigating to the page.
     * [page.setViewportSize(viewportSize)](https://playwright.dev/docs/api/class-page#page-set-viewport-size) will also
     * reset `screen` size, use
     * [browser.newContext([options])](https://playwright.dev/docs/api/class-browser#browser-new-context) with `screen`
     * and `viewport` parameters if you need better control of these properties.
     *
     * **Usage**
     *
     * ```js
     * const page = await browser.newPage();
     * await page.setViewportSize({
     *   width: 640,
     *   height: 480,
     * });
     * await page.goto('https://example.com');
     * ```
     *
     * @param viewportSize
     */
    setViewportSize(viewportSize: {
        /**
         * page width in pixels.
         */
        width: number;

        /**
         * page height in pixels.
         */
        height: number;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.tap([options])](https://playwright.dev/docs/api/class-locator#locator-tap) instead. Read
     * more about [locators](https://playwright.dev/docs/locators).
     *
     * This method taps an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.touchscreen](https://playwright.dev/docs/api/class-page#page-touchscreen) to tap the center of the
     *    element, or the specified `position`.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     *
     * **NOTE** [page.tap(selector[, options])](https://playwright.dev/docs/api/class-page#page-tap) the method will throw
     * if `hasTouch` option of the browser context is false.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    tap(selector: string, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores
         * current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to
         * "Control" on Windows and Linux and to "Meta" on macOS.
         */
        modifiers?: Array<"Alt"|"Control"|"ControlOrMeta"|"Meta"|"Shift">;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based
     * [locator.textContent([options])](https://playwright.dev/docs/api/class-locator#locator-text-content) instead. Read
     * more about [locators](https://playwright.dev/docs/locators).
     *
     * Returns `element.textContent`.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    textContent(selector: string, options?: {
        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<null|string>;

    /**
     * Returns the page's title.
     */
    title(): Promise<string>;

    /**
     * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `page.type` can be used to
     * send fine-grained keyboard events. To fill values in form fields, use
     * [page.fill(selector, value[, options])](https://playwright.dev/docs/api/class-page#page-fill).
     *
     * To press a special key, like `Control` or `ArrowDown`, use
     * [keyboard.press(key[, options])](https://playwright.dev/docs/api/class-keyboard#keyboard-press).
     *
     * **Usage**
     * @deprecated In most cases, you should use
     * [locator.fill(value[, options])](https://playwright.dev/docs/api/class-locator#locator-fill) instead. You only need
     * to press keys one by one if there is special keyboard handling on the page - in this case use
     * [locator.pressSequentially(text[, options])](https://playwright.dev/docs/api/class-locator#locator-press-sequentially).
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param text A text to type into a focused element.
     * @param options
     */
    type(selector: string, text: string, options?: {
        /**
         * Time to wait between key presses in milliseconds. Defaults to 0.
         */
        delay?: number;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * **NOTE** Use locator-based [locator.uncheck([options])](https://playwright.dev/docs/api/class-locator#locator-uncheck)
     * instead. Read more about [locators](https://playwright.dev/docs/locators).
     *
     * This method unchecks an element matching `selector` by performing the following steps:
     * 1. Find an element matching `selector`. If there is none, wait until a matching element is attached to the DOM.
     * 1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is
     *    already unchecked, this method returns immediately.
     * 1. Wait for [actionability](https://playwright.dev/docs/actionability) checks on the matched element, unless `force` option is set. If
     *    the element is detached during the checks, the whole action is retried.
     * 1. Scroll the element into view if needed.
     * 1. Use [page.mouse](https://playwright.dev/docs/api/class-page#page-mouse) to click in the center of the
     *    element.
     * 1. Wait for initiated navigations to either succeed or fail, unless `noWaitAfter` option is set.
     * 1. Ensure that the element is now unchecked. If not, this method throws.
     *
     * When all steps combined have not finished during the specified `timeout`, this method throws a {@link
     * TimeoutError}. Passing zero timeout disables this.
     * @param selector A selector to search for an element. If there are multiple elements satisfying the selector, the first will be
     * used.
     * @param options
     */
    uncheck(selector: string, options?: {
        /**
         * Whether to bypass the [actionability](https://playwright.dev/docs/actionability) checks. Defaults to `false`.
         */
        force?: boolean;

        /**
         * Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You
         * can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as
         * navigating to inaccessible pages. Defaults to `false`.
         */
        noWaitAfter?: boolean;

        /**
         * A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of
         * the element.
         */
        position?: {
            x: number;

            y: number;
        };

        /**
         * When true, the call requires selector to resolve to a single element. If given selector resolves to more than one
         * element, the call throws an exception.
         */
        strict?: boolean;

        /**
         * Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout`
         * option in the config, or by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When set, this method only performs the [actionability](https://playwright.dev/docs/actionability) checks and skips the action. Defaults
         * to `false`. Useful to wait until the element is ready for the action without performing it.
         */
        trial?: boolean;
    }): Promise<void>;

    /**
     * Removes a route created with
     * [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route). When `handler` is not
     * specified, removes all routes for the `url`.
     * @param url A glob pattern, regex pattern or predicate receiving [URL] to match while routing.
     * @param handler Optional handler function to route the request.
     */
    unroute(url: string|RegExp|((url: URL) => boolean), handler?: ((route: Route, request: Request) => Promise<any>|any)): Promise<void>;

    /**
     * Removes all routes created with
     * [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) and
     * [page.routeFromHAR(har[, options])](https://playwright.dev/docs/api/class-page#page-route-from-har).
     * @param options
     */
    unrouteAll(options?: {
        /**
         * Specifies whether to wait for already running handlers and what to do if they throw errors:
         * - `'default'` - do not wait for current handler calls (if any) to finish, if unrouted handler throws, it may
         *   result in unhandled error
         * - `'wait'` - wait for current handler calls (if any) to finish
         * - `'ignoreErrors'` - do not wait for current handler calls (if any) to finish, all errors thrown by the handlers
         *   after unrouting are silently caught
         */
        behavior?: "wait"|"ignoreErrors"|"default";
    }): Promise<void>;

    url(): string;

    /**
     * Video object associated with this page.
     */
    video(): null|Video;

    viewportSize(): null|{
        /**
         * page width in pixels.
         */
        width: number;

        /**
         * page height in pixels.
         */
        height: number;
    };

    /**
     * Emitted when the page closes.
     */
    waitForEvent(event: 'close', optionsOrPredicate?: { predicate?: (page: Page) => boolean | Promise<boolean>, timeout?: number } | ((page: Page) => boolean | Promise<boolean>)): Promise<Page>;

    /**
     * Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.
     *
     * The arguments passed into `console.log` are available on the {@link ConsoleMessage} event handler argument.
     *
     * **Usage**
     *
     * ```js
     * page.on('console', async msg => {
     *   const values = [];
     *   for (const arg of msg.args())
     *     values.push(await arg.jsonValue());
     *   console.log(...values);
     * });
     * await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
     * ```
     *
     */
    waitForEvent(event: 'console', optionsOrPredicate?: { predicate?: (consoleMessage: ConsoleMessage) => boolean | Promise<boolean>, timeout?: number } | ((consoleMessage: ConsoleMessage) => boolean | Promise<boolean>)): Promise<ConsoleMessage>;

    /**
     * Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page
     * crashes, ongoing and subsequent operations will throw.
     *
     * The most common way to deal with crashes is to catch an exception:
     *
     * ```js
     * try {
     *   // Crash might happen during a click.
     *   await page.click('button');
     *   // Or while waiting for an event.
     *   await page.waitForEvent('popup');
     * } catch (e) {
     *   // When the page crashes, exception message contains 'crash'.
     * }
     * ```
     *
     */
    waitForEvent(event: 'crash', optionsOrPredicate?: { predicate?: (page: Page) => boolean | Promise<boolean>, timeout?: number } | ((page: Page) => boolean | Promise<boolean>)): Promise<Page>;

    /**
     * Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must**
     * either [dialog.accept([promptText])](https://playwright.dev/docs/api/class-dialog#dialog-accept) or
     * [dialog.dismiss()](https://playwright.dev/docs/api/class-dialog#dialog-dismiss) the dialog - otherwise the page
     * will [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking) waiting for the
     * dialog, and actions like click will never finish.
     *
     * **Usage**
     *
     * ```js
     * page.on('dialog', dialog => dialog.accept());
     * ```
     *
     * **NOTE** When no [page.on('dialog')](https://playwright.dev/docs/api/class-page#page-event-dialog) or
     * [browserContext.on('dialog')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-dialog)
     * listeners are present, all dialogs are automatically dismissed.
     */
    waitForEvent(event: 'dialog', optionsOrPredicate?: { predicate?: (dialog: Dialog) => boolean | Promise<boolean>, timeout?: number } | ((dialog: Dialog) => boolean | Promise<boolean>)): Promise<Dialog>;

    /**
     * Emitted when the JavaScript
     * [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) event is dispatched.
     */
    waitForEvent(event: 'domcontentloaded', optionsOrPredicate?: { predicate?: (page: Page) => boolean | Promise<boolean>, timeout?: number } | ((page: Page) => boolean | Promise<boolean>)): Promise<Page>;

    /**
     * Emitted when attachment download started. User can access basic file operations on downloaded content via the
     * passed {@link Download} instance.
     */
    waitForEvent(event: 'download', optionsOrPredicate?: { predicate?: (download: Download) => boolean | Promise<boolean>, timeout?: number } | ((download: Download) => boolean | Promise<boolean>)): Promise<Download>;

    /**
     * Emitted when a file chooser is supposed to appear, such as after clicking the  `<input type=file>`. Playwright can
     * respond to it via setting the input files using
     * [fileChooser.setFiles(files[, options])](https://playwright.dev/docs/api/class-filechooser#file-chooser-set-files)
     * that can be uploaded after that.
     *
     * ```js
     * page.on('filechooser', async fileChooser => {
     *   await fileChooser.setFiles(path.join(__dirname, '/tmp/myfile.pdf'));
     * });
     * ```
     *
     */
    waitForEvent(event: 'filechooser', optionsOrPredicate?: { predicate?: (fileChooser: FileChooser) => boolean | Promise<boolean>, timeout?: number } | ((fileChooser: FileChooser) => boolean | Promise<boolean>)): Promise<FileChooser>;

    /**
     * Emitted when a frame is attached.
     */
    waitForEvent(event: 'frameattached', optionsOrPredicate?: { predicate?: (frame: Frame) => boolean | Promise<boolean>, timeout?: number } | ((frame: Frame) => boolean | Promise<boolean>)): Promise<Frame>;

    /**
     * Emitted when a frame is detached.
     */
    waitForEvent(event: 'framedetached', optionsOrPredicate?: { predicate?: (frame: Frame) => boolean | Promise<boolean>, timeout?: number } | ((frame: Frame) => boolean | Promise<boolean>)): Promise<Frame>;

    /**
     * Emitted when a frame is navigated to a new url.
     */
    waitForEvent(event: 'framenavigated', optionsOrPredicate?: { predicate?: (frame: Frame) => boolean | Promise<boolean>, timeout?: number } | ((frame: Frame) => boolean | Promise<boolean>)): Promise<Frame>;

    /**
     * Emitted when the JavaScript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) event is dispatched.
     */
    waitForEvent(event: 'load', optionsOrPredicate?: { predicate?: (page: Page) => boolean | Promise<boolean>, timeout?: number } | ((page: Page) => boolean | Promise<boolean>)): Promise<Page>;

    /**
     * Emitted when an uncaught exception happens within the page.
     *
     * ```js
     * // Log all uncaught errors to the terminal
     * page.on('pageerror', exception => {
     *   console.log(`Uncaught exception: "${exception}"`);
     * });
     *
     * // Navigate to a page with an exception.
     * await page.goto('data:text/html,<script>throw new Error("Test")</script>');
     * ```
     *
     */
    waitForEvent(event: 'pageerror', optionsOrPredicate?: { predicate?: (error: Error) => boolean | Promise<boolean>, timeout?: number } | ((error: Error) => boolean | Promise<boolean>)): Promise<Error>;

    /**
     * Emitted when the page opens a new tab or window. This event is emitted in addition to the
     * [browserContext.on('page')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-page), but
     * only for popups relevant to this page.
     *
     * The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
     * popup with `window.open('http://example.com')`, this event will fire when the network request to
     * "http://example.com" is done and its response has started loading in the popup. If you would like to route/listen
     * to this network request, use
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
     * and
     * [browserContext.on('request')](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-request)
     * respectively instead of similar methods on the {@link Page}.
     *
     * ```js
     * // Start waiting for popup before clicking. Note no await.
     * const popupPromise = page.waitForEvent('popup');
     * await page.getByText('open the popup').click();
     * const popup = await popupPromise;
     * console.log(await popup.evaluate('location.href'));
     * ```
     *
     * **NOTE** Use
     * [page.waitForLoadState([state, options])](https://playwright.dev/docs/api/class-page#page-wait-for-load-state) to
     * wait until the page gets to a particular state (you should not need it in most cases).
     */
    waitForEvent(event: 'popup', optionsOrPredicate?: { predicate?: (page: Page) => boolean | Promise<boolean>, timeout?: number } | ((page: Page) => boolean | Promise<boolean>)): Promise<Page>;

    /**
     * Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests,
     * see [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route) or
     * [browserContext.route(url, handler[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-route).
     */
    waitForEvent(event: 'request', optionsOrPredicate?: { predicate?: (request: Request) => boolean | Promise<boolean>, timeout?: number } | ((request: Request) => boolean | Promise<boolean>)): Promise<Request>;

    /**
     * Emitted when a request fails, for example by timing out.
     *
     * ```js
     * page.on('requestfailed', request => {
     *   console.log(request.url() + ' ' + request.failure().errorText);
     * });
     * ```
     *
     * **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request
     * will complete with
     * [page.on('requestfinished')](https://playwright.dev/docs/api/class-page#page-event-request-finished) event and not
     * with [page.on('requestfailed')](https://playwright.dev/docs/api/class-page#page-event-request-failed). A request
     * will only be considered failed when the client cannot get an HTTP response from the server, e.g. due to network
     * error net::ERR_FAILED.
     */
    waitForEvent(event: 'requestfailed', optionsOrPredicate?: { predicate?: (request: Request) => boolean | Promise<boolean>, timeout?: number } | ((request: Request) => boolean | Promise<boolean>)): Promise<Request>;

    /**
     * Emitted when a request finishes successfully after downloading the response body. For a successful response, the
     * sequence of events is `request`, `response` and `requestfinished`.
     */
    waitForEvent(event: 'requestfinished', optionsOrPredicate?: { predicate?: (request: Request) => boolean | Promise<boolean>, timeout?: number } | ((request: Request) => boolean | Promise<boolean>)): Promise<Request>;

    /**
     * Emitted when [response] status and headers are received for a request. For a successful response, the sequence of
     * events is `request`, `response` and `requestfinished`.
     */
    waitForEvent(event: 'response', optionsOrPredicate?: { predicate?: (response: Response) => boolean | Promise<boolean>, timeout?: number } | ((response: Response) => boolean | Promise<boolean>)): Promise<Response>;

    /**
     * Emitted when {@link WebSocket} request is sent.
     */
    waitForEvent(event: 'websocket', optionsOrPredicate?: { predicate?: (webSocket: WebSocket) => boolean | Promise<boolean>, timeout?: number } | ((webSocket: WebSocket) => boolean | Promise<boolean>)): Promise<WebSocket>;

    /**
     * Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned
     * by the page.
     */
    waitForEvent(event: 'worker', optionsOrPredicate?: { predicate?: (worker: Worker) => boolean | Promise<boolean>, timeout?: number } | ((worker: Worker) => boolean | Promise<boolean>)): Promise<Worker>;


    /**
     * Returns when the required load state has been reached.
     *
     * This resolves when the page reaches a required load state, `load` by default. The navigation must have been
     * committed when this method is called. If current document has already reached the required state, resolves
     * immediately.
     *
     * **NOTE** Most of the time, this method is not needed because Playwright
     * [auto-waits before every action](https://playwright.dev/docs/actionability).
     *
     * **Usage**
     *
     * ```js
     * await page.getByRole('button').click(); // Click triggers navigation.
     * await page.waitForLoadState(); // The promise resolves after 'load' event.
     * ```
     *
     * ```js
     * const popupPromise = page.waitForEvent('popup');
     * await page.getByRole('button').click(); // Click triggers a popup.
     * const popup = await popupPromise;
     * await popup.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
     * console.log(await popup.title()); // Popup is ready to use.
     * ```
     *
     * @param state Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current
     * document, the method resolves immediately. Can be one of:
     * - `'load'` - wait for the `load` event to be fired.
     * - `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
     * - `'networkidle'` - **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use
     * this method for testing, rely on web assertions to assess readiness instead.
     * @param options
     */
    waitForLoadState(state?: "load"|"domcontentloaded"|"networkidle", options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<void>;

    /**
     * Waits for the main frame navigation and returns the main resource response. In case of multiple redirects, the
     * navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or
     * navigation due to History API usage, the navigation will resolve with `null`.
     *
     * **Usage**
     *
     * This resolves when the page navigates to a new URL or reloads. It is useful for when you run code which will
     * indirectly cause the page to navigate. e.g. The click target has an `onclick` handler that triggers navigation from
     * a `setTimeout`. Consider this example:
     *
     * ```js
     * // Start waiting for navigation before clicking. Note no await.
     * const navigationPromise = page.waitForNavigation();
     * await page.getByText('Navigate after timeout').click();
     * await navigationPromise;
     * ```
     *
     * **NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL
     * is considered a navigation.
     * @deprecated This method is inherently racy, please use
     * [page.waitForURL(url[, options])](https://playwright.dev/docs/api/class-page#page-wait-for-url) instead.
     * @param options
     */
    waitForNavigation(options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * A glob pattern, regex pattern or predicate receiving [URL] to match while waiting for the navigation. Note that if
         * the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly
         * equal to the string.
         */
        url?: string|RegExp|((url: URL) => boolean);

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<null|Response>;

    /**
     * Waits for the matching request and returns it. See [waiting for event](https://playwright.dev/docs/events#waiting-for-event) for more
     * details about events.
     *
     * **Usage**
     *
     * ```js
     * // Start waiting for request before clicking. Note no await.
     * const requestPromise = page.waitForRequest('https://example.com/resource');
     * await page.getByText('trigger request').click();
     * const request = await requestPromise;
     *
     * // Alternative way with a predicate. Note no await.
     * const requestPromise = page.waitForRequest(request =>
     *   request.url() === 'https://example.com' && request.method() === 'GET',
     * );
     * await page.getByText('trigger request').click();
     * const request = await requestPromise;
     * ```
     *
     * @param urlOrPredicate Request URL string, regex or predicate receiving {@link Request} object.
     * @param options
     */
    waitForRequest(urlOrPredicate: string|RegExp|((request: Request) => boolean|Promise<boolean>), options?: {
        /**
         * Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can
         * be changed by using the
         * [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) method.
         */
        timeout?: number;
    }): Promise<Request>;

    /**
     * Returns the matched response. See [waiting for event](https://playwright.dev/docs/events#waiting-for-event) for more details about
     * events.
     *
     * **Usage**
     *
     * ```js
     * // Start waiting for response before clicking. Note no await.
     * const responsePromise = page.waitForResponse('https://example.com/resource');
     * await page.getByText('trigger response').click();
     * const response = await responsePromise;
     *
     * // Alternative way with a predicate. Note no await.
     * const responsePromise = page.waitForResponse(response =>
     *   response.url() === 'https://example.com' && response.status() === 200
     *       && response.request().method() === 'GET'
     * );
     * await page.getByText('trigger response').click();
     * const response = await responsePromise;
     * ```
     *
     * @param urlOrPredicate Request URL string, regex or predicate receiving {@link Response} object. When a `baseURL` via the context options
     * was provided and the passed URL is a path, it gets merged via the
     * [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
     * @param options
     */
    waitForResponse(urlOrPredicate: string|RegExp|((response: Response) => boolean|Promise<boolean>), options?: {
        /**
         * Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can
         * be changed by using the
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;
    }): Promise<Response>;

    /**
     * **NOTE** Never wait for timeout in production. Tests that wait for time are inherently flaky. Use {@link Locator} actions
     * and web assertions that wait automatically.
     *
     * Waits for the given `timeout` in milliseconds.
     *
     * Note that `page.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going
     * to be flaky. Use signals such as network events, selectors becoming visible and others instead.
     *
     * **Usage**
     *
     * ```js
     * // wait for 1 second
     * await page.waitForTimeout(1000);
     * ```
     *
     * @param timeout A timeout to wait for
     */
    waitForTimeout(timeout: number): Promise<void>;

    /**
     * Waits for the main frame to navigate to the given URL.
     *
     * **Usage**
     *
     * ```js
     * await page.click('a.delayed-navigation'); // Clicking the link will indirectly cause a navigation
     * await page.waitForURL('**\/target.html');
     * ```
     *
     * @param url A glob pattern, regex pattern or predicate receiving [URL] to match while waiting for the navigation. Note that if
     * the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly
     * equal to the string.
     * @param options
     */
    waitForURL(url: string|RegExp|((url: URL) => boolean), options?: {
        /**
         * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
         * `navigationTimeout` option in the config, or by using the
         * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
         * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
         * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
         * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
         */
        timeout?: number;

        /**
         * When to consider operation succeeded, defaults to `load`. Events can be either:
         * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
         * - `'load'` - consider operation to be finished when the `load` event is fired.
         * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
         *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
         * - `'commit'` - consider operation to be finished when network response is received and the document started
         *   loading.
         */
        waitUntil?: "load"|"domcontentloaded"|"networkidle"|"commit";
    }): Promise<void>;

    /**
     * This method returns all of the dedicated
     * [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page.
     *
     * **NOTE** This does not contain ServiceWorkers
     */
    workers(): Array<Worker>;

    /**
     * @deprecated This property is discouraged. Please use other libraries such as [Axe](https://www.deque.com/axe/) if you need to
     * test page accessibility. See our Node.js [guide](https://playwright.dev/docs/accessibility-testing) for integration
     * with Axe.
     */
    accessibility: Accessibility;

    /**
     * Playwright has ability to mock clock and passage of time.
     */
    clock: Clock;

    /**
     * **NOTE** Only available for Chromium atm.
     *
     * Browser-specific Coverage implementation. See {@link Coverage} for more details.
     */
    coverage: Coverage;

    keyboard: Keyboard;

    mouse: Mouse;

    /**
     * API testing helper associated with this page. This method returns the same instance as
     * [browserContext.request](https://playwright.dev/docs/api/class-browsercontext#browser-context-request) on the
     * page's context. See
     * [browserContext.request](https://playwright.dev/docs/api/class-browsercontext#browser-context-request) for more
     * details.
     */
    request: APIRequestContext;

    touchscreen: Touchscreen;

    [Symbol.asyncDispose](): Promise<void>;
}