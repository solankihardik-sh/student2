import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'student-details', component: StudentDetailsComponent },
  { path: 'student-form', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
