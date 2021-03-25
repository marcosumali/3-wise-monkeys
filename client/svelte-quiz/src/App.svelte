<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./views/Home/index.svelte";
  import Quiz from "./views/Quiz/index.svelte";
  import End from "./views/End/index.svelte";
  import NotFound from "./views/NotFound/index.svelte";

  export let url = "";
</script>

<Router url={url}>
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
</Router>