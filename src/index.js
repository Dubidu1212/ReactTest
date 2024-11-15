import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '5'};
    this.handleChange = this.handleChange.bind(this);
    this.changeCallback = props.changeCallback.bind(this);
    this.submitHandler = props.submitHandler.bind(this);
    this.selectChangeHandler = props.selectChangeHandler;
  }

  

  handleChange(event) {
    this.setState({value:event.target.value});
    this.changeCallback({value:event.target.value});
  }
  selectChangeHandler(event){

  }
  render() {
    
    return (
      <div>
        <form onSubmit = {()=> this.submitHandler()}>
          <label>
            Size of field n*n:
            <input type="text" min = "3" value={this.state.value} onChange={this.handleChange } pattern="\d+"/>   
          </label>
        </form> 
        <div className = "options">
          <div className = "optionItem">
            Gameplay type:
            <OwnSelect selectId = {"gameplay"} changeHandler = {(e)=>this.selectChangeHandler(e)}></OwnSelect>
          </div>
          <div className = "spacer">

          </div>
          <div className = "optionItem">
            Options:
            <OwnSelect  selectId = {"options"} changeHandler = {(e)=>this.selectChangeHandler(e)}></OwnSelect>
          </div>
        </div>  
      </div>
      
    );
  }
}

class OwnSelect extends React.Component{
  constructor(props){
    super(props);

    this.changeHandler = this.props.changeHandler.bind(this);
    
    this.state = {
      chosen: "default",
      selectId: props.selectId,
    };
    /*
    this.changeHandler = this.changeHandler.bind(this);
    */
  }
  OwnChangeHandler(event){
    this.setState({chosen:event.target.value})
    this.changeHandler({
      event:event,
      selectId:this.state.selectId,
    });
  }
  render(){
    
    var entries = [];
    
    entries.push(<option key = {0} value = "default">default</option>)
    entries.push(<option  key = {1} value = "sparse">sparse</option>)
    entries.push(<option  key = {2} value = "full">full</option>)
    entries.push(<option  key = {3} value = "minefield">minefield</option>)

    var desc = "";
    if(this.state.chosen == "default"){
      desc = "68% of fields occupied \n 4% assasins \n example:\n 5*5 => 17";
    }
    else if(this.state.chosen == "sparse"){
      desc = "20% of fields occupied \n no assasins";
    }
    else if(this.state.chosen == "full"){
      desc = "100% of fields occupied";
    }
    else if(this.state.chosen == "minefield"){
      desc = "68% of fields occupied \n 22% assasins";
    }
    let newText = desc.split ('\n').map ((item, i) => <p key={i}>{item}</p>);
    return (
      <div>
        <select  className = "content" onChange={(e) => this.OwnChangeHandler(e)}>
          {entries}
        </select>
        <br/>
        description:<br/>
        {newText}
      </div>
    );
  }
}


class GameCreator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 5,
      gameState:0,
      words:[],
      option:0,
    };
  }
  render(){
    if(this.state.gameState == 0){
      return(
        <div id = "container">
          <h1>
            Codenames
          </h1>
          <button className = "button" onClick = {() => this.createGame()}>
            Create Game
          </button>
          <NameForm selectChangeHandler = {(e)=>this.selectChangeHandler(e)} submitHandler = {()=> this.createGame()} changeCallback = {(props)=>this.changeHandler(props)}/>
        </div>
      );
    }
    else{
      return(
        <div id = "container">
          <h1>
          Codenames
          </h1>
          <Field words = {this.state.words} dimensions = {this.state.value}></Field>
        </div>

        
      );
    }
    
  }
  changeHandler(props){
    this.setState({value:props.value})
  }
  createGame(){
    this.setState({gameState:1});
    //this.getDataAxios(this.state.value);
    this.getData(this.state.value);
  }
  getData(num){
    const _ = require('underscore').default;
    let words = ["Acne","Acre","Addendum","Advertise","Aircraft","Aisle","Alligator","Alphabetize","America","Ankle","Apathy","Applause","Applesauc","Application","Archaeologist","Aristocrat","Arm","Armada","Asleep","Astronaut","Athlete","Atlantis","Aunt","Avocado","Baby-Sitter","Backbone","Bag","Baguette","Bald","Balloon","Banana","Banister","Baseball","Baseboards","Basketball","Bat","Battery","Beach","Beanstalk","Bedbug","Beer","Beethoven","Belt","Bib","Bicycle","Big","Bike","Billboard","Bird","Birthday","Bite","Blacksmith","Blanket","Bleach","Blimp","Blossom","Blueprint","Blunt","Blur","Boa","Boat","Bob","Bobsled","Body","Bomb","Bonnet","Book","Booth","Bowtie","Box","Boy","Brainstorm","Brand","Brave","Bride","Bridge","Broccoli","Broken","Broom","Bruise","Brunette","Bubble","Buddy","Buffalo","Bulb","Bunny","Bus","Buy","Cabin","Cafeteria","Cake","Calculator","Campsite","Can","Canada","Candle","Candy","Cape","Capitalism","Car","Cardboard","Cartography","Cat","Cd","Ceiling","Cell","Century","Chair","Chalk","Champion","Charger","Cheerleader","Chef","Chess","Chew","Chicken","Chime","China","Chocolate","Church","Circus","Clay","Cliff","Cloak","Clockwork","Clown","Clue","Coach","Coal","Coaster","Cog","Cold","College","Comfort","Computer","Cone","Constrictor","Continuum","Conversation","Cook","Coop","Cord","Corduroy","Cot","Cough","Cow","Cowboy","Crayon","Cream","Crisp","Criticize","Crow","Cruise","Crumb","Crust","Cuff","Curtain","Cuticle","Czar","Dad","Dart","Dawn","Day","Deep","Defect","Dent","Dentist","Desk","Dictionary","Dimple","Dirty","Dismantle","Ditch","Diver","Doctor","Dog","Doghouse","Doll","Dominoes","Door","Dot","Drain","Draw","Dream","Dress","Drink","Drip","Drums","Dryer","Duck","Dump","Dunk","Dust","Ear","Eat","Ebony","Elbow","Electricity","Elephant","Elevator","Elf","Elm","Engine","England","Ergonomic","Escalator","Eureka","Europe","Evolution","Extension","Eyebrow","Fan","Fancy","Fast","Feast","Fence","Feudalism","Fiddle","Figment","Finger","Fire","First","Fishing","Fix","Fizz","Flagpole","Flannel","Flashlight","Flock","Flotsam","Flower","Flu","Flush","Flutter","Fog","Foil","Football","Forehead","Forever","Fortnight","France","Freckle","Freight","Fringe","Frog","Frown","Gallop","Game","Garbage","Garden","Gasoline","Gem","Ginger","Gingerbread","Girl","Glasses","Goblin","Gold","Goodbye","Grandpa","Grape","Grass","Gratitude","Gray","Green","Guitar","Gum","Gumball","Hair","Half","Handle","Handwriting","Hang","Happy","Hat","Hatch","Headache","Heart","Hedge","Helicopter","Hem","Hide","Hill","Hockey","Homework","Honk","Hopscotch","Horse","Hose","Hot","House","Houseboat","Hug","Humidifier","Hungry","Hurdle","Hurt","Hut","Ice","Implode","Inn","Inquisition","Intern","Internet","Invitation","Ironic","Ivory","Ivy","Jade","Japan","Jeans","Jelly","Jet","Jig","Jog","Journal","Jump","Key","Killer","Kilogram","King","Kitchen","Kite","Knee","Kneel","Knife","Knight","Koala","Lace","Ladder","Ladybug","Lag","Landfill","Lap","Laugh","Laundry","Law","Lawn","Lawnmower","Leak","Leg","Letter","Level","Lifestyle","Ligament","Light","Lightsaber","Lime","Lion","Lizard","Log","Loiterer","Lollipop","Loveseat","Loyalty","Lunch","Lunchbox","Lyrics","Machine","Macho","Mailbox","Mammoth","Mark","Mars","Mascot","Mast","Matchstick","Mate","Mattress","Mess","Mexico","Midsummer","Mine","Mistake","Modern","Mold","Mom","Monday","Money","Monitor","Monster","Mooch","Moon","Mop","Moth","Motorcycle","Mountain","Mouse","Mower","Mud","Music","Mute","Nature","Negotiate","Neighbor","Nest","Neutron","Niece","Night","Nightmare","Nose","Oar","Observatory","Office","Oil","Old","Olympian","Opaque","Opener","Orbit","Organ","Organize","Outer","Outside","Ovation","Overture","Pail","Paint","Pajamas","Palace","Pants","Paper","Paper","Park","Parody","Party","Password","Pastry","Pawn","Pear","Pen","Pencil","Pendulum","Penis","Penny","Pepper","Personal","Philosopher","Phone","Photograph","Piano","Picnic","Pigpen","Pillow","Pilot","Pinch","Ping","Pinwheel","Pirate","Plaid","Plan","Plank","Plate","Platypus","Playground","Plow","Plumber","Pocket","Poem","Point","Pole","Pomp","Pong","Pool","Popsicle","Population","Portfolio","Positive","Post","Princess","Procrastinate","Protestant","Psychologist","Publisher","Punk","Puppet","Puppy","Push","Puzzle","Quarantine","Queen","Quicksand","Quiet","Race","Radio","Raft","Rag","Rainbow","Rainwater","Random","Ray","Recycle","Red","Regret","Reimbursement","Retaliate","Rib","Riddle","Rim","Rink","Roller","Room","Rose","Round","Roundabout","Rung","Runt","Rut","Sad","Safe","Salmon","Salt","Sandbox","Sandcastle","Sandwich","Sash","Satellite","Scar","Scared","School","Scoundrel","Scramble","Scuff","Seashell","Season","Sentence","Sequins","Set","Shaft","Shallow","Shampoo","Shark","Sheep","Sheets","Sheriff","Shipwreck","Shirt","Shoelace","Short","Shower","Shrink","Sick","Siesta","Silhouette","Singer","Sip","Skate","Skating","Ski","Slam","Sleep","Sling","Slow","Slump","Smith","Sneeze","Snow","Snuggle","Song","Space","Spare","Speakers","Spider","Spit","Sponge","Spool","Spoon","Spring","Sprinkler","Spy","Square","Squint","Stairs","Standing","Star","State","Stick","Stockholder","Stoplight","Stout","Stove","Stowaway","Straw","Stream","Streamline","Stripe","Student","Sun","Sunburn","Sushi","Swamp","Swarm","Sweater","Swimming","Swing","Tachometer","Talk","Taxi","Teacher","Teapot","Teenager","Telephone","Ten","Tennis","Thief","Think","Throne","Through","Thunder","Tide","Tiger","Time","Tinting","Tiptoe","Tiptop","Tired","Tissue","Toast","Toilet","Tool","Toothbrush","Tornado","Tournament","Tractor","Train","Trash","Treasure","Tree","Triangle","Trip","Truck","Tub","Tuba","Tutor","Television","Twang","Twig","Twitterpated","Type","Unemployed","Upgrade","Vest","Vision","Wag","Water","Watermelon","Wax","Wedding","Weed","Welder","Whatever","Wheelchair","Whiplash","Whisk","Whistle","White","Wig","Will","Windmill","Winter","Wish","Wolf","Wool","World","Worm","Wristwatch","Yardstick","Zamboni","Zen","Zero","Zipper","Zone","Zoo"];
    let ret = _.sample(words, num*num);
    this.setState({words:ret});
  }
  async getDataAxios(num){
    num = num*num;
    const axios = require('axios').default;

    const response =
      await axios.get("https://random-word-api.herokuapp.com/word",
          { params: {number: num}}
      )
    
    this.setState({words:response.data});
  }
  selectChangeHandler(e){
    let event = e.event;
    let id = e.selectId;
    if(id == "gameplay"){
      this.setState({option:event.target.event});
    }
    else if(id == "options"){
      //TODO
    }
    
  }
}
  

class Field extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dimensions: props.dimensions,
    }
  }

  render(){
    var rows = [];
    for(let r = 0;r<this.state.dimensions;r++){
      let row = [];
      for(let rr = 0;rr<this.state.dimensions;rr++){
        row.push(<Tile word = {this.props.words[r*this.state.dimensions+rr]} size = {50/this.state.dimensions}/>);//TODO: add key
      }

      rows.push(
        <tr>
          {row}
        </tr>
      );
    }
    return(
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class Tile extends React.Component{
  constructor(props){
    super(props);

  }

  render(){

    let divstyle = {
      textAlign: 'center',
      float: 'left',
      width: this.props.size*1.3 + 'vw',
      height: this.props.size*1.5 +'vh',
    };
    let buttonstyle = {
      width: '100%',
      height: '100%',
      display: 'inline-block',
      wordWrap: 'break-word',
      fontSize: this.props.size*0.3 + 'vmin',
    };

    return(
      
      <td style = {divstyle}>
        <button style = {buttonstyle} >
         {this.props.word}
        </button>
      </td>
    );
  }
}


ReactDOM.render(
  <GameCreator />,
  document.getElementById('root')
);
  

/*
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  
  renderSquare(i) {
    return (
      <Square 
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
      />  
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      XIsNext: true,
    };
  }
  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
 
    if (calculateWinner(squares) || squares[i]) {
      return;    
    }
    squares[i] = this.state.XIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares:squares,
      }]),
      stepNumber: history.length,
      XIsNext: !this.state.XIsNext,
    });
    
  }
  jumpTo(i){
    this.setState({
      stepNumber:i,
      XIsNext: (i%2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) =>{
      const desc = move ?
        'Go to move #' + move:
        'Go to game start';
      return(
        <li key ={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>

      );
    });




    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } 
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
*/