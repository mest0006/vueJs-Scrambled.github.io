/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
};

/**********************************************
 * YOUR CODE BELOW
 **********************************************/


var storageKey = "scramble-storage";



const app = new Vue({
  el: '#app',
  data: {
    words: ["apple", "banana", "pear", "orange", "pineapple", "cherry", "grapefruit", "grape", "pomegranate", "papaya"],
    game: {
      active: false,
      text: "",
      words: [],
      word: '',
      scrambledWord: '',
      points: 0,
      strikes: 0,
      passes: 3,
      maxPasses: 3,
      maxStrikes: 3,



    },

    shot: '',
    message: '',

    scrambled: {
      color: 'purple',
      fontSize: '',
      fontWeight: ''
    }

  },
  mounted: function () {

    this.start()
    const ls = localStorage.getItem('guessTheWord')
    if (ls) {
      const game = JSON.parse(ls)
      this.game = game
    }

  },
  methods: {




    start: function () {
      if (!this.game.active) {
        this.game.active = true
        this.game.strikes = 3
        this.game.points = 0
        this.game.passes = 3
        this.game.words = shuffle(this.words)
        this.game.word = this.words.shift()
        this.game.scrambledWord = shuffle(this.game.word)
        this.message = `Guess the scrambled word`

      }
      this.save()
    },






    /**
     * The guess() Function
     * Check if the guessed word is true
     *  Use string method toUpperCase() to convert a string to all capital letters
     *  Use guess() function to check if word matches
     *  Use guess() function if the word matches and remove the word from game list of words
     * Response: correct
     *  Use guess() function to display a new word
     * Response: new word
     *  Use guess() function if the word does not match and store strike
     * Response: strike
     *  Use guess() function and word will be displayed again
     * Response: same word
     */

    guess: function (shot) {

      var shot = this.shot
      if (this.game.active) {
        shot = shot.toUpperCase()

        if (this.shot === this.game.word) {
          this.game.points++
          if (this.game.words.length > 0) {
            this.message = `Congratulations you have won 1 point!`
            this.nextWord()
            console.log(`Congratulations you have won 1 point!. Your current score is ${this.game.points}`)

          }
          else {

            this.message = `Congratulations you have finished the game!  `
            this.game.active = false
            this.start()
          }


        } else {
          this.game.strikes--
          if (this.game.strikes > 0) {
            this.message = `Strike! Please try again.`

            /* if the strike should give a new word:
                      if(game.words.length > 0 ){
                      game.word = game.words.shift()
                      game.scrambledWord = shuffle(game.word)
                      console.log(`The next scrambled word is: ${game.scrambledWord}`)
                      }else{
                        console.log(`Strike! There are no more words, you have finished! your final score is: ${game.points}`)
                        game.active = false
                      }
                      */
          } if (this.game.strikes <= 0) {
            setTimeout(2)
            this.message = `Strike! You have reached the maximum number of strikes. Your final score is: ${this.game.points}.`

            this.game.active = false
            this.start()
          }
        }
      }
      this.shot = ""
      // this.shot = JSON.stringify(localStorage.setItem(storageKey) || '[]')
    },

    nextWord: function () {
      this.game.word = this.game.words.shift()
      this.game.scrambledWord = shuffle(this.game.word)

    },

    /** The pass() Function
     * Check if player passes are true
     * Use the pass() function to remove the word from the game list and next word will be displayed
     * Response: new word
     */
    pass: function () {
      if (this.game.active) {
        if (this.game.passes > 0) {
          this.game.passes--


          if (this.game.words.length > 0) {
            this.message = `You have used a pass! Please try again. You have ${this.game.passes} more pass(es).`
            this.nextWord()

          }


          else {
            this.game.passes <= 0
            this.message = `You have used a pass! Your final score is: ${game.points}`
            this.game.active = false
            this.start()
          }
        }
      }

    },
    save: function () {
      localStorage.setItem('guessTheWord', JSON.stringify(this.game))
    }
  }


})

