<script>
  import "wired-elements";
	let input;

  const saveName = () => {
    const name = input.value
    localStorage.setItem('name', name)
  }
</script>

<div class="page">
  <div class="container">
    <div class="container-nowrap-center">
      <wired-card elevation="5" class="wired">
        <h1>Three Wise Monkeys</h1>
      </wired-card>
    </div>
    <div class="container-nowrap-center" style="margin-bottom: 16px">
      <wired-input type="text" placeholder="Your Name" class="name" bind:this={input}/>
      <wired-button class="button" on:click={saveName}>START</wired-button>
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
    padding-top: 35vh;
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