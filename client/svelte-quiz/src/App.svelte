<script>
  import { Router, Link, Route } from "svelte-routing";
  import HomePage from "./views/HomePage/index.svelte";
  import AboutPage from "./views/AboutPage/index.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </nav>
  <div>
    <Route path="/about" component="{AboutPage}" />
    <Route path="/"><HomePage /></Route>
  </div>
</Router>