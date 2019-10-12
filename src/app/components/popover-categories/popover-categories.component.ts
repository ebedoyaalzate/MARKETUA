import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-categories',
  templateUrl: './popover-categories.component.html',
  styleUrls: ['./popover-categories.component.scss'],
})
export class PopoverCategoriesComponent implements OnInit {
  category: String;

  constructor(
    public popoverController: PopoverController) { }

  ngOnInit() {}

  async setCategory(item: string) {
    await this.popoverController.dismiss(item);
  }

}
