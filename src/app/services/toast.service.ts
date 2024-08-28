import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private matSnackBar: MatSnackBar) { }
    presentError(errorMessage:string){
      this.matSnackBar.open(
        errorMessage,
        'Close',
        { duration: 3000 }
      );
    }
}
