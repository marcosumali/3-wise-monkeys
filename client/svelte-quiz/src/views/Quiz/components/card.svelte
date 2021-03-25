<script>
  import {navigate} from "svelte-routing";

  import {index, answers} from '../../../store/index';
  import {students, disabilities} from '../../../constant/story';
  
  export let quizes;
  const name = localStorage.getItem('name') || 'Young Traveller';

  const handleAnswers = (answer) => {
    // If end, go to end
    if ($index >= quizes.length-1) {
      navigate("/end");
    }
    // Update answer
    if (quizes[$index].correct_answer.toLowerCase() === answer) {
      let updateAnswers = [...$answers]
      updateAnswers[$index] = true
      answers.update(answers => answers = updateAnswers)
    }
    // Update index
    index.update(n => n + 1)
  }
</script>

<div>
  <wired-card elevation="5" class="wired">
    <h1>Hi, {name}</h1>
    <div class="text">My name is {students[$index]} and I don't {disabilities[$index]} no evil. Please assist me in collecting wisdom of the human world by answering the question.</div>
  </wired-card>
  <div class="container-nowrap-center">
    <wired-card elevation="3" class="wired">
      <h2>{quizes.length > 0 ? quizes[$index].question : ''}</h2>
    </wired-card>
  </div>
  <div class="container-nowrap-center">
    <wired-button class="button" on:click={() => handleAnswers('false')}><h2>FALSE</h2></wired-button>
    <wired-button class="button" on:click={() => handleAnswers('true')}><h2>TRUE</h2></wired-button>
  </div>
</div>


<style>
  h1 {
    margin-top: 0px;
    margin-bottom: 8px;
		font-size: 4em;
		font-weight: 100;
	}
  h2 {
    margin: 4px;
		font-size: 3em;
		font-weight: 100;
	}
  .wired {
    padding: 1em;
    margin: 0.5em;
  }
  .container-nowrap-center {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .button {
    margin: 1em;
  }
  
  @media (min-width: 1280px) {
    .wired {
      min-width: 96.5%;
      max-width: 100%;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
    .text {
      font-size: 12px;
    }
	}
</style>