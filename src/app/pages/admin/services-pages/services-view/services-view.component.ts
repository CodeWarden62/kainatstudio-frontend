import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ServicesService } from '../services.service';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { IServiceModel } from '../services.model';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-services-view',
  standalone: true,
  imports: [RouterLink, MatButton, MatTableModule, MatSortModule],
  templateUrl: './services-view.component.html',
  styleUrls: ['./services-view.component.scss']
})
export class ServicesViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'priceRange', 'sortOrder', 'edit', 'delete'];
  dataSource!: MatTableDataSource<IServiceModel>;
  services:IServiceModel[]=[];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicesService: ServicesService, private router:Router, private modalService:ModalService) {}

  ngOnInit(): void {
    this.fetchServicesAndInitializeTable();
  }
  fetchServicesAndInitializeTable(): void {
    this.servicesService.getServices().subscribe(services => {
      this.services = services;
      this.dataSource = new MatTableDataSource(this.services);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item:IServiceModel, property ) => {
        switch(property) {
          case 'id': return item.Id;
          case 'name': return item.Name;
          case 'priceRange': return item.MinPrice;
          case 'sortOrder': return item.SortOrder;
          default: return 0;
        }
      };
    });
  }


  editService(id: number): void {
    // Implement edit service logic
    this.router.navigate(['./edit/',id]);
  }

  deleteService(id: number): void {
    // Implement delete service logic
    this.modalService.confirm('Are you sure you want to delete this service?').then(() => {
      this.servicesService.deleteService(id).subscribe(()=>{this.fetchServicesAndInitializeTable()});
    }).catch(() => {});

  }
}
