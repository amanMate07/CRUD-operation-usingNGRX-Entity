import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer'
import * as UserActions from './store/user.action'
import { User } from './store/user.action';
import { selectAllUsers } from './store/user.reducer';
interface Users {
  id: string;
  changes: {};
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {
  id1: number;
  check: boolean = false;
  users: UserActions.User[]
  user: UserActions.User;
  idArray: string[] = []
  userArray: string[] = []
  updateArray = []
  item: any;
  arrayControl: FormArray;
  constructor(private store: Store<fromApp.AppState>) { }
  userForm: FormGroup;


  ngOnInit(): void {
    this.store.dispatch(new UserActions.GetRequest());

    this.store.select(selectAllUsers).subscribe(users => {
      this.users = users;
      this.userForm = new FormGroup({
        usersFormArray: new FormArray(this.users && this.users.length ?
          this.users.map(user => this.createUserForm(user)) :
          [])
      })
      // alert(JSON.stringify(this.users))
    })
  }

  createUserForm(data): FormGroup {

    return new FormGroup(
      {
        email: new FormControl(data.email),
        id: new FormControl(data.id),
        password: new FormControl(data.password),
        name: new FormControl(data.name),
        check: new FormControl(false)
      }
    )

  }

  selectAll() {
    ((<FormArray>this.userForm.get('usersFormArray')) as FormArray).controls
      .map(student => {
        student.get('check').setValue(true);
        this.idArray.push(student.value.id)
        const u: Users = { id: student.value.id, changes: student.value }
        this.updateArray.push(u)

      });
   // alert(this.idArray)
  }

  change(j, isChecked: boolean) {
    this.arrayControl = this.userForm.get('usersFormArray') as FormArray;
    this.item = this.arrayControl.at(j);
    this.id1 = this.idArray.indexOf(this.item.value.id);
    if (this.id1 !== -1) {
      this.idArray.splice(this.id1, 1);
      this.updateArray.splice(this.id1, 1);

      this.idArray.push(this.item.value.id);
      const u: Users = { id: this.item.value.id, changes: this.item.value }
      this.updateArray.push(u)
    } else {
      this.idArray.push(this.item.value.id);
      const u: Users = { id: this.item.value.id, changes: this.item.value }
      this.updateArray.push(u)
    }

    console.log(JSON.stringify(this.updateArray))
    console.log(JSON.stringify(this.idArray))
  }
  onChange(j: any, isChecked: boolean) {

    this.arrayControl = this.userForm.get('usersFormArray') as FormArray;
    this.item = this.arrayControl.at(j);
    this.id1 = this.idArray.indexOf(this.item.value.id);
    var check: boolean = false

    if (!isChecked) {
      this.idArray.splice(this.id1, 1);
      this.updateArray.splice(this.id1, 1);

    } else {
      if (this.id1 !== -1) {
        this.idArray.splice(this.id1, 1);
        this.updateArray.splice(this.id1, 1);

        this.idArray.push(this.item.value.id);
        const u: Users = { id: this.item.value.id, changes: this.item.value }
        this.updateArray.push(u)
      } else {
        this.idArray.push(this.item.value.id);
        const u: Users = { id: this.item.value.id, changes: this.item.value }
        this.updateArray.push(u);
      }

    }

    console.log(JSON.stringify(this.updateArray))
    console.log(JSON.stringify(this.idArray))

  }

  post(form: NgForm) {
    const user: UserActions.User = { id: form.value.userId, email: form.value.email, password: form.value.password, name: form.value.name, select: false }
    this.store.dispatch(new UserActions.AddUser(user));
  }


  update(form: NgForm) {
    const user: UserActions.User = { id: form.value.userId, email: form.value.email, password: form.value.password, name: form.value.name, select: false }
    this.store.dispatch(new UserActions.AddUpdateUser(user));
  }

  updateMultiple() {
    //alert(JSON.stringify(this.updateArray))
    const user: Update<UserActions.User>[] = this.updateArray
    this.store.dispatch(new UserActions.UpdateMultiple(user));
    this.updateArray = []
    this.idArray = []
  }

  delete(id: string) {
    this.store.dispatch(new UserActions.DeleteUser(id))
  }

  deleteMultiple() {
    const id: string[] = this.idArray
    this.store.dispatch(new UserActions.DeleteUsers(id))
    this.idArray = []
    this.updateArray = []
  }

  get(id: string) {
    this.store.select(selectAllUsers).subscribe(users => {
      this.user = users.find(user => user.id == id);
      alert(JSON.stringify(this.user))
    });
  }
}


