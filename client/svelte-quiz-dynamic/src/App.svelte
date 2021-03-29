<script>
  import "wired-elements";

  import Home from "./views/Home/index.home.svelte";
  import Quiz from "./views/Quiz/index.quiz.svelte";
  import End from "./views/End/index.svelte";
  import NotFound from "./views/NotFound/index.svelte";
  import {navRoutes, index, quiz, isLoading} from './store/index';
  import {HOME, QUIZ, END} from './constant/story';

  const callbacks = {
    onUpdate(data) {
      if (data.stages === QUIZ) {
        $navRoutes = QUIZ
        $index = data.index
        $quiz = data.quiz
        $isLoading = false
      }
      if (data.stages === END) {
        $navRoutes = END
        $isLoading = false
      }
    },
  };
  interactiveCanvas.ready(callbacks);
</script>

<div>
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

