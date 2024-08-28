import { Injectable } from '@angular/core';
import { IServiceModel, dummyServices } from './services.model';
import { WebapiService } from '../../../services/webapi.service';
import { ApiConstants } from '../../../constants/api.constants';
import { catchError, map, tap } from 'rxjs';
import { ToastService } from '../../../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  services: IServiceModel[] = [];
  constructor(
    private webapi: WebapiService,
    private toastService: ToastService,
  ) {}

  getServices() {
    return this.webapi.get(ApiConstants.service.basePath, true).pipe(
      map((res: any) => {
        this.services = this.serviceApiModelToServiceModel(res);
        return this.services;
      }),
      catchError((err) => {
        this.toastService.presentError('Error fetching services, please try again later');
        throw err;
      })
    );
  }
  getService(id: number) {
    return this.services.find((s) => s.Id === id);
  }
  addService(service: IServiceModel) {
    return this.webapi.post(ApiConstants.service.basePath+ApiConstants.service.operations.create, service, true)
    .pipe(
      catchError(err => {
        this.toastService.presentError('Error fetching services, please try again later');
        throw err
      }),
      tap((res: any) => {
        service.Id = res.id;
        this.services.push(service);
      })
    )
  }

  updateService(service: IServiceModel) {
    return this.webapi.update(ApiConstants.service.basePath+ApiConstants.service.operations.update, service, true)
    .pipe(
      catchError(err => {

        this.toastService.presentError('Error fetching services, please try again later');
         throw err
      }),
      tap(() => {
        const index = this.services.findIndex((s) => s.Id === service.Id);
        this.services[index] = service;
      })
    )
  }

  deleteService(serviceId: number) {
    return this.webapi.delete(ApiConstants.service.basePath+ApiConstants.service.operations.delete, serviceId, true)
    .pipe(
      catchError(err => {
        this.toastService.presentError('Error fetching services, please try again later');
        throw err
      }),
      map(() => {
        const index = this.services.findIndex((s) => s.Id === serviceId);
        this.services.splice(index, 1);
        return this.services;
      })
    );
  }

  serviceApiModelToServiceModel(serviceApiModel: any): IServiceModel[] {
    return serviceApiModel.map((s: any) => {
      return {
        Id: s.id,
        Name: s.name,
        Thumbnail: s.thumbnail,
        Description: s.description,
        MinPrice: s.minPrice,
        MaxPrice: s.maxPrice,
        SortOrder: s.sortOrder,
        ActiveFlag: s.activeFlag,
      };
    });
  }
}
