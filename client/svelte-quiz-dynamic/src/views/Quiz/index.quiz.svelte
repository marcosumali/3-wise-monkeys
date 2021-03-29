<script>  
  import Card from './components/card.svelte';
  import {isLoading} from '../../store/index';
</script>

<div class="page">
  <div class="container">
    {#if $isLoading}
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