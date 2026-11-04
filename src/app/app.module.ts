import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlantaCardComponent } from './components/planta-card/planta-card.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AdministracaoComponent } from './pages/administracao/administracao.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent, PlantaCardComponent,
    HomeComponent, CatalogoComponent, DetalhesComponent, LoginComponent,
    CadastroComponent, AdministracaoComponent, DashboardComponent, NaoEncontradoComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
