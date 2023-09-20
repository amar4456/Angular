import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {

  selectedImage: any | ArrayBuffer | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
        console.log(this.selectedImage); // Add this line to check the value
      };

      reader.readAsDataURL(file);
    }
  }

  downloadImage(): void {
    if (this.selectedImage) {
      const a = document.createElement('a');
      a.href = this.selectedImage as string;
      a.download = 'selected_image.png'; // You can set the filename here
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

}
