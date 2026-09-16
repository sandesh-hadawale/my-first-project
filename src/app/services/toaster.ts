import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class Toaster {
  constructor(
    private toastr: NgxToastrService,
    private dialog: MatDialog
  ) {}

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }

}

