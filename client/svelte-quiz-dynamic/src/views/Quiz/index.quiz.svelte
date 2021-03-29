<script>
  // import { onMount } from 'svelte';
  
  import Card from './components/card.svelte';
  import {isLoading} from '../../store/index';
  
  // let quizes = [];
  // let isLoading = false;
  // const cardDetails = {quizes};
  // const quizURL = `https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=boolean`;
  
  // const getQuizes = () => {
  //   isLoading = true;
  //   setTimeout(async () => {
  //     const res = await fetch(quizURL).then(res => res.json())
  //     // Update variables
  //     quizes = await res.results
  //     cardDetails.quizes = quizes
  //     if (quizes.length > 0) {
  //       isLoading = false
  //     }
  //   }, 1000)
  // }

  // onMount(() => getQuizes())
</script>

<div class="page">
  <div class="container">
    {#if isLoading}
      <div>
        <wired-spinner class="spinner" spinning={true} duration="1000"></wired-spinner>
        <div>Loading...</div>
      </div>
    {:else}
      <Card/>
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