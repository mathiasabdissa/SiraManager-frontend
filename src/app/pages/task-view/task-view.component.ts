import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { AbstractControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];

  selectedListId:string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params.listId){
          this.selectedListId=params.listId
        }
        this.taskService.getTasks(params.listId).subscribe((tasks: any) => {
          this.tasks = tasks;
        })
      }
    )
    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

  onTaskClick(task: Task){
    // to make the task set to completed
    this.taskService.complete(task).subscribe(()=>{
      console.log("Completed Successfully");
      task.completed=!task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }
  
  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }
}
