import {Component, EventEmitter, OnInit} from '@angular/core';
import {ApiService} from "../../api/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {showMessageEmitter} from "../../app.component";

@Component({
    selector: 'app-upload-spot',
    templateUrl: './upload-spot.component.html',
    styleUrls: ['./upload-spot.component.scss']
})
export class UploadSpotComponent {
    description = '';
    selectedSpotTypes = [];
    pickedImages: File[] = [];
    pickedImageUrls: string[] = [];
    selectedImageIndex = 0

    constructor(private apiService: ApiService, private matDialogRef: MatDialogRef<UploadSpotComponent>) {
    }

    onFileSelected(event: any) {
        const selectedFiles: File[] = []
        if ((event.currentTarget.files.length + this.pickedImageUrls.length) > 10) {
            showMessageEmitter.emit({
                "message": "You can only upload 10 Images",
                "error": true
            })
            for (let i = 0; i < 10 - this.pickedImageUrls.length; i++) {
                this.pickedImages.push(event.currentTarget.files[i]);
                selectedFiles.push(event.currentTarget.files[i])
            }
        } else {
            this.pickedImages.push(...event.currentTarget.files);
            selectedFiles.push(...event.currentTarget.files)
        }
        selectedFiles.forEach(element => {
            const reader = new FileReader();
            reader.readAsDataURL(element);
            reader.onload = () => {
                this.pickedImageUrls.push(reader.result as string);
            };
        });
    }

    showNextImage() {
        if (this.pickedImageUrls.length === 10) {
            if (this.selectedImageIndex < this.pickedImageUrls.length - 1) {
                this.selectedImageIndex++;
            } else {
                this.selectedImageIndex = 0
            }
        } else {
            if (this.selectedImageIndex < this.pickedImageUrls.length) {
                this.selectedImageIndex++;
            } else {
                this.selectedImageIndex = 0
            }
        }
    }

    showPreviousImage() {
        if (this.selectedImageIndex > 0) {
            this.selectedImageIndex--
        } else {
            if (this.pickedImageUrls.length === 10) {
                this.selectedImageIndex = this.pickedImageUrls.length - 1
            } else {
                this.selectedImageIndex = this.pickedImageUrls.length
            }
        }
    }

    isUploading = false;

    uploadSpot() {
        if (!this.isUploading) {
            this.isUploading = true;
            this.apiService.uploadSpot(this.pickedImages, this.selectedSpotTypes, this.description).then(spot => {
                this.isUploading = false;
                isUploadFinishedEventEmitter.emit(spot);
                this.matDialogRef.close()
            });
        }
    }

    deleteCurrentImage() {
        this.pickedImages.splice(this.selectedImageIndex, 1);
        this.pickedImageUrls.splice(this.selectedImageIndex, 1);
        if (this.selectedImageIndex > this.pickedImages.length - 1) {
            if (this.selectedImageIndex > 0) {
                this.selectedImageIndex = this.pickedImages.length - 1;
            }
        }
    }
}

export const isUploadFinishedEventEmitter = new EventEmitter<any>();
