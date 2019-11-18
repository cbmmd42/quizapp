import React from 'react';
import './App.css';
import QuestionView from './components/question_view';

var findpercentage = (correct,total) =>{
  return `${(correct/total*100).toFixed(0)}%`;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      correct: 0,
      total: 0,
      takingquiz: true
    }
  }

  showResultsScreen = () => {
    this.setState({takingquiz: false})
  }

  quizResults = (argcorrect,argtotal) => {
    this.setState({
      correct: argcorrect,
      total: argtotal
    });
    this.showResultsScreen();
  }

  retry = () => {
    this.setState({takingquiz:true});
  }
  
  render() {
    const takingquiz = this.state.takingquiz;
    var display;
    if(takingquiz){
      display = <QuestionView className="hidden" resCB = {this.quizResults}/>
    }else {
      display = <div className="results">
        <p>You got a score of {findpercentage(this.state.correct,this.state.total)}</p>
        <button className="button" onClick={this.retry}>Retry</button>
        <button className="button" 
        onClick={()=> {window.location.href = ' https://cbmmd42.github.io/myFirstWebsite/index.html'}}>Home</button>
        </div>
    }
    return(
      <div className="App">
        {display}
    </div>
    );
    
  }
}

export default App;

