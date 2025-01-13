import { Routes } from '@angular/router';
import { PagingComponent } from './pages/paging/paging.component';
import { FilteringComponent } from './pages/filtering/filtering.component';
import { SortingComponent } from './pages/sorting/sorting.component';
import { EditingComponent } from './pages/editing/editing.component';

export const routes: Routes = [
  { path: '', component: PagingComponent },
  { path: 'editing', component: EditingComponent },
  { path: 'filtering', component: FilteringComponent },
  { path: 'sorting', component: SortingComponent },
  { path: '**', component: PagingComponent },
];
