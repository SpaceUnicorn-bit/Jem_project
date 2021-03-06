import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminlayoutComponent } from './adminlayout/adminlayout/adminlayout.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './login/login.component';
import { BambupageComponent } from './components/bambupage/bambupage.component';
import { JempageComponent } from './components/jempage/jempage.component';
import { NavbarBComponent } from './components/navbar-b/navbar-b.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { Error404Component } from './components/error404/error404.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { LadiesComponent } from './genders/ladies/ladies.component';
import { GentlemanComponent } from './genders/gentleman/gentleman.component';
import { BoysComponent } from './genders/boys/boys.component';
import { GirlsComponent } from './genders/girls/girls.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { NavbarJComponent } from './components/navbar-j/navbar-j.component';
import { NavbaradminComponent } from './navbaradmin/navbaradmin.component';
import { DashboardComponent } from './adminlayout/dashboard/dashboard.component';
import { MangArticleComponent } from './adminlayout/mang-article/mang-article.component';
import { PricesFPipe } from './pipes/prices-f.pipe';
import { EditProductComponent } from './adminlayout/edit-product/edit-product.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CouponComponent } from './adminlayout/coupon/coupon.component';
import { OfferComponent } from './adminlayout/offer/offer.component';
import { OutfitComponent } from './adminlayout/outfit/outfit.component';
import { PromoComponent } from './components/promo/promo.component';
import { OutfitClientComponent } from './components/outfit-client/outfit-client.component';
import { FactuComponent } from './adminlayout/factu/factu.component';
import { ApartComponent } from './adminlayout/apart/apart.component';
import { ModAdminComponent } from './adminlayout/mod-admin/mod-admin.component';
import { CreateAdminComponent } from './adminlayout/create-admin/create-admin.component';
import { ViewlikeComponent } from './components/viewlike/viewlike.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { OrdersComponent } from './adminlayout/orders/orders.component';
import { HistoryComponent } from './components/history/history.component';
import { GetransactionComponent } from './components/getransaction/getransaction.component';
import { TagComponent } from './adminlayout/tag/tag.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompressimgComponent } from './adminlayout/compressimg/compressimg.component';
import { ImageslistComponent } from './adminlayout/imageslist/imageslist.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { GendersDepartmentsComponent } from './adminlayout/genders-departments/genders-departments.component';
import { SellingreportsComponent } from './adminlayout/sellingreports/sellingreports.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BambupageComponent,
    JempageComponent,
    NavbarBComponent,
    LoginAdminComponent,
    Error404Component,
    AboutUsComponent,
    FooterComponent,
    WhatsappComponent,
    LadiesComponent,
    GentlemanComponent,
    BoysComponent,
    GirlsComponent,
    ArticleComponent,
    ArticleDetailComponent,
    NavbarJComponent,
    AdminlayoutComponent,
    OutfitComponent,
    NavbaradminComponent,
    DashboardComponent,
    MangArticleComponent,
    PricesFPipe,
    EditProductComponent,
    SafeHtmlPipe,
    ContactusComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    CouponComponent,
    OfferComponent,
    PromoComponent,
    OutfitClientComponent,
    FactuComponent,
    ApartComponent,
    ModAdminComponent,
    CreateAdminComponent,
    ViewlikeComponent,
    EditClientComponent,
    OrdersComponent,
    HistoryComponent,
    GetransactionComponent,
    TagComponent,
    CompressimgComponent,
    ImageslistComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    GendersDepartmentsComponent,
    SellingreportsComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxFileDropModule,
    NgxDropzoneModule,
    DropzoneModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#FF5632',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    AppRoutingModule,
    NgbModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
