<script>
  // import { Router, Link, Route } from "svelte-routing";
  import "wired-elements";

  import Home from "./views/Home/index.home.svelte";
  import Quiz from "./views/Quiz/index.quiz.svelte";
  import End from "./views/End/index.svelte";
  import NotFound from "./views/NotFound/index.svelte";
  import {navRoutes} from './store/index';
  import {HOME, QUIZ, END} from './constant/story';

  const callbacks = {
    onUpdate(data) {
      console.log('data:', data)
    },
  };
  interactiveCanvas.ready(callbacks);

  // export let url = "";
</script>

<!-- <Router url={url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/quiz">Quiz</Link>
    <Link to="/end">End</Link>
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="/quiz" component={Quiz} />
    <Route path="/end" component={End} />
    <Route path="*" component={NotFound} />
  </div>
</Router> -->

<div>
  {$navRoutes}
  {#if $navRoutes === HOME}
    <Home />
  {:else if $navRoutes === QUIZ}
    <Quiz />
  {:else if $navRoutes === END}
    <End />
    {:else}
    <NotFound />
  {/if}
</div>

