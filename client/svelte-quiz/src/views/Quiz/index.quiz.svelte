<script>
  import { onMount } from 'svelte';
  
  import Card from './components/card.svelte';
  
  let quizes = [];
  let isLoading = false;
  const cardDetails = {quizes};
  const quizURL = `https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=boolean`;
  
  const getQuizes = () => {
    isLoading = true;
    setTimeout(async () => {
      const res = await fetch(quizURL).then(res => res.json())
      // Update variables
      quizes = await res.results
      cardDetails.quizes = quizes
      if (quizes.length > 0) {
        isLoading = false
      }
    }, 2000)
  }

  onMount(() => getQuizes())
</script>

<div class="page">
  <div class="container">
    {#if isLoading && quizes.length <= 0}
      <div>
        <wired-spinner class="spinner" spinning={true} duration="1000"></wired-spinner>
        <div>Loading...</div>
      </div>
    {:else if !isLoading && quizes.length > 0}
      <Card {...cardDetails}/>
    {:else if !isLoading && quizes.length <= 0}
      <div style="text-align: center">ERROR !</div>
    {/if}
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .container {
    padding-top: 20vh;
  }
  @media (max-width: 640px) {
    .container {
			padding-top: 12.5vh;
		}
	}
</style>