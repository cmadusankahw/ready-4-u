import { Component, OnInit } from '@angular/core';
import { ServiceCategory } from '../service.model';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html',
  styleUrls: ['./service-select.component.scss'],
})
export class ServiceSelectComponent implements OnInit {

  private catSub: Subscription;
  
  serviceCategories: ServiceCategory[] = [];

  // selected category
  selectedCategory: ServiceCategory;

  // show service tadk list
  showTask = false;

  constructor(private router: Router,
              private serviceService: ServiceService) {}

  ngOnInit() {
      // get the service
      this.serviceService.getServiceCategories();
      this.catSub = this.serviceService.getServiceCategoriesUpdateListener()
        .subscribe((recievedService: ServiceCategory[]) => {
          if (recievedService) {
            this.serviceCategories = recievedService;
            console.log(this.serviceCategories);
          }

    });

  }

  showTaskList(category: string) {
    for (let cat of this.serviceCategories) {
      if ( cat.category === category) {
        this.selectedCategory = cat;
        this.showTask = true;
        return;
      }
    }
  }

  viewAvailableServiceProviders(category: string, task: string) {
    this.router.navigate(['cust/asp/' + category + '_' + task]);
  }
}
