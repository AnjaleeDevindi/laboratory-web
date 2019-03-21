import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-addhistory',
  templateUrl: './addhistory.component.html',
  styleUrls: ['./addhistory.component.css']
})
export class AddhistoryComponent implements OnInit {

  constructor(private itemaddservice:ItemAdditionService) { }

  listData:MatTableDataSource<any>;
  vouchersarray:any[]=[];
  datasourcelist:any[]=[];
  searchKey:string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns:string[]=['VoucherID','Date','From','Category','Quantity'];

  ngOnInit() {
    this.itemaddservice.getaddvouchers().subscribe(item=>{
        console.log(item.length);
      const newObj: any = item;
      // console.log(newObj)
      for(let i =0;i<newObj.length;i++){
        for(let j=0;j<newObj[i].items.length;j++){
          let array={VoucherId:newObj[i].Voucher_Id,
            Recieved_from:newObj[i].Recieved_from,
            Date_recieved:newObj[i].Date_Recieved,
            Item_category:newObj[i].items[j].category_name,
            Quantity:newObj[i].items[j].Quantity
          }
          this.datasourcelist.push(array)
         
        }
        console.log(this.datasourcelist);
        this.listData=new MatTableDataSource(this.datasourcelist);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
        // let obj={category_name: newObj.items[item].category_name,Quantity: newObj.items[item].Quantity}
        // this.cartitemArray.push(obj);
       }
    })
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter =this.searchKey.trim().toLowerCase();
  }

}