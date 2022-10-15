import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  createList(title: string) {
    console.log(title);
    this.taskService.createList(title).subscribe((list: any) => {
      // Now we navigate to /lists/task._id
      this.router.navigate(['/lists', list._id]);
    });
  }
}
