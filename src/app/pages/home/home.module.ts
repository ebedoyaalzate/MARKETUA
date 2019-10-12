import { CardDetailComponent } from './../../components/card-detail/card-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PopoverCategoriesComponent } from 'src/app/components/popover-categories/popover-categories.component';
import { PopoverBrandsComponent } from 'src/app/components/popover-brands/popover-brands.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    CardDetailComponent,
    PopoverCategoriesComponent,
    PopoverBrandsComponent
  ],
  entryComponents: [
    PopoverCategoriesComponent,
    PopoverBrandsComponent
  ]
})
export class HomePageModule {}
