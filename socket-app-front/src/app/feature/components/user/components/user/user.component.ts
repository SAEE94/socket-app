import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { UserFormService } from '../../services/user.form.service ';
import { UserService } from '../../services/user.service';
import { UserSocketService } from '../../services/user.socket.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public currentPage = 1;
  private itemsPerPage = 5;


  public users$: Observable<any>;
  public alertConfig: any = {};
  public isDelete = false;
  public sent = false;
  private modalRef: NgbModalRef;
  private subscription = new Subscription();

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    public userFormService: UserFormService,
    private userSocketService: UserSocketService,
    private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSocketService.listenUserCreated(this.subscription, ({ body }) => {
      this.showAlert('info', body)
      this.users$ = this.userService.getUsers(this.currentPage - 1, this.itemsPerPage);
    })

    this.userSocketService.listenUserDeleted(this.subscription, ({ body }) => {
      this.users$ = this.userService.getUsers(this.currentPage - 1, this.itemsPerPage);
      this.showAlert('warning', body)
    })

    this.users$ = this.userService.getUsers(0, this.itemsPerPage);
    this.userFormService.createForm();
  }


  public open(content) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    });
  }

  public onGuardar() {

    if (this.userFormService.formGroup.valid) {
      this.sent = false;
      const sub = this.userService.saveUser(this.userFormService.formGroup.getRawValue()).subscribe(() => {        
        this.userFormService.createForm();
        this.modalRef.close();
      });
      this.subscription.add(sub);
    } else {
      this.sent = !this.sent;
    }
  }

  public onEditar(content, user) {
    this.userFormService.editForm(user);
    this.open(content);
  }

  public onOpenDeleteModal(content, user) {
    this.isDelete = !this.isDelete;
    this.userFormService.deleteForm(user);
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    });
    this
    this.modalRef.result.then(result => { }, reason => {
      if (reason === 'delete') {
        const sub = this.userService.deleteUser(user.id).subscribe(resp => {          
          this.isDelete = false;
          this.userFormService.createForm();
        });
        this.subscription.add(sub);
      }
    })
  }

  public onCancelar() {
    this.userFormService.createForm();
    this.modalRef.close();
    this.sent = false;
    this.isDelete = false;
  }

  public onPageChanged($event) {
    this.users$ = this.userService.getUsers($event - 1, this.itemsPerPage);
  }

  private showAlert(type: string, message: string) {
    this.toastr.info
    this.toastr[type](message, type, {
      closeButton: true
    });
  }

}
