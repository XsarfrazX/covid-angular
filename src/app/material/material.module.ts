import { NgModule } from '@angular/core';
import {MatButtonModule, MatButtonToggleModule, MatTabsModule, MatTableModule} from '@angular/material'

const MaterialComponents=[MatButtonModule, MatButtonToggleModule, MatTabsModule,MatTableModule]

@NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
