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

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
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
}
