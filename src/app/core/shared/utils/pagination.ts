export class Pagination {

  currentPage: number = 1;
  itemsPerPage: number = 4;
  pageSize: number;

  /**
   *
   */
  constructor() {

  }


  onPageChange(pageNum: number): void {
    this.pageSize = this.pageSize * (pageNum - 1);
  }

  changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }
}
