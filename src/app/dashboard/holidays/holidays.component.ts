import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/services/api-service.service';


@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  displayedColumns: string[] = ['id', 'holidayDate', 'day', 'holidayname', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiServiceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllHolidays();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllHolidays();
      }
    })
  }

  getAllHolidays() {
    this.http.get('http://localhost:3000/companyHoliday').subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res['data']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        alert("Error while fetching the records!!")
      }
    })
  }

  editHoliday(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllHolidays();
      }
    })
  }

  deleteHoliday(id: number) {
    this.http.delete(`http://localhost:3000/companyHoliday/${id}`).subscribe({
      next: (res) => {
        alert("Holiday Deleted Successfully");
        this.getAllHolidays();
      },
      error: () => {
        alert("Error while deleting the holiday!!")
      }
    })
    // console.log(id);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
