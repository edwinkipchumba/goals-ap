import { Component, OnInit } from '@angular/core';
// api http n03
import { HttpClient } from '@angular/common/http';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
// add quote api and 03
import { Quote } from '../quote-class/quote';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  // added for delete
  alertService:AlertService;
  // quote add
  quote:Quote;

  constructor(goalService:GoalService, alertService:AlertService, private http:HttpClient) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }
 
  
  // add validation to submit button from (goal-form c.html/t)child (goal.c.html/ (addGoal)="addNewGoal($event)" .ts addNewGoal(goal){....
  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id =goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  // toggle
  toggleDetails(index){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  // confirm option
  deleteGoal(isComplete, index){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        // deletes
        this.alertService.alertMe("The goal has been deleted")

      }
    }
  }




  // constructor() { }

  ngOnInit(){
    interface ApiResponse{
      author:string;
      quote:string;
  }
  this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
    // Succesful API request
    this.quote = new Quote(data.author, data.quote)
  })

}
}
