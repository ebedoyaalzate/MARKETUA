import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardDetailComponent } from './../../components/card-detail/card-detail.component';


import { PopoverCategoriesComponent } from 'src/app/components/popover-categories/popover-categories.component';
import { PopoverBrandsComponent } from 'src/app/components/popover-brands/popover-brands.component';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { GooglePlus } from "@ionic-native/google-plus/ngx";

