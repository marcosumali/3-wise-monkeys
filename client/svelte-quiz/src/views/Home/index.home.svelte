<script>
  import { navigate } from "svelte-routing";

	let input;
  let hasSubmitted = false;
  let name = input ? input.value : '';

  const saveName = () => {
    hasSubmitted = true;
    // Input must be paired with variables using bind:value
    // Since we're using Wired.JS, we can't do this atm
    // So we must revalue using mannual invocation
    name = input.value;
    if (name.length > 0) {
      // Save name
      localStorage.setItem('name', name);
      // Navigate to quiz
      navigate("/quiz");
    }
  }
</script>

<div class="page">
  <div class="container">
    <div class="container-nowrap-center">
      <wired-card elevation="5" class="wired">
        <h1>Three Wise Monkeys</h1>
      </wired-card>
    </div>
    <div class="container-wrap-center" style="margin-bottom: 16px">
      <div class="container-wrap-center">
        <wired-input type="text" placeholder="Your Name" class="name" bind:this={input}/>
        <wired-button class="button" on:click={saveName}>START</wired-button>
      </div>
      {#if hasSubmitted && name.length <= 0}
        <div class="error-text">My apologies, but your name can't be empty...</div>
      {/if}
    </div>
    <div class="container-wrap-center text">
      <div style="margin-bottom: 4px; width: 100%; text-align: center;">Dear Young Traveler,</div>
      <div>Please tell me your name before we start the quest...</div>
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
    padding-top: 25vh;
  }
  .wired {
    padding: 0em 3em;
    margin: 1em;
  }
	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
  .name {
    width: 50vw;
    margin-right: 8px;
  }
  .container-wrap-center {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .container-nowrap-center {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .error-text {
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
    color: darkred;
  }


	@media (max-width: 640px) {
		.container {
			padding-top: 15vh;
		}
    h1 {
      font-size: 2.5em;
      font-weight: 200;
    }
    .text {
      margin: 16px;
      font-size: 16px;
      text-align: center;
    }
	}
</style>