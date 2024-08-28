import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../services.service';
import { getDefaultServiceModel, IServiceModel } from '../services.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-services-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,],
  templateUrl: './services-form.component.html',
  styleUrl: './services-form.component.scss'
})
export class ServicesFormComponent implements OnInit {
  isEdit = false;
  serviceForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {

    let service = getDefaultServiceModel();
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      const id = this.router.url.split('/').pop();
      service=this.servicesService.getService(Number(id))??service;
    }


    this.initializeForm(service);
  }

  initializeForm(service:IServiceModel): void {
    this.serviceForm = this.fb.group({
      Id: [service.Id],
      Name: [service.Name, Validators.required],
      Thumbnail: [service.Thumbnail],
      Description: [service.Description],
      MinPrice: [service.MinPrice, [Validators.required, Validators.min(0)]],
      MaxPrice: [service.MaxPrice, [Validators.required, Validators.min(0)]],
      SortOrder: [service.SortOrder, Validators.required],
      ActiveFlag: [service.ActiveFlag]
    });
  }
  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData: IServiceModel = this.serviceForm.value;
      if (this.isEdit) {
        this.servicesService.updateService(serviceData).subscribe(() => {
          this.router.navigate(['/admin/services']);
        });
      } else {
        this.servicesService.addService(serviceData).subscribe(() => {
          this.router.navigate(['/admin/services']);
        });
      }
    }
  }
}
