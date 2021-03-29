<script>
 import {answers} from '../../store/index';
</script>

<div class="page">
  <div class="container">
    <div class="container-nowrap-center">
      <wired-card elevation="5" class="wired">
        <div class="container-nowrap-center">🙈&nbsp🙉&nbsp🙊</div>
        <div class="container-nowrap-center">
          {#each $answers as answer}
            {#if answer}
              <div>⭕&nbsp</div>
            {:else}
              <div>❌&nbsp</div>
            {/if}
          {/each}
        </div>
        <h1>Thank You</h1>
      </wired-card>
    </div>
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
    padding-top: 30vh;
  }
  .container-nowrap-center {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin-top: 0px;
    margin-bottom: 8px;
		font-size: 4em;
		font-weight: 100;
	}

  @media (max-width: 640px) {
    h1 {
      font-size: 2em;
    }
    .container {
			padding-top: 25vh;
		}
	}
</style>