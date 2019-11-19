import React from 'react';
import axios from 'axios';
import './question_view.css';

var removeChecks = (classname) => {
  var objects = document.getElementsByClassName(classname); // 
  var i = 0;
  for(i = 0; i < objects.length; i++){ //i ended up with a bug where the radio buttons would remain checked
    objects[i].checked = false;
  }
}

var addandremovebtns = (current,size) => {
  var endoflist = (current == size);
  if(endoflist){
    document.getElementById('finishBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');    
  }
  
  if(!endoflist){
    document.getElementById('finishBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.remove('hidden');
  }
  
}

var calculateCorrect = (selectedAnswers) =>{
  return selectedAnswers.reduce((a,b) => parseInt(a)+parseInt(b),0);
}

class Answer {
  constructor(QID,answer,correct){
    this.QID = QID;
    this.answer = answer;
    this.correct = correct;
  }
}

class QuestionView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        questions: [],
        answers:[],
        current: 0,
        selectedAnswers: [],
        resultsCB: this.props.resCB           
      };     
  }

  componentDidMount() {
    axios.get(`http://167.172.208.95/`).then(res => {
      var questions = res.data.map(data => data.question );
      this.setState({questions: questions})
    });
    
    axios.get(`http://167.172.208.95/answers`).then(res => {
      var answers = res.data.map(data => new Answer(data.QID,data.answer,data.correct) );
      this.setState({answers: answers});
    });
  }

  next = (e) => {
    e.preventDefault();
    removeChecks('radio');
    if(!this.state.current == this.state.questions.length -1){
      ; //if we are at the end of our questions do nothing
       // can be removed (refactor)
    }else{
      this.setState({
        current: this.state.current + 1,
        selectedAnswers: this.state.selectedAnswers
      });
    }
    addandremovebtns(this.state.current, this.state.questions.length -2);
  }

  previous = (e) => {
    e.preventDefault();
    addandremovebtns(this.state.current -1, this.state.questions.length);
    if(this.state.current == 0){
      ;// do nothing and possibly disable or hide previous (refactor)
    }else{
      this.setState({
        current: this.state.current - 1,        
      });      
    } 
  }
  
  finish = (e) => {
    e.preventDefault();
    this.state.resultsCB(calculateCorrect(this.state.selectedAnswers),this.state.questions.length);
  }
  
  handleChange = (e) => {
    this.state.selectedAnswers[this.state.current] = e.target.value;
  }
  
  render() {
    return(
      <div className="questionview">
        <p>Question {this.state.current + 1} of {this.state.questions.length}</p>
        <p>{this.state.questions[this.state.current]}</p>
        <form >
        {this.state.answers.filter(answer => answer.QID == 
          this.state.current +1).map(answer => 
              <lable>{answer.answer}
                <input className='radio' 
                type="radio" name="answer" value={answer.correct} onChange={this.handleChange}/>
              <br/>
              </lable>
          )}
          <input id= "previousBtn" type="submit" value="Previous" onClick={this.previous}/>
          <input id= "nextBtn" type="submit" value="Next" onClick={this.next}/>
          <input id="finishBtn" className="hidden" type="submit" value="Finish" onClick={this.finish}/>          
        </form>        
    </div>
    );    
  }
}

export default QuestionView;
