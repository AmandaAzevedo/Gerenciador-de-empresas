import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { FeatureComponent } from './feature/feature.component';
import { FeatureRodapeComponent } from './feature-rodape/feature-rodape.component';



@NgModule({
  declarations: [MainComponent, FeatureComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ ]
})
export class MainModule { }
