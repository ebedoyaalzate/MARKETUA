import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-brands',
  templateUrl: './popover-brands.component.html',
  styleUrls: ['./popover-brands.component.scss'],
})
export class PopoverBrandsComponent implements OnInit {

  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() {}

  async setBrand(item: string) {
    await this.popoverController.dismiss(item);
  }

}
