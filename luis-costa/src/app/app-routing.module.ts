import { PaymentsComponent } from './payments/payments.component';
import { GeneratorComponent } from './generator/generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path:  'generator', component:  GeneratorComponent}, { path: 'payments', component: PaymentsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
