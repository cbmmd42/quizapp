import React from 'react';
import axios from 'axios';
import './question_view.css';

var removeChecks = (classname) => {
  var objects = document.getElementsByClassName(classname); // for some reason i can't use array methonds
  for(var i = 0; i < objects.length; i++){ //i ended up with a bug where the radio buttons would remain checked
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
     // console.log("rendering the thing")
      
  }

  componentDidMount() {
    axios.get(`http://167.172.208.95/`).then(res => {
      //console.log(res);
      var questions = res.data.map(data => data.question );
      //console.log(questions);
      this.setState({questions: questions})
    });
    axios.get(`http://167.172.208.95/answers`).then(res => {
      //console.log(res);
      var answers = res.data.map(data => new Answer(data.QID,data.answer,data.correct) );
      //console.log(answers);
      this.setState({answers: answers});
    });
  }

  next = (e) => {
    e.preventDefault();
    removeChecks('radio');
        ///console.log(e.target.checked );
    //console.log(this.state.selectedAnswers[this.state.current]);
    if(!this.state.current == this.state.questions.length -1){
      console.log("we have reached the end");
    }else{
      this.setState({
        current: this.state.current + 1,
        selectedAnswers: this.state.selectedAnswers
      });
    }
    addandremovebtns(this.state.current, this.state.questions.length -2);
    console.log(this.state.selectedAnswers)
  }

  previous = (e) => {
    e.preventDefault();
    addandremovebtns(this.state.current -1, this.state.questions.length);
    //console.log(this.state.current);
    if(this.state.current == 0){
      console.log("we have reached zero");
      //hide previous
    }else{
      //this.state.selectedAnswers[this.state.current] = e.target.value;
      this.setState({
        current: this.state.current - 1,
        
      });
      
    } 
  }
  finish = (e) => {
    e.preventDefault();
    console.log(this.state.questions.length);
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
