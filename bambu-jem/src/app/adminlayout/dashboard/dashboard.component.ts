import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { AdminService } from '../../services/admin.service';
import { ApartService } from '../../services/apart.service';
import { SizeService } from '../../services/size.service';
import { ReportsellingService } from '../../services/reportselling.service';
import { PurchaseService} from '../../services/purchase.service';
import { GenderDepartmentService } from '../../services/gender-department.service';
import { Apart } from 'src/app/models/apart';
import { ImgUrl } from '../../models/imgUrl';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  providers: [ArticleService,
    AdminService, ReportsellingService, GenderDepartmentService,
    ApartService, SizeService, PurchaseService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public token;
  public identity;
  public aparts: Apart;
  public productView;
  public imgUrl = ImgUrl;
  public p = 1;
  public priceAllProduct;
  public genderSearch;
  public newStateDpt;
  public newStateGender;
  public newStateTags;
  public preStateDpt;
  public preStateGender;
  public sizesList;
  public loading = false;
  public newStateSize;
  public dptSearch;
  public tags: any;
  public department;
  public gender;
  public priceOrders = 0;
  public stockOrders = 0;
  public statusOrdens = ['Enviado', 'Procesando', 'incompleto'];

  public dataChart = [];
  public dataLabel = [];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(35, 93, 219, 0.788)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public isGetChartSelling = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sizeService: SizeService,
    private reportSelligService: ReportsellingService,
    private genderDptService: GenderDepartmentService,
    private apartService: ApartService,
    private purchaseService: PurchaseService,
    private adminService: AdminService,
    private productService: ArticleService ) {
    this.token = this.adminService.getToken();
    this.identity = this.adminService.getIdentity();
  }

  navigate() {
    this.router.navigate(['admin/articulo']);
  }


  /*=================================Filters_PRICE======================================*/

  cleanFilter() {
    this.newStateDpt = 0;
    this.newStateGender = 0;
    this.newStateSize = 0;
    this.newStateTags = '';
  }

  filterSizeProduct(e: any) {
    this.newStateSize = e;
    const sizesTem = e.split('/');
    if (sizesTem.length >= 2) {
      const sendSizes = sizesTem[0] + '-' + sizesTem[1];
      e = sendSizes;
    }
    this.productService.filterSizeProductAdmin(this.dptSearch, this.genderSearch, e).subscribe(
      response => {
        this.productView = response.filter;
        this.addPhotoProductList();
      }, error => {
        console.log(<any>error);
      }
    );
  }


  getOnlyGender(gender: any) {
    this.loading = true;
    this.productService.getProductGender(gender).subscribe(
      response => {
        this.loading = false;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getTags() {
    this.productService.getAllTag().subscribe(
      response => {
        this.tags = response.tag;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  pushTag(dataTag: any) {
    this.newStateTags = dataTag;
    console.log(this.newStateTags);
    if (dataTag !== undefined) {
      this.calculatePriceTags(dataTag);
    }
    console.log(dataTag);
  }

  getOnlydpt(gender, dtp) {
    this.loading = true;
    this.productService.Onlydepart(gender, dtp).subscribe(
      response => {
        this.productView = response.articles;
        this.addPhotoProductList();
        this.loading = false;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getSizesForDepartment(gender, department) {
    this.sizeService.getSizesForDepart(gender, department).subscribe(
      response => {
        this.sizesList = response.getSizesDeparment;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  selectedOptionDpt(option) {
    return this.newStateDpt === option;
  }

  selectedOptionGender(option) {
    return this.newStateGender === option;
  }

  selectedOptionTag(option) {
    return this.newStateTags === option;
  }

  selectedOptionSizes(option) {
    return this.newStateSize === option;
  }
  // ====================================FILTER_ORDENS================================================
  selectedOptionOrdens(option) {
    console.log(option);
  }

  pushStatus(dataStatus: any) {
    //this.newStateTags = dataStatus;
    if (dataStatus === "incompleto") {
      dataStatus = "incomplete";
    }
    this.purchaseService.viewOrdensByStatus(dataStatus).subscribe(
      response => {
        this.priceOrders = response.totalPrice;
        this.stockOrders = response.totalStock;
      }, error => {
        console.log(<any> error);
      }
    );
  }
  //==================================================================================================

  calculatePriceAllProduct() {
    this.newStateDpt = 0;
    this.newStateGender = 0;
    this.newStateSize = 0;
    this.newStateTags = 0;
    this.productService.calculatePriceAllStock().subscribe(
      response => {
        this.priceAllProduct = response.totalPrice;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  calculatePriceGender(dataPrice: any) {
    this.productService.calculatePriceGender(dataPrice).subscribe(
      response => {
        this.priceAllProduct = response.totalPrice;
      }, error => {
        console.log(<any> error);
      }
    );
  }
  calculatePriceDepartment( dataGender: any, dataDpt: any) {
    this.productService.calculatePriceDepartment(dataGender, dataDpt).subscribe(
      response => {
        console.log(response);
        this.priceAllProduct = response.totalPrice;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  calculatePriceTags(dataPrice: any) {
    this.productService.caculatePriceTags(dataPrice).subscribe(
      response => {
        this.priceAllProduct = response.totalPrice;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getAllApart() {
    this.apartService.getAllApart().subscribe(
      response => {
        this.aparts = response.aparts;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getListProduct(productsList: any) {
    this.productView = productsList;
    this.addPhotoProductList();
  }

  addPhotoProductList() {
    for (let index = 0; index < this.productView.length; index++) {
      // agrego formato a la imagen.
      const isLink = this.productView[index].photo.split(':');
      if (isLink.length === 1) {
        this.productView[index].photo = this.imgUrl.url + this.productView[index].photo;
      }
    }
  }

  onUpload(e) {
    console.log('imprimir', e.target.files[0]);
  }

  getGender() {
    this.genderDptService.getAllGender().subscribe(
      response => {
        this.gender = response.genders;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getDepartment(idGender: any) {
    this.genderDptService.getDepartmentForGender(idGender).subscribe(
      response => {
        this.department = response.department;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  pushGenderSearch(genderParam: any) {
    if (genderParam !== undefined) {
     this.genderSearch = genderParam.toString();
     this.preStateGender = this.newStateGender;
     this.newStateGender = genderParam;
     this.calculatePriceGender(genderParam);
     this.getOnlyGender(this.genderSearch);
     this.getDepartment(genderParam);
    }
  }

  pushDepartSearch(departmentParam: any) {
    if (departmentParam !== undefined) {
      this.dptSearch = departmentParam.toString();
      this.preStateDpt = this.newStateDpt;
      this.newStateDpt = departmentParam;
      this.getOnlydpt(this.genderSearch, departmentParam);
      this.calculatePriceDepartment(this.genderSearch, departmentParam);
      this.getSizesForDepartment(this.genderSearch, this.dptSearch);
    }
  }

  getDataChart() {
    this.reportSelligService.getDataChart(this.token).subscribe(
      response => {
        response.chart.map((current) =>{
          this.dataChart.push(current.sellsOfDay);
          this.dataLabel.push(current.date);
        });
        this.lineChartData =[
          { data: this.dataChart, label: 'Ventas Acumladas' },
        ];
        this.lineChartLabels = this.dataLabel;
        this.isGetChartSelling = true;
      }, error => {
        console.log(<any> error);
      }
    );
  }

  ngOnInit() {
    this.calculatePriceAllProduct();
    this.getDataChart();
    /*this.calculatePriceGender();
    this.calculatePriceDepartment();*/
    this.getAllApart();
    this.getGender();
    this.getTags();
  }

}
