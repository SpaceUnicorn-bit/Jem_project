import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServices } from '../../services/user.service';
import { PurchaseService } from '../../services/purchase.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Client } from '../../models/client';
import { Purchase } from '../../models/purchase';
import { ImgUrl } from '../../models/imgUrl';

@Component({
  selector: 'app-navbar-j',
  providers: [UserServices, PurchaseService],
  templateUrl: './navbar-j.component.html',
  styleUrls: ['./navbar-j.component.css'],
})
export class NavbarJComponent implements OnInit {
  public navItem = 'hiddenItem';
  public controlNav = false;
  public imgUrl = ImgUrl;
  public identity;
  public token;
  public status: string;
  public client: Client;
  public clientPhoto;
  public menuOpen = false;
  public imgBoolUser = false;
  public primaryColour = '#ffffff';
  public secondaryColour = '#ccc';
  public PrimaryRed = '#dd0031';
  public SecondaryBlue = '#006ddd';
  public loading = false;
  public purchaseList: Array<Purchase>;
  public purchaselenght;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public config = { animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private clientService: UserServices
  ) {
    this.token = this.clientService.getToken();
    this.identity = this.clientService.getIdentity();
    this.client = new Client('', '', '', '', '', '', '', '', null, 1);
  }

  logout() {
    this.loading = true;
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    if (this.identity === null) {
      this.loading = false;
    }
  }

  toggleBurger() {
    const menuBtn = document.querySelector('.menu-btn');
    if (!this.menuOpen) {
      menuBtn.classList.add('open');
      this.menuOpen = true;
    } else {
      menuBtn.classList.remove('open');
      this.menuOpen = false;
    }
  }

  /*toggleBtnProducts(gender: any) {
    const link = '/Home/Articulo/';
    // vigilar si hay complicaciones sessionStorage.removeItem('currentPage');
    sessionStorage.removeItem('currentPage');
    this.router.navigate([link, 'J', '1', gender]);
  }*/

  toggleBtnProducts() {
    sessionStorage.removeItem('currentPage');
  }

  Onsubmit(form) {
    this.loading = true;
    this.clientService.signup(form.value).subscribe(
      response => {
        if (response.status !== 'Error') {
          // token del usuario
          this.token = response;
          localStorage.setItem('token', this.token);
          // objeto usuario idetificado
          this.clientService.signup(this.client, true).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              if (response.shops_id === 1) {
                this.identity = response;
                this.loading = false;
                this.getClientPhoto(this.identity.sub);
                localStorage.setItem('identity', JSON.stringify(this.identity));
              } else {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                this.loading = false;
              }
            },
            error => {
              console.log(<any>error);
            }
          );
        }
        if (response.status === 'Error') {
          this.status = 'error';
          this.loading = false;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getClientPhoto(idClient: any) {
    this.clientService.getClientPhoto(idClient).subscribe(
      response => {
        if (response.clientPhoto === 'assets/Images/default.jpg') {
          this.clientPhoto = response.clientPhoto;
          this.imgBoolUser = true;
        } else {
          this.clientPhoto = this.imgUrl.url + response.clientPhoto;
          this.imgBoolUser = false;
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  gotoRegister() {
    this.router.navigate(['/registrar', 'jem']);
  }

  gotoCart() {
    this.router.navigate(['Carrito/', 'J', this.identity.sub]);
  }

  gotoFavorites() {
    this.router.navigate(['Home/Favoritos/', 'J']);
  }

  gotoConfig() {
    const link = 'Cuenta/configuración';
    this.router.navigate([link, 'J']);
  }
  gotoHistory() {
    this.router.navigate(['Home/historial/', 'J']);
  }

  getLenghtListPurchase() {
    this.purchaseService.getPurchase(this.identity.sub).subscribe(
      response => {
        this.purchaseList = response.purchase;
        if (this.purchaseList.length === 0) {
          this.purchaselenght = 0;
        } else {
          this.purchaselenght = this.purchaseList.length;
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  displaySearch() {
    const input = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const expand = () => {
      searchBtn.classList.toggle("close");
      input.classList.toggle("square");
    };
    searchBtn.addEventListener("click", expand);
  }

  ngOnInit() {
    if (this.token !== 'undefined') {
    } else {
      this.identity.name = 'iniciar sesión';
    }
    if (this.identity.shops_id === 1) {
      this.getClientPhoto(this.identity.sub);
      this.getLenghtListPurchase();
    }
  }
}
