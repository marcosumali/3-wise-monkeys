
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.35.0 */

    function create_fragment$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 256) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[8], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $base;
    	let $location;
    	let $routes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Router", slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, "routes");
    	component_subscribe($$self, routes, value => $$invalidate(7, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(6, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(5, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ["basepath", "url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("$$scope" in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$base,
    		$location,
    		$routes
    	});

    	$$self.$inject_state = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 32) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 192) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$base,
    		$location,
    		$routes,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.35.0 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, routeParams, $location*/ 532) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Route", slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, "activeRoute");
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ("path" in $$props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$props) $$invalidate(0, component = $$new_props.component);
    		if ("routeParams" in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ("routeProps" in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.35.0 */
    const file$6 = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$6(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$6, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32768) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[15], dirty, null, null);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $base;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Link", slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(13, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(14, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("to" in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ("replace" in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ("state" in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ("getProps" in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ("$$scope" in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		$base,
    		$location,
    		ariaCurrent
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("to" in $$props) $$invalidate(7, to = $$new_props.to);
    		if ("replace" in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ("state" in $$props) $$invalidate(9, state = $$new_props.state);
    		if ("getProps" in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ("href" in $$props) $$invalidate(0, href = $$new_props.href);
    		if ("isPartiallyCurrent" in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ("isCurrent" in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ("props" in $$props) $$invalidate(1, props = $$new_props.props);
    		if ("ariaCurrent" in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 8320) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 16385) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 16385) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 23553) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$base,
    		$location,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/Home/index.home.svelte generated by Svelte v3.35.0 */
    const file$5 = "src/views/Home/index.home.svelte";

    // (35:6) {#if hasSubmitted && name.length <= 0}
    function create_if_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "My apologies, but your name can't be empty...";
    			attr_dev(div, "class", "error-text svelte-1avq1b3");
    			add_location(div, file$5, 35, 8, 1103);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(35:6) {#if hasSubmitted && name.length <= 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div7;
    	let div6;
    	let div0;
    	let wired_card;
    	let h1;
    	let t1;
    	let div2;
    	let div1;
    	let wired_input;
    	let t2;
    	let wired_button;
    	let t4;
    	let t5;
    	let div5;
    	let div3;
    	let t7;
    	let div4;
    	let mounted;
    	let dispose;
    	let if_block = /*hasSubmitted*/ ctx[1] && /*name*/ ctx[2].length <= 0 && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div0 = element("div");
    			wired_card = element("wired-card");
    			h1 = element("h1");
    			h1.textContent = "Three Wise Monkeys";
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			wired_input = element("wired-input");
    			t2 = space();
    			wired_button = element("wired-button");
    			wired_button.textContent = "START";
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			div5 = element("div");
    			div3 = element("div");
    			div3.textContent = "Dear Young Traveler,";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "Please tell me your name before we start the quest...";
    			attr_dev(h1, "class", "svelte-1avq1b3");
    			add_location(h1, file$5, 26, 8, 680);
    			set_custom_element_data(wired_card, "elevation", "5");
    			set_custom_element_data(wired_card, "class", "wired svelte-1avq1b3");
    			add_location(wired_card, file$5, 25, 6, 631);
    			attr_dev(div0, "class", "container-nowrap-center svelte-1avq1b3");
    			add_location(div0, file$5, 24, 4, 587);
    			set_custom_element_data(wired_input, "type", "text");
    			set_custom_element_data(wired_input, "placeholder", "Your Name");
    			set_custom_element_data(wired_input, "class", "name svelte-1avq1b3");
    			add_location(wired_input, file$5, 31, 8, 877);
    			set_custom_element_data(wired_button, "class", "button");
    			add_location(wired_button, file$5, 32, 8, 967);
    			attr_dev(div1, "class", "container-wrap-center svelte-1avq1b3");
    			set_style(div1, "width", "100%");
    			add_location(div1, file$5, 30, 6, 813);
    			attr_dev(div2, "class", "container-wrap-center svelte-1avq1b3");
    			set_style(div2, "margin-bottom", "16px");
    			add_location(div2, file$5, 29, 4, 743);
    			set_style(div3, "margin-bottom", "4px");
    			set_style(div3, "width", "100%");
    			set_style(div3, "text-align", "center");
    			add_location(div3, file$5, 39, 6, 1253);
    			add_location(div4, file$5, 40, 6, 1352);
    			attr_dev(div5, "class", "container-wrap-center text svelte-1avq1b3");
    			add_location(div5, file$5, 38, 4, 1206);
    			attr_dev(div6, "class", "container svelte-1avq1b3");
    			add_location(div6, file$5, 23, 2, 559);
    			attr_dev(div7, "class", "page svelte-1avq1b3");
    			add_location(div7, file$5, 22, 0, 538);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div0);
    			append_dev(div0, wired_card);
    			append_dev(wired_card, h1);
    			append_dev(div6, t1);
    			append_dev(div6, div2);
    			append_dev(div2, div1);
    			append_dev(div1, wired_input);
    			/*wired_input_binding*/ ctx[4](wired_input);
    			append_dev(div1, t2);
    			append_dev(div1, wired_button);
    			append_dev(div2, t4);
    			if (if_block) if_block.m(div2, null);
    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div5, t7);
    			append_dev(div5, div4);

    			if (!mounted) {
    				dispose = listen_dev(wired_button, "click", /*saveName*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*hasSubmitted*/ ctx[1] && /*name*/ ctx[2].length <= 0) {
    				if (if_block) ; else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(div2, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			/*wired_input_binding*/ ctx[4](null);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Home", slots, []);
    	let input;
    	let hasSubmitted = false;
    	let name = input ? input.value : "";

    	const saveName = () => {
    		$$invalidate(1, hasSubmitted = true);

    		// Input must be paired with variables using bind:value
    		// Since we're using Wired.JS, we can't do this atm
    		// So we must revalue using mannual invocation
    		$$invalidate(2, name = input.value);

    		if (name.length > 0) {
    			// Save name
    			localStorage.setItem("name", name);

    			// Navigate to quiz
    			navigate("/quiz");
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	function wired_input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			input = $$value;
    			$$invalidate(0, input);
    		});
    	}

    	$$self.$capture_state = () => ({
    		navigate,
    		input,
    		hasSubmitted,
    		name,
    		saveName
    	});

    	$$self.$inject_state = $$props => {
    		if ("input" in $$props) $$invalidate(0, input = $$props.input);
    		if ("hasSubmitted" in $$props) $$invalidate(1, hasSubmitted = $$props.hasSubmitted);
    		if ("name" in $$props) $$invalidate(2, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [input, hasSubmitted, name, saveName, wired_input_binding];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const index = writable(0);
    const answers = writable([false, false, false]);

    const students = ['Mizaru 🙈', 'Kikazaru 🙉', 'Iwazaru 🙊'];

    const disabilities = ['see', 'hear', 'speak'];

    /* src/views/Quiz/components/card.svelte generated by Svelte v3.35.0 */
    const file$4 = "src/views/Quiz/components/card.svelte";

    function create_fragment$4(ctx) {
    	let div3;
    	let wired_card0;
    	let h1;
    	let t2;
    	let div0;
    	let t3;
    	let t4_value = students[/*$index*/ ctx[1]] + "";
    	let t4;
    	let t5;
    	let t6_value = disabilities[/*$index*/ ctx[1]] + "";
    	let t6;
    	let t7;
    	let t8;
    	let div1;
    	let wired_card1;
    	let h20;

    	let t9_value = (/*quizes*/ ctx[0].length > 0
    	? /*quizes*/ ctx[0][/*$index*/ ctx[1]].question
    	: "") + "";

    	let t9;
    	let t10;
    	let div2;
    	let wired_button0;
    	let h21;
    	let t12;
    	let wired_button1;
    	let h22;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			wired_card0 = element("wired-card");
    			h1 = element("h1");
    			h1.textContent = `Hi, ${/*name*/ ctx[2]}`;
    			t2 = space();
    			div0 = element("div");
    			t3 = text("My name is ");
    			t4 = text(t4_value);
    			t5 = text(" and I don't ");
    			t6 = text(t6_value);
    			t7 = text(" no evil. Please assist me in collecting wisdom of the human world by answering the question.");
    			t8 = space();
    			div1 = element("div");
    			wired_card1 = element("wired-card");
    			h20 = element("h2");
    			t9 = text(t9_value);
    			t10 = space();
    			div2 = element("div");
    			wired_button0 = element("wired-button");
    			h21 = element("h2");
    			h21.textContent = "FALSE";
    			t12 = space();
    			wired_button1 = element("wired-button");
    			h22 = element("h2");
    			h22.textContent = "TRUE";
    			attr_dev(h1, "class", "svelte-d1tegk");
    			add_location(h1, file$4, 27, 4, 737);
    			attr_dev(div0, "class", "text svelte-d1tegk");
    			add_location(div0, file$4, 28, 4, 761);
    			set_custom_element_data(wired_card0, "elevation", "5");
    			set_custom_element_data(wired_card0, "class", "wired svelte-d1tegk");
    			add_location(wired_card0, file$4, 26, 2, 692);
    			attr_dev(h20, "class", "svelte-d1tegk");
    			add_location(h20, file$4, 32, 6, 1050);
    			set_custom_element_data(wired_card1, "elevation", "3");
    			set_custom_element_data(wired_card1, "class", "wired svelte-d1tegk");
    			add_location(wired_card1, file$4, 31, 4, 1003);
    			attr_dev(div1, "class", "container-nowrap-center svelte-d1tegk");
    			add_location(div1, file$4, 30, 2, 961);
    			attr_dev(h21, "class", "svelte-d1tegk");
    			add_location(h21, file$4, 36, 73, 1250);
    			set_custom_element_data(wired_button0, "class", "button svelte-d1tegk");
    			add_location(wired_button0, file$4, 36, 4, 1181);
    			attr_dev(h22, "class", "svelte-d1tegk");
    			add_location(h22, file$4, 37, 72, 1352);
    			set_custom_element_data(wired_button1, "class", "button svelte-d1tegk");
    			add_location(wired_button1, file$4, 37, 4, 1284);
    			attr_dev(div2, "class", "container-nowrap-center svelte-d1tegk");
    			add_location(div2, file$4, 35, 2, 1139);
    			add_location(div3, file$4, 25, 0, 684);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, wired_card0);
    			append_dev(wired_card0, h1);
    			append_dev(wired_card0, t2);
    			append_dev(wired_card0, div0);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div0, t5);
    			append_dev(div0, t6);
    			append_dev(div0, t7);
    			append_dev(div3, t8);
    			append_dev(div3, div1);
    			append_dev(div1, wired_card1);
    			append_dev(wired_card1, h20);
    			append_dev(h20, t9);
    			append_dev(div3, t10);
    			append_dev(div3, div2);
    			append_dev(div2, wired_button0);
    			append_dev(wired_button0, h21);
    			append_dev(div2, t12);
    			append_dev(div2, wired_button1);
    			append_dev(wired_button1, h22);

    			if (!mounted) {
    				dispose = [
    					listen_dev(wired_button0, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(wired_button1, "click", /*click_handler_1*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$index*/ 2 && t4_value !== (t4_value = students[/*$index*/ ctx[1]] + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$index*/ 2 && t6_value !== (t6_value = disabilities[/*$index*/ ctx[1]] + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*quizes, $index*/ 3 && t9_value !== (t9_value = (/*quizes*/ ctx[0].length > 0
    			? /*quizes*/ ctx[0][/*$index*/ ctx[1]].question
    			: "") + "")) set_data_dev(t9, t9_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $index;
    	let $answers;
    	validate_store(index, "index");
    	component_subscribe($$self, index, $$value => $$invalidate(1, $index = $$value));
    	validate_store(answers, "answers");
    	component_subscribe($$self, answers, $$value => $$invalidate(6, $answers = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Card", slots, []);
    	let { quizes } = $$props;
    	const name = localStorage.getItem("name") || "Young Traveller";

    	const handleAnswers = answer => {
    		// If end, go to end
    		if ($index >= quizes.length - 1) {
    			navigate("/end");
    		}

    		// Update answer
    		if (quizes[$index].correct_answer.toLowerCase() === answer) {
    			let updateAnswers = [...$answers];
    			updateAnswers[$index] = true;
    			answers.update(answers => updateAnswers);
    		}

    		// Update index
    		index.update(n => n + 1);
    	};

    	const writable_props = ["quizes"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => handleAnswers("false");
    	const click_handler_1 = () => handleAnswers("true");

    	$$self.$$set = $$props => {
    		if ("quizes" in $$props) $$invalidate(0, quizes = $$props.quizes);
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		index,
    		answers,
    		students,
    		disabilities,
    		quizes,
    		name,
    		handleAnswers,
    		$index,
    		$answers
    	});

    	$$self.$inject_state = $$props => {
    		if ("quizes" in $$props) $$invalidate(0, quizes = $$props.quizes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [quizes, $index, name, handleAnswers, click_handler, click_handler_1];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { quizes: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*quizes*/ ctx[0] === undefined && !("quizes" in props)) {
    			console.warn("<Card> was created without expected prop 'quizes'");
    		}
    	}

    	get quizes() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set quizes(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/Quiz/index.quiz.svelte generated by Svelte v3.35.0 */
    const file$3 = "src/views/Quiz/index.quiz.svelte";

    // (36:47) 
    function create_if_block_2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "ERROR !";
    			set_style(div, "text-align", "center");
    			add_location(div, file$3, 36, 6, 996);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(36:47) ",
    		ctx
    	});

    	return block;
    }

    // (34:46) 
    function create_if_block_1(ctx) {
    	let card;
    	let current;
    	const card_spread_levels = [/*cardDetails*/ ctx[2]];
    	let card_props = {};

    	for (let i = 0; i < card_spread_levels.length; i += 1) {
    		card_props = assign(card_props, card_spread_levels[i]);
    	}

    	card = new Card({ props: card_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = (dirty & /*cardDetails*/ 4)
    			? get_spread_update(card_spread_levels, [get_spread_object(/*cardDetails*/ ctx[2])])
    			: {};

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(34:46) ",
    		ctx
    	});

    	return block;
    }

    // (29:4) {#if isLoading && quizes.length <= 0}
    function create_if_block$1(ctx) {
    	let div1;
    	let wired_spinner;
    	let t0;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			wired_spinner = element("wired-spinner");
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "Loading...";
    			set_custom_element_data(wired_spinner, "class", "spinner");
    			set_custom_element_data(wired_spinner, "spinning", true);
    			set_custom_element_data(wired_spinner, "duration", "1000");
    			add_location(wired_spinner, file$3, 30, 8, 741);
    			add_location(div0, file$3, 31, 8, 829);
    			add_location(div1, file$3, 29, 6, 727);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, wired_spinner);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(29:4) {#if isLoading && quizes.length <= 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_if_block_1, create_if_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isLoading*/ ctx[1] && /*quizes*/ ctx[0].length <= 0) return 0;
    		if (!/*isLoading*/ ctx[1] && /*quizes*/ ctx[0].length > 0) return 1;
    		if (!/*isLoading*/ ctx[1] && /*quizes*/ ctx[0].length <= 0) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "container svelte-1qyr70z");
    			add_location(div0, file$3, 27, 2, 655);
    			attr_dev(div1, "class", "page svelte-1qyr70z");
    			add_location(div1, file$3, 26, 0, 634);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(div0, null);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Quiz", slots, []);
    	let quizes = [];
    	let isLoading = false;
    	const cardDetails = { quizes };
    	const quizURL = `https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=boolean`;

    	const getQuizes = () => {
    		$$invalidate(1, isLoading = true);

    		setTimeout(
    			async () => {
    				const res = await fetch(quizURL).then(res => res.json());

    				// Update variables
    				$$invalidate(0, quizes = await res.results);

    				$$invalidate(2, cardDetails.quizes = quizes, cardDetails);

    				if (quizes.length > 0) {
    					$$invalidate(1, isLoading = false);
    				}
    			},
    			1000
    		);
    	};

    	onMount(() => getQuizes());
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Quiz> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		Card,
    		quizes,
    		isLoading,
    		cardDetails,
    		quizURL,
    		getQuizes
    	});

    	$$self.$inject_state = $$props => {
    		if ("quizes" in $$props) $$invalidate(0, quizes = $$props.quizes);
    		if ("isLoading" in $$props) $$invalidate(1, isLoading = $$props.isLoading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [quizes, isLoading, cardDetails];
    }

    class Quiz extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quiz",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/views/End/index.svelte generated by Svelte v3.35.0 */
    const file$2 = "src/views/End/index.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (14:12) {:else}
    function create_else_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "❌ ";
    			add_location(div, file$2, 14, 14, 440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(14:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:12) {#if answer}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "⭕ ";
    			add_location(div, file$2, 12, 14, 388);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(12:12) {#if answer}",
    		ctx
    	});

    	return block;
    }

    // (11:10) {#each $answers as answer}
    function create_each_block(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*answer*/ ctx[1]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(11:10) {#each $answers as answer}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div4;
    	let div3;
    	let div2;
    	let wired_card;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let h1;
    	let each_value = /*$answers*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			wired_card = element("wired-card");
    			div0 = element("div");
    			div0.textContent = "🙈 🙉 🙊";
    			t1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			h1 = element("h1");
    			h1.textContent = "Thank You";
    			attr_dev(div0, "class", "container-nowrap-center svelte-k6kqzt");
    			add_location(div0, file$2, 8, 8, 206);
    			attr_dev(div1, "class", "container-nowrap-center svelte-k6kqzt");
    			add_location(div1, file$2, 9, 8, 274);
    			attr_dev(h1, "class", "svelte-k6kqzt");
    			add_location(h1, file$2, 18, 8, 517);
    			set_custom_element_data(wired_card, "elevation", "5");
    			set_custom_element_data(wired_card, "class", "wired");
    			add_location(wired_card, file$2, 7, 6, 157);
    			attr_dev(div2, "class", "container-nowrap-center svelte-k6kqzt");
    			add_location(div2, file$2, 6, 4, 113);
    			attr_dev(div3, "class", "container svelte-k6kqzt");
    			add_location(div3, file$2, 5, 2, 85);
    			attr_dev(div4, "class", "page svelte-k6kqzt");
    			add_location(div4, file$2, 4, 0, 64);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, wired_card);
    			append_dev(wired_card, div0);
    			append_dev(wired_card, t1);
    			append_dev(wired_card, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(wired_card, t2);
    			append_dev(wired_card, h1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$answers*/ 1) {
    				each_value = /*$answers*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $answers;
    	validate_store(answers, "answers");
    	component_subscribe($$self, answers, $$value => $$invalidate(0, $answers = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("End", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<End> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ answers, $answers });
    	return [$answers];
    }

    class End extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "End",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/views/NotFound/index.svelte generated by Svelte v3.35.0 */

    const file$1 = "src/views/NotFound/index.svelte";

    function create_fragment$1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let wired_card;
    	let h10;
    	let t1;
    	let h11;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			wired_card = element("wired-card");
    			h10 = element("h1");
    			h10.textContent = "ERROR #404";
    			t1 = space();
    			h11 = element("h1");
    			h11.textContent = "Page not found...";
    			attr_dev(h10, "class", "svelte-k6kqzt");
    			add_location(h10, file$1, 4, 8, 142);
    			attr_dev(h11, "class", "svelte-k6kqzt");
    			add_location(h11, file$1, 5, 8, 170);
    			set_custom_element_data(wired_card, "elevation", "5");
    			set_custom_element_data(wired_card, "class", "wired");
    			add_location(wired_card, file$1, 3, 6, 93);
    			attr_dev(div0, "class", "container-nowrap-center svelte-k6kqzt");
    			add_location(div0, file$1, 2, 4, 49);
    			attr_dev(div1, "class", "container svelte-k6kqzt");
    			add_location(div1, file$1, 1, 2, 21);
    			attr_dev(div2, "class", "page svelte-k6kqzt");
    			add_location(div2, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, wired_card);
    			append_dev(wired_card, h10);
    			append_dev(wired_card, t1);
    			append_dev(wired_card, h11);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("NotFound", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NotFound> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class NotFound extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotFound",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * True if the custom elements polyfill is in use.
     */
    const isCEPolyfill = typeof window !== 'undefined' &&
        window.customElements != null &&
        window.customElements.polyfillWrapFlushCallback !==
            undefined;
    /**
     * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
     * `container`.
     */
    const removeNodes = (container, start, end = null) => {
        while (start !== end) {
            const n = start.nextSibling;
            container.removeChild(start);
            start = n;
        }
    };

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * An expression marker with embedded unique key to avoid collision with
     * possible text in templates.
     */
    const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
    /**
     * An expression marker used text-positions, multi-binding attributes, and
     * attributes with markup-like text values.
     */
    const nodeMarker = `<!--${marker}-->`;
    const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
    /**
     * Suffix appended to all bound attribute names.
     */
    const boundAttributeSuffix = '$lit$';
    /**
     * An updatable Template that tracks the location of dynamic parts.
     */
    class Template {
        constructor(result, element) {
            this.parts = [];
            this.element = element;
            const nodesToRemove = [];
            const stack = [];
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
            const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            // Keeps track of the last index associated with a part. We try to delete
            // unnecessary nodes, but we never want to associate two different parts
            // to the same index. They must have a constant node between.
            let lastPartIndex = 0;
            let index = -1;
            let partIndex = 0;
            const { strings, values: { length } } = result;
            while (partIndex < length) {
                const node = walker.nextNode();
                if (node === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    continue;
                }
                index++;
                if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                    if (node.hasAttributes()) {
                        const attributes = node.attributes;
                        const { length } = attributes;
                        // Per
                        // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                        // attributes are not guaranteed to be returned in document order.
                        // In particular, Edge/IE can return them out of order, so we cannot
                        // assume a correspondence between part index and attribute index.
                        let count = 0;
                        for (let i = 0; i < length; i++) {
                            if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                                count++;
                            }
                        }
                        while (count-- > 0) {
                            // Get the template literal section leading up to the first
                            // expression in this attribute
                            const stringForPart = strings[partIndex];
                            // Find the attribute name
                            const name = lastAttributeNameRegex.exec(stringForPart)[2];
                            // Find the corresponding attribute
                            // All bound attributes have had a suffix added in
                            // TemplateResult#getHTML to opt out of special attribute
                            // handling. To look up the attribute value we also need to add
                            // the suffix.
                            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                            const attributeValue = node.getAttribute(attributeLookupName);
                            node.removeAttribute(attributeLookupName);
                            const statics = attributeValue.split(markerRegex);
                            this.parts.push({ type: 'attribute', index, name, strings: statics });
                            partIndex += statics.length - 1;
                        }
                    }
                    if (node.tagName === 'TEMPLATE') {
                        stack.push(node);
                        walker.currentNode = node.content;
                    }
                }
                else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                    const data = node.data;
                    if (data.indexOf(marker) >= 0) {
                        const parent = node.parentNode;
                        const strings = data.split(markerRegex);
                        const lastIndex = strings.length - 1;
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        for (let i = 0; i < lastIndex; i++) {
                            let insert;
                            let s = strings[i];
                            if (s === '') {
                                insert = createMarker();
                            }
                            else {
                                const match = lastAttributeNameRegex.exec(s);
                                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                    s = s.slice(0, match.index) + match[1] +
                                        match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                                }
                                insert = document.createTextNode(s);
                            }
                            parent.insertBefore(insert, node);
                            this.parts.push({ type: 'node', index: ++index });
                        }
                        // If there's no text, we must insert a comment to mark our place.
                        // Else, we can trust it will stick around after cloning.
                        if (strings[lastIndex] === '') {
                            parent.insertBefore(createMarker(), node);
                            nodesToRemove.push(node);
                        }
                        else {
                            node.data = strings[lastIndex];
                        }
                        // We have a part for each match found
                        partIndex += lastIndex;
                    }
                }
                else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                    if (node.data === marker) {
                        const parent = node.parentNode;
                        // Add a new marker node to be the startNode of the Part if any of
                        // the following are true:
                        //  * We don't have a previousSibling
                        //  * The previousSibling is already the start of a previous part
                        if (node.previousSibling === null || index === lastPartIndex) {
                            index++;
                            parent.insertBefore(createMarker(), node);
                        }
                        lastPartIndex = index;
                        this.parts.push({ type: 'node', index });
                        // If we don't have a nextSibling, keep this node so we have an end.
                        // Else, we can remove it to save future costs.
                        if (node.nextSibling === null) {
                            node.data = '';
                        }
                        else {
                            nodesToRemove.push(node);
                            index--;
                        }
                        partIndex++;
                    }
                    else {
                        let i = -1;
                        while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                            // Comment node has a binding marker inside, make an inactive part
                            // The binding won't work, but subsequent bindings will
                            // TODO (justinfagnani): consider whether it's even worth it to
                            // make bindings in comments work
                            this.parts.push({ type: 'node', index: -1 });
                            partIndex++;
                        }
                    }
                }
            }
            // Remove text binding nodes after the walk to not disturb the TreeWalker
            for (const n of nodesToRemove) {
                n.parentNode.removeChild(n);
            }
        }
    }
    const endsWith = (str, suffix) => {
        const index = str.length - suffix.length;
        return index >= 0 && str.slice(index) === suffix;
    };
    const isTemplatePartActive = (part) => part.index !== -1;
    // Allows `document.createComment('')` to be renamed for a
    // small manual size-savings.
    const createMarker = () => document.createComment('');
    /**
     * This regex extracts the attribute name preceding an attribute-position
     * expression. It does this by matching the syntax allowed for attributes
     * against the string literal directly preceding the expression, assuming that
     * the expression is in an attribute-value position.
     *
     * See attributes in the HTML spec:
     * https://www.w3.org/TR/html5/syntax.html#elements-attributes
     *
     * " \x09\x0a\x0c\x0d" are HTML space characters:
     * https://www.w3.org/TR/html5/infrastructure.html#space-characters
     *
     * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
     * space character except " ".
     *
     * So an attribute is:
     *  * The name: any character except a control character, space character, ('),
     *    ("), ">", "=", or "/"
     *  * Followed by zero or more space characters
     *  * Followed by "="
     *  * Followed by zero or more space characters
     *  * Followed by:
     *    * Any character except space, ('), ("), "<", ">", "=", (`), or
     *    * (") then any non-("), or
     *    * (') then any non-(')
     */
    const lastAttributeNameRegex = 
    // eslint-disable-next-line no-control-regex
    /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
    /**
     * Removes the list of nodes from a Template safely. In addition to removing
     * nodes from the Template, the Template part indices are updated to match
     * the mutated Template DOM.
     *
     * As the template is walked the removal state is tracked and
     * part indices are adjusted as needed.
     *
     * div
     *   div#1 (remove) <-- start removing (removing node is div#1)
     *     div
     *       div#2 (remove)  <-- continue removing (removing node is still div#1)
     *         div
     * div <-- stop removing since previous sibling is the removing node (div#1,
     * removed 4 nodes)
     */
    function removeNodesFromTemplate(template, nodesToRemove) {
        const { element: { content }, parts } = template;
        const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        let partIndex = nextActiveIndexInTemplateParts(parts);
        let part = parts[partIndex];
        let nodeIndex = -1;
        let removeCount = 0;
        const nodesToRemoveInTemplate = [];
        let currentRemovingNode = null;
        while (walker.nextNode()) {
            nodeIndex++;
            const node = walker.currentNode;
            // End removal if stepped past the removing node
            if (node.previousSibling === currentRemovingNode) {
                currentRemovingNode = null;
            }
            // A node to remove was found in the template
            if (nodesToRemove.has(node)) {
                nodesToRemoveInTemplate.push(node);
                // Track node we're removing
                if (currentRemovingNode === null) {
                    currentRemovingNode = node;
                }
            }
            // When removing, increment count by which to adjust subsequent part indices
            if (currentRemovingNode !== null) {
                removeCount++;
            }
            while (part !== undefined && part.index === nodeIndex) {
                // If part is in a removed node deactivate it by setting index to -1 or
                // adjust the index as needed.
                part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
                // go to the next active part.
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                part = parts[partIndex];
            }
        }
        nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
    }
    const countNodes = (node) => {
        let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
        const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
        while (walker.nextNode()) {
            count++;
        }
        return count;
    };
    const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
        for (let i = startIndex + 1; i < parts.length; i++) {
            const part = parts[i];
            if (isTemplatePartActive(part)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Inserts the given node into the Template, optionally before the given
     * refNode. In addition to inserting the node into the Template, the Template
     * part indices are updated to match the mutated Template DOM.
     */
    function insertNodeIntoTemplate(template, node, refNode = null) {
        const { element: { content }, parts } = template;
        // If there's no refNode, then put node at end of template.
        // No part indices need to be shifted in this case.
        if (refNode === null || refNode === undefined) {
            content.appendChild(node);
            return;
        }
        const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
        let partIndex = nextActiveIndexInTemplateParts(parts);
        let insertCount = 0;
        let walkerIndex = -1;
        while (walker.nextNode()) {
            walkerIndex++;
            const walkerNode = walker.currentNode;
            if (walkerNode === refNode) {
                insertCount = countNodes(node);
                refNode.parentNode.insertBefore(node, refNode);
            }
            while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
                // If we've inserted the node, simply adjust all subsequent parts
                if (insertCount > 0) {
                    while (partIndex !== -1) {
                        parts[partIndex].index += insertCount;
                        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                    }
                    return;
                }
                partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            }
        }
    }

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const directives = new WeakMap();
    const isDirective = (o) => {
        return typeof o === 'function' && directives.has(o);
    };

    /**
     * @license
     * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * A sentinel value that signals that a value was handled by a directive and
     * should not be written to the DOM.
     */
    const noChange = {};
    /**
     * A sentinel value that signals a NodePart to fully clear its content.
     */
    const nothing = {};

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * An instance of a `Template` that can be attached to the DOM and updated
     * with new values.
     */
    class TemplateInstance {
        constructor(template, processor, options) {
            this.__parts = [];
            this.template = template;
            this.processor = processor;
            this.options = options;
        }
        update(values) {
            let i = 0;
            for (const part of this.__parts) {
                if (part !== undefined) {
                    part.setValue(values[i]);
                }
                i++;
            }
            for (const part of this.__parts) {
                if (part !== undefined) {
                    part.commit();
                }
            }
        }
        _clone() {
            // There are a number of steps in the lifecycle of a template instance's
            // DOM fragment:
            //  1. Clone - create the instance fragment
            //  2. Adopt - adopt into the main document
            //  3. Process - find part markers and create parts
            //  4. Upgrade - upgrade custom elements
            //  5. Update - set node, attribute, property, etc., values
            //  6. Connect - connect to the document. Optional and outside of this
            //     method.
            //
            // We have a few constraints on the ordering of these steps:
            //  * We need to upgrade before updating, so that property values will pass
            //    through any property setters.
            //  * We would like to process before upgrading so that we're sure that the
            //    cloned fragment is inert and not disturbed by self-modifying DOM.
            //  * We want custom elements to upgrade even in disconnected fragments.
            //
            // Given these constraints, with full custom elements support we would
            // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
            //
            // But Safari does not implement CustomElementRegistry#upgrade, so we
            // can not implement that order and still have upgrade-before-update and
            // upgrade disconnected fragments. So we instead sacrifice the
            // process-before-upgrade constraint, since in Custom Elements v1 elements
            // must not modify their light DOM in the constructor. We still have issues
            // when co-existing with CEv0 elements like Polymer 1, and with polyfills
            // that don't strictly adhere to the no-modification rule because shadow
            // DOM, which may be created in the constructor, is emulated by being placed
            // in the light DOM.
            //
            // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
            // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
            // in one step.
            //
            // The Custom Elements v1 polyfill supports upgrade(), so the order when
            // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
            // Connect.
            const fragment = isCEPolyfill ?
                this.template.element.content.cloneNode(true) :
                document.importNode(this.template.element.content, true);
            const stack = [];
            const parts = this.template.parts;
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
            const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
            let partIndex = 0;
            let nodeIndex = 0;
            let part;
            let node = walker.nextNode();
            // Loop through all the nodes and parts of a template
            while (partIndex < parts.length) {
                part = parts[partIndex];
                if (!isTemplatePartActive(part)) {
                    this.__parts.push(undefined);
                    partIndex++;
                    continue;
                }
                // Progress the tree walker until we find our next part's node.
                // Note that multiple parts may share the same node (attribute parts
                // on a single element), so this loop may not run at all.
                while (nodeIndex < part.index) {
                    nodeIndex++;
                    if (node.nodeName === 'TEMPLATE') {
                        stack.push(node);
                        walker.currentNode = node.content;
                    }
                    if ((node = walker.nextNode()) === null) {
                        // We've exhausted the content inside a nested template element.
                        // Because we still have parts (the outer for-loop), we know:
                        // - There is a template in the stack
                        // - The walker will find a nextNode outside the template
                        walker.currentNode = stack.pop();
                        node = walker.nextNode();
                    }
                }
                // We've arrived at our part's node.
                if (part.type === 'node') {
                    const part = this.processor.handleTextExpression(this.options);
                    part.insertAfterNode(node.previousSibling);
                    this.__parts.push(part);
                }
                else {
                    this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                }
                partIndex++;
            }
            if (isCEPolyfill) {
                document.adoptNode(fragment);
                customElements.upgrade(fragment);
            }
            return fragment;
        }
    }

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * Our TrustedTypePolicy for HTML which is declared using the html template
     * tag function.
     *
     * That HTML is a developer-authored constant, and is parsed with innerHTML
     * before any untrusted expressions have been mixed in. Therefor it is
     * considered safe by construction.
     */
    const policy = window.trustedTypes &&
        trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
    const commentMarker = ` ${marker} `;
    /**
     * The return type of `html`, which holds a Template and the values from
     * interpolated expressions.
     */
    class TemplateResult {
        constructor(strings, values, type, processor) {
            this.strings = strings;
            this.values = values;
            this.type = type;
            this.processor = processor;
        }
        /**
         * Returns a string of HTML used to create a `<template>` element.
         */
        getHTML() {
            const l = this.strings.length - 1;
            let html = '';
            let isCommentBinding = false;
            for (let i = 0; i < l; i++) {
                const s = this.strings[i];
                // For each binding we want to determine the kind of marker to insert
                // into the template source before it's parsed by the browser's HTML
                // parser. The marker type is based on whether the expression is in an
                // attribute, text, or comment position.
                //   * For node-position bindings we insert a comment with the marker
                //     sentinel as its text content, like <!--{{lit-guid}}-->.
                //   * For attribute bindings we insert just the marker sentinel for the
                //     first binding, so that we support unquoted attribute bindings.
                //     Subsequent bindings can use a comment marker because multi-binding
                //     attributes must be quoted.
                //   * For comment bindings we insert just the marker sentinel so we don't
                //     close the comment.
                //
                // The following code scans the template source, but is *not* an HTML
                // parser. We don't need to track the tree structure of the HTML, only
                // whether a binding is inside a comment, and if not, if it appears to be
                // the first binding in an attribute.
                const commentOpen = s.lastIndexOf('<!--');
                // We're in comment position if we have a comment open with no following
                // comment close. Because <-- can appear in an attribute value there can
                // be false positives.
                isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                    s.indexOf('-->', commentOpen + 1) === -1;
                // Check to see if we have an attribute-like sequence preceding the
                // expression. This can match "name=value" like structures in text,
                // comments, and attribute values, so there can be false-positives.
                const attributeMatch = lastAttributeNameRegex.exec(s);
                if (attributeMatch === null) {
                    // We're only in this branch if we don't have a attribute-like
                    // preceding sequence. For comments, this guards against unusual
                    // attribute values like <div foo="<!--${'bar'}">. Cases like
                    // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                    // below.
                    html += s + (isCommentBinding ? commentMarker : nodeMarker);
                }
                else {
                    // For attributes we use just a marker sentinel, and also append a
                    // $lit$ suffix to the name to opt-out of attribute-specific parsing
                    // that IE and Edge do for style and certain SVG attributes.
                    html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                        attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                        marker;
                }
            }
            html += this.strings[l];
            return html;
        }
        getTemplateElement() {
            const template = document.createElement('template');
            let value = this.getHTML();
            if (policy !== undefined) {
                // this is secure because `this.strings` is a TemplateStringsArray.
                // TODO: validate this when
                // https://github.com/tc39/proposal-array-is-template-object is
                // implemented.
                value = policy.createHTML(value);
            }
            template.innerHTML = value;
            return template;
        }
    }

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const isPrimitive = (value) => {
        return (value === null ||
            !(typeof value === 'object' || typeof value === 'function'));
    };
    const isIterable = (value) => {
        return Array.isArray(value) ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !!(value && value[Symbol.iterator]);
    };
    /**
     * Writes attribute values to the DOM for a group of AttributeParts bound to a
     * single attribute. The value is only set once even if there are multiple parts
     * for an attribute.
     */
    class AttributeCommitter {
        constructor(element, name, strings) {
            this.dirty = true;
            this.element = element;
            this.name = name;
            this.strings = strings;
            this.parts = [];
            for (let i = 0; i < strings.length - 1; i++) {
                this.parts[i] = this._createPart();
            }
        }
        /**
         * Creates a single part. Override this to create a differnt type of part.
         */
        _createPart() {
            return new AttributePart(this);
        }
        _getValue() {
            const strings = this.strings;
            const l = strings.length - 1;
            const parts = this.parts;
            // If we're assigning an attribute via syntax like:
            //    attr="${foo}"  or  attr=${foo}
            // but not
            //    attr="${foo} ${bar}" or attr="${foo} baz"
            // then we don't want to coerce the attribute value into one long
            // string. Instead we want to just return the value itself directly,
            // so that sanitizeDOMValue can get the actual value rather than
            // String(value)
            // The exception is if v is an array, in which case we do want to smash
            // it together into a string without calling String() on the array.
            //
            // This also allows trusted values (when using TrustedTypes) being
            // assigned to DOM sinks without being stringified in the process.
            if (l === 1 && strings[0] === '' && strings[1] === '') {
                const v = parts[0].value;
                if (typeof v === 'symbol') {
                    return String(v);
                }
                if (typeof v === 'string' || !isIterable(v)) {
                    return v;
                }
            }
            let text = '';
            for (let i = 0; i < l; i++) {
                text += strings[i];
                const part = parts[i];
                if (part !== undefined) {
                    const v = part.value;
                    if (isPrimitive(v) || !isIterable(v)) {
                        text += typeof v === 'string' ? v : String(v);
                    }
                    else {
                        for (const t of v) {
                            text += typeof t === 'string' ? t : String(t);
                        }
                    }
                }
            }
            text += strings[l];
            return text;
        }
        commit() {
            if (this.dirty) {
                this.dirty = false;
                this.element.setAttribute(this.name, this._getValue());
            }
        }
    }
    /**
     * A Part that controls all or part of an attribute value.
     */
    class AttributePart {
        constructor(committer) {
            this.value = undefined;
            this.committer = committer;
        }
        setValue(value) {
            if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
                this.value = value;
                // If the value is a not a directive, dirty the committer so that it'll
                // call setAttribute. If the value is a directive, it'll dirty the
                // committer if it calls setValue().
                if (!isDirective(value)) {
                    this.committer.dirty = true;
                }
            }
        }
        commit() {
            while (isDirective(this.value)) {
                const directive = this.value;
                this.value = noChange;
                directive(this);
            }
            if (this.value === noChange) {
                return;
            }
            this.committer.commit();
        }
    }
    /**
     * A Part that controls a location within a Node tree. Like a Range, NodePart
     * has start and end locations and can set and update the Nodes between those
     * locations.
     *
     * NodeParts support several value types: primitives, Nodes, TemplateResults,
     * as well as arrays and iterables of those types.
     */
    class NodePart {
        constructor(options) {
            this.value = undefined;
            this.__pendingValue = undefined;
            this.options = options;
        }
        /**
         * Appends this part into a container.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        appendInto(container) {
            this.startNode = container.appendChild(createMarker());
            this.endNode = container.appendChild(createMarker());
        }
        /**
         * Inserts this part after the `ref` node (between `ref` and `ref`'s next
         * sibling). Both `ref` and its next sibling must be static, unchanging nodes
         * such as those that appear in a literal section of a template.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        insertAfterNode(ref) {
            this.startNode = ref;
            this.endNode = ref.nextSibling;
        }
        /**
         * Appends this part into a parent part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        appendIntoPart(part) {
            part.__insert(this.startNode = createMarker());
            part.__insert(this.endNode = createMarker());
        }
        /**
         * Inserts this part after the `ref` part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */
        insertAfterPart(ref) {
            ref.__insert(this.startNode = createMarker());
            this.endNode = ref.endNode;
            ref.endNode = this.startNode;
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            if (this.startNode.parentNode === null) {
                return;
            }
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            const value = this.__pendingValue;
            if (value === noChange) {
                return;
            }
            if (isPrimitive(value)) {
                if (value !== this.value) {
                    this.__commitText(value);
                }
            }
            else if (value instanceof TemplateResult) {
                this.__commitTemplateResult(value);
            }
            else if (value instanceof Node) {
                this.__commitNode(value);
            }
            else if (isIterable(value)) {
                this.__commitIterable(value);
            }
            else if (value === nothing) {
                this.value = nothing;
                this.clear();
            }
            else {
                // Fallback, will render the string representation
                this.__commitText(value);
            }
        }
        __insert(node) {
            this.endNode.parentNode.insertBefore(node, this.endNode);
        }
        __commitNode(value) {
            if (this.value === value) {
                return;
            }
            this.clear();
            this.__insert(value);
            this.value = value;
        }
        __commitText(value) {
            const node = this.startNode.nextSibling;
            value = value == null ? '' : value;
            // If `value` isn't already a string, we explicitly convert it here in case
            // it can't be implicitly converted - i.e. it's a symbol.
            const valueAsString = typeof value === 'string' ? value : String(value);
            if (node === this.endNode.previousSibling &&
                node.nodeType === 3 /* Node.TEXT_NODE */) {
                // If we only have a single text node between the markers, we can just
                // set its value, rather than replacing it.
                // TODO(justinfagnani): Can we just check if this.value is primitive?
                node.data = valueAsString;
            }
            else {
                this.__commitNode(document.createTextNode(valueAsString));
            }
            this.value = value;
        }
        __commitTemplateResult(value) {
            const template = this.options.templateFactory(value);
            if (this.value instanceof TemplateInstance &&
                this.value.template === template) {
                this.value.update(value.values);
            }
            else {
                // Make sure we propagate the template processor from the TemplateResult
                // so that we use its syntax extension, etc. The template factory comes
                // from the render function options so that it can control template
                // caching and preprocessing.
                const instance = new TemplateInstance(template, value.processor, this.options);
                const fragment = instance._clone();
                instance.update(value.values);
                this.__commitNode(fragment);
                this.value = instance;
            }
        }
        __commitIterable(value) {
            // For an Iterable, we create a new InstancePart per item, then set its
            // value to the item. This is a little bit of overhead for every item in
            // an Iterable, but it lets us recurse easily and efficiently update Arrays
            // of TemplateResults that will be commonly returned from expressions like:
            // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
            // If _value is an array, then the previous render was of an
            // iterable and _value will contain the NodeParts from the previous
            // render. If _value is not an array, clear this part and make a new
            // array for NodeParts.
            if (!Array.isArray(this.value)) {
                this.value = [];
                this.clear();
            }
            // Lets us keep track of how many items we stamped so we can clear leftover
            // items from a previous render
            const itemParts = this.value;
            let partIndex = 0;
            let itemPart;
            for (const item of value) {
                // Try to reuse an existing part
                itemPart = itemParts[partIndex];
                // If no existing part, create a new one
                if (itemPart === undefined) {
                    itemPart = new NodePart(this.options);
                    itemParts.push(itemPart);
                    if (partIndex === 0) {
                        itemPart.appendIntoPart(this);
                    }
                    else {
                        itemPart.insertAfterPart(itemParts[partIndex - 1]);
                    }
                }
                itemPart.setValue(item);
                itemPart.commit();
                partIndex++;
            }
            if (partIndex < itemParts.length) {
                // Truncate the parts array so _value reflects the current state
                itemParts.length = partIndex;
                this.clear(itemPart && itemPart.endNode);
            }
        }
        clear(startNode = this.startNode) {
            removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
    }
    /**
     * Implements a boolean attribute, roughly as defined in the HTML
     * specification.
     *
     * If the value is truthy, then the attribute is present with a value of
     * ''. If the value is falsey, the attribute is removed.
     */
    class BooleanAttributePart {
        constructor(element, name, strings) {
            this.value = undefined;
            this.__pendingValue = undefined;
            if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
                throw new Error('Boolean attributes can only contain a single expression');
            }
            this.element = element;
            this.name = name;
            this.strings = strings;
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            if (this.__pendingValue === noChange) {
                return;
            }
            const value = !!this.__pendingValue;
            if (this.value !== value) {
                if (value) {
                    this.element.setAttribute(this.name, '');
                }
                else {
                    this.element.removeAttribute(this.name);
                }
                this.value = value;
            }
            this.__pendingValue = noChange;
        }
    }
    /**
     * Sets attribute values for PropertyParts, so that the value is only set once
     * even if there are multiple parts for a property.
     *
     * If an expression controls the whole property value, then the value is simply
     * assigned to the property under control. If there are string literals or
     * multiple expressions, then the strings are expressions are interpolated into
     * a string first.
     */
    class PropertyCommitter extends AttributeCommitter {
        constructor(element, name, strings) {
            super(element, name, strings);
            this.single =
                (strings.length === 2 && strings[0] === '' && strings[1] === '');
        }
        _createPart() {
            return new PropertyPart(this);
        }
        _getValue() {
            if (this.single) {
                return this.parts[0].value;
            }
            return super._getValue();
        }
        commit() {
            if (this.dirty) {
                this.dirty = false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.element[this.name] = this._getValue();
            }
        }
    }
    class PropertyPart extends AttributePart {
    }
    // Detect event listener options support. If the `capture` property is read
    // from the options object, then options are supported. If not, then the third
    // argument to add/removeEventListener is interpreted as the boolean capture
    // value so we should only pass the `capture` property.
    let eventOptionsSupported = false;
    // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
    // blocks right into the body of a module
    (() => {
        try {
            const options = {
                get capture() {
                    eventOptionsSupported = true;
                    return false;
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.addEventListener('test', options, options);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('test', options, options);
        }
        catch (_e) {
            // event options not supported
        }
    })();
    class EventPart {
        constructor(element, eventName, eventContext) {
            this.value = undefined;
            this.__pendingValue = undefined;
            this.element = element;
            this.eventName = eventName;
            this.eventContext = eventContext;
            this.__boundHandleEvent = (e) => this.handleEvent(e);
        }
        setValue(value) {
            this.__pendingValue = value;
        }
        commit() {
            while (isDirective(this.__pendingValue)) {
                const directive = this.__pendingValue;
                this.__pendingValue = noChange;
                directive(this);
            }
            if (this.__pendingValue === noChange) {
                return;
            }
            const newListener = this.__pendingValue;
            const oldListener = this.value;
            const shouldRemoveListener = newListener == null ||
                oldListener != null &&
                    (newListener.capture !== oldListener.capture ||
                        newListener.once !== oldListener.once ||
                        newListener.passive !== oldListener.passive);
            const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
            if (shouldRemoveListener) {
                this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }
            if (shouldAddListener) {
                this.__options = getOptions(newListener);
                this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
            }
            this.value = newListener;
            this.__pendingValue = noChange;
        }
        handleEvent(event) {
            if (typeof this.value === 'function') {
                this.value.call(this.eventContext || this.element, event);
            }
            else {
                this.value.handleEvent(event);
            }
        }
    }
    // We copy options because of the inconsistent behavior of browsers when reading
    // the third argument of add/removeEventListener. IE11 doesn't support options
    // at all. Chrome 41 only reads `capture` if the argument is an object.
    const getOptions = (o) => o &&
        (eventOptionsSupported ?
            { capture: o.capture, passive: o.passive, once: o.once } :
            o.capture);

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * The default TemplateFactory which caches Templates keyed on
     * result.type and result.strings.
     */
    function templateFactory(result) {
        let templateCache = templateCaches.get(result.type);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(result.type, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        // If the TemplateStringsArray is new, generate a key from the strings
        // This key is shared between all templates with identical content
        const key = result.strings.join(marker);
        // Check if we already have a Template for this key
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            // If we have not seen this key before, create a new Template
            template = new Template(result, result.getTemplateElement());
            // Cache the Template for this key
            templateCache.keyString.set(key, template);
        }
        // Cache all future queries for this TemplateStringsArray
        templateCache.stringsArray.set(result.strings, template);
        return template;
    }
    const templateCaches = new Map();

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const parts = new WeakMap();
    /**
     * Renders a template result or other value to a container.
     *
     * To update a container with new values, reevaluate the template literal and
     * call `render` with the new result.
     *
     * @param result Any value renderable by NodePart - typically a TemplateResult
     *     created by evaluating a template tag like `html` or `svg`.
     * @param container A DOM parent to render to. The entire contents are either
     *     replaced, or efficiently updated if the same result type was previous
     *     rendered there.
     * @param options RenderOptions for the entire render tree rendered to this
     *     container. Render options must *not* change between renders to the same
     *     container, as those changes will not effect previously rendered DOM.
     */
    const render$1 = (result, container, options) => {
        let part = parts.get(container);
        if (part === undefined) {
            removeNodes(container, container.firstChild);
            parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
            part.appendInto(container);
        }
        part.setValue(result);
        part.commit();
    };

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * Creates Parts when a template is instantiated.
     */
    class DefaultTemplateProcessor {
        /**
         * Create parts for an attribute-position binding, given the event, attribute
         * name, and string literals.
         *
         * @param element The element containing the binding
         * @param name  The attribute name
         * @param strings The string literals. There are always at least two strings,
         *   event for fully-controlled bindings with a single expression.
         */
        handleAttributeExpressions(element, name, strings, options) {
            const prefix = name[0];
            if (prefix === '.') {
                const committer = new PropertyCommitter(element, name.slice(1), strings);
                return committer.parts;
            }
            if (prefix === '@') {
                return [new EventPart(element, name.slice(1), options.eventContext)];
            }
            if (prefix === '?') {
                return [new BooleanAttributePart(element, name.slice(1), strings)];
            }
            const committer = new AttributeCommitter(element, name, strings);
            return committer.parts;
        }
        /**
         * Create parts for a text-position binding.
         * @param templateFactory
         */
        handleTextExpression(options) {
            return new NodePart(options);
        }
    }
    const defaultTemplateProcessor = new DefaultTemplateProcessor();

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    // IMPORTANT: do not change the property name or the assignment expression.
    // This line will be used in regexes to search for lit-html usage.
    // TODO(justinfagnani): inject version number at build time
    if (typeof window !== 'undefined') {
        (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
    }
    /**
     * Interprets a template literal as an HTML template that can efficiently
     * render to and update a container.
     */
    const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    // Get a key to lookup in `templateCaches`.
    const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
    let compatibleShadyCSSVersion = true;
    if (typeof window.ShadyCSS === 'undefined') {
        compatibleShadyCSSVersion = false;
    }
    else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
        console.warn(`Incompatible ShadyCSS version detected. ` +
            `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
            `@webcomponents/shadycss@1.3.1.`);
        compatibleShadyCSSVersion = false;
    }
    /**
     * Template factory which scopes template DOM using ShadyCSS.
     * @param scopeName {string}
     */
    const shadyTemplateFactory = (scopeName) => (result) => {
        const cacheKey = getTemplateCacheKey(result.type, scopeName);
        let templateCache = templateCaches.get(cacheKey);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(cacheKey, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        const key = result.strings.join(marker);
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            const element = result.getTemplateElement();
            if (compatibleShadyCSSVersion) {
                window.ShadyCSS.prepareTemplateDom(element, scopeName);
            }
            template = new Template(result, element);
            templateCache.keyString.set(key, template);
        }
        templateCache.stringsArray.set(result.strings, template);
        return template;
    };
    const TEMPLATE_TYPES = ['html', 'svg'];
    /**
     * Removes all style elements from Templates for the given scopeName.
     */
    const removeStylesFromLitTemplates = (scopeName) => {
        TEMPLATE_TYPES.forEach((type) => {
            const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
            if (templates !== undefined) {
                templates.keyString.forEach((template) => {
                    const { element: { content } } = template;
                    // IE 11 doesn't support the iterable param Set constructor
                    const styles = new Set();
                    Array.from(content.querySelectorAll('style')).forEach((s) => {
                        styles.add(s);
                    });
                    removeNodesFromTemplate(template, styles);
                });
            }
        });
    };
    const shadyRenderSet = new Set();
    /**
     * For the given scope name, ensures that ShadyCSS style scoping is performed.
     * This is done just once per scope name so the fragment and template cannot
     * be modified.
     * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
     * to be scoped and appended to the document
     * (2) removes style elements from all lit-html Templates for this scope name.
     *
     * Note, <style> elements can only be placed into templates for the
     * initial rendering of the scope. If <style> elements are included in templates
     * dynamically rendered to the scope (after the first scope render), they will
     * not be scoped and the <style> will be left in the template and rendered
     * output.
     */
    const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
        shadyRenderSet.add(scopeName);
        // If `renderedDOM` is stamped from a Template, then we need to edit that
        // Template's underlying template element. Otherwise, we create one here
        // to give to ShadyCSS, which still requires one while scoping.
        const templateElement = !!template ? template.element : document.createElement('template');
        // Move styles out of rendered DOM and store.
        const styles = renderedDOM.querySelectorAll('style');
        const { length } = styles;
        // If there are no styles, skip unnecessary work
        if (length === 0) {
            // Ensure prepareTemplateStyles is called to support adding
            // styles via `prepareAdoptedCssText` since that requires that
            // `prepareTemplateStyles` is called.
            //
            // ShadyCSS will only update styles containing @apply in the template
            // given to `prepareTemplateStyles`. If no lit Template was given,
            // ShadyCSS will not be able to update uses of @apply in any relevant
            // template. However, this is not a problem because we only create the
            // template for the purpose of supporting `prepareAdoptedCssText`,
            // which doesn't support @apply at all.
            window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
            return;
        }
        const condensedStyle = document.createElement('style');
        // Collect styles into a single style. This helps us make sure ShadyCSS
        // manipulations will not prevent us from being able to fix up template
        // part indices.
        // NOTE: collecting styles is inefficient for browsers but ShadyCSS
        // currently does this anyway. When it does not, this should be changed.
        for (let i = 0; i < length; i++) {
            const style = styles[i];
            style.parentNode.removeChild(style);
            condensedStyle.textContent += style.textContent;
        }
        // Remove styles from nested templates in this scope.
        removeStylesFromLitTemplates(scopeName);
        // And then put the condensed style into the "root" template passed in as
        // `template`.
        const content = templateElement.content;
        if (!!template) {
            insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
        }
        else {
            content.insertBefore(condensedStyle, content.firstChild);
        }
        // Note, it's important that ShadyCSS gets the template that `lit-html`
        // will actually render so that it can update the style inside when
        // needed (e.g. @apply native Shadow DOM case).
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        const style = content.querySelector('style');
        if (window.ShadyCSS.nativeShadow && style !== null) {
            // When in native Shadow DOM, ensure the style created by ShadyCSS is
            // included in initially rendered output (`renderedDOM`).
            renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
        }
        else if (!!template) {
            // When no style is left in the template, parts will be broken as a
            // result. To fix this, we put back the style node ShadyCSS removed
            // and then tell lit to remove that node from the template.
            // There can be no style in the template in 2 cases (1) when Shady DOM
            // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
            // is in use ShadyCSS removes the style if it contains no content.
            // NOTE, ShadyCSS creates its own style so we can safely add/remove
            // `condensedStyle` here.
            content.insertBefore(condensedStyle, content.firstChild);
            const removes = new Set();
            removes.add(condensedStyle);
            removeNodesFromTemplate(template, removes);
        }
    };
    /**
     * Extension to the standard `render` method which supports rendering
     * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
     * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
     * or when the webcomponentsjs
     * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
     *
     * Adds a `scopeName` option which is used to scope element DOM and stylesheets
     * when native ShadowDOM is unavailable. The `scopeName` will be added to
     * the class attribute of all rendered DOM. In addition, any style elements will
     * be automatically re-written with this `scopeName` selector and moved out
     * of the rendered DOM and into the document `<head>`.
     *
     * It is common to use this render method in conjunction with a custom element
     * which renders a shadowRoot. When this is done, typically the element's
     * `localName` should be used as the `scopeName`.
     *
     * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
     * custom properties (needed only on older browsers like IE11) and a shim for
     * a deprecated feature called `@apply` that supports applying a set of css
     * custom properties to a given location.
     *
     * Usage considerations:
     *
     * * Part values in `<style>` elements are only applied the first time a given
     * `scopeName` renders. Subsequent changes to parts in style elements will have
     * no effect. Because of this, parts in style elements should only be used for
     * values that will never change, for example parts that set scope-wide theme
     * values or parts which render shared style elements.
     *
     * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
     * custom element's `constructor` is not supported. Instead rendering should
     * either done asynchronously, for example at microtask timing (for example
     * `Promise.resolve()`), or be deferred until the first time the element's
     * `connectedCallback` runs.
     *
     * Usage considerations when using shimmed custom properties or `@apply`:
     *
     * * Whenever any dynamic changes are made which affect
     * css custom properties, `ShadyCSS.styleElement(element)` must be called
     * to update the element. There are two cases when this is needed:
     * (1) the element is connected to a new parent, (2) a class is added to the
     * element that causes it to match different custom properties.
     * To address the first case when rendering a custom element, `styleElement`
     * should be called in the element's `connectedCallback`.
     *
     * * Shimmed custom properties may only be defined either for an entire
     * shadowRoot (for example, in a `:host` rule) or via a rule that directly
     * matches an element with a shadowRoot. In other words, instead of flowing from
     * parent to child as do native css custom properties, shimmed custom properties
     * flow only from shadowRoots to nested shadowRoots.
     *
     * * When using `@apply` mixing css shorthand property names with
     * non-shorthand names (for example `border` and `border-width`) is not
     * supported.
     */
    const render = (result, container, options) => {
        if (!options || typeof options !== 'object' || !options.scopeName) {
            throw new Error('The `scopeName` option is required.');
        }
        const scopeName = options.scopeName;
        const hasRendered = parts.has(container);
        const needsScoping = compatibleShadyCSSVersion &&
            container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
            !!container.host;
        // Handle first render to a scope specially...
        const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
        // On first scope render, render into a fragment; this cannot be a single
        // fragment that is reused since nested renders can occur synchronously.
        const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
        render$1(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
        // When performing first scope render,
        // (1) We've rendered into a fragment so that there's a chance to
        // `prepareTemplateStyles` before sub-elements hit the DOM
        // (which might cause them to render based on a common pattern of
        // rendering in a custom element's `connectedCallback`);
        // (2) Scope the template with ShadyCSS one time only for this scope.
        // (3) Render the fragment into the container and make sure the
        // container knows its `part` is the one we just rendered. This ensures
        // DOM will be re-used on subsequent renders.
        if (firstScopeRender) {
            const part = parts.get(renderContainer);
            parts.delete(renderContainer);
            // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
            // that should apply to `renderContainer` even if the rendered value is
            // not a TemplateInstance. However, it will only insert scoped styles
            // into the document if `prepareTemplateStyles` has already been called
            // for the given scope name.
            const template = part.value instanceof TemplateInstance ?
                part.value.template :
                undefined;
            prepareTemplateStyles(scopeName, renderContainer, template);
            removeNodes(container, container.firstChild);
            container.appendChild(renderContainer);
            parts.set(container, part);
        }
        // After elements have hit the DOM, update styling if this is the
        // initial render to this container.
        // This is needed whenever dynamic changes are made so it would be
        // safest to do every render; however, this would regress performance
        // so we leave it up to the user to call `ShadyCSS.styleElement`
        // for dynamic changes.
        if (!hasRendered && needsScoping) {
            window.ShadyCSS.styleElement(container.host);
        }
    };

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    var _a;
    /**
     * Use this module if you want to create your own base class extending
     * [[UpdatingElement]].
     * @packageDocumentation
     */
    /*
     * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
     * replaced at compile time by the munged name for object[property]. We cannot
     * alias this function, so we have to use a small shim that has the same
     * behavior when not compiling.
     */
    window.JSCompiler_renameProperty =
        (prop, _obj) => prop;
    const defaultConverter = {
        toAttribute(value, type) {
            switch (type) {
                case Boolean:
                    return value ? '' : null;
                case Object:
                case Array:
                    // if the value is `null` or `undefined` pass this through
                    // to allow removing/no change behavior.
                    return value == null ? value : JSON.stringify(value);
            }
            return value;
        },
        fromAttribute(value, type) {
            switch (type) {
                case Boolean:
                    return value !== null;
                case Number:
                    return value === null ? null : Number(value);
                case Object:
                case Array:
                    return JSON.parse(value);
            }
            return value;
        }
    };
    /**
     * Change function that returns true if `value` is different from `oldValue`.
     * This method is used as the default for a property's `hasChanged` function.
     */
    const notEqual = (value, old) => {
        // This ensures (old==NaN, value==NaN) always returns false
        return old !== value && (old === old || value === value);
    };
    const defaultPropertyDeclaration = {
        attribute: true,
        type: String,
        converter: defaultConverter,
        reflect: false,
        hasChanged: notEqual
    };
    const STATE_HAS_UPDATED = 1;
    const STATE_UPDATE_REQUESTED = 1 << 2;
    const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
    const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
    /**
     * The Closure JS Compiler doesn't currently have good support for static
     * property semantics where "this" is dynamic (e.g.
     * https://github.com/google/closure-compiler/issues/3177 and others) so we use
     * this hack to bypass any rewriting by the compiler.
     */
    const finalized = 'finalized';
    /**
     * Base element class which manages element properties and attributes. When
     * properties change, the `update` method is asynchronously called. This method
     * should be supplied by subclassers to render updates as desired.
     * @noInheritDoc
     */
    class UpdatingElement extends HTMLElement {
        constructor() {
            super();
            this.initialize();
        }
        /**
         * Returns a list of attributes corresponding to the registered properties.
         * @nocollapse
         */
        static get observedAttributes() {
            // note: piggy backing on this to ensure we're finalized.
            this.finalize();
            const attributes = [];
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            this._classProperties.forEach((v, p) => {
                const attr = this._attributeNameForProperty(p, v);
                if (attr !== undefined) {
                    this._attributeToPropertyMap.set(attr, p);
                    attributes.push(attr);
                }
            });
            return attributes;
        }
        /**
         * Ensures the private `_classProperties` property metadata is created.
         * In addition to `finalize` this is also called in `createProperty` to
         * ensure the `@property` decorator can add property metadata.
         */
        /** @nocollapse */
        static _ensureClassProperties() {
            // ensure private storage for property declarations.
            if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
                this._classProperties = new Map();
                // NOTE: Workaround IE11 not supporting Map constructor argument.
                const superProperties = Object.getPrototypeOf(this)._classProperties;
                if (superProperties !== undefined) {
                    superProperties.forEach((v, k) => this._classProperties.set(k, v));
                }
            }
        }
        /**
         * Creates a property accessor on the element prototype if one does not exist
         * and stores a PropertyDeclaration for the property with the given options.
         * The property setter calls the property's `hasChanged` property option
         * or uses a strict identity check to determine whether or not to request
         * an update.
         *
         * This method may be overridden to customize properties; however,
         * when doing so, it's important to call `super.createProperty` to ensure
         * the property is setup correctly. This method calls
         * `getPropertyDescriptor` internally to get a descriptor to install.
         * To customize what properties do when they are get or set, override
         * `getPropertyDescriptor`. To customize the options for a property,
         * implement `createProperty` like this:
         *
         * static createProperty(name, options) {
         *   options = Object.assign(options, {myOption: true});
         *   super.createProperty(name, options);
         * }
         *
         * @nocollapse
         */
        static createProperty(name, options = defaultPropertyDeclaration) {
            // Note, since this can be called by the `@property` decorator which
            // is called before `finalize`, we ensure storage exists for property
            // metadata.
            this._ensureClassProperties();
            this._classProperties.set(name, options);
            // Do not generate an accessor if the prototype already has one, since
            // it would be lost otherwise and that would never be the user's intention;
            // Instead, we expect users to call `requestUpdate` themselves from
            // user-defined accessors. Note that if the super has an accessor we will
            // still overwrite it
            if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
                return;
            }
            const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
            const descriptor = this.getPropertyDescriptor(name, key, options);
            if (descriptor !== undefined) {
                Object.defineProperty(this.prototype, name, descriptor);
            }
        }
        /**
         * Returns a property descriptor to be defined on the given named property.
         * If no descriptor is returned, the property will not become an accessor.
         * For example,
         *
         *   class MyElement extends LitElement {
         *     static getPropertyDescriptor(name, key, options) {
         *       const defaultDescriptor =
         *           super.getPropertyDescriptor(name, key, options);
         *       const setter = defaultDescriptor.set;
         *       return {
         *         get: defaultDescriptor.get,
         *         set(value) {
         *           setter.call(this, value);
         *           // custom action.
         *         },
         *         configurable: true,
         *         enumerable: true
         *       }
         *     }
         *   }
         *
         * @nocollapse
         */
        static getPropertyDescriptor(name, key, options) {
            return {
                // tslint:disable-next-line:no-any no symbol in index
                get() {
                    return this[key];
                },
                set(value) {
                    const oldValue = this[name];
                    this[key] = value;
                    this
                        .requestUpdateInternal(name, oldValue, options);
                },
                configurable: true,
                enumerable: true
            };
        }
        /**
         * Returns the property options associated with the given property.
         * These options are defined with a PropertyDeclaration via the `properties`
         * object or the `@property` decorator and are registered in
         * `createProperty(...)`.
         *
         * Note, this method should be considered "final" and not overridden. To
         * customize the options for a given property, override `createProperty`.
         *
         * @nocollapse
         * @final
         */
        static getPropertyOptions(name) {
            return this._classProperties && this._classProperties.get(name) ||
                defaultPropertyDeclaration;
        }
        /**
         * Creates property accessors for registered properties and ensures
         * any superclasses are also finalized.
         * @nocollapse
         */
        static finalize() {
            // finalize any superclasses
            const superCtor = Object.getPrototypeOf(this);
            if (!superCtor.hasOwnProperty(finalized)) {
                superCtor.finalize();
            }
            this[finalized] = true;
            this._ensureClassProperties();
            // initialize Map populated in observedAttributes
            this._attributeToPropertyMap = new Map();
            // make any properties
            // Note, only process "own" properties since this element will inherit
            // any properties defined on the superClass, and finalization ensures
            // the entire prototype chain is finalized.
            if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
                const props = this.properties;
                // support symbols in properties (IE11 does not support this)
                const propKeys = [
                    ...Object.getOwnPropertyNames(props),
                    ...(typeof Object.getOwnPropertySymbols === 'function') ?
                        Object.getOwnPropertySymbols(props) :
                        []
                ];
                // This for/of is ok because propKeys is an array
                for (const p of propKeys) {
                    // note, use of `any` is due to TypeSript lack of support for symbol in
                    // index types
                    // tslint:disable-next-line:no-any no symbol in index
                    this.createProperty(p, props[p]);
                }
            }
        }
        /**
         * Returns the property name for the given attribute `name`.
         * @nocollapse
         */
        static _attributeNameForProperty(name, options) {
            const attribute = options.attribute;
            return attribute === false ?
                undefined :
                (typeof attribute === 'string' ?
                    attribute :
                    (typeof name === 'string' ? name.toLowerCase() : undefined));
        }
        /**
         * Returns true if a property should request an update.
         * Called when a property value is set and uses the `hasChanged`
         * option for the property if present or a strict identity check.
         * @nocollapse
         */
        static _valueHasChanged(value, old, hasChanged = notEqual) {
            return hasChanged(value, old);
        }
        /**
         * Returns the property value for the given attribute value.
         * Called via the `attributeChangedCallback` and uses the property's
         * `converter` or `converter.fromAttribute` property option.
         * @nocollapse
         */
        static _propertyValueFromAttribute(value, options) {
            const type = options.type;
            const converter = options.converter || defaultConverter;
            const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
            return fromAttribute ? fromAttribute(value, type) : value;
        }
        /**
         * Returns the attribute value for the given property value. If this
         * returns undefined, the property will *not* be reflected to an attribute.
         * If this returns null, the attribute will be removed, otherwise the
         * attribute will be set to the value.
         * This uses the property's `reflect` and `type.toAttribute` property options.
         * @nocollapse
         */
        static _propertyValueToAttribute(value, options) {
            if (options.reflect === undefined) {
                return;
            }
            const type = options.type;
            const converter = options.converter;
            const toAttribute = converter && converter.toAttribute ||
                defaultConverter.toAttribute;
            return toAttribute(value, type);
        }
        /**
         * Performs element initialization. By default captures any pre-set values for
         * registered properties.
         */
        initialize() {
            this._updateState = 0;
            this._updatePromise =
                new Promise((res) => this._enableUpdatingResolver = res);
            this._changedProperties = new Map();
            this._saveInstanceProperties();
            // ensures first update will be caught by an early access of
            // `updateComplete`
            this.requestUpdateInternal();
        }
        /**
         * Fixes any properties set on the instance before upgrade time.
         * Otherwise these would shadow the accessor and break these properties.
         * The properties are stored in a Map which is played back after the
         * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
         * (<=41), properties created for native platform properties like (`id` or
         * `name`) may not have default values set in the element constructor. On
         * these browsers native properties appear on instances and therefore their
         * default value will overwrite any element default (e.g. if the element sets
         * this.id = 'id' in the constructor, the 'id' will become '' since this is
         * the native platform default).
         */
        _saveInstanceProperties() {
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            this.constructor
                ._classProperties.forEach((_v, p) => {
                if (this.hasOwnProperty(p)) {
                    const value = this[p];
                    delete this[p];
                    if (!this._instanceProperties) {
                        this._instanceProperties = new Map();
                    }
                    this._instanceProperties.set(p, value);
                }
            });
        }
        /**
         * Applies previously saved instance properties.
         */
        _applyInstanceProperties() {
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            // tslint:disable-next-line:no-any
            this._instanceProperties.forEach((v, p) => this[p] = v);
            this._instanceProperties = undefined;
        }
        connectedCallback() {
            // Ensure first connection completes an update. Updates cannot complete
            // before connection.
            this.enableUpdating();
        }
        enableUpdating() {
            if (this._enableUpdatingResolver !== undefined) {
                this._enableUpdatingResolver();
                this._enableUpdatingResolver = undefined;
            }
        }
        /**
         * Allows for `super.disconnectedCallback()` in extensions while
         * reserving the possibility of making non-breaking feature additions
         * when disconnecting at some point in the future.
         */
        disconnectedCallback() {
        }
        /**
         * Synchronizes property values when attributes change.
         */
        attributeChangedCallback(name, old, value) {
            if (old !== value) {
                this._attributeToProperty(name, value);
            }
        }
        _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
            const ctor = this.constructor;
            const attr = ctor._attributeNameForProperty(name, options);
            if (attr !== undefined) {
                const attrValue = ctor._propertyValueToAttribute(value, options);
                // an undefined value does not change the attribute.
                if (attrValue === undefined) {
                    return;
                }
                // Track if the property is being reflected to avoid
                // setting the property again via `attributeChangedCallback`. Note:
                // 1. this takes advantage of the fact that the callback is synchronous.
                // 2. will behave incorrectly if multiple attributes are in the reaction
                // stack at time of calling. However, since we process attributes
                // in `update` this should not be possible (or an extreme corner case
                // that we'd like to discover).
                // mark state reflecting
                this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
                if (attrValue == null) {
                    this.removeAttribute(attr);
                }
                else {
                    this.setAttribute(attr, attrValue);
                }
                // mark state not reflecting
                this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
            }
        }
        _attributeToProperty(name, value) {
            // Use tracking info to avoid deserializing attribute value if it was
            // just set from a property setter.
            if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
                return;
            }
            const ctor = this.constructor;
            // Note, hint this as an `AttributeMap` so closure clearly understands
            // the type; it has issues with tracking types through statics
            // tslint:disable-next-line:no-unnecessary-type-assertion
            const propName = ctor._attributeToPropertyMap.get(name);
            if (propName !== undefined) {
                const options = ctor.getPropertyOptions(propName);
                // mark state reflecting
                this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
                this[propName] =
                    // tslint:disable-next-line:no-any
                    ctor._propertyValueFromAttribute(value, options);
                // mark state not reflecting
                this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
            }
        }
        /**
         * This protected version of `requestUpdate` does not access or return the
         * `updateComplete` promise. This promise can be overridden and is therefore
         * not free to access.
         */
        requestUpdateInternal(name, oldValue, options) {
            let shouldRequestUpdate = true;
            // If we have a property key, perform property update steps.
            if (name !== undefined) {
                const ctor = this.constructor;
                options = options || ctor.getPropertyOptions(name);
                if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                    if (!this._changedProperties.has(name)) {
                        this._changedProperties.set(name, oldValue);
                    }
                    // Add to reflecting properties set.
                    // Note, it's important that every change has a chance to add the
                    // property to `_reflectingProperties`. This ensures setting
                    // attribute + property reflects correctly.
                    if (options.reflect === true &&
                        !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                        if (this._reflectingProperties === undefined) {
                            this._reflectingProperties = new Map();
                        }
                        this._reflectingProperties.set(name, options);
                    }
                }
                else {
                    // Abort the request if the property should not be considered changed.
                    shouldRequestUpdate = false;
                }
            }
            if (!this._hasRequestedUpdate && shouldRequestUpdate) {
                this._updatePromise = this._enqueueUpdate();
            }
        }
        /**
         * Requests an update which is processed asynchronously. This should
         * be called when an element should update based on some state not triggered
         * by setting a property. In this case, pass no arguments. It should also be
         * called when manually implementing a property setter. In this case, pass the
         * property `name` and `oldValue` to ensure that any configured property
         * options are honored. Returns the `updateComplete` Promise which is resolved
         * when the update completes.
         *
         * @param name {PropertyKey} (optional) name of requesting property
         * @param oldValue {any} (optional) old value of requesting property
         * @returns {Promise} A Promise that is resolved when the update completes.
         */
        requestUpdate(name, oldValue) {
            this.requestUpdateInternal(name, oldValue);
            return this.updateComplete;
        }
        /**
         * Sets up the element to asynchronously update.
         */
        async _enqueueUpdate() {
            this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
            try {
                // Ensure any previous update has resolved before updating.
                // This `await` also ensures that property changes are batched.
                await this._updatePromise;
            }
            catch (e) {
                // Ignore any previous errors. We only care that the previous cycle is
                // done. Any error should have been handled in the previous update.
            }
            const result = this.performUpdate();
            // If `performUpdate` returns a Promise, we await it. This is done to
            // enable coordinating updates with a scheduler. Note, the result is
            // checked to avoid delaying an additional microtask unless we need to.
            if (result != null) {
                await result;
            }
            return !this._hasRequestedUpdate;
        }
        get _hasRequestedUpdate() {
            return (this._updateState & STATE_UPDATE_REQUESTED);
        }
        get hasUpdated() {
            return (this._updateState & STATE_HAS_UPDATED);
        }
        /**
         * Performs an element update. Note, if an exception is thrown during the
         * update, `firstUpdated` and `updated` will not be called.
         *
         * You can override this method to change the timing of updates. If this
         * method is overridden, `super.performUpdate()` must be called.
         *
         * For instance, to schedule updates to occur just before the next frame:
         *
         * ```
         * protected async performUpdate(): Promise<unknown> {
         *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
         *   super.performUpdate();
         * }
         * ```
         */
        performUpdate() {
            // Abort any update if one is not pending when this is called.
            // This can happen if `performUpdate` is called early to "flush"
            // the update.
            if (!this._hasRequestedUpdate) {
                return;
            }
            // Mixin instance properties once, if they exist.
            if (this._instanceProperties) {
                this._applyInstanceProperties();
            }
            let shouldUpdate = false;
            const changedProperties = this._changedProperties;
            try {
                shouldUpdate = this.shouldUpdate(changedProperties);
                if (shouldUpdate) {
                    this.update(changedProperties);
                }
                else {
                    this._markUpdated();
                }
            }
            catch (e) {
                // Prevent `firstUpdated` and `updated` from running when there's an
                // update exception.
                shouldUpdate = false;
                // Ensure element can accept additional updates after an exception.
                this._markUpdated();
                throw e;
            }
            if (shouldUpdate) {
                if (!(this._updateState & STATE_HAS_UPDATED)) {
                    this._updateState = this._updateState | STATE_HAS_UPDATED;
                    this.firstUpdated(changedProperties);
                }
                this.updated(changedProperties);
            }
        }
        _markUpdated() {
            this._changedProperties = new Map();
            this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
        }
        /**
         * Returns a Promise that resolves when the element has completed updating.
         * The Promise value is a boolean that is `true` if the element completed the
         * update without triggering another update. The Promise result is `false` if
         * a property was set inside `updated()`. If the Promise is rejected, an
         * exception was thrown during the update.
         *
         * To await additional asynchronous work, override the `_getUpdateComplete`
         * method. For example, it is sometimes useful to await a rendered element
         * before fulfilling this Promise. To do this, first await
         * `super._getUpdateComplete()`, then any subsequent state.
         *
         * @returns {Promise} The Promise returns a boolean that indicates if the
         * update resolved without triggering another update.
         */
        get updateComplete() {
            return this._getUpdateComplete();
        }
        /**
         * Override point for the `updateComplete` promise.
         *
         * It is not safe to override the `updateComplete` getter directly due to a
         * limitation in TypeScript which means it is not possible to call a
         * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
         * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
         * This method should be overridden instead. For example:
         *
         *   class MyElement extends LitElement {
         *     async _getUpdateComplete() {
         *       await super._getUpdateComplete();
         *       await this._myChild.updateComplete;
         *     }
         *   }
         */
        _getUpdateComplete() {
            return this._updatePromise;
        }
        /**
         * Controls whether or not `update` should be called when the element requests
         * an update. By default, this method always returns `true`, but this can be
         * customized to control when to update.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        shouldUpdate(_changedProperties) {
            return true;
        }
        /**
         * Updates the element. This method reflects property values to attributes.
         * It can be overridden to render and keep updated element DOM.
         * Setting properties inside this method will *not* trigger
         * another update.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        update(_changedProperties) {
            if (this._reflectingProperties !== undefined &&
                this._reflectingProperties.size > 0) {
                // Use forEach so this works even if for/of loops are compiled to for
                // loops expecting arrays
                this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
                this._reflectingProperties = undefined;
            }
            this._markUpdated();
        }
        /**
         * Invoked whenever the element is updated. Implement to perform
         * post-updating tasks via DOM APIs, for example, focusing an element.
         *
         * Setting properties inside this method will trigger the element to update
         * again after this update cycle completes.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        updated(_changedProperties) {
        }
        /**
         * Invoked when the element is first updated. Implement to perform one time
         * work on the element after update.
         *
         * Setting properties inside this method will trigger the element to update
         * again after this update cycle completes.
         *
         * @param _changedProperties Map of changed properties with old values
         */
        firstUpdated(_changedProperties) {
        }
    }
    _a = finalized;
    /**
     * Marks class as having finished creating properties.
     */
    UpdatingElement[_a] = true;

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const legacyCustomElement = (tagName, clazz) => {
        window.customElements.define(tagName, clazz);
        // Cast as any because TS doesn't recognize the return type as being a
        // subtype of the decorated class when clazz is typed as
        // `Constructor<HTMLElement>` for some reason.
        // `Constructor<HTMLElement>` is helpful to make sure the decorator is
        // applied to elements however.
        // tslint:disable-next-line:no-any
        return clazz;
    };
    const standardCustomElement = (tagName, descriptor) => {
        const { kind, elements } = descriptor;
        return {
            kind,
            elements,
            // This callback is called once the class is otherwise fully defined
            finisher(clazz) {
                window.customElements.define(tagName, clazz);
            }
        };
    };
    /**
     * Class decorator factory that defines the decorated class as a custom element.
     *
     * ```
     * @customElement('my-element')
     * class MyElement {
     *   render() {
     *     return html``;
     *   }
     * }
     * ```
     * @category Decorator
     * @param tagName The name of the custom element to define.
     */
    const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
        legacyCustomElement(tagName, classOrDescriptor) :
        standardCustomElement(tagName, classOrDescriptor);
    const standardProperty = (options, element) => {
        // When decorating an accessor, pass it through and add property metadata.
        // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
        // stomp over the user's accessor.
        if (element.kind === 'method' && element.descriptor &&
            !('value' in element.descriptor)) {
            return Object.assign(Object.assign({}, element), { finisher(clazz) {
                    clazz.createProperty(element.key, options);
                } });
        }
        else {
            // createProperty() takes care of defining the property, but we still
            // must return some kind of descriptor, so return a descriptor for an
            // unused prototype field. The finisher calls createProperty().
            return {
                kind: 'field',
                key: Symbol(),
                placement: 'own',
                descriptor: {},
                // When @babel/plugin-proposal-decorators implements initializers,
                // do this instead of the initializer below. See:
                // https://github.com/babel/babel/issues/9260 extras: [
                //   {
                //     kind: 'initializer',
                //     placement: 'own',
                //     initializer: descriptor.initializer,
                //   }
                // ],
                initializer() {
                    if (typeof element.initializer === 'function') {
                        this[element.key] = element.initializer.call(this);
                    }
                },
                finisher(clazz) {
                    clazz.createProperty(element.key, options);
                }
            };
        }
    };
    const legacyProperty = (options, proto, name) => {
        proto.constructor
            .createProperty(name, options);
    };
    /**
     * A property decorator which creates a LitElement property which reflects a
     * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
     * supplied to configure property features.
     *
     * This decorator should only be used for public fields. Private or protected
     * fields should use the [[`internalProperty`]] decorator.
     *
     * @example
     * ```ts
     * class MyElement {
     *   @property({ type: Boolean })
     *   clicked = false;
     * }
     * ```
     * @category Decorator
     * @ExportDecoratedItems
     */
    function property(options) {
        // tslint:disable-next-line:no-any decorator
        return (protoOrDescriptor, name) => (name !== undefined) ?
            legacyProperty(options, protoOrDescriptor, name) :
            standardProperty(options, protoOrDescriptor);
    }
    /**
     * A property decorator that converts a class property into a getter that
     * executes a querySelector on the element's renderRoot.
     *
     * @param selector A DOMString containing one or more selectors to match.
     * @param cache An optional boolean which when true performs the DOM query only
     * once and caches the result.
     *
     * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
     *
     * @example
     *
     * ```ts
     * class MyElement {
     *   @query('#first')
     *   first;
     *
     *   render() {
     *     return html`
     *       <div id="first"></div>
     *       <div id="second"></div>
     *     `;
     *   }
     * }
     * ```
     * @category Decorator
     */
    function query(selector, cache) {
        return (protoOrDescriptor, 
        // tslint:disable-next-line:no-any decorator
        name) => {
            const descriptor = {
                get() {
                    return this.renderRoot.querySelector(selector);
                },
                enumerable: true,
                configurable: true,
            };
            if (cache) {
                const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
                descriptor.get = function () {
                    if (this[key] === undefined) {
                        (this[key] =
                            this.renderRoot.querySelector(selector));
                    }
                    return this[key];
                };
            }
            return (name !== undefined) ?
                legacyQuery(descriptor, protoOrDescriptor, name) :
                standardQuery(descriptor, protoOrDescriptor);
        };
    }
    const legacyQuery = (descriptor, proto, name) => {
        Object.defineProperty(proto, name, descriptor);
    };
    const standardQuery = (descriptor, element) => ({
        kind: 'method',
        placement: 'prototype',
        key: element.key,
        descriptor,
    });

    /**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */
    /**
     * Whether the current browser supports `adoptedStyleSheets`.
     */
    const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
        (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
        ('adoptedStyleSheets' in Document.prototype) &&
        ('replace' in CSSStyleSheet.prototype);
    const constructionToken = Symbol();
    class CSSResult {
        constructor(cssText, safeToken) {
            if (safeToken !== constructionToken) {
                throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
            }
            this.cssText = cssText;
        }
        // Note, this is a getter so that it's lazy. In practice, this means
        // stylesheets are not created until the first element instance is made.
        get styleSheet() {
            if (this._styleSheet === undefined) {
                // Note, if `supportsAdoptingStyleSheets` is true then we assume
                // CSSStyleSheet is constructable.
                if (supportsAdoptingStyleSheets) {
                    this._styleSheet = new CSSStyleSheet();
                    this._styleSheet.replaceSync(this.cssText);
                }
                else {
                    this._styleSheet = null;
                }
            }
            return this._styleSheet;
        }
        toString() {
            return this.cssText;
        }
    }
    /**
     * Wrap a value for interpolation in a [[`css`]] tagged template literal.
     *
     * This is unsafe because untrusted CSS text can be used to phone home
     * or exfiltrate data to an attacker controlled site. Take care to only use
     * this with trusted input.
     */
    const unsafeCSS = (value) => {
        return new CSSResult(String(value), constructionToken);
    };
    const textFromCSSResult = (value) => {
        if (value instanceof CSSResult) {
            return value.cssText;
        }
        else if (typeof value === 'number') {
            return value;
        }
        else {
            throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
        }
    };
    /**
     * Template tag which which can be used with LitElement's [[LitElement.styles |
     * `styles`]] property to set element styles. For security reasons, only literal
     * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
     * may be used inside a template string part.
     */
    const css = (strings, ...values) => {
        const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
        return new CSSResult(cssText, constructionToken);
    };

    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    // IMPORTANT: do not change the property name or the assignment expression.
    // This line will be used in regexes to search for LitElement usage.
    // TODO(justinfagnani): inject version number at build time
    (window['litElementVersions'] || (window['litElementVersions'] = []))
        .push('2.4.0');
    /**
     * Sentinal value used to avoid calling lit-html's render function when
     * subclasses do not implement `render`
     */
    const renderNotImplemented = {};
    /**
     * Base element class that manages element properties and attributes, and
     * renders a lit-html template.
     *
     * To define a component, subclass `LitElement` and implement a
     * `render` method to provide the component's template. Define properties
     * using the [[`properties`]] property or the [[`property`]] decorator.
     */
    class LitElement extends UpdatingElement {
        /**
         * Return the array of styles to apply to the element.
         * Override this method to integrate into a style management system.
         *
         * @nocollapse
         */
        static getStyles() {
            return this.styles;
        }
        /** @nocollapse */
        static _getUniqueStyles() {
            // Only gather styles once per class
            if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
                return;
            }
            // Take care not to call `this.getStyles()` multiple times since this
            // generates new CSSResults each time.
            // TODO(sorvell): Since we do not cache CSSResults by input, any
            // shared styles will generate new stylesheet objects, which is wasteful.
            // This should be addressed when a browser ships constructable
            // stylesheets.
            const userStyles = this.getStyles();
            if (Array.isArray(userStyles)) {
                // De-duplicate styles preserving the _last_ instance in the set.
                // This is a performance optimization to avoid duplicated styles that can
                // occur especially when composing via subclassing.
                // The last item is kept to try to preserve the cascade order with the
                // assumption that it's most important that last added styles override
                // previous styles.
                const addStyles = (styles, set) => styles.reduceRight((set, s) => 
                // Note: On IE set.add() does not return the set
                Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
                // Array.from does not work on Set in IE, otherwise return
                // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
                const set = addStyles(userStyles, new Set());
                const styles = [];
                set.forEach((v) => styles.unshift(v));
                this._styles = styles;
            }
            else {
                this._styles = userStyles === undefined ? [] : [userStyles];
            }
            // Ensure that there are no invalid CSSStyleSheet instances here. They are
            // invalid in two conditions.
            // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
            //     this is impossible to check except via .replaceSync or use
            // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
            //     false)
            this._styles = this._styles.map((s) => {
                if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                    // Flatten the cssText from the passed constructible stylesheet (or
                    // undetectable non-constructible stylesheet). The user might have
                    // expected to update their stylesheets over time, but the alternative
                    // is a crash.
                    const cssText = Array.prototype.slice.call(s.cssRules)
                        .reduce((css, rule) => css + rule.cssText, '');
                    return unsafeCSS(cssText);
                }
                return s;
            });
        }
        /**
         * Performs element initialization. By default this calls
         * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
         * captures any pre-set values for registered properties.
         */
        initialize() {
            super.initialize();
            this.constructor._getUniqueStyles();
            this.renderRoot = this.createRenderRoot();
            // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
            // element's getRootNode(). While this could be done, we're choosing not to
            // support this now since it would require different logic around de-duping.
            if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
                this.adoptStyles();
            }
        }
        /**
         * Returns the node into which the element should render and by default
         * creates and returns an open shadowRoot. Implement to customize where the
         * element's DOM is rendered. For example, to render into the element's
         * childNodes, return `this`.
         * @returns {Element|DocumentFragment} Returns a node into which to render.
         */
        createRenderRoot() {
            return this.attachShadow({ mode: 'open' });
        }
        /**
         * Applies styling to the element shadowRoot using the [[`styles`]]
         * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
         * available and will fallback otherwise. When Shadow DOM is polyfilled,
         * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
         * is available but `adoptedStyleSheets` is not, styles are appended to the
         * end of the `shadowRoot` to [mimic spec
         * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
         */
        adoptStyles() {
            const styles = this.constructor._styles;
            if (styles.length === 0) {
                return;
            }
            // There are three separate cases here based on Shadow DOM support.
            // (1) shadowRoot polyfilled: use ShadyCSS
            // (2) shadowRoot.adoptedStyleSheets available: use it
            // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
            // rendering
            if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
                window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
            }
            else if (supportsAdoptingStyleSheets) {
                this.renderRoot.adoptedStyleSheets =
                    styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
            }
            else {
                // This must be done after rendering so the actual style insertion is done
                // in `update`.
                this._needsShimAdoptedStyleSheets = true;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            // Note, first update/render handles styleElement so we only call this if
            // connected after first update.
            if (this.hasUpdated && window.ShadyCSS !== undefined) {
                window.ShadyCSS.styleElement(this);
            }
        }
        /**
         * Updates the element. This method reflects property values to attributes
         * and calls `render` to render DOM via lit-html. Setting properties inside
         * this method will *not* trigger another update.
         * @param _changedProperties Map of changed properties with old values
         */
        update(changedProperties) {
            // Setting properties in `render` should not trigger an update. Since
            // updates are allowed after super.update, it's important to call `render`
            // before that.
            const templateResult = this.render();
            super.update(changedProperties);
            // If render is not implemented by the component, don't call lit-html render
            if (templateResult !== renderNotImplemented) {
                this.constructor
                    .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
            }
            // When native Shadow DOM is used but adoptedStyles are not supported,
            // insert styling after rendering to ensure adoptedStyles have highest
            // priority.
            if (this._needsShimAdoptedStyleSheets) {
                this._needsShimAdoptedStyleSheets = false;
                this.constructor._styles.forEach((s) => {
                    const style = document.createElement('style');
                    style.textContent = s.cssText;
                    this.renderRoot.appendChild(style);
                });
            }
        }
        /**
         * Invoked on each update to perform rendering tasks. This method may return
         * any value renderable by lit-html's `NodePart` - typically a
         * `TemplateResult`. Setting properties inside this method will *not* trigger
         * the element to update.
         */
        render() {
            return renderNotImplemented;
        }
    }
    /**
     * Ensure this class is marked as `finalized` as an optimization ensuring
     * it will not needlessly try to `finalize`.
     *
     * Note this property name is a string to prevent breaking Closure JS Compiler
     * optimizations. See updating-element.ts for more information.
     */
    LitElement['finalized'] = true;
    /**
     * Reference to the underlying library method used to render the element's
     * DOM. By default, points to the `render` method from lit-html's shady-render
     * module.
     *
     * **Most users will never need to touch this property.**
     *
     * This  property should not be confused with the `render` instance method,
     * which should be overridden to define a template for the element.
     *
     * Advanced users creating a new base class based on LitElement can override
     * this property to point to a custom render method with a signature that
     * matches [shady-render's `render`
     * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
     *
     * @nocollapse
     */
    LitElement.render = render;

    var __decorate$p = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$p = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    const BaseCSS = css `
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`;
    class WiredBase extends LitElement {
        constructor() {
            super(...arguments);
            this.lastSize = [0, 0];
            this.seed = Math.floor(Math.random() * 2 ** 31);
        }
        updated(_changed) {
            this.wiredRender();
        }
        wiredRender(force = false) {
            if (this.svg) {
                const size = this.canvasSize();
                if ((!force) && (size[0] === this.lastSize[0]) && (size[1] === this.lastSize[1])) {
                    return;
                }
                while (this.svg.hasChildNodes()) {
                    this.svg.removeChild(this.svg.lastChild);
                }
                this.svg.setAttribute('width', `${size[0]}`);
                this.svg.setAttribute('height', `${size[1]}`);
                this.draw(this.svg, size);
                this.lastSize = size;
                this.classList.add('wired-rendered');
            }
        }
    }
    __decorate$p([
        query('svg'),
        __metadata$p("design:type", SVGSVGElement)
    ], WiredBase.prototype, "svg", void 0);
    function fire(element, name, detail, bubbles = true, composed = true) {
        if (name) {
            const init = {
                bubbles: (typeof bubbles === 'boolean') ? bubbles : true,
                composed: (typeof composed === 'boolean') ? composed : true
            };
            if (detail) {
                init.detail = detail;
            }
            element.dispatchEvent(new CustomEvent(name, init));
        }
    }
    function randomSeed() {
        return Math.floor(Math.random() * 2 ** 31);
    }

    function t(t,n,e){if(t&&t.length){const[o,s]=n,r=Math.PI/180*e,i=Math.cos(r),a=Math.sin(r);t.forEach(t=>{const[n,e]=t;t[0]=(n-o)*i-(e-s)*a+o,t[1]=(n-o)*a+(e-s)*i+s;});}}function n(t){const n=t[0],e=t[1];return Math.sqrt(Math.pow(n[0]-e[0],2)+Math.pow(n[1]-e[1],2))}function e(t,n,e,o){const s=n[1]-t[1],r=t[0]-n[0],i=s*t[0]+r*t[1],a=o[1]-e[1],c=e[0]-o[0],h=a*e[0]+c*e[1],u=s*c-a*r;return u?[(c*i-r*h)/u,(s*h-a*i)/u]:null}function o(t,n,e){const o=t.length;if(o<3)return !1;const a=[Number.MAX_SAFE_INTEGER,e],c=[n,e];let h=0;for(let n=0;n<o;n++){const e=t[n],u=t[(n+1)%o];if(i(e,u,c,a)){if(0===r(e,c,u))return s(e,c,u);h++;}}return h%2==1}function s(t,n,e){return n[0]<=Math.max(t[0],e[0])&&n[0]>=Math.min(t[0],e[0])&&n[1]<=Math.max(t[1],e[1])&&n[1]>=Math.min(t[1],e[1])}function r(t,n,e){const o=(n[1]-t[1])*(e[0]-n[0])-(n[0]-t[0])*(e[1]-n[1]);return 0===o?0:o>0?1:2}function i(t,n,e,o){const i=r(t,n,e),a=r(t,n,o),c=r(e,o,t),h=r(e,o,n);return i!==a&&c!==h||(!(0!==i||!s(t,e,n))||(!(0!==a||!s(t,o,n))||(!(0!==c||!s(e,t,o))||!(0!==h||!s(e,n,o)))))}function a(n,e){const o=[0,0],s=Math.round(e.hachureAngle+90);s&&t(n,o,s);const r=function(t,n){const e=[...t];e[0].join(",")!==e[e.length-1].join(",")&&e.push([e[0][0],e[0][1]]);const o=[];if(e&&e.length>2){let t=n.hachureGap;t<0&&(t=4*n.strokeWidth),t=Math.max(t,.1);const s=[];for(let t=0;t<e.length-1;t++){const n=e[t],o=e[t+1];if(n[1]!==o[1]){const t=Math.min(n[1],o[1]);s.push({ymin:t,ymax:Math.max(n[1],o[1]),x:t===n[1]?n[0]:o[0],islope:(o[0]-n[0])/(o[1]-n[1])});}}if(s.sort((t,n)=>t.ymin<n.ymin?-1:t.ymin>n.ymin?1:t.x<n.x?-1:t.x>n.x?1:t.ymax===n.ymax?0:(t.ymax-n.ymax)/Math.abs(t.ymax-n.ymax)),!s.length)return o;let r=[],i=s[0].ymin;for(;r.length||s.length;){if(s.length){let t=-1;for(let n=0;n<s.length&&!(s[n].ymin>i);n++)t=n;s.splice(0,t+1).forEach(t=>{r.push({s:i,edge:t});});}if(r=r.filter(t=>!(t.edge.ymax<=i)),r.sort((t,n)=>t.edge.x===n.edge.x?0:(t.edge.x-n.edge.x)/Math.abs(t.edge.x-n.edge.x)),r.length>1)for(let t=0;t<r.length;t+=2){const n=t+1;if(n>=r.length)break;const e=r[t].edge,s=r[n].edge;o.push([[Math.round(e.x),i],[Math.round(s.x),i]]);}i+=t,r.forEach(n=>{n.edge.x=n.edge.x+t*n.edge.islope;});}}return o}(n,e);return s&&(t(n,o,-s),function(n,e,o){const s=[];n.forEach(t=>s.push(...t)),t(s,e,o);}(r,o,-s)),r}class c extends class{constructor(t){this.helper=t;}fillPolygon(t,n){return this._fillPolygon(t,n)}_fillPolygon(t,n,e=!1){let o=a(t,n);if(e){const n=this.connectingLines(t,o);o=o.concat(n);}return {type:"fillSketch",ops:this.renderLines(o,n)}}renderLines(t,n){const e=[];for(const o of t)e.push(...this.helper.doubleLineOps(o[0][0],o[0][1],o[1][0],o[1][1],n));return e}connectingLines(t,e){const o=[];if(e.length>1)for(let s=1;s<e.length;s++){const r=e[s-1];if(n(r)<3)continue;const i=[e[s][0],r[1]];if(n(i)>3){const n=this.splitOnIntersections(t,i);o.push(...n);}}return o}midPointInPolygon(t,n){return o(t,(n[0][0]+n[1][0])/2,(n[0][1]+n[1][1])/2)}splitOnIntersections(t,s){const r=Math.max(5,.1*n(s)),a=[];for(let o=0;o<t.length;o++){const c=t[o],h=t[(o+1)%t.length];if(i(c,h,...s)){const t=e(c,h,s[0],s[1]);if(t){const e=n([t,s[0]]),o=n([t,s[1]]);e>r&&o>r&&a.push({point:t,distance:e});}}}if(a.length>1){const n=a.sort((t,n)=>t.distance-n.distance).map(t=>t.point);if(o(t,...s[0])||n.shift(),o(t,...s[1])||n.pop(),n.length<=1)return this.midPointInPolygon(t,s)?[s]:[];const e=[s[0],...n,s[1]],r=[];for(let n=0;n<e.length-1;n+=2){const o=[e[n],e[n+1]];this.midPointInPolygon(t,o)&&r.push(o);}return r}return this.midPointInPolygon(t,s)?[s]:[]}}{fillPolygon(t,n){return this._fillPolygon(t,n,!0)}}class h{constructor(t){this.seed=t;}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function u(t,n,e,o,s){return {type:"path",ops:M(t,n,e,o,s)}}function l(t,n){return function(t,n,e){const o=(t||[]).length;if(o>2){const s=[];for(let n=0;n<o-1;n++)s.push(...M(t[n][0],t[n][1],t[n+1][0],t[n+1][1],e));return n&&s.push(...M(t[o-1][0],t[o-1][1],t[0][0],t[0][1],e)),{type:"path",ops:s}}return 2===o?u(t[0][0],t[0][1],t[1][0],t[1][1],e):{type:"path",ops:[]}}(t,!0,n)}function f(t,n,e,o,s){return function(t,n,e,o){const[s,r]=b(o.increment,t,n,o.rx,o.ry,1,o.increment*g(.1,g(.4,1,e),e),e);let i=y(s,null,e);if(!e.disableMultiStroke){const[s]=b(o.increment,t,n,o.rx,o.ry,1.5,0,e),r=y(s,null,e);i=i.concat(r);}return {estimatedPoints:r,opset:{type:"path",ops:i}}}(t,n,s,p(e,o,s)).opset}function p(t,n,e){const o=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(n/2,2))/2)),s=Math.max(e.curveStepCount,e.curveStepCount/Math.sqrt(200)*o),r=2*Math.PI/s;let i=Math.abs(t/2),a=Math.abs(n/2);const c=1-e.curveFitting;return i+=m(i*c,e),a+=m(a*c,e),{increment:r,rx:i,ry:a}}function d(t){return t.randomizer||(t.randomizer=new h(t.seed||0)),t.randomizer.next()}function g(t,n,e,o=1){return e.roughness*o*(d(e)*(n-t)+t)}function m(t,n,e=1){return g(-t,t,n,e)}function M(t,n,e,o,s,r=!1){const i=r?s.disableMultiStrokeFill:s.disableMultiStroke,a=x(t,n,e,o,s,!0,!1);if(i)return a;const c=x(t,n,e,o,s,!0,!0);return a.concat(c)}function x(t,n,e,o,s,r,i){const a=Math.pow(t-e,2)+Math.pow(n-o,2),c=Math.sqrt(a);let h=1;h=c<200?1:c>500?.4:-.0016668*c+1.233334;let u=s.maxRandomnessOffset||0;u*u*100>a&&(u=c/10);const l=u/2,f=.2+.2*d(s);let p=s.bowing*s.maxRandomnessOffset*(o-n)/200,g=s.bowing*s.maxRandomnessOffset*(t-e)/200;p=m(p,s,h),g=m(g,s,h);const M=[],x=()=>m(l,s,h),y=()=>m(u,s,h);return r&&(i?M.push({op:"move",data:[t+x(),n+x()]}):M.push({op:"move",data:[t+m(u,s,h),n+m(u,s,h)]})),i?M.push({op:"bcurveTo",data:[p+t+(e-t)*f+x(),g+n+(o-n)*f+x(),p+t+2*(e-t)*f+x(),g+n+2*(o-n)*f+x(),e+x(),o+x()]}):M.push({op:"bcurveTo",data:[p+t+(e-t)*f+y(),g+n+(o-n)*f+y(),p+t+2*(e-t)*f+y(),g+n+2*(o-n)*f+y(),e+y(),o+y()]}),M}function y(t,n,e){const o=t.length,s=[];if(o>3){const r=[],i=1-e.curveTightness;s.push({op:"move",data:[t[1][0],t[1][1]]});for(let n=1;n+2<o;n++){const e=t[n];r[0]=[e[0],e[1]],r[1]=[e[0]+(i*t[n+1][0]-i*t[n-1][0])/6,e[1]+(i*t[n+1][1]-i*t[n-1][1])/6],r[2]=[t[n+1][0]+(i*t[n][0]-i*t[n+2][0])/6,t[n+1][1]+(i*t[n][1]-i*t[n+2][1])/6],r[3]=[t[n+1][0],t[n+1][1]],s.push({op:"bcurveTo",data:[r[1][0],r[1][1],r[2][0],r[2][1],r[3][0],r[3][1]]});}if(n&&2===n.length){const t=e.maxRandomnessOffset;s.push({op:"lineTo",data:[n[0]+m(t,e),n[1]+m(t,e)]});}}else 3===o?(s.push({op:"move",data:[t[1][0],t[1][1]]}),s.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===o&&s.push(...M(t[0][0],t[0][1],t[1][0],t[1][1],e));return s}function b(t,n,e,o,s,r,i,a){const c=[],h=[],u=m(.5,a)-Math.PI/2;h.push([m(r,a)+n+.9*o*Math.cos(u-t),m(r,a)+e+.9*s*Math.sin(u-t)]);for(let i=u;i<2*Math.PI+u-.01;i+=t){const t=[m(r,a)+n+o*Math.cos(i),m(r,a)+e+s*Math.sin(i)];c.push(t),h.push(t);}return h.push([m(r,a)+n+o*Math.cos(u+2*Math.PI+.5*i),m(r,a)+e+s*Math.sin(u+2*Math.PI+.5*i)]),h.push([m(r,a)+n+.98*o*Math.cos(u+i),m(r,a)+e+.98*s*Math.sin(u+i)]),h.push([m(r,a)+n+.9*o*Math.cos(u+.5*i),m(r,a)+e+.9*s*Math.sin(u+.5*i)]),[h,c]}const P={randOffset:(t,n)=>t,randOffsetWithRange:(t,n,e)=>(t+n)/2,ellipse:(t,n,e,o,s)=>f(t,n,e,o,s),doubleLineOps:(t,n,e,o,s)=>function(t,n,e,o,s){return M(t,n,e,o,s,!0)}(t,n,e,o,s)};function v(t){return {maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:t}}function w(t,n){let e="";for(const o of t.ops){const t=o.data;switch(o.op){case"move":if(n&&e)break;e+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":e+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"lineTo":e+=`L${t[0]} ${t[1]} `;}}return e.trim()}function I(t,n){const e=document.createElementNS("http://www.w3.org/2000/svg",t);if(n)for(const t in n)e.setAttributeNS(null,t,n[t]);return e}function S(t,n,e=!1){const o=I("path",{d:w(t,e)});return n&&n.appendChild(o),o}function k(t,n,e,o,s,r){return S(function(t,n,e,o,s){return l([[t,n],[t+e,n],[t+e,n+o],[t,n+o]],s)}(n+2,e+2,o-4,s-4,v(r)),t)}function O(t,n,e,o,s,r){return S(u(n,e,o,s,v(r)),t)}function T(t,n,e){return S(l(n,v(e)),t,!0)}function $(t,n,e,o,s,r){return S(f(n,e,o=Math.max(o>10?o-4:o-1,1),s=Math.max(s>10?s-4:s-1,1),v(r)),t)}function E(t,n){return S(new c(P).fillPolygon(t,v(n)),null)}function L(t,n,e,o,s){const r=p(e,o,v(s)),i=[];let a=0;for(;a<=2*Math.PI;)i.push([t+r.rx*Math.cos(a),n+r.ry*Math.sin(a)]),a+=r.increment;return E(i,s)}

    var __decorate$o = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$o = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredButton = class WiredButton extends WiredBase {
        constructor() {
            super();
            this.elevation = 1;
            this.disabled = false;
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(() => {
                    if (this.svg) {
                        this.wiredRender(true);
                    }
                });
            }
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `
            ];
        }
        render() {
            return html `
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `;
        }
        focus() {
            if (this.button) {
                this.button.focus();
            }
            else {
                super.focus();
            }
        }
        canvasSize() {
            if (this.button) {
                const size = this.button.getBoundingClientRect();
                const elev = Math.min(Math.max(1, this.elevation), 5);
                const w = size.width + ((elev - 1) * 2);
                const h = size.height + ((elev - 1) * 2);
                return [w, h];
            }
            return this.lastSize;
        }
        draw(svg, size) {
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const s = {
                width: size[0] - ((elev - 1) * 2),
                height: size[1] - ((elev - 1) * 2)
            };
            k(svg, 0, 0, s.width, s.height, this.seed);
            for (let i = 1; i < elev; i++) {
                (O(svg, (i * 2), s.height + (i * 2), s.width + (i * 2), s.height + (i * 2), this.seed)).style.opacity = `${(75 - (i * 10)) / 100}`;
                (O(svg, s.width + (i * 2), s.height + (i * 2), s.width + (i * 2), i * 2, this.seed)).style.opacity = `${(75 - (i * 10)) / 100}`;
                (O(svg, (i * 2), s.height + (i * 2), s.width + (i * 2), s.height + (i * 2), this.seed)).style.opacity = `${(75 - (i * 10)) / 100}`;
                (O(svg, s.width + (i * 2), s.height + (i * 2), s.width + (i * 2), i * 2, this.seed)).style.opacity = `${(75 - (i * 10)) / 100}`;
            }
        }
        updated() {
            super.updated();
            this.attachResizeListener();
        }
        disconnectedCallback() {
            this.detachResizeListener();
        }
        attachResizeListener() {
            if (this.button && this.resizeObserver && this.resizeObserver.observe) {
                this.resizeObserver.observe(this.button);
            }
        }
        detachResizeListener() {
            if (this.button && this.resizeObserver && this.resizeObserver.unobserve) {
                this.resizeObserver.unobserve(this.button);
            }
        }
    };
    __decorate$o([
        property({ type: Number }),
        __metadata$o("design:type", Object)
    ], WiredButton.prototype, "elevation", void 0);
    __decorate$o([
        property({ type: Boolean, reflect: true }),
        __metadata$o("design:type", Object)
    ], WiredButton.prototype, "disabled", void 0);
    __decorate$o([
        query('button'),
        __metadata$o("design:type", HTMLButtonElement)
    ], WiredButton.prototype, "button", void 0);
    WiredButton = __decorate$o([
        customElement('wired-button'),
        __metadata$o("design:paramtypes", [])
    ], WiredButton);

    var __decorate$n = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$n = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    // GLOBAL CONSTANTS
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const TABLE_PADDING = 8; // pixels
    let WiredCalendar = class WiredCalendar extends LitElement {
        constructor() {
            super(...arguments);
            this.elevation = 3;
            this.disabled = false;
            this.initials = false; // days of week
            this.format = (d) => this.months_short[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
            // Initial calendar headers (will be replaced if different locale than `en` or `en-US`)
            this.weekdays_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            // Fix month shorts for internal value comparations (not changed by locale)
            this.months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            this.firstOfMonthDate = new Date(); // Only month and year relevant
            this.fDate = undefined; // Date obj for firstdate string
            this.lDate = undefined; // Date obj for lastdate string
            this.calendarRefSize = { width: 0, height: 0 };
            this.tblColWidth = 0;
            this.tblRowHeight = 0;
            this.tblHeadHeight = 0;
            this.monthYear = '';
            this.weeks = [[]];
            this.seed = randomSeed();
        }
        connectedCallback() {
            super.connectedCallback();
            if (!this.resizeHandler) {
                this.resizeHandler = this.debounce(this.resized.bind(this), 200, false, this);
                window.addEventListener('resize', this.resizeHandler, { passive: true });
            }
            // Initial setup (now that `wired-calendar` element is ready in DOM)
            this.localizeCalendarHeaders();
            this.setInitialConditions();
            this.computeCalendar();
            this.refreshSelection();
            setTimeout(() => this.updated());
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
                delete this.resizeHandler;
            }
        }
        static get styles() {
            return css `
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    .calendar path {
      stroke: var(--wired-calendar-color, black);
      stroke-width: 0.7;
      fill: transparent;
    }

    .selected path {
      stroke: var(--wired-calendar-selected-color, red);
      stroke-width: 2.5;
      fill: transparent;
      transition: transform 0.05s ease;
    }

    table {
      position: relative;
      background: var(--wired-calendar-bg, white);
      border-collapse: collapse;
      font-size: inherit;
      text-transform: capitalize;
      line-height: unset;
      cursor: default;
      overflow: hidden;
    }

    table:focus {
      outline: none !important;
    }

    td,
    th {
      border-radius: 4px;
      text-align: center;
    }

    td.disabled {
      color: var(--wired-calendar-disabled-color, lightgray);
      cursor: not-allowed;
    }

    td.dimmed {
      color: var(--wired-calendar-dimmed-color, gray);
    }

    td.selected {
      position: absolute;
    }

    td:not(.disabled):not(.selected):hover {
      background-color: #d0d0d0;
      cursor: pointer;
    }

    .pointer {
      cursor: pointer;
    }

    `;
        }
        render() {
            /*
            * Template to render a one month calendar
            *
            * The template consists of one `table` and one overlay `div`.
            * The `table` consiste of two header rows plus one row for each week of the month.
            * The underlaying data is an array of weeks. Each week consist of an array of days.
            * The days are objects with `CalendarCell` interface. Each one is rendered ...
            * ... according with the boolean conditions `disabled` and `selected`.
            * Particulary, a `selected` day is rendered with its own extra overlay ...
            * ... (and svg tag) to draw over it.
            */
            return html `
    <table style="width:${this.calendarRefSize.width}px;height:${this.calendarRefSize.height}px;border:${TABLE_PADDING}px solid transparent"
            @mousedown="${this.onItemClick}"
            @touchstart="${this.onItemClick}">
      ${ /* 1st header row with calendar title and prev/next controls */''}
      <tr class="top-header" style="height:${this.tblHeadHeight}px;">
        <th id="prevCal" class="pointer" @click="${this.onPrevClick}">&lt;&lt;</th>
        <th colSpan="5">${this.monthYear}</th>
        <th id="nextCal" class="pointer" @click="${this.onNextClick}">&gt;&gt;</th>
      </tr>
      ${ /* 2nd header row with the seven weekdays names (short or initials) */''}
      <tr class="header" style="height:${this.tblHeadHeight}px;">
        ${this.weekdays_short
            .map((d) => html `<th style="width: ${this.tblColWidth};">${this.initials ? d[0] : d}</th>
            `)}
      </tr>
      ${ /* Loop thru weeks building one row `<tr>` for each week */''}
      ${this.weeks
            .map((weekDays) => html `<tr style="height:${this.tblRowHeight}px;">
              ${ /* Loop thru weeekdays in each week building one data cell `<td>` for each day */''}
              ${weekDays
            .map((d) => 
        // This blank space left on purpose for clarity
        html `${d.selected ?
            // Render "selected" cell
            html `
                            <td class="selected" value="${d.value}">
                            <div style="width: ${this.tblColWidth}px; line-height:${this.tblRowHeight}px;">${d.text}</div>
                            <div class="overlay">
                              <svg id="svgTD" class="selected"></svg>
                            </div></td>
                        ` :
            // Render "not selected" cell
            html `
                            <td .className="${d.disabled ? 'disabled' : (d.dimmed ? 'dimmed' : '')}"
                                value="${d.disabled ? '' : d.value}">${d.text}</td>
                        `}
                    `
        // This blank space left on purpose for clarity
        )}${ /* End `weekDays` map loop */''}
            </tr>`)}${ /* End `weeks` map loop */''}
    </table>
    <div class="overlay">
      <svg id="svg" class="calendar"></svg>
    </div>
    `;
        }
        firstUpdated() {
            this.setAttribute('role', 'dialog');
        }
        updated(changed) {
            if (changed && changed instanceof Map) {
                if (changed.has('disabled'))
                    this.refreshDisabledState();
                if (changed.has('selected'))
                    this.refreshSelection();
            }
            // Redraw calendar sketchy bounding box
            const svg = this.shadowRoot.getElementById('svg');
            while (svg.hasChildNodes()) {
                svg.removeChild(svg.lastChild);
            }
            const s = this.getCalendarSize();
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const w = s.width + ((elev - 1) * 2);
            const h = s.height + ((elev - 1) * 2);
            svg.setAttribute('width', `${w}`);
            svg.setAttribute('height', `${h}`);
            k(svg, 2, 2, s.width - 4, s.height - 4, this.seed);
            for (let i = 1; i < elev; i++) {
                (O(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2), this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2, this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2), this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2, this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
            }
            // Redraw sketchy red circle `selected` cell
            const svgTD = this.shadowRoot.getElementById('svgTD');
            if (svgTD) {
                while (svgTD.hasChildNodes()) {
                    svgTD.removeChild(svgTD.lastChild);
                }
                const iw = Math.max(this.tblColWidth * 1.0, 20);
                const ih = Math.max(this.tblRowHeight * 0.9, 18);
                const c = $(svgTD, this.tblColWidth / 2, this.tblRowHeight / 2, iw, ih, this.seed);
                svgTD.appendChild(c);
            }
            this.classList.add('wired-rendered');
        }
        setSelectedDate(formatedDate) {
            // TODO: Validate `formatedDate`
            this.selected = formatedDate;
            if (this.selected) {
                const d = new Date(this.selected);
                this.firstOfMonthDate = new Date(d.getFullYear(), d.getMonth(), 1);
                this.computeCalendar();
                this.requestUpdate();
                this.fireSelected();
            }
        }
        /* private methods */
        /*
        * Change calendar headers according to locale parameter or browser locale
        * Notes:
        *   This only change the rendered text in the calendar
        *   All the internal parsing of string dates do not use locale
        */
        localizeCalendarHeaders() {
            // Find locale preference when parameter not set
            if (!this.locale) {
                // Guess from different browser possibilities
                const n = navigator;
                if (n.hasOwnProperty('systemLanguage'))
                    this.locale = n['systemLanguage'];
                else if (n.hasOwnProperty('browserLanguage'))
                    this.locale = n['browserLanguage'];
                else
                    this.locale = (navigator.languages || ['en'])[0];
            }
            // Replace localized calendar texts when not `en-US` or not `en`
            const l = (this.locale || '').toLowerCase();
            if (l !== 'en-us' && l !== 'en') {
                const d = new Date();
                // Compute weekday header texts (like "Sun", "Mon", "Tue", ...)
                const weekDayOffset = d.getUTCDay();
                const daySunday = new Date(d.getTime() - DAY * weekDayOffset);
                for (let i = 0; i < 7; i++) {
                    const weekdayDate = new Date(daySunday);
                    weekdayDate.setDate(daySunday.getDate() + i);
                    this.weekdays_short[i] = weekdayDate.toLocaleString(this.locale, { weekday: 'short' });
                }
                // Compute month header texts (like "January", "February", ...)
                d.setDate(1); // Set to first of the month to avoid cases like "February 30"
                for (let m = 0; m < 12; m++) {
                    d.setMonth(m);
                    this.months[m] = d.toLocaleString(this.locale, { month: 'long' });
                    // Beware: month shorts are used in `en-US` internally. Do not change.
                    // this.months_short[m] = d.toLocaleString(this.locale, {month: 'short'});
                }
            }
        }
        setInitialConditions() {
            // Initialize calendar element size
            this.calendarRefSize = this.getCalendarSize();
            // Define an initial reference date either from a paramenter or new today date
            let d;
            // TODO: Validate `this.selected`
            if (this.selected) {
                // TODO: Validate `this.selected`
                d = new Date(this.selected);
                this.value = { date: new Date(this.selected), text: this.selected };
            }
            else {
                d = new Date();
            }
            // Define a reference date used to build one month calendar
            this.firstOfMonthDate = new Date(d.getFullYear(), d.getMonth(), 1);
            // Convert string paramenters (when present) to Date objects
            // TODO: Validate `this.firstdate`
            if (this.firstdate)
                this.fDate = new Date(this.firstdate);
            // TODO: Validate `this.lastdate`
            if (this.lastdate)
                this.lDate = new Date(this.lastdate);
        }
        refreshSelection() {
            // Loop thru all weeks and thru all day in each week
            this.weeks.forEach((week) => week.forEach((day) => {
                // Set calendar day `selected` according to user's `this.selected`
                day.selected = this.selected && (day.value === this.selected) || false;
            }));
            this.requestUpdate();
        }
        resized() {
            // Reinitialize calendar element size
            this.calendarRefSize = this.getCalendarSize();
            this.computeCalendar();
            this.refreshSelection();
        }
        getCalendarSize() {
            const limits = this.getBoundingClientRect();
            return {
                width: limits.width > 180 ? limits.width : 320,
                height: limits.height > 180 ? limits.height : 320
            };
        }
        computeCellsizes(size, rows) {
            const numerOfHeaderRows = 2;
            const headerRealStateProportion = 0.25; // 1 equals 100%
            const borderSpacing = 2; // See browser's table {border-spacing: 2px;}
            this.tblColWidth = (size.width / 7) - borderSpacing; // A week has 7 days
            this.tblHeadHeight =
                (size.height * headerRealStateProportion / numerOfHeaderRows) - borderSpacing;
            this.tblRowHeight =
                (size.height * (1 - headerRealStateProportion) / rows) - borderSpacing;
        }
        refreshDisabledState() {
            if (this.disabled) {
                this.classList.add('wired-disabled');
            }
            else {
                this.classList.remove('wired-disabled');
            }
            this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
        }
        onItemClick(event) {
            event.stopPropagation();
            const sel = event.target;
            // Attribute 'value' empty means: is a disabled date (should not be 'selected')
            if (sel && sel.hasAttribute('value') && sel.getAttribute('value') !== '') {
                this.selected = sel.getAttribute('value') || undefined;
                this.refreshSelection();
                this.fireSelected();
            }
        }
        fireSelected() {
            if (this.selected) {
                this.value = { date: new Date(this.selected), text: this.selected };
                fire(this, 'selected', { selected: this.selected });
            }
        }
        computeCalendar() {
            // Compute month and year for table header
            this.monthYear = this.months[this.firstOfMonthDate.getMonth()] + ' ' + this.firstOfMonthDate.getFullYear();
            // Compute all month dates (one per day, 7 days per week, all weeks of the month)
            const first_day_in_month = new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth(), 1);
            // Initialize offset (negative because calendar commonly starts few days before the first of the month)
            let dayInMonthOffset = 0 - first_day_in_month.getDay();
            const amountOfWeeks = Math.ceil((new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() + 1, 0).getDate() - dayInMonthOffset) / 7);
            this.weeks = []; // Clear previous weeks
            for (let weekIndex = 0; weekIndex < amountOfWeeks; weekIndex++) {
                this.weeks[weekIndex] = [];
                for (let dayOfWeekIndex = 0; dayOfWeekIndex < 7; dayOfWeekIndex++) {
                    // Compute day date (using an incrementing offset)
                    const day = new Date(first_day_in_month.getTime() + DAY * dayInMonthOffset);
                    const formatedDate = this.format(day);
                    this.weeks[weekIndex][dayOfWeekIndex] = {
                        value: formatedDate,
                        text: day.getDate().toString(),
                        selected: formatedDate === this.selected,
                        dimmed: day.getMonth() !== first_day_in_month.getMonth(),
                        disabled: this.isDateOutOfRange(day)
                    };
                    // Increment offset (advance one day in calendar)
                    dayInMonthOffset++;
                }
            }
            // Compute row and column sizes
            this.computeCellsizes(this.calendarRefSize, amountOfWeeks);
        }
        onPrevClick() {
            // Is there a preious month limit due to `firstdate`?
            if (this.fDate === undefined ||
                new Date(this.fDate.getFullYear(), this.fDate.getMonth() - 1, 1).getMonth() !==
                    new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() - 1, 1).getMonth()) {
                // No limit found, so update `firstOfMonthDate` to first of the previous month
                this.firstOfMonthDate = new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() - 1, 1);
                this.computeCalendar();
                this.refreshSelection();
            }
        }
        onNextClick() {
            // Is there a next month limit due to `lastdate`?
            if (this.lDate === undefined ||
                new Date(this.lDate.getFullYear(), this.lDate.getMonth() + 1, 1).getMonth() !==
                    new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() + 1, 1).getMonth()) {
                // No limit found, so update `firstOfMonthDate` to first of the next month
                this.firstOfMonthDate = new Date(this.firstOfMonthDate.getFullYear(), this.firstOfMonthDate.getMonth() + 1, 1);
                this.computeCalendar();
                this.refreshSelection();
            }
        }
        isDateOutOfRange(day) {
            if (this.fDate && this.lDate) {
                return day < this.fDate || this.lDate < day;
            }
            else if (this.fDate) {
                return day < this.fDate;
            }
            else if (this.lDate) {
                return this.lDate < day;
            }
            return false;
        }
        /* Util */
        debounce(func, wait, immediate, context) {
            let timeout = 0;
            return () => {
                const args = arguments;
                const later = () => {
                    timeout = 0;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = window.setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            };
        }
    };
    __decorate$n([
        property({ type: Number }),
        __metadata$n("design:type", Object)
    ], WiredCalendar.prototype, "elevation", void 0);
    __decorate$n([
        property({ type: String }),
        __metadata$n("design:type", String)
    ], WiredCalendar.prototype, "selected", void 0);
    __decorate$n([
        property({ type: String }),
        __metadata$n("design:type", String)
    ], WiredCalendar.prototype, "firstdate", void 0);
    __decorate$n([
        property({ type: String }),
        __metadata$n("design:type", String)
    ], WiredCalendar.prototype, "lastdate", void 0);
    __decorate$n([
        property({ type: String }),
        __metadata$n("design:type", String)
    ], WiredCalendar.prototype, "locale", void 0);
    __decorate$n([
        property({ type: Boolean, reflect: true }),
        __metadata$n("design:type", Object)
    ], WiredCalendar.prototype, "disabled", void 0);
    __decorate$n([
        property({ type: Boolean, reflect: true }),
        __metadata$n("design:type", Object)
    ], WiredCalendar.prototype, "initials", void 0);
    __decorate$n([
        property({ type: Object }),
        __metadata$n("design:type", Object)
    ], WiredCalendar.prototype, "value", void 0);
    __decorate$n([
        property({ type: Function }),
        __metadata$n("design:type", Function)
    ], WiredCalendar.prototype, "format", void 0);
    WiredCalendar = __decorate$n([
        customElement('wired-calendar')
    ], WiredCalendar);

    var __decorate$m = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$m = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredCard = class WiredCard extends WiredBase {
        constructor() {
            super();
            this.elevation = 1;
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(() => {
                    if (this.svg) {
                        this.wiredRender();
                    }
                });
            }
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
        path.cardFill {
          stroke-width: 3.5;
          stroke: var(--wired-card-background-fill);
        }
        path {
          stroke: var(--wired-card-background-fill, currentColor);
        }
      `
            ];
        }
        render() {
            return html `
    <div id="overlay"><svg></svg></div>
    <div style="position: relative;">
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    `;
        }
        updated(changed) {
            const force = changed.has('fill');
            this.wiredRender(force);
            this.attachResizeListener();
        }
        disconnectedCallback() {
            this.detachResizeListener();
        }
        attachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.observe) {
                this.resizeObserver.observe(this);
            }
            else if (!this.windowResizeHandler) {
                this.windowResizeHandler = () => this.wiredRender();
                window.addEventListener('resize', this.windowResizeHandler, { passive: true });
            }
        }
        detachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.unobserve) {
                this.resizeObserver.unobserve(this);
            }
            if (this.windowResizeHandler) {
                window.removeEventListener('resize', this.windowResizeHandler);
            }
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const w = s.width + ((elev - 1) * 2);
            const h = s.height + ((elev - 1) * 2);
            return [w, h];
        }
        draw(svg, size) {
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const s = {
                width: size[0] - ((elev - 1) * 2),
                height: size[1] - ((elev - 1) * 2)
            };
            if (this.fill && this.fill.trim()) {
                const fillNode = E([
                    [2, 2],
                    [s.width - 4, 2],
                    [s.width - 2, s.height - 4],
                    [2, s.height - 4]
                ], this.seed);
                fillNode.classList.add('cardFill');
                svg.style.setProperty('--wired-card-background-fill', this.fill.trim());
                svg.appendChild(fillNode);
            }
            k(svg, 2, 2, s.width - 4, s.height - 4, this.seed);
            for (let i = 1; i < elev; i++) {
                (O(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2), this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2, this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2), this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2, this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
            }
        }
    };
    __decorate$m([
        property({ type: Number }),
        __metadata$m("design:type", Object)
    ], WiredCard.prototype, "elevation", void 0);
    __decorate$m([
        property({ type: String }),
        __metadata$m("design:type", String)
    ], WiredCard.prototype, "fill", void 0);
    WiredCard = __decorate$m([
        customElement('wired-card'),
        __metadata$m("design:paramtypes", [])
    ], WiredCard);

    var __decorate$l = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$l = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredCheckbox = class WiredCheckbox extends WiredBase {
        constructor() {
            super(...arguments);
            this.checked = false;
            this.disabled = false;
            this.focused = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-checkbox-icon-color, currentColor);
        stroke-width: var(--wired-checkbox-default-swidth, 0.7);
      }
      g path {
        stroke-width: 2.5;
      }
      #container.focused {
        --wired-checkbox-default-swidth: 1.5;
      }
      `
            ];
        }
        focus() {
            if (this.input) {
                this.input.focus();
            }
            else {
                super.focus();
            }
        }
        wiredRender(force = false) {
            super.wiredRender(force);
            this.refreshCheckVisibility();
        }
        render() {
            return html `
    <label id="container" class="${this.focused ? 'focused' : ''}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${() => this.focused = true}"
        @blur="${() => this.focused = false}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `;
        }
        onChange() {
            this.checked = this.input.checked;
            this.refreshCheckVisibility();
            fire(this, 'change', { checked: this.checked });
        }
        canvasSize() {
            return [24, 24];
        }
        draw(svg, size) {
            k(svg, 0, 0, size[0], size[1], this.seed);
            this.svgCheck = I('g');
            svg.appendChild(this.svgCheck);
            O(this.svgCheck, size[0] * 0.3, size[1] * 0.4, size[0] * 0.5, size[1] * 0.7, this.seed);
            O(this.svgCheck, size[0] * 0.5, size[1] * 0.7, size[0] + 5, -5, this.seed);
        }
        refreshCheckVisibility() {
            if (this.svgCheck) {
                this.svgCheck.style.display = this.checked ? '' : 'none';
            }
        }
    };
    __decorate$l([
        property({ type: Boolean }),
        __metadata$l("design:type", Object)
    ], WiredCheckbox.prototype, "checked", void 0);
    __decorate$l([
        property({ type: Boolean, reflect: true }),
        __metadata$l("design:type", Object)
    ], WiredCheckbox.prototype, "disabled", void 0);
    __decorate$l([
        property(),
        __metadata$l("design:type", Object)
    ], WiredCheckbox.prototype, "focused", void 0);
    __decorate$l([
        query('input'),
        __metadata$l("design:type", HTMLInputElement)
    ], WiredCheckbox.prototype, "input", void 0);
    WiredCheckbox = __decorate$l([
        customElement('wired-checkbox')
    ], WiredCheckbox);

    var __decorate$k = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$k = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredCombo = class WiredCombo extends LitElement {
        constructor() {
            super(...arguments);
            this.disabled = false;
            this.seed = randomSeed();
            this.cardShowing = false;
            this.itemNodes = [];
        }
        static get styles() {
            return css `
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        outline: none;
        opacity: 0;
      }
    
      :host(.wired-disabled) {
        opacity: 0.5 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.02);
      }
      
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
    
      #container {
        white-space: nowrap;
        position: relative;
      }
    
      .inline {
        display: inline-block;
        vertical-align: top
      }
    
      #textPanel {
        min-width: 90px;
        min-height: 18px;
        padding: 8px;
      }
    
      #dropPanel {
        width: 34px;
        cursor: pointer;
      }
    
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    
      svg {
        display: block;
      }
    
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
      }
    
      #card {
        display: block;
        position: absolute;
        background: var(--wired-combo-popup-bg, white);
        z-index: 1;
        box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
        padding: 8px;
      }
  
      ::slotted(wired-item) {
        display: block;
      }
    `;
        }
        render() {
            return html `
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value && this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}" style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `;
        }
        refreshDisabledState() {
            if (this.disabled) {
                this.classList.add('wired-disabled');
            }
            else {
                this.classList.remove('wired-disabled');
            }
            this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
        }
        firstUpdated() {
            this.setAttribute('role', 'combobox');
            this.setAttribute('aria-haspopup', 'listbox');
            this.refreshSelection();
            this.addEventListener('blur', () => {
                if (this.cardShowing) {
                    this.setCardShowing(false);
                }
            });
            this.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case 37:
                    case 38:
                        event.preventDefault();
                        this.selectPrevious();
                        break;
                    case 39:
                    case 40:
                        event.preventDefault();
                        this.selectNext();
                        break;
                    case 27:
                        event.preventDefault();
                        if (this.cardShowing) {
                            this.setCardShowing(false);
                        }
                        break;
                    case 13:
                        event.preventDefault();
                        this.setCardShowing(!this.cardShowing);
                        break;
                    case 32:
                        event.preventDefault();
                        if (!this.cardShowing) {
                            this.setCardShowing(true);
                        }
                        break;
                }
            });
        }
        updated(changed) {
            if (changed.has('disabled')) {
                this.refreshDisabledState();
            }
            const svg = this.svg;
            while (svg.hasChildNodes()) {
                svg.removeChild(svg.lastChild);
            }
            const s = this.shadowRoot.getElementById('container').getBoundingClientRect();
            svg.setAttribute('width', `${s.width}`);
            svg.setAttribute('height', `${s.height}`);
            const textBounds = this.shadowRoot.getElementById('textPanel').getBoundingClientRect();
            this.shadowRoot.getElementById('dropPanel').style.minHeight = textBounds.height + 'px';
            k(svg, 0, 0, textBounds.width, textBounds.height, this.seed);
            const dropx = textBounds.width - 4;
            k(svg, dropx, 0, 34, textBounds.height, this.seed);
            const dropOffset = Math.max(0, Math.abs((textBounds.height - 24) / 2));
            const poly = T(svg, [
                [dropx + 8, 5 + dropOffset],
                [dropx + 26, 5 + dropOffset],
                [dropx + 17, dropOffset + Math.min(textBounds.height, 18)]
            ], this.seed);
            poly.style.fill = 'currentColor';
            poly.style.pointerEvents = this.disabled ? 'none' : 'auto';
            poly.style.cursor = 'pointer';
            this.classList.add('wired-rendered');
            // aria
            this.setAttribute('aria-expanded', `${this.cardShowing}`);
            if (!this.itemNodes.length) {
                this.itemNodes = [];
                const nodes = this.shadowRoot.getElementById('slot').assignedNodes();
                if (nodes && nodes.length) {
                    for (let i = 0; i < nodes.length; i++) {
                        const element = nodes[i];
                        if (element.tagName === 'WIRED-ITEM') {
                            element.setAttribute('role', 'option');
                            this.itemNodes.push(element);
                        }
                    }
                }
            }
        }
        refreshSelection() {
            if (this.lastSelectedItem) {
                this.lastSelectedItem.selected = false;
                this.lastSelectedItem.removeAttribute('aria-selected');
            }
            const slot = this.shadowRoot.getElementById('slot');
            const nodes = slot.assignedNodes();
            if (nodes) {
                let selectedItem = null;
                for (let i = 0; i < nodes.length; i++) {
                    const element = nodes[i];
                    if (element.tagName === 'WIRED-ITEM') {
                        const value = element.value || element.getAttribute('value') || '';
                        if (this.selected && (value === this.selected)) {
                            selectedItem = element;
                            break;
                        }
                    }
                }
                this.lastSelectedItem = selectedItem || undefined;
                if (this.lastSelectedItem) {
                    this.lastSelectedItem.selected = true;
                    this.lastSelectedItem.setAttribute('aria-selected', 'true');
                }
                if (selectedItem) {
                    this.value = {
                        value: selectedItem.value || '',
                        text: selectedItem.textContent || ''
                    };
                }
                else {
                    this.value = undefined;
                }
            }
        }
        setCardShowing(showing) {
            if (this.card) {
                this.cardShowing = showing;
                this.card.style.display = showing ? '' : 'none';
                if (showing) {
                    setTimeout(() => {
                        // TODO: relayout card?
                        const nodes = this.shadowRoot.getElementById('slot').assignedNodes().filter((d) => {
                            return d.nodeType === Node.ELEMENT_NODE;
                        });
                        nodes.forEach((n) => {
                            const e = n;
                            if (e.requestUpdate) {
                                e.requestUpdate();
                            }
                        });
                    }, 10);
                }
                this.setAttribute('aria-expanded', `${this.cardShowing}`);
            }
        }
        onItemClick(event) {
            event.stopPropagation();
            this.selected = event.target.value;
            this.refreshSelection();
            this.fireSelected();
            setTimeout(() => {
                this.setCardShowing(false);
            });
        }
        fireSelected() {
            fire(this, 'selected', { selected: this.selected });
        }
        selectPrevious() {
            const list = this.itemNodes;
            if (list.length) {
                let index = -1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.lastSelectedItem) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index === 0) {
                    index = list.length - 1;
                }
                else {
                    index--;
                }
                this.selected = list[index].value || '';
                this.refreshSelection();
                this.fireSelected();
            }
        }
        selectNext() {
            const list = this.itemNodes;
            if (list.length) {
                let index = -1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.lastSelectedItem) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index >= (list.length - 1)) {
                    index = 0;
                }
                else {
                    index++;
                }
                this.selected = list[index].value || '';
                this.refreshSelection();
                this.fireSelected();
            }
        }
        onCombo(event) {
            event.stopPropagation();
            this.setCardShowing(!this.cardShowing);
        }
    };
    __decorate$k([
        property({ type: Object }),
        __metadata$k("design:type", Object)
    ], WiredCombo.prototype, "value", void 0);
    __decorate$k([
        property({ type: String, reflect: true }),
        __metadata$k("design:type", String)
    ], WiredCombo.prototype, "selected", void 0);
    __decorate$k([
        property({ type: Boolean, reflect: true }),
        __metadata$k("design:type", Object)
    ], WiredCombo.prototype, "disabled", void 0);
    __decorate$k([
        query('svg'),
        __metadata$k("design:type", SVGSVGElement)
    ], WiredCombo.prototype, "svg", void 0);
    __decorate$k([
        query('#card'),
        __metadata$k("design:type", HTMLDivElement)
    ], WiredCombo.prototype, "card", void 0);
    WiredCombo = __decorate$k([
        customElement('wired-combo')
    ], WiredCombo);

    var __decorate$j = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$j = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredDialog = class WiredDialog extends LitElement {
        constructor() {
            super(...arguments);
            this.elevation = 5;
            this.open = false;
        }
        static get styles() {
            return css `
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: var(--wired-dialog-z-index, 100);
      }
      #container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      #overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(150px);
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      wired-card {
        display: inline-block;
        background: white;
        text-align: left;
      }

      :host([open]) #container {
        pointer-events: auto;
      }
      :host([open]) #container::before {
        opacity: 1;
      }
      :host([open]) #overlay {
        opacity: 1;
        transform: none;
      }
    `;
        }
        render() {
            return html `
    <div id="container">
      <div id="overlay" class="vertical layout">
        <div class="flex"></div>
        <div style="text-align: center; padding: 5px;">
          <wired-card .elevation="${this.elevation}"><slot></slot></wired-card>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `;
        }
        updated() {
            if (this.card) {
                this.card.wiredRender(true);
            }
        }
    };
    __decorate$j([
        property({ type: Number }),
        __metadata$j("design:type", Object)
    ], WiredDialog.prototype, "elevation", void 0);
    __decorate$j([
        property({ type: Boolean, reflect: true }),
        __metadata$j("design:type", Object)
    ], WiredDialog.prototype, "open", void 0);
    __decorate$j([
        query('wired-card'),
        __metadata$j("design:type", WiredCard)
    ], WiredDialog.prototype, "card", void 0);
    WiredDialog = __decorate$j([
        customElement('wired-dialog')
    ], WiredDialog);

    var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$i = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredDivider = class WiredDivider extends WiredBase {
        constructor() {
            super(...arguments);
            this.elevation = 1;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: block;
          position: relative;
        }
      `
            ];
        }
        render() {
            return html `<svg></svg>`;
        }
        canvasSize() {
            const size = this.getBoundingClientRect();
            const elev = Math.min(Math.max(1, this.elevation), 5);
            return [size.width, elev * 6];
        }
        draw(svg, size) {
            const elev = Math.min(Math.max(1, this.elevation), 5);
            for (let i = 0; i < elev; i++) {
                O(svg, 0, (i * 6) + 3, size[0], (i * 6) + 3, this.seed);
            }
        }
    };
    __decorate$i([
        property({ type: Number }),
        __metadata$i("design:type", Object)
    ], WiredDivider.prototype, "elevation", void 0);
    WiredDivider = __decorate$i([
        customElement('wired-divider')
    ], WiredDivider);

    var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$h = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredFab = class WiredFab extends WiredBase {
        constructor() {
            super(...arguments);
            this.disabled = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 16px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.85;
        }
        path {
          stroke: var(--wired-fab-bg-color, #018786);
          stroke-width: 3;
          fill: transparent;
        }

        button:focus ::slotted(*) {
          opacity: 1;
        }
        button:active ::slotted(*) {
          opacity: 1;
          transform: scale(1.15);
        }
      `
            ];
        }
        render() {
            return html `
    <button ?disabled="${this.disabled}">
      <div id="overlay">
        <svg></svg>
      </div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </button>
    `;
        }
        canvasSize() {
            if (this.button) {
                const size = this.button.getBoundingClientRect();
                return [size.width, size.height];
            }
            return this.lastSize;
        }
        draw(svg, size) {
            const min = Math.min(size[0], size[1]);
            const g = L(min / 2, min / 2, min, min, this.seed);
            svg.appendChild(g);
        }
    };
    __decorate$h([
        property({ type: Boolean, reflect: true }),
        __metadata$h("design:type", Object)
    ], WiredFab.prototype, "disabled", void 0);
    __decorate$h([
        query('button'),
        __metadata$h("design:type", HTMLButtonElement)
    ], WiredFab.prototype, "button", void 0);
    WiredFab = __decorate$h([
        customElement('wired-fab')
    ], WiredFab);

    var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$g = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredIconButton = class WiredIconButton extends WiredBase {
        constructor() {
            super(...arguments);
            this.disabled = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
        }
      `
            ];
        }
        render() {
            return html `
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `;
        }
        canvasSize() {
            if (this.button) {
                const size = this.button.getBoundingClientRect();
                return [size.width, size.height];
            }
            return this.lastSize;
        }
        draw(svg, size) {
            const min = Math.min(size[0], size[1]);
            svg.setAttribute('width', `${min}`);
            svg.setAttribute('height', `${min}`);
            $(svg, min / 2, min / 2, min, min, this.seed);
        }
    };
    __decorate$g([
        property({ type: Boolean, reflect: true }),
        __metadata$g("design:type", Object)
    ], WiredIconButton.prototype, "disabled", void 0);
    __decorate$g([
        query('button'),
        __metadata$g("design:type", HTMLButtonElement)
    ], WiredIconButton.prototype, "button", void 0);
    WiredIconButton = __decorate$g([
        customElement('wired-icon-button')
    ], WiredIconButton);

    var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$f = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    const EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    let WiredImage = class WiredImage extends WiredBase {
        constructor() {
            super();
            this.elevation = 1;
            this.src = EMPTY_IMAGE;
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(() => {
                    if (this.svg) {
                        this.wiredRender();
                    }
                });
            }
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px;
        }
        img {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
      `
            ];
        }
        render() {
            return html `
    <img src="${this.src}">
    <div id="overlay"><svg></svg></div>
    `;
        }
        updated() {
            super.updated();
            this.attachResizeListener();
        }
        disconnectedCallback() {
            this.detachResizeListener();
        }
        attachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.observe) {
                this.resizeObserver.observe(this);
            }
            else if (!this.windowResizeHandler) {
                this.windowResizeHandler = () => this.wiredRender();
                window.addEventListener('resize', this.windowResizeHandler, { passive: true });
            }
        }
        detachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.unobserve) {
                this.resizeObserver.unobserve(this);
            }
            if (this.windowResizeHandler) {
                window.removeEventListener('resize', this.windowResizeHandler);
            }
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const w = s.width + ((elev - 1) * 2);
            const h = s.height + ((elev - 1) * 2);
            return [w, h];
        }
        draw(svg, size) {
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const s = {
                width: size[0] - ((elev - 1) * 2),
                height: size[1] - ((elev - 1) * 2)
            };
            k(svg, 2, 2, s.width - 4, s.height - 4, this.seed);
            for (let i = 1; i < elev; i++) {
                (O(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2), this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2, this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), s.height - 4 + (i * 2), this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
                (O(svg, s.width - 4 + (i * 2), s.height - 4 + (i * 2), s.width - 4 + (i * 2), i * 2, this.seed)).style.opacity = `${(85 - (i * 10)) / 100}`;
            }
        }
    };
    __decorate$f([
        property({ type: Number }),
        __metadata$f("design:type", Object)
    ], WiredImage.prototype, "elevation", void 0);
    __decorate$f([
        property({ type: String }),
        __metadata$f("design:type", String)
    ], WiredImage.prototype, "src", void 0);
    WiredImage = __decorate$f([
        customElement('wired-image'),
        __metadata$f("design:paramtypes", [])
    ], WiredImage);

    var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$e = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredInput = class WiredInput extends WiredBase {
        constructor() {
            super();
            this.disabled = false;
            this.placeholder = '';
            this.type = 'text';
            this.autocomplete = '';
            this.autocapitalize = '';
            this.autocorrect = '';
            this.required = false;
            this.autofocus = false;
            this.readonly = false;
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(() => {
                    if (this.svg) {
                        this.wiredRender(true);
                    }
                });
            }
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `
            ];
        }
        render() {
            return html `
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `;
        }
        get input() {
            return this.textInput;
        }
        get value() {
            const input = this.input;
            return (input && input.value) || '';
        }
        set value(v) {
            if (this.shadowRoot) {
                const input = this.input;
                if (input) {
                    input.value = v;
                    return;
                }
            }
            this.pendingValue = v;
        }
        firstUpdated() {
            this.value = this.pendingValue || this.value || this.getAttribute('value') || '';
            delete this.pendingValue;
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            k(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
        }
        refire(event) {
            event.stopPropagation();
            fire(this, event.type, { sourceEvent: event });
        }
        focus() {
            if (this.textInput) {
                this.textInput.focus();
            }
            else {
                super.focus();
            }
        }
        updated() {
            super.updated();
            this.attachResizeListener();
        }
        disconnectedCallback() {
            this.detachResizeListener();
        }
        attachResizeListener() {
            if (this.textInput && this.resizeObserver && this.resizeObserver.observe) {
                this.resizeObserver.observe(this.textInput);
            }
        }
        detachResizeListener() {
            if (this.textInput && this.resizeObserver && this.resizeObserver.unobserve) {
                this.resizeObserver.unobserve(this.textInput);
            }
        }
    };
    __decorate$e([
        property({ type: Boolean, reflect: true }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "disabled", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "placeholder", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", String)
    ], WiredInput.prototype, "name", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", String)
    ], WiredInput.prototype, "min", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", String)
    ], WiredInput.prototype, "max", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", String)
    ], WiredInput.prototype, "step", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "type", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "autocomplete", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "autocapitalize", void 0);
    __decorate$e([
        property({ type: String }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "autocorrect", void 0);
    __decorate$e([
        property({ type: Boolean }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "required", void 0);
    __decorate$e([
        property({ type: Boolean }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "autofocus", void 0);
    __decorate$e([
        property({ type: Boolean }),
        __metadata$e("design:type", Object)
    ], WiredInput.prototype, "readonly", void 0);
    __decorate$e([
        property({ type: Number }),
        __metadata$e("design:type", Number)
    ], WiredInput.prototype, "minlength", void 0);
    __decorate$e([
        property({ type: Number }),
        __metadata$e("design:type", Number)
    ], WiredInput.prototype, "maxlength", void 0);
    __decorate$e([
        property({ type: Number }),
        __metadata$e("design:type", Number)
    ], WiredInput.prototype, "size", void 0);
    __decorate$e([
        query('input'),
        __metadata$e("design:type", HTMLInputElement)
    ], WiredInput.prototype, "textInput", void 0);
    WiredInput = __decorate$e([
        customElement('wired-input'),
        __metadata$e("design:paramtypes", [])
    ], WiredInput);

    var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$d = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredItem = class WiredItem extends WiredBase {
        constructor() {
            super(...arguments);
            this.value = '';
            this.name = '';
            this.selected = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        font-size: 14px;
        text-align: left;
      }
      button {
        cursor: pointer;
        outline: none;
        overflow: hidden;
        color: inherit;
        user-select: none;
        position: relative;
        font-family: inherit;
        text-align: inherit;
        font-size: inherit;
        letter-spacing: 1.25px;
        padding: 1px 10px;
        min-height: 36px;
        text-transform: inherit;
        background: none;
        border: none;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
      }
      button.selected {
        color: var(--wired-item-selected-color, #fff);
      }
      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0;
      }
      button span {
        display: inline-block;
        transition: transform 0.2s ease;
        position: relative;
      }
      button:active span {
        transform: scale(1.02);
      }
      #overlay {
        display: none;
      }
      button.selected #overlay {
        display: block;
      }
      svg path {
        stroke: var(--wired-item-selected-bg, #000);
        stroke-width: 2.75;
        fill: transparent;
        transition: transform 0.05s ease;
      }
      @media (hover: hover) {
        button:hover::before {
          opacity: 0.05;
        }
      }
      `
            ];
        }
        render() {
            return html `
    <button class="${this.selected ? 'selected' : ''}">
      <div id="overlay"><svg></svg></div>
      <span><slot></slot></span>
    </button>`;
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            const g = E([
                [0, 0],
                [size[0], 0],
                [size[0], size[1]],
                [0, size[1]]
            ], this.seed);
            svg.appendChild(g);
        }
    };
    __decorate$d([
        property(),
        __metadata$d("design:type", Object)
    ], WiredItem.prototype, "value", void 0);
    __decorate$d([
        property(),
        __metadata$d("design:type", Object)
    ], WiredItem.prototype, "name", void 0);
    __decorate$d([
        property({ type: Boolean }),
        __metadata$d("design:type", Object)
    ], WiredItem.prototype, "selected", void 0);
    WiredItem = __decorate$d([
        customElement('wired-item')
    ], WiredItem);

    var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$c = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredLink = class WiredLink extends WiredBase {
        constructor() {
            super(...arguments);
            this.elevation = 1;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
        }
        a, a:hover, a:visited {
          color: inherit;
          outline: none;
          display: inline-block;
          white-space: nowrap;
          text-decoration: none;
          border: none;
        }
        path {
          stroke: var(--wired-link-decoration-color, blue);
          stroke-opacity: 0.45;
        }
        a:focus path {
          stroke-opacity: 1;
        }
      `
            ];
        }
        render() {
            return html `
    <a href="${this.href}" target="${this.target || ''}">
      <slot></slot>
      <div id="overlay"><svg></svg></div>
    </a>
    `;
        }
        focus() {
            if (this.anchor) {
                this.anchor.focus();
            }
            else {
                super.focus();
            }
        }
        canvasSize() {
            if (this.anchor) {
                const size = this.anchor.getBoundingClientRect();
                const elev = Math.min(Math.max(1, this.elevation), 5);
                const w = size.width;
                const h = size.height + ((elev - 1) * 2);
                return [w, h];
            }
            return this.lastSize;
        }
        draw(svg, size) {
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const s = {
                width: size[0],
                height: size[1] - ((elev - 1) * 2)
            };
            for (let i = 0; i < elev; i++) {
                O(svg, 0, s.height + (i * 2) - 2, s.width, s.height + (i * 2) - 2, this.seed);
                O(svg, 0, s.height + (i * 2) - 2, s.width, s.height + (i * 2) - 2, this.seed);
            }
        }
    };
    __decorate$c([
        property({ type: Number }),
        __metadata$c("design:type", Object)
    ], WiredLink.prototype, "elevation", void 0);
    __decorate$c([
        property({ type: String }),
        __metadata$c("design:type", String)
    ], WiredLink.prototype, "href", void 0);
    __decorate$c([
        property({ type: String }),
        __metadata$c("design:type", String)
    ], WiredLink.prototype, "target", void 0);
    __decorate$c([
        query('a'),
        __metadata$c("design:type", HTMLAnchorElement)
    ], WiredLink.prototype, "anchor", void 0);
    WiredLink = __decorate$c([
        customElement('wired-link')
    ], WiredLink);

    var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$b = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredListbox = class WiredListbox extends WiredBase {
        constructor() {
            super(...arguments);
            this.horizontal = false;
            this.itemNodes = [];
            this.itemClickHandler = this.onItemClick.bind(this);
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        padding: 5px;
        outline: none;
      }
      :host(:focus) path {
        stroke-width: 1.5;
      }
      ::slotted(wired-item) {
        display: block;
      }
      :host(.wired-horizontal) ::slotted(wired-item) {
        display: inline-block;
      }
      `
            ];
        }
        render() {
            return html `
    <slot id="slot" @slotchange="${() => this.requestUpdate()}"></slot>
    <div id="overlay">
      <svg id="svg"></svg>
    </div>
    `;
        }
        firstUpdated() {
            this.setAttribute('role', 'listbox');
            this.tabIndex = +((this.getAttribute('tabindex') || 0));
            this.refreshSelection();
            this.addEventListener('click', this.itemClickHandler);
            this.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case 37:
                    case 38:
                        event.preventDefault();
                        this.selectPrevious();
                        break;
                    case 39:
                    case 40:
                        event.preventDefault();
                        this.selectNext();
                        break;
                }
            });
        }
        updated() {
            super.updated();
            if (this.horizontal) {
                this.classList.add('wired-horizontal');
            }
            else {
                this.classList.remove('wired-horizontal');
            }
            if (!this.itemNodes.length) {
                this.itemNodes = [];
                const nodes = this.shadowRoot.getElementById('slot').assignedNodes();
                if (nodes && nodes.length) {
                    for (let i = 0; i < nodes.length; i++) {
                        const element = nodes[i];
                        if (element.tagName === 'WIRED-ITEM') {
                            element.setAttribute('role', 'option');
                            this.itemNodes.push(element);
                        }
                    }
                }
            }
        }
        onItemClick(event) {
            event.stopPropagation();
            this.selected = event.target.value;
            this.refreshSelection();
            this.fireSelected();
        }
        refreshSelection() {
            if (this.lastSelectedItem) {
                this.lastSelectedItem.selected = false;
                this.lastSelectedItem.removeAttribute('aria-selected');
            }
            const slot = this.shadowRoot.getElementById('slot');
            const nodes = slot.assignedNodes();
            if (nodes) {
                let selectedItem = null;
                for (let i = 0; i < nodes.length; i++) {
                    const element = nodes[i];
                    if (element.tagName === 'WIRED-ITEM') {
                        const value = element.value || '';
                        if (this.selected && (value === this.selected)) {
                            selectedItem = element;
                            break;
                        }
                    }
                }
                this.lastSelectedItem = selectedItem || undefined;
                if (this.lastSelectedItem) {
                    this.lastSelectedItem.selected = true;
                    this.lastSelectedItem.setAttribute('aria-selected', 'true');
                }
                if (selectedItem) {
                    this.value = {
                        value: selectedItem.value || '',
                        text: selectedItem.textContent || ''
                    };
                }
                else {
                    this.value = undefined;
                }
            }
        }
        fireSelected() {
            fire(this, 'selected', { selected: this.selected });
        }
        selectPrevious() {
            const list = this.itemNodes;
            if (list.length) {
                let index = -1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.lastSelectedItem) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index === 0) {
                    index = list.length - 1;
                }
                else {
                    index--;
                }
                this.selected = list[index].value || '';
                this.refreshSelection();
                this.fireSelected();
            }
        }
        selectNext() {
            const list = this.itemNodes;
            if (list.length) {
                let index = -1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.lastSelectedItem) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index >= (list.length - 1)) {
                    index = 0;
                }
                else {
                    index++;
                }
                this.selected = list[index].value || '';
                this.refreshSelection();
                this.fireSelected();
            }
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            k(svg, 0, 0, size[0], size[1], this.seed);
        }
    };
    __decorate$b([
        property({ type: Object }),
        __metadata$b("design:type", Object)
    ], WiredListbox.prototype, "value", void 0);
    __decorate$b([
        property({ type: String }),
        __metadata$b("design:type", String)
    ], WiredListbox.prototype, "selected", void 0);
    __decorate$b([
        property({ type: Boolean }),
        __metadata$b("design:type", Object)
    ], WiredListbox.prototype, "horizontal", void 0);
    WiredListbox = __decorate$b([
        customElement('wired-listbox')
    ], WiredListbox);

    var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$a = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredProgress = class WiredProgress extends WiredBase {
        constructor() {
            super(...arguments);
            this.value = 0;
            this.min = 0;
            this.max = 100;
            this.percentage = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        height: 42px;
        font-family: sans-serif;
      }
      .labelContainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progressLabel {
        color: var(--wired-progress-label-color, #000);
        font-size: var(--wired-progress-font-size, 14px);
        background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      path.progbox {
        stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
        stroke-width: 2.75;
        fill: none;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
      `
            ];
        }
        render() {
            return html `
    <div id="overlay" class="overlay">
      <svg></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `;
        }
        getProgressLabel() {
            if (this.percentage) {
                if (this.max === this.min) {
                    return '%';
                }
                else {
                    const pct = Math.floor(((this.value - this.min) / (this.max - this.min)) * 100);
                    return (pct + '%');
                }
            }
            else {
                return ('' + this.value);
            }
        }
        wiredRender(force = false) {
            super.wiredRender(force);
            this.refreshProgressFill();
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            k(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
        }
        refreshProgressFill() {
            if (this.progBox) {
                if (this.progBox.parentElement) {
                    this.progBox.parentElement.removeChild(this.progBox);
                }
                this.progBox = undefined;
            }
            if (this.svg) {
                let pct = 0;
                const s = this.getBoundingClientRect();
                if (this.max > this.min) {
                    pct = (this.value - this.min) / (this.max - this.min);
                    const progWidth = s.width * Math.max(0, Math.min(pct, 100));
                    this.progBox = E([
                        [0, 0],
                        [progWidth, 0],
                        [progWidth, s.height],
                        [0, s.height]
                    ], this.seed);
                    this.svg.appendChild(this.progBox);
                    this.progBox.classList.add('progbox');
                }
            }
        }
    };
    __decorate$a([
        property({ type: Number }),
        __metadata$a("design:type", Object)
    ], WiredProgress.prototype, "value", void 0);
    __decorate$a([
        property({ type: Number }),
        __metadata$a("design:type", Object)
    ], WiredProgress.prototype, "min", void 0);
    __decorate$a([
        property({ type: Number }),
        __metadata$a("design:type", Object)
    ], WiredProgress.prototype, "max", void 0);
    __decorate$a([
        property({ type: Boolean }),
        __metadata$a("design:type", Object)
    ], WiredProgress.prototype, "percentage", void 0);
    WiredProgress = __decorate$a([
        customElement('wired-progress')
    ], WiredProgress);

    var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$9 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredRadio = class WiredRadio extends WiredBase {
        constructor() {
            super(...arguments);
            this.checked = false;
            this.disabled = false;
            this.focused = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-radio-icon-color, currentColor);
        stroke-width: var(--wired-radio-default-swidth, 0.7);
      }
      g path {
        stroke-width: 0;
        fill: var(--wired-radio-icon-color, currentColor);
      }
      #container.focused {
        --wired-radio-default-swidth: 1.5;
      }
      `
            ];
        }
        focus() {
            if (this.input) {
                this.input.focus();
            }
            else {
                super.focus();
            }
        }
        wiredRender(force = false) {
            super.wiredRender(force);
            this.refreshCheckVisibility();
        }
        render() {
            return html `
    <label id="container" class="${this.focused ? 'focused' : ''}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${() => this.focused = true}"
        @blur="${() => this.focused = false}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `;
        }
        onChange() {
            this.checked = this.input.checked;
            this.refreshCheckVisibility();
            fire(this, 'change', { checked: this.checked });
        }
        canvasSize() {
            return [24, 24];
        }
        draw(svg, size) {
            $(svg, size[0] / 2, size[1] / 2, size[0], size[1], this.seed);
            this.svgCheck = I('g');
            svg.appendChild(this.svgCheck);
            const iw = Math.max(size[0] * 0.6, 5);
            const ih = Math.max(size[1] * 0.6, 5);
            $(this.svgCheck, size[0] / 2, size[1] / 2, iw, ih, this.seed);
        }
        refreshCheckVisibility() {
            if (this.svgCheck) {
                this.svgCheck.style.display = this.checked ? '' : 'none';
            }
        }
    };
    __decorate$9([
        property({ type: Boolean }),
        __metadata$9("design:type", Object)
    ], WiredRadio.prototype, "checked", void 0);
    __decorate$9([
        property({ type: Boolean, reflect: true }),
        __metadata$9("design:type", Object)
    ], WiredRadio.prototype, "disabled", void 0);
    __decorate$9([
        property({ type: String }),
        __metadata$9("design:type", String)
    ], WiredRadio.prototype, "name", void 0);
    __decorate$9([
        property(),
        __metadata$9("design:type", Object)
    ], WiredRadio.prototype, "focused", void 0);
    __decorate$9([
        query('input'),
        __metadata$9("design:type", HTMLInputElement)
    ], WiredRadio.prototype, "input", void 0);
    WiredRadio = __decorate$9([
        customElement('wired-radio')
    ], WiredRadio);

    var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$8 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredRadioGroup = class WiredRadioGroup extends LitElement {
        constructor() {
            super(...arguments);
            this.radioNodes = [];
            this.checkListener = this.handleChecked.bind(this);
        }
        static get styles() {
            return css `
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `;
        }
        render() {
            return html `<slot id="slot" @slotchange="${this.slotChange}"></slot>`;
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener('change', this.checkListener);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.removeEventListener('change', this.checkListener);
        }
        handleChecked(event) {
            const checked = event.detail.checked;
            const item = event.target;
            const name = item.name || '';
            if (!checked) {
                item.checked = true;
            }
            else {
                this.selected = (checked && name) || '';
                this.fireSelected();
            }
        }
        slotChange() {
            this.requestUpdate();
        }
        firstUpdated() {
            this.setAttribute('role', 'radiogroup');
            this.tabIndex = +(this.getAttribute('tabindex') || 0);
            this.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case 37:
                    case 38:
                        event.preventDefault();
                        this.selectPrevious();
                        break;
                    case 39:
                    case 40:
                        event.preventDefault();
                        this.selectNext();
                        break;
                }
            });
        }
        updated() {
            const slot = this.shadowRoot.getElementById('slot');
            const nodes = slot.assignedNodes();
            this.radioNodes = [];
            if (nodes && nodes.length) {
                for (let i = 0; i < nodes.length; i++) {
                    const element = nodes[i];
                    if (element.tagName === 'WIRED-RADIO') {
                        this.radioNodes.push(element);
                        const name = element.name || '';
                        if (this.selected && (name === this.selected)) {
                            element.checked = true;
                        }
                        else {
                            element.checked = false;
                        }
                    }
                }
            }
        }
        selectPrevious() {
            const list = this.radioNodes;
            if (list.length) {
                let radio = null;
                let index = -1;
                if (this.selected) {
                    for (let i = 0; i < list.length; i++) {
                        const n = list[i];
                        if (n.name === this.selected) {
                            index = i;
                            break;
                        }
                    }
                    if (index < 0) {
                        radio = list[0];
                    }
                    else {
                        index--;
                        if (index < 0) {
                            index = list.length - 1;
                        }
                        radio = list[index];
                    }
                }
                else {
                    radio = list[0];
                }
                if (radio) {
                    radio.focus();
                    this.selected = radio.name;
                    this.fireSelected();
                }
            }
        }
        selectNext() {
            const list = this.radioNodes;
            if (list.length) {
                let radio = null;
                let index = -1;
                if (this.selected) {
                    for (let i = 0; i < list.length; i++) {
                        const n = list[i];
                        if (n.name === this.selected) {
                            index = i;
                            break;
                        }
                    }
                    if (index < 0) {
                        radio = list[0];
                    }
                    else {
                        index++;
                        if (index >= list.length) {
                            index = 0;
                        }
                        radio = list[index];
                    }
                }
                else {
                    radio = list[0];
                }
                if (radio) {
                    radio.focus();
                    this.selected = radio.name;
                    this.fireSelected();
                }
            }
        }
        fireSelected() {
            fire(this, 'selected', { selected: this.selected });
        }
    };
    __decorate$8([
        property({ type: String }),
        __metadata$8("design:type", String)
    ], WiredRadioGroup.prototype, "selected", void 0);
    WiredRadioGroup = __decorate$8([
        customElement('wired-radio-group')
    ], WiredRadioGroup);

    var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$7 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredSearchInput = class WiredSearchInput extends WiredBase {
        constructor() {
            super(...arguments);
            this.disabled = false;
            this.placeholder = '';
            this.autocomplete = '';
            this.autocorrect = '';
            this.autofocus = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          padding: 10px 40px 10px 5px;
          font-family: sans-serif;
          width: 180px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        
        input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
        input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        .thicker path {
          stroke-width: 1.5;
        }

        button {
          position: absolute;
          top: 0;
          right: 2px;
          width: 32px;
          height: 100%;
          box-sizing: border-box;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          opacity: 0;
        }
      `
            ];
        }
        render() {
            return html `
    <input type="search" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" 
      autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    <button @click="${() => this.value = ''}"></button>
    `;
        }
        get input() {
            return this.textInput;
        }
        get value() {
            const input = this.input;
            return (input && input.value) || '';
        }
        set value(v) {
            if (this.shadowRoot) {
                const input = this.input;
                if (input) {
                    input.value = v;
                }
                this.refreshIconState();
            }
            else {
                this.pendingValue = v;
            }
        }
        wiredRender(force = false) {
            super.wiredRender(force);
            this.refreshIconState();
        }
        firstUpdated() {
            this.value = this.pendingValue || this.value || this.getAttribute('value') || '';
            delete this.pendingValue;
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            k(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
            this.searchIcon = I('g');
            this.searchIcon.classList.add('thicker');
            svg.appendChild(this.searchIcon);
            $(this.searchIcon, size[0] - 30, (size[1] - 30) / 2 + 10, 20, 20, this.seed);
            O(this.searchIcon, size[0] - 10, (size[1] - 30) / 2 + 30, size[0] - 25, (size[1] - 30) / 2 + 15, this.seed);
            this.closeIcon = I('g');
            this.closeIcon.classList.add('thicker');
            svg.appendChild(this.closeIcon);
            O(this.closeIcon, size[0] - 33, (size[1] - 30) / 2 + 2, size[0] - 7, (size[1] - 30) / 2 + 28, this.seed);
            O(this.closeIcon, size[0] - 7, (size[1] - 30) / 2 + 2, size[0] - 33, (size[1] - 30) / 2 + 28, this.seed);
        }
        refreshIconState() {
            if (this.searchIcon && this.closeIcon) {
                this.searchIcon.style.display = this.value.trim() ? 'none' : '';
                this.closeIcon.style.display = this.value.trim() ? '' : 'none';
            }
        }
        refire(event) {
            this.refreshIconState();
            event.stopPropagation();
            fire(this, event.type, { sourceEvent: event });
        }
    };
    __decorate$7([
        property({ type: Boolean, reflect: true }),
        __metadata$7("design:type", Object)
    ], WiredSearchInput.prototype, "disabled", void 0);
    __decorate$7([
        property({ type: String }),
        __metadata$7("design:type", Object)
    ], WiredSearchInput.prototype, "placeholder", void 0);
    __decorate$7([
        property({ type: String }),
        __metadata$7("design:type", Object)
    ], WiredSearchInput.prototype, "autocomplete", void 0);
    __decorate$7([
        property({ type: String }),
        __metadata$7("design:type", Object)
    ], WiredSearchInput.prototype, "autocorrect", void 0);
    __decorate$7([
        property({ type: Boolean }),
        __metadata$7("design:type", Object)
    ], WiredSearchInput.prototype, "autofocus", void 0);
    __decorate$7([
        query('input'),
        __metadata$7("design:type", HTMLInputElement)
    ], WiredSearchInput.prototype, "textInput", void 0);
    WiredSearchInput = __decorate$7([
        customElement('wired-search-input')
    ], WiredSearchInput);

    var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$6 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredSlider = class WiredSlider extends WiredBase {
        constructor() {
            super(...arguments);
            this.min = 0;
            this.max = 100;
            this.step = 1;
            this.disabled = false;
            this.canvasWidth = 300;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `
            ];
        }
        get value() {
            if (this.input) {
                return +this.input.value;
            }
            return this.min;
        }
        set value(v) {
            if (this.input) {
                this.input.value = `${v}`;
            }
            else {
                this.pendingValue = v;
            }
            this.updateThumbPosition();
        }
        firstUpdated() {
            this.value = this.pendingValue || +(this.getAttribute('value') || this.value || this.min);
            delete this.pendingValue;
        }
        render() {
            return html `
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `;
        }
        focus() {
            if (this.input) {
                this.input.focus();
            }
            else {
                super.focus();
            }
        }
        onInput(e) {
            e.stopPropagation();
            this.updateThumbPosition();
            if (this.input) {
                fire(this, 'change', { value: +this.input.value });
            }
        }
        wiredRender(force = false) {
            super.wiredRender(force);
            this.updateThumbPosition();
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            this.canvasWidth = size[0];
            const midY = Math.round(size[1] / 2);
            O(svg, 0, midY, size[0], midY, this.seed).classList.add('bar');
            this.knob = $(svg, 10, midY, 20, 20, this.seed);
            this.knob.classList.add('knob');
        }
        updateThumbPosition() {
            if (this.input) {
                const value = +this.input.value;
                const delta = Math.max(this.step, this.max - this.min);
                const pct = (value - this.min) / delta;
                if (this.knob) {
                    this.knob.style.transform = `translateX(${pct * (this.canvasWidth - 20)}px)`;
                }
            }
        }
    };
    __decorate$6([
        property({ type: Number }),
        __metadata$6("design:type", Object)
    ], WiredSlider.prototype, "min", void 0);
    __decorate$6([
        property({ type: Number }),
        __metadata$6("design:type", Object)
    ], WiredSlider.prototype, "max", void 0);
    __decorate$6([
        property({ type: Number }),
        __metadata$6("design:type", Object)
    ], WiredSlider.prototype, "step", void 0);
    __decorate$6([
        property({ type: Boolean, reflect: true }),
        __metadata$6("design:type", Object)
    ], WiredSlider.prototype, "disabled", void 0);
    __decorate$6([
        query('input'),
        __metadata$6("design:type", HTMLInputElement)
    ], WiredSlider.prototype, "input", void 0);
    WiredSlider = __decorate$6([
        customElement('wired-slider')
    ], WiredSlider);

    var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$5 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredSpinner = class WiredSpinner extends WiredBase {
        constructor() {
            super(...arguments);
            this.spinning = false;
            this.duration = 1500;
            this.value = 0;
            this.timerstart = 0;
            this.frame = 0;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
        }
        path {
          stroke: currentColor;
          stroke-opacity: 0.65;
          stroke-width: 1.5;
          fill: none;
        }
        .knob {
          stroke-width: 2.8 !important;
          stroke-opacity: 1;
        }
      `
            ];
        }
        render() {
            return html `<svg></svg>`;
        }
        canvasSize() {
            return [76, 76];
        }
        draw(svg, size) {
            $(svg, size[0] / 2, size[1] / 2, Math.floor(size[0] * 0.8), Math.floor(0.8 * size[1]), this.seed);
            this.knob = L(0, 0, 20, 20, this.seed);
            this.knob.classList.add('knob');
            svg.appendChild(this.knob);
            this.updateCursor();
        }
        updateCursor() {
            if (this.knob) {
                const position = [
                    Math.round(38 + 25 * Math.cos(this.value * Math.PI * 2)),
                    Math.round(38 + 25 * Math.sin(this.value * Math.PI * 2))
                ];
                this.knob.style.transform = `translate3d(${position[0]}px, ${position[1]}px, 0) rotateZ(${Math.round(this.value * 360 * 2)}deg)`;
            }
        }
        updated() {
            super.updated();
            if (this.spinning) {
                this.startSpinner();
            }
            else {
                this.stopSpinner();
            }
        }
        startSpinner() {
            this.stopSpinner();
            this.value = 0;
            this.timerstart = 0;
            this.nextTick();
        }
        stopSpinner() {
            if (this.frame) {
                window.cancelAnimationFrame(this.frame);
                this.frame = 0;
            }
        }
        nextTick() {
            this.frame = window.requestAnimationFrame((t) => this.tick(t));
        }
        tick(t) {
            if (this.spinning) {
                if (!this.timerstart) {
                    this.timerstart = t;
                }
                this.value = Math.min(1, (t - this.timerstart) / this.duration);
                this.updateCursor();
                if (this.value >= 1) {
                    this.value = 0;
                    this.timerstart = 0;
                }
                this.nextTick();
            }
            else {
                this.frame = 0;
            }
        }
    };
    __decorate$5([
        property({ type: Boolean }),
        __metadata$5("design:type", Object)
    ], WiredSpinner.prototype, "spinning", void 0);
    __decorate$5([
        property({ type: Number }),
        __metadata$5("design:type", Object)
    ], WiredSpinner.prototype, "duration", void 0);
    WiredSpinner = __decorate$5([
        customElement('wired-spinner')
    ], WiredSpinner);

    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredTab = class WiredTab extends WiredBase {
        constructor() {
            super();
            this.name = '';
            this.label = '';
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(() => {
                    if (this.svg) {
                        this.wiredRender();
                    }
                });
            }
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
      `
            ];
        }
        render() {
            return html `
    <div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    <div id="overlay"><svg></svg></div>
    `;
        }
        updated() {
            super.updated();
            this.attachResizeListener();
        }
        disconnectedCallback() {
            this.detachResizeListener();
        }
        attachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.observe) {
                this.resizeObserver.observe(this);
            }
            else if (!this.windowResizeHandler) {
                this.windowResizeHandler = () => this.wiredRender();
                window.addEventListener('resize', this.windowResizeHandler, { passive: true });
            }
        }
        detachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.unobserve) {
                this.resizeObserver.unobserve(this);
            }
            if (this.windowResizeHandler) {
                window.removeEventListener('resize', this.windowResizeHandler);
            }
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, s) {
            k(svg, 2, 2, s[0] - 4, s[1] - 4, this.seed);
        }
    };
    __decorate$4([
        property({ type: String }),
        __metadata$4("design:type", Object)
    ], WiredTab.prototype, "name", void 0);
    __decorate$4([
        property({ type: String }),
        __metadata$4("design:type", Object)
    ], WiredTab.prototype, "label", void 0);
    WiredTab = __decorate$4([
        customElement('wired-tab'),
        __metadata$4("design:paramtypes", [])
    ], WiredTab);

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredTabs = class WiredTabs extends LitElement {
        constructor() {
            super(...arguments);
            this.pages = [];
            this.pageMap = new Map();
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: block;
          opacity: 1;
        }
        ::slotted(.hidden) {
          display: none !important;
        }
    
        :host ::slotted(.hidden) {
          display: none !important;
        }
        #bar {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
      `
            ];
        }
        render() {
            return html `
    <div id="bar">
      ${this.pages.map((p) => html `
      <wired-item role="tab" .value="${p.name}" .selected="${p.name === this.selected}" ?aria-selected="${p.name === this.selected}"
        @click="${() => this.selected = p.name}">${p.label || p.name}</wired-item>
      `)}
    </div>
    <div>
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `;
        }
        mapPages() {
            this.pages = [];
            this.pageMap.clear();
            if (this.slotElement) {
                const assigned = this.slotElement.assignedNodes();
                if (assigned && assigned.length) {
                    for (let i = 0; i < assigned.length; i++) {
                        const n = assigned[i];
                        if (n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() === 'wired-tab') {
                            const e = n;
                            this.pages.push(e);
                            const name = e.getAttribute('name') || '';
                            if (name) {
                                name.trim().split(' ').forEach((nameSegment) => {
                                    if (nameSegment) {
                                        this.pageMap.set(nameSegment, e);
                                    }
                                });
                            }
                        }
                    }
                    if (!this.selected) {
                        if (this.pages.length) {
                            this.selected = this.pages[0].name;
                        }
                    }
                    this.requestUpdate();
                }
            }
        }
        firstUpdated() {
            this.mapPages();
            this.tabIndex = +((this.getAttribute('tabindex') || 0));
            this.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case 37:
                    case 38:
                        event.preventDefault();
                        this.selectPrevious();
                        break;
                    case 39:
                    case 40:
                        event.preventDefault();
                        this.selectNext();
                        break;
                }
            });
        }
        updated() {
            const newPage = this.getElement();
            for (let i = 0; i < this.pages.length; i++) {
                const p = this.pages[i];
                if (p === newPage) {
                    p.classList.remove('hidden');
                }
                else {
                    p.classList.add('hidden');
                }
            }
            this.current = newPage || undefined;
            if (this.current && this.current.wiredRender) {
                requestAnimationFrame(() => requestAnimationFrame(() => this.current.wiredRender()));
            }
        }
        getElement() {
            let e = undefined;
            if (this.selected) {
                e = this.pageMap.get(this.selected);
            }
            if (!e) {
                e = this.pages[0];
            }
            return e || null;
        }
        selectPrevious() {
            const list = this.pages;
            if (list.length) {
                let index = -1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.current) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index === 0) {
                    index = list.length - 1;
                }
                else {
                    index--;
                }
                this.selected = list[index].name || '';
            }
        }
        selectNext() {
            const list = this.pages;
            if (list.length) {
                let index = -1;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.current) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index >= (list.length - 1)) {
                    index = 0;
                }
                else {
                    index++;
                }
                this.selected = list[index].name || '';
            }
        }
    };
    __decorate$3([
        property({ type: String }),
        __metadata$3("design:type", String)
    ], WiredTabs.prototype, "selected", void 0);
    __decorate$3([
        query('slot'),
        __metadata$3("design:type", HTMLSlotElement)
    ], WiredTabs.prototype, "slotElement", void 0);
    WiredTabs = __decorate$3([
        customElement('wired-tabs')
    ], WiredTabs);

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredTextarea = class WiredTextarea extends WiredBase {
        constructor() {
            super(...arguments);
            this.disabled = false;
            this.rows = 2;
            this.maxrows = 0;
            this.autocomplete = '';
            this.autofocus = false;
            this.inputmode = '';
            this.placeholder = '';
            this.required = false;
            this.readonly = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          font-family: sans-serif;
          width: 400px;
          outline: none;
          padding: 4px;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        textarea {
          position: relative;
          outline: none;
          border: none;
          resize: none;
          background: inherit;
          color: inherit;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
          text-align: inherit;
          padding: 10px;
          box-sizing: border-box;
        }
      `
            ];
        }
        render() {
            return html `
    <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
      placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
      rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}"
      @change="${this.refire}" @input="${this.refire}"></textarea>
    <div id="overlay">
      <svg></svg>
    </div>
    `;
        }
        get textarea() {
            return this.textareaInput;
        }
        get value() {
            const input = this.textarea;
            return (input && input.value) || '';
        }
        set value(v) {
            if (this.shadowRoot) {
                const input = this.textarea;
                if (input) {
                    input.value = v;
                    return;
                }
            }
            this.pendingValue = v;
        }
        firstUpdated() {
            this.value = this.pendingValue || this.value || this.getAttribute('value') || '';
            delete this.pendingValue;
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            k(svg, 4, 4, size[0] - 4, size[1] - 4, this.seed);
        }
        refire(event) {
            event.stopPropagation();
            fire(this, event.type, { sourceEvent: event });
        }
    };
    __decorate$2([
        property({ type: Boolean, reflect: true }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "disabled", void 0);
    __decorate$2([
        property({ type: Number }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "rows", void 0);
    __decorate$2([
        property({ type: Number }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "maxrows", void 0);
    __decorate$2([
        property({ type: String }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "autocomplete", void 0);
    __decorate$2([
        property({ type: Boolean }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "autofocus", void 0);
    __decorate$2([
        property({ type: String }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "inputmode", void 0);
    __decorate$2([
        property({ type: String }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "placeholder", void 0);
    __decorate$2([
        property({ type: Boolean }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "required", void 0);
    __decorate$2([
        property({ type: Boolean }),
        __metadata$2("design:type", Object)
    ], WiredTextarea.prototype, "readonly", void 0);
    __decorate$2([
        property({ type: Number }),
        __metadata$2("design:type", Number)
    ], WiredTextarea.prototype, "minlength", void 0);
    __decorate$2([
        property({ type: Number }),
        __metadata$2("design:type", Number)
    ], WiredTextarea.prototype, "maxlength", void 0);
    __decorate$2([
        query('textarea'),
        __metadata$2("design:type", HTMLTextAreaElement)
    ], WiredTextarea.prototype, "textareaInput", void 0);
    WiredTextarea = __decorate$2([
        customElement('wired-textarea')
    ], WiredTextarea);

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredToggle = class WiredToggle extends WiredBase {
        constructor() {
            super(...arguments);
            this.checked = false;
            this.disabled = false;
        }
        static get styles() {
            return [
                BaseCSS,
                css `
      :host {
        display: inline-block;
        cursor: pointer;
        position: relative;
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        opacity: 0;
      }
      .knob {
        transition: transform 0.3s ease;
      }
      .knob path {
        stroke-width: 0.7;
      }
      .knob.checked {
        transform: translateX(48px);
      }
      path.knobfill {
        stroke-width: 3 !important;
        fill: transparent;
      }
      .knob.unchecked path.knobfill {
        stroke: var(--wired-toggle-off-color, gray);
      }
      .knob.checked path.knobfill {
        stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
      }
      `
            ];
        }
        render() {
            return html `
    <div style="position: relative;">
      <svg></svg>
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}"  @change="${this.onChange}">
    </div>
    `;
        }
        focus() {
            if (this.input) {
                this.input.focus();
            }
            else {
                super.focus();
            }
        }
        wiredRender(force = false) {
            super.wiredRender(force);
            this.refreshKnob();
        }
        onChange() {
            this.checked = this.input.checked;
            this.refreshKnob();
            fire(this, 'change', { checked: this.checked });
        }
        canvasSize() {
            return [80, 34];
        }
        draw(svg, size) {
            const rect = k(svg, 16, 8, size[0] - 32, 18, this.seed);
            rect.classList.add('toggle-bar');
            this.knob = I('g');
            this.knob.classList.add('knob');
            svg.appendChild(this.knob);
            const knobFill = L(16, 16, 32, 32, this.seed);
            knobFill.classList.add('knobfill');
            this.knob.appendChild(knobFill);
            $(this.knob, 16, 16, 32, 32, this.seed);
        }
        refreshKnob() {
            if (this.knob) {
                const cl = this.knob.classList;
                if (this.checked) {
                    cl.remove('unchecked');
                    cl.add('checked');
                }
                else {
                    cl.remove('checked');
                    cl.add('unchecked');
                }
            }
        }
    };
    __decorate$1([
        property({ type: Boolean }),
        __metadata$1("design:type", Object)
    ], WiredToggle.prototype, "checked", void 0);
    __decorate$1([
        property({ type: Boolean, reflect: true }),
        __metadata$1("design:type", Object)
    ], WiredToggle.prototype, "disabled", void 0);
    __decorate$1([
        query('input'),
        __metadata$1("design:type", HTMLInputElement)
    ], WiredToggle.prototype, "input", void 0);
    WiredToggle = __decorate$1([
        customElement('wired-toggle')
    ], WiredToggle);

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let WiredVideo = class WiredVideo extends WiredBase {
        constructor() {
            super();
            this.src = '';
            this.autoplay = false;
            this.loop = false;
            this.muted = false;
            this.playsinline = false;
            this.playing = false;
            this.timeDisplay = '';
            if (window.ResizeObserver) {
                this.resizeObserver = new window.ResizeObserver(() => {
                    if (this.svg) {
                        this.wiredRender();
                    }
                });
            }
        }
        static get styles() {
            return [
                BaseCSS,
                css `
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px 3px 68px;
          --wired-progress-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
          --wired-slider-knob-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
        }
        video {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
        #controls {
          position: absolute;
          pointer-events: auto;
          left: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          height: 70px;
        }
        .layout.horizontal {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 5px 10px;
        }
        .flex {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        wired-progress {
          display: block;
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          --wired-progress-label-color: transparent;
          --wired-progress-label-background: transparent;
        }
        wired-icon-button span {
          font-size: 16px;
          line-height: 16px;
          width: 16px;
          height: 16px;
          padding: 0px;
          font-family: sans-serif;
          display: inline-block;
        }
        #timeDisplay {
          padding: 0 20px 0 8px;
          font-size: 13px;
        }
        wired-slider {
          display: block;
          max-width: 200px;
          margin: 0 6px 0 auto;
        }
      `
            ];
        }
        render() {
            return html `
    <video 
      .autoplay="${this.autoplay}"
      .loop="${this.loop}"
      .muted="${this.muted}"
      .playsinline="${this.playsinline}"
      src="${this.src}"
      @play="${() => this.playing = true}"
      @pause="${() => this.playing = false}"
      @canplay="${this.canPlay}"
      @timeupdate="${this.updateTime}">
    </video>
    <div id="overlay">
      <svg></svg>
    </div>
    <div id="controls">
      <wired-progress></wired-progress>
      <div class="horizontal layout center">
        <wired-icon-button @click="${this.togglePause}">
          <span>${this.playing ? '||' : '▶'}</span>
        </wired-icon-button>
        <div id="timeDisplay">${this.timeDisplay}</div>
        <div class="flex">
          <wired-slider @change="${this.volumeChange}"></wired-slider>
        </div>
        <div style="width: 24px; height: 24px;">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path style="stroke: none; fill: currentColor;" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>
        </div>
      </div>
    </div>
    `;
        }
        updated() {
            super.updated();
            this.attachResizeListener();
        }
        disconnectedCallback() {
            this.detachResizeListener();
        }
        attachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.observe) {
                this.resizeObserver.observe(this);
            }
            else if (!this.windowResizeHandler) {
                this.windowResizeHandler = () => this.wiredRender();
                window.addEventListener('resize', this.windowResizeHandler, { passive: true });
            }
        }
        detachResizeListener() {
            if (this.resizeObserver && this.resizeObserver.unobserve) {
                this.resizeObserver.unobserve(this);
            }
            if (this.windowResizeHandler) {
                window.removeEventListener('resize', this.windowResizeHandler);
            }
        }
        wiredRender() {
            super.wiredRender();
            if (this.progressBar) {
                this.progressBar.wiredRender(true);
            }
        }
        canvasSize() {
            const s = this.getBoundingClientRect();
            return [s.width, s.height];
        }
        draw(svg, size) {
            k(svg, 2, 2, size[0] - 4, size[1] - 4, this.seed);
        }
        updateTime() {
            if (this.video && this.progressBar) {
                this.progressBar.value = this.video.duration ? Math.round((this.video.currentTime / this.video.duration) * 100) : 0;
                this.timeDisplay = `${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`;
            }
        }
        getTimeDisplay(time) {
            const mins = Math.floor(time / 60);
            const secs = Math.round(time - (mins * 60));
            return `${mins}:${secs}`;
        }
        togglePause() {
            if (this.video) {
                if (this.playing) {
                    this.video.pause();
                }
                else {
                    this.video.play();
                }
            }
        }
        volumeChange() {
            if (this.video && this.slider) {
                this.video.volume = this.slider.value / 100;
            }
        }
        canPlay() {
            if (this.slider && this.video) {
                this.slider.value = this.video.volume * 100;
            }
        }
    };
    __decorate([
        property({ type: String }),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "src", void 0);
    __decorate([
        property({ type: Boolean }),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "autoplay", void 0);
    __decorate([
        property({ type: Boolean }),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "loop", void 0);
    __decorate([
        property({ type: Boolean }),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "muted", void 0);
    __decorate([
        property({ type: Boolean }),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "playsinline", void 0);
    __decorate([
        property(),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "playing", void 0);
    __decorate([
        property(),
        __metadata("design:type", Object)
    ], WiredVideo.prototype, "timeDisplay", void 0);
    __decorate([
        query('wired-progress'),
        __metadata("design:type", WiredProgress)
    ], WiredVideo.prototype, "progressBar", void 0);
    __decorate([
        query('wired-slider'),
        __metadata("design:type", WiredSlider)
    ], WiredVideo.prototype, "slider", void 0);
    __decorate([
        query('video'),
        __metadata("design:type", HTMLVideoElement)
    ], WiredVideo.prototype, "video", void 0);
    WiredVideo = __decorate([
        customElement('wired-video'),
        __metadata("design:paramtypes", [])
    ], WiredVideo);

    /* src/App.svelte generated by Svelte v3.35.0 */
    const file = "src/App.svelte";

    // (14:4) <Link to="/">
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Home");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(14:4) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (15:4) <Link to="/quiz">
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Quiz");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(15:4) <Link to=\\\"/quiz\\\">",
    		ctx
    	});

    	return block;
    }

    // (16:4) <Link to="/end">
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("End");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(16:4) <Link to=\\\"/end\\\">",
    		ctx
    	});

    	return block;
    }

    // (12:0) <Router url={url}>
    function create_default_slot(ctx) {
    	let nav;
    	let link0;
    	let t0;
    	let link1;
    	let t1;
    	let link2;
    	let t2;
    	let div;
    	let route0;
    	let t3;
    	let route1;
    	let t4;
    	let route2;
    	let t5;
    	let route3;
    	let current;

    	link0 = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: "/quiz",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2 = new Link({
    			props: {
    				to: "/end",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route0 = new Route({
    			props: { path: "/", component: Home },
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: "/quiz", component: Quiz },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: { path: "/end", component: End },
    			$$inline: true
    		});

    	route3 = new Route({
    			props: { path: "*", component: NotFound },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			create_component(link0.$$.fragment);
    			t0 = space();
    			create_component(link1.$$.fragment);
    			t1 = space();
    			create_component(link2.$$.fragment);
    			t2 = space();
    			div = element("div");
    			create_component(route0.$$.fragment);
    			t3 = space();
    			create_component(route1.$$.fragment);
    			t4 = space();
    			create_component(route2.$$.fragment);
    			t5 = space();
    			create_component(route3.$$.fragment);
    			add_location(nav, file, 12, 2, 356);
    			add_location(div, file, 17, 2, 466);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			mount_component(link0, nav, null);
    			append_dev(nav, t0);
    			mount_component(link1, nav, null);
    			append_dev(nav, t1);
    			mount_component(link2, nav, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(route0, div, null);
    			append_dev(div, t3);
    			mount_component(route1, div, null);
    			append_dev(div, t4);
    			mount_component(route2, div, null);
    			append_dev(div, t5);
    			mount_component(route3, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_component(link2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div);
    			destroy_component(route0);
    			destroy_component(route1);
    			destroy_component(route2);
    			destroy_component(route3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(12:0) <Router url={url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 2) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { url = "" } = $$props;
    	const writable_props = ["url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("url" in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Link,
    		Route,
    		Home,
    		Quiz,
    		End,
    		NotFound,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ("url" in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get url() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
      // hydrate: true,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
