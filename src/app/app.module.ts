import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KPIGridComponent } from './components/kpi-grid/kpi-grid.component';
import { KPICardComponent } from './components/kpi-card/kpi-card.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlightDetailComponent } from './components/flight-detail/flight-detail.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    KPIGridComponent,
    KPICardComponent,
    LeafletMapComponent,
    SidebarComponent,
    FlightDetailComponent,
    FilterPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }