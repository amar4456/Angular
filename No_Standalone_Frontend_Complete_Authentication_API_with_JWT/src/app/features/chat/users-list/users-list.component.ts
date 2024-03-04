import { Component } from '@angular/core';
import { User, filters } from '../model/chat-model';
import { Router } from '@angular/router';
import { MyApiService } from '../../../core/services/my-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  selectedUser: User = new User();
  filters: filters = new filters();
  usersList: User[] = [];
  showLoader: boolean = false;
  userDetails: any;
  totalRecords: any;
  newEvent: any;
  columns: any[] = [];

  constructor(private myApiService: MyApiService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // Retrieve the item from local storage
      const userData: any = localStorage.getItem('userDetails');
      // Parse the JSON string
      const jsonObject = JSON.parse(userData);
      this.userDetails = jsonObject;
    }
  }

  navigateToAddViewEdit(
    action: string,
    selectedUser: User = new User()
  ) {
    let userEmail = null;
    if (selectedUser?.email) {
      userEmail = selectedUser.email;
      this.router.navigate(['/main/chat/action', action, userEmail]);
    } else {
      this.router.navigate(['/main/chat/action', action]);
    }

  }

  getAllUsers(event: any) {
    this.showLoader = true;
    const baseSearch = {
      filters: {
        "name": this.filters.name,
        "email": this.filters.email,
      },
      pagination: {
        "pageNumber": 1 + (event.first / event.rows),
        "pageSize": event.rows
      },
      sorting: {
        "sortColumn": event.sortField ? event.sortField : "_id",
        "sortOrder": event.sortOrder === -1 ? 'descending' : 'ascending'
      }
    };
    this.myApiService.postData('user/get-all-users', baseSearch, this.userDetails.token).subscribe((res) => {
      if (res.status === 'success') {
        this.usersList = res.list;
        this.totalRecords = res.pagination.totalRecords;
        this.showLoader = false;
      } else {
        this.showError(res.message);
        this.showLoader = false;
      }
    });
  }

  clearFilter() {
    this.filters.name = "";
    this.filters.email = "";
    const pagination = {
      "first": 0,
      "rows": 10
    }
    this.getAllUsers(pagination);
  }

  onRowSelect(event: any) {
    alert(event.data._id)
    this.router.navigate(['/main/chat', event.data._id]);
  }

  showSuccess(detail: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail });
  }

  showError(detail: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }
}
