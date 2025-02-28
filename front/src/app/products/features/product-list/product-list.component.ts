import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, TableModule,
    InputTextModule,
    PaginatorModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public isPanierVisible = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  public readonly panier = signal<Product[]>([]);

  public filteredProducts: Product[] = [];
  public rows = 10;
  public totalRecords = 0;
  public searchText = '';

  ngOnInit() {
    this.productsService.get().subscribe((products) => {
      this.filteredProducts = products;
      this.totalRecords = products.length;
    });
  }

  public filterProducts() {
    this.filteredProducts = this.products().filter((product) =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.totalRecords = this.filteredProducts.length;
  }

  public onPageChange(event: any) {
    this.rows = event.rows;
   
  }
  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public ajouterAPanier(product: Product) {
    this.panier.update(panier => [...panier, product]);
  }

  public supprimerAPanier(productId: number) {
    this.panier.update(panier => panier.filter(product => product.id !== productId));
  }

  public getPanierCount() {
    return this.panier().length;
  }

  public viewPanier() {
    this.isPanierVisible = true;
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
