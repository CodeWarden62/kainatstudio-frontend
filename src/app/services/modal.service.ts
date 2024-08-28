import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialogue/confirmation-dialogue.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  confirm(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message }
    });

    return new Promise<boolean>((resolve, reject) => {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
