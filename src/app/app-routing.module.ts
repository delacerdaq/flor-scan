import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AdministracaoComponent } from './pages/administracao/administracao.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Início | FlorScan' },
  { path: 'catalogo', component: CatalogoComponent, title: 'Catálogo | FlorScan' },
  { path: 'plantas/:id', component: DetalhesComponent, title: 'Detalhes da planta | FlorScan' },
  { path: 'login', component: LoginComponent, title: 'Entrar | FlorScan' },
  { path: 'cadastro', component: CadastroComponent, title: 'Criar conta | FlorScan' },
  { path: 'administracao', component: AdministracaoComponent, canActivate: [adminGuard], title: 'Administração | FlorScan' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard], title: 'Dashboard | FlorScan' },
  { path: '**', component: NaoEncontradoComponent, title: 'Página não encontrada | FlorScan' }
];

@NgModule({ imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })], exports: [RouterModule] })
export class AppRoutingModule {}
