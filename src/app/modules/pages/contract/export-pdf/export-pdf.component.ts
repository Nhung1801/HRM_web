import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/global/toast.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { StaffPositionService } from 'src/app/core/services/staff-position.service';
import { KpiService } from 'src/app/core/services/kpi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HasPermissionHelper } from 'src/app/core/helpers/has-permission.helper';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrl: './export-pdf.component.scss'
})
export class ExportPDFComponent implements OnInit {
  tableData: any;
  summary: any;
  detailForm!: FormGroup;
  createKpiVisible: boolean = false;
  timeOptions = [
    { name: '15 phút', value: 15 },
    { name: '30 phút', value: 30 },
    { name: '60 phút', value: 60 },
    { name: 'Nửa ngày', value: 12 * 60 },
    { name: '1 ngày', value: 24 * 60 },
    { name: '3 ngày', value: 3 * 24 * 60 }
  ];

  options: any[] = [
    { id: 0, name: 'Chưa ký' },
    { id: 1, name: 'Đã ký' }
  ];
  

  constructor(
    private employeesService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private organizationService: OrganizationService,
    private kpiService: KpiService,
    private staffPositionService: StaffPositionService,
    private formBuilder: FormBuilder,
    public permisionHelper: HasPermissionHelper
  ) {
    // formBuilder;
  }

  ngOnInit() {
    this.InitGetAll();

    this.detailForm = this.formBuilder.group({
      nameKpiTable: [null, Validators.required],
      signStatus: [null, Validators.required],
      timeSelected: [[], Validators.required],
      toggleAll: [false],
      remindBeforeStart: [false],
      remindBeforeExpire: [false],
      all: [false],
      creator: [false],
      executor: [false],
      related: [false],
      pendingApproval: [false],
      approved: [false]
    });

    this.detailForm.get('toggleAll')?.valueChanges.subscribe((value) => {
      this.toggleAllCheckboxes(value);
    });
  }

  toggleAllCheckboxes(state?: boolean): void {
    const toggleState = state ?? this.detailForm.get('toggleAll')?.value;
    this.detailForm.patchValue({
      remindBeforeStart: toggleState,
      remindBeforeExpire: toggleState,
      all: toggleState,
      creator: toggleState,
      executor: toggleState,
      related: toggleState,
      pendingApproval: toggleState,
      approved: toggleState
    });
  }
  generatePDF() {
    const element = document.getElementById('contract-content'); // ID của div chứa nội dung hợp đồng
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Tạo PDF khổ A4
        const imgWidth = 190; // Chiều rộng hình ảnh trong PDF
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight); // Thêm hình ảnh vào PDF
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // Vị trí cho trang tiếp theo
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('contract.pdf'); // Tải xuống file PDF
      });
    } else {
      console.error('Element not found');
    }
  }

  InitGetAll() {
    this.tableData = [
      {
        stt: 1,
        tenHangMuc: 'Xe nâng người làm việc trên cao, nâng và di chuyển bằng điện',
        cclv: '8m',
        sl: 1,
        tuNgay: '3/12',
        denNgay: '16/12',
        soNgay: 14,
        donGiaThang: '5,000,000',
        thanhTien: '2,333,333'
      },
      {
        stt: 2,
        tenHangMuc: 'Cước vận chuyển Yên Mỹ 2 về INDICO',
        cclv: '',
        sl: 1,
        tuNgay: '',
        denNgay: '',
        soNgay: '',
        donGiaThang: '',
        thanhTien: '700,000'
      }
    ];

    this.summary = {
      thanhTien: '3,033,333',
      vat: '242,666',
      tongCong: '3,275,999'
    };
  }

  exportToExcel() {
    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bảng Theo Dõi Bán Hàng');

    // Merge các ô giống trong hình
    // Merge và định dạng header chính xác
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = 'Công ty...';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'left' };

    worksheet.mergeCells('E1:M1');
    worksheet.getCell('E1').value = 'BẢNG THEO DÕI BÁN HÀNG';
    worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'left' };

    worksheet.mergeCells('E2:M2');
    worksheet.getCell('E2').value = 'THÁNG';
    worksheet.getCell('E2').alignment = { vertical: 'middle', horizontal: 'left' };

    worksheet.mergeCells('A3:D3');
    worksheet.getCell('A3').value = 'TÊN KHÁCH HÀNG';
    worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('E3:K3');
    worksheet.getCell('E3').value = 'MÃ KHÁCH HÀNG';
    worksheet.getCell('E3').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('L4');
    worksheet.getCell('L4').value = 'SDĐK';
    worksheet.getCell('L4').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('M4:P4');
    worksheet.getCell('M4').value = '600.000 Số dư cuối tháng trước';
    worksheet.getCell('M4').alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getCell('M4').font = { bold: true };


    // Thêm dữ liệu tiêu đề
    worksheet.addRow([
      'NGÀY THÁNG', 'SỐ LSX', 'Tên mẫu', 'ĐVT', 'Tên vải',
      'Khổ vải', 'SỐ LƯỢNG', 'ĐƠN GIÁ', 'THÀNH TIỀN', 'HÀNG LỖI - Bù trừ công nợ',
      'TỔNG TIỀN', 'SỐ TIỀN ĐÃ THANH TOÁN', 'SỐ DƯ'
    ]);

    // Thêm dữ liệu bảng
    worksheet.addRow([
      '01/12/2024', '1.253', 'mẫu 1-AT', 'Mét', '', '', 500, 15000, 7500000, 30000, 7470000, 5000000, 8070000
    ]);
    worksheet.addRow([
      '02/12/2024', '', '', '', '', '', '', '', '', '', '', '', 3070000
    ]);

    // Dòng tổng cộng
    worksheet.addRow([
      'Cộng', '1.253', '', '', '', '', 500, 15000, 7500000, 30000, 7470000, 5000000, 3070000
    ]);

    // Tính số dòng hiện tại
    const lastRowNumber = worksheet.lastRow?.number || 0;

    // Thêm dòng ghi chú dưới bảng
    const footerRow = lastRowNumber + 1; // Xác định dòng để thêm ghi chú
    worksheet.mergeCells(`L${footerRow}:L${footerRow}`);
    worksheet.getCell(`L${footerRow}`).value = 'SDCK';
    worksheet.getCell(`L${footerRow}`).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell(`L${footerRow}`).font = { bold: true };

    worksheet.mergeCells(`M${footerRow}:P${footerRow}`);
    worksheet.getCell(`M${footerRow}`).value = '3.070.000 = SDDK + Tổng tiền hàng - Tổng thanh toán';
    worksheet.getCell(`M${footerRow}`).alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getCell(`M${footerRow}`).font = { bold: true };

    // Định dạng cột và căn chỉnh
    worksheet.columns = [
      { width: 15 }, // NGÀY THÁNG
      { width: 10 }, // SỐ LSX
      { width: 15 }, // Tên mẫu
      { width: 8 },  // ĐVT
      { width: 15 }, // Tên vải
      { width: 10 }, // Khổ vải
      { width: 10 }, // SỐ LƯỢNG
      { width: 10 }, // ĐƠN GIÁ
      { width: 15 }, // THÀNH TIỀN
      { width: 20 }, // HÀNG LỖI
      { width: 15 }, // TỔNG TIỀN
      { width: 20 }, // SỐ TIỀN ĐÃ THANH TOÁN
      { width: 15 }  // SỐ DƯ
    ];

    // Thêm viền bảng
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 4) { // Chỉ thêm viền từ dòng thứ 4 trở đi
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
        row.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      }

      if (rowNumber === footerRow) {
        row.eachCell((cell) => {
          cell.border = undefined;
        });
      }

      // Định dạng font
      if (rowNumber === 5 || rowNumber === 8) {
        row.font = { bold: true };
      } else {
        row.font = { size: 12 };
      }
    });

    // Lưu file
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'BangTheoDoiBanHang.xlsx');
    });
  }

  openCreateKpiVisible() {
    this.createKpiVisible = true;
  }

  closeCreateKpiVisible() {
    this.createKpiVisible = false; // Đóng dialog
    this.detailForm.reset(); // Reset form về trạng thái ban đầu
  }



}
