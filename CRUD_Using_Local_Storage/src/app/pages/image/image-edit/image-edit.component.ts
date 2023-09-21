import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {

  selectedImage: any | ArrayBuffer | null = null;
  test: any
  imageWidth: number = 300; // Default width in pixels
  imageHeight: number = 200; // Default height in pixels

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

  resizeAndDownloadImage(): void {
    if (this.selectedImage) {
      const img = new Image();
      img.src = this.selectedImage as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = this.imageWidth;
        canvas.height = this.imageHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Draw the image with the new dimensions
          ctx.drawImage(img, 0, 0, this.imageWidth, this.imageHeight);

          // Convert the canvas content to a data URL
          const resizedImage = canvas.toDataURL('image/jpeg', 1); // Adjust format and quality as needed

          // Create a download link for the resized image
          const a = document.createElement('a');
          a.href = resizedImage;
          a.download = 'resized_image.png'; // Set the filename here
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      };
    }
  }

}
