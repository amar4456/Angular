import { Component } from '@angular/core';
import { MyApiService } from '../../../core/services/my-api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-convert-to-excel',
  templateUrl: './convert-to-excel.component.html',
  styleUrls: ['./convert-to-excel.component.scss']
})
export class ConvertToExcelComponent {
  selectedFile: File | null = null;
  textResult: any | null = null;

  constructor(private myApiService: MyApiService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  convertImage(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      this.sendImageToServer(imageData);
    };
    reader.readAsDataURL(this.selectedFile);
  }

  sendImageToServer(imageData: string): void {
    this.myApiService.convertImageToText('user/convert-to-excel', imageData)
      .subscribe(
        response => {
          this.textResult = response.text;
          console.log('Text result:', this.textResult);

          // Trigger download
          this.downloadExcelFile(this.textResult);
        },
        error => {
          console.error('Error converting image:', error);
        }
      );
  }

  downloadExcelFile(text: string): void {
    const csvContent = 'data:text/csv;charset=utf-8,' + text;
    const encodedUri = encodeURI(csvContent);

    // Create anchor element
    const anchor = document.createElement('a');
    anchor.setAttribute('href', encodedUri);
    anchor.setAttribute('download', 'text_result.csv');

    // Trigger download
    document.body.appendChild(anchor);
    anchor.click();

    // Cleanup
    document.body.removeChild(anchor);
  }

  // downloadExcelFile(text: string): void {
  //   // Create worksheet
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{ Text: text }]);

  //   // Create workbook and add the worksheet
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'TextData');

  //   // Convert workbook to binary string
  //   const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  //   // Create Blob from binary string
  //   const blob = new Blob([wbout], { type: 'application/octet-stream' });

  //   // Create download link
  //   const url = window.URL.createObjectURL(blob);

  //   // Create anchor element and trigger download
  //   const anchor = document.createElement('a');
  //   anchor.href = url;
  //   anchor.download = 'text_result.xlsx';
  //   document.body.appendChild(anchor);
  //   anchor.click();

  //   // Cleanup
  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(anchor);
  // }
}
