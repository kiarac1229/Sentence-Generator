
var fsaS = {
  startState: "S",
  transitions: [{ state: "S", sym: "NP", dest: "q1" },
  { state: "S", sym: "AUX", dest: "q2" },
  { state: "q1", sym: "AUX", dest: "q3" },
  { state: "q1", sym: "VP", dest: "q4"},
  { state: "q3", sym: "VP", dest: "q4"},
  { state: "q4", sym: "PERIOD", dest: "q5"},
  { state: "q2", sym: "NP", dest: "q6"},
  { state: "q6", sym: "VP", dest: "q7"},
  { state: "q7", sym: "QUESTION-MARK", dest: "q8"}],
  acceptStates: ["q5", "q8"]
}

var fsaNP = {
  startState: "NP",
  transitions: [{ state: "NP", sym: "DET", dest: "q1" },
  { state: "NP", sym: "ADJ", dest: "q1" },
  { state: "q1", sym: "ADJ", dest: "q1" },
  { state: "q1", sym: "N", dest: "q2" },
  { state: "NP", sym: "N", dest: "q2" },
  { state: "q2", sym: "PP", dest: "q3" },
  { state: "q3", sym: "WHNP", dest: "q4" },
  { state: "q2", sym: "WHNP", dest: "q4" }],
  acceptStates: ["q2", "q3", "q4"]
}

var fsaPP = {
  startState: "PP",
  transitions: [{ state: "PP", sym: "Prep", dest: "q1" },
  { state: "q1", sym: "NP", dest: "q2" }],
  acceptStates: ["q2"]
}

var fsaVP = {
  startState: "VP",
  transitions: [{ state: "VP", sym: "V", dest: "q1" },
  { state: "q1", sym: "NP", dest: "q2" },
  { state: "q1", sym: "PP", dest: "q2" },
  { state: "q1", sym: "ADJ", dest: "q3" },
  { state: "q2", sym: "PP", dest: "q2" }],
  acceptStates: ["q1", "q2","q3"]
}

var fsaWHNP = {
  startState: "WHNP",
  transitions: [{ state: "WHNP", sym: "COMMA", dest: "q1" },
  { state: "q1", sym: "WP", dest: "q2" },
  { state: "q2", sym: "NP", dest: "q3" },
  { state: "q2", sym: "AUX", dest: "q4" },
  { state: "q3", sym: "AUX", dest: "q4" },
  { state: "q4", sym: "VP", dest: "q5" },
  { state: "q5", sym: "COMMA", dest: "q6" }],
  acceptStates: ["q6"]
}

// Generates words in an FSA
function generate(fsa) {
  var currentState = fsa.startState; // track our current state
  var word = ""; // word we are generating
  var accept = false; // boolean that lets us continue or exit loop

  do {
    // 0. If current state is accept state, decide if we should accept
    if (fsa.acceptStates.includes(currentState)) { // ask if current state is accept state
      randomAccept = Math.floor(Math.random() * 11) // random number between 0-10
      if (randomAccept > 8) { // random probability for accepting
        accept = true;
        break; // if decide to accept, don't need to determine transitions, so we can exit loop
      }
    }

    // 1. Get transitions for current state
    var currentTransitions = []; // array of possible transitions for current state
    for (transition of fsa.transitions) { // loop through all transitions in the FSA
      if (transition.state == currentState) { // check state property in each transition
        currentTransitions.push(transition); // add transition to the array
      }
    }

    // 2. Choose a transition randomly
    var numTransitions = currentTransitions.length; // gets length of the array of transitions 
    // First check to see if there are any available transitions to take; if not, then break
    if (numTransitions < 1 || currentTransitions == undefined) {
      accept = true;
      break; // 
    }
    // If there are available transitions, then let's randomize an int to index the list
    var randomTransition = Math.floor(Math.random() * numTransitions); // range from 0 to the number of transitions 
    var transition = currentTransitions[randomTransition]; // index the list of current transitions using our random number to choose a transition randomly

    // 3. Emit the letter/symbol on that transition 
    word = word.concat(" ",transition.sym);
     // get symbol property of transition and concatenate symbol to word

    // 4. Change current state to new state
    currentState = transition.dest;
  }
  while (accept == false); // keep looping if we haven't accepted
  console.log(word); // output the final word
}

// Run program
generate(fsaS);
generate(fsaNP);
generate(fsaPP);
generate(fsaVP);
generate(fsaWHNP);
