// function is used to generate random ID for the Die object
function randomInRange(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}


console.log("here")

function App () {
    
    // state to store all dice value 
    // it is initialized calling a function 'allnewdice' to get 10 die objects with a random die value and id for each object
    const [Dice,setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false) // used to check if the game is won
    const [roll, setRoll] = React.useState(1) // Store number of Rolls.
    

    // useEffect to run specific code only when the Dice state changes
    // Basically it main function is just to check if the game has being won or not i.e if Tenzies = True
    React.useEffect(()=>{
        // allHeld variable is used to know the first held. it is also used to know if all die items are held i.e if allHeld = 10
        // LOGIC [anytime a value is held, the allHeld variable increases by 1 so if allHeld equals 10, it means all die values are held]

        // the firstValue variable is used to store the first value
        // LOGIC [if/when allHeld equals 0 when mapping through dice, it means that is the first being held,so it will set first equal to the current die value]

        console.log("UseEffect ")
        let allHeld = 0 
        let firstValue
        
        // maps through the Dice state array and updates allHeld and also determne the first value being held.
        Dice.map( die =>{
            if (die.isHeld) {
                if (allHeld === 0) {
                    firstValue = die.dieValue
                }
                return allHeld++
            } else {
                return allHeld
            }
        })

        // function to check if all the values in the dice array[state] are the same
        function areSame(arr) {
            console.log(arr)
            //let first = arr[0];
            for (let i=1; i<arr.length; i++)
            if (arr[i].dieValue != firstValue)
                    return false;
            return true;
        }

        // checks if all the values are the same and it is all held, if true will set tenzies state to true i.e you won the game
        // use the arrsame function to check if all values are same and use the allHeld varaible to check if all values are held
        if (allHeld === 10 && areSame(Dice)) {
            setTenzies(true)
            console.log("You won")
        }

        console.log(allHeld)
    },[Dice])
    
    // function to generate random die
    // set an id for the Die object
    function generateDie() {
        
        let value = 0 //store image of random die number generated
        let integerValue = 0 // Stores the actual die or integer value of the die
        const randomDie = Math.floor(Math.random() * 6) + 1

        if (randomDie === 1) {
            value = <img width="30px" src="./images/dice-six-faces-one.png"></img>
            integerValue = 1
        } else if (randomDie === 2) {
            value = <img width="30px" src="./images/dice-six-faces-two.png"></img>
            integerValue = 2
        } else if (randomDie === 3) {
            value = <img width="30px" src="./images/dice-six-faces-three.png"></img>
            integerValue = 3
        }
        else if (randomDie === 4) {
            value = <img width="30px" src="./images/dice-six-faces-four.png"></img>
            integerValue = 4
        }
        else if (randomDie === 5) {
            value = <img width="30px" src="./images/dice-six-faces-five.png"></img>
            integerValue = 5
        }
        else if (randomDie === 6) {
            value = <img width="30px" src="./images/dice-six-faces-six.png"></img>
            integerValue = 6
        }

        return {
            dieValue: integerValue,
            value: value,
            isHeld : false,
            id : randomInRange(10,20000),
            key: randomInRange(10,20000)
        } 

/* NEW CODE */
        /*
        return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld : false,
            id : randomInRange(10,20000)
        }  */
    } 

    // A function to store 10 random die numbers. it creates an array and will push in 10 random die objects
    // gotten from the generateDIe function
    // The array created will then be stored in Dice state. 
    function allNewDice () {
        const randomDie = []

        for(let i = 0; i < 10 ; i++) {
            randomDie.push(generateDie())
        }
        return randomDie
    }

    // function to handle the roll button
    // it calls allnewDice function to give a new set of random numbers.it only roll dices that their isHeld property is false
    // it maps through the current dice state and calls the generateDIe function to generate new die numbers
    // only if the isHeld property in the previous die state is False.
    function rollFunc() {
        setDice(prevDice => prevDice.map( die => {
                return die.isHeld ? die : generateDie()
            }))
        setRoll( prevRoll => prevRoll + 1)

        if (tenzies) {
            setTenzies(false)
            setDice(allNewDice())
            console.log(`numer of rolls ${roll}`)
        }
        
    }

    // function to hold a specifc die i.e flip the isHeld value
    // it reuturns a new array with the specific isHeld value flipped and saves it as the new state 
    function hold(id) {
        const newObject = []

        Dice.map((die)=>{
            die.id === id ? newObject.push({...die, isHeld: !die.isHeld}) : newObject.push(die) 
        })  
        setDice(newObject)       
    }

    function Die (isHeld, id, value, key) {
        return (
            <div 
                key = {key}
                onClick={()=>{hold(id)}}
                style={ isHeld ? { backgroundColor:'#59E391' } : {backgroundColor:'white'} } className="item"
            >
                {value}
            </div>
        )
    }
    // mapping through the dice state array to pass the values to the dice component 
    // it returns DIe component with a random value(saved in dice state) and an key value which is then rendered to the DOM
    // Note the Key value is not needed or rendered in the DOM, it is used to identify each unique array object
    const mappedDie = Dice.map((die)=>{
        return Die(die.isHeld, die.id, die.value, die.key)
    })

    return (
        <main>
            <link rel="stylesheet" href="style1.css"></link>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container" >
                {mappedDie}
            </div>
            {tenzies && `You WON!!🎉🎉🎊` }<br></br><br></br>
            {tenzies && `Number of rolls: ${roll}`}
            <button onClick={rollFunc}>{tenzies ? "New Game" : "Roll Dice"}</button>
        </main>
    )
}

ReactDOM.render(<App />,document.getElementById('like_button_container'))


