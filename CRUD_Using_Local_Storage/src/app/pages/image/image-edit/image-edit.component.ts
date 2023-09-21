import { Component, OnInit, SecurityContext } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  resizedImageSize: string = ''; // To store the resized image size

  imageChangedEvent: any;
  croppedImage: any;

  selectedAreaWidth: any;
  selectedAreaHeight: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onFileChange(event: Event): void {
    this.imageChangedEvent = event;
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
    if (this.croppedImage) {
      const img = new Image();
      img.src = this.croppedImage as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = this.selectedAreaWidth;
        canvas.height = this.selectedAreaHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Draw the image with the new dimensions
          ctx.drawImage(img, 0, 0, this.selectedAreaWidth, this.selectedAreaHeight);

          // Convert the canvas content to a data URL
          const resizedImage = canvas.toDataURL('image/jpeg', 1); // Adjust format and quality as needed

          // Calculate the size of the resized image
          const sizeInBytes = Math.round((resizedImage.length * 3) / 4); // Estimate size
          const sizeInKB = (sizeInBytes / 1024).toFixed(2);
          this.resizedImageSize = `${sizeInKB} KB`;

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

  updateResizedImageSize(): void {
    // Calculate the size of the resized image based on current dimensions
    const estimatedSizeInBytes = Math.round(
      ((this.selectedAreaWidth * this.selectedAreaHeight * 3) / 2) // Assuming JPEG format
    );

    const sizeInKB = (estimatedSizeInBytes / 1024).toFixed(2);
    this.resizedImageSize = `${sizeInKB} KB`;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent)
  }
  imageCropped(event: ImageCroppedEvent) {
    this.selectedAreaWidth = event.width;
    this.selectedAreaHeight = event.height
    if (event.blob) {
      // Convert the Blob to a base64 data URL
      this.blobToBase64(event.blob, (base64DataUrl) => {
        this.croppedImage = base64DataUrl;
      });
    }
  }

  // Function to convert Blob to base64 data URL
  blobToBase64(blob: Blob, callback: (result: string | ArrayBuffer | null) => void) {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(blob);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  downloadCroppedImage(): void {
    if (this.croppedImage) {
      // Convert the SafeUrl to a regular string
      const imageUrl = this.sanitizer.sanitize(SecurityContext.URL, this.croppedImage) as string;

      if (imageUrl) {
        // Create an anchor element
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = 'cropped_image.png'; // You can set the filename here
        a.style.display = 'none';

        // Append the anchor element to the document body
        document.body.appendChild(a);

        // Trigger a click event to start the download
        a.click();

        // Remove the anchor element from the document body
        document.body.removeChild(a);
      }
    }
  }
}
