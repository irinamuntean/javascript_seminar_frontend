import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InlineResponse2001 } from '@app/models';
import { CustomLoginService } from '@app/services/custom/login/login.service';
import { first } from 'rxjs/operators';
import { ClassesService } from '../../../services/swagger-api/api';
import { LANGUAGE_LIST } from '../../common/backend-util/common-structures/languages';
import { COUNTRY_LIST } from '../../common/backend-util/common-structures/countries';
import { LANGUAGE_LEVEL_LIST } from '../../common/backend-util/common-structures/language-level';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@app/components/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-class-information-content',
  templateUrl: './class-information-content.component.html',
  styleUrls: ['./class-information-content.component.less'],
})
export class ClassInformationContentComponent implements OnInit {
  getClassLoading = false;
  getClassSubmitted = false;

  updateClassLoading = false;
  updateClassSubmitted = false;

  deleteClassLoading = false;
  deleteClassSubmitted = false;

  getClassStudentsLoading = false;
  getClassStudentsSubmitted = false;

  updateClassStudentsLoading = false;
  updateClassStudentsSubmitted = false;

  deleteClassStudentsLoading = false;
  deleteClassStudentsSubmitted = false;


  returnUrl: string;
  error = '';
  classList: InlineResponse2001[];
  selectedClassInformationId = null;
  selectedStudentId: string;
  selectedClass = null;
  getClassInformationForm: FormGroup;
  getClassStudentsForm: FormGroup;
  selectedClassForm: FormGroup;

  languageList = null;
  countryList = null;
  languageLevelList = null;
  selectedClassStudentList = null;
  selectedLanguageLevel = null;
  selectedLanguage = null;
  selectedClassCountry = null;

  constructor(
    private classService: ClassesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private userService: CustomLoginService,
    public dialog: MatDialog,
      ) {}

  ngOnInit() {
    this.languageList = LANGUAGE_LIST;
    this.countryList = COUNTRY_LIST;
    this.languageLevelList = LANGUAGE_LEVEL_LIST;

    this.getClassInformationForm = this.formBuilder.group({
      selectedClassInformationId: ['', Validators.required],
    });

    this.getClassStudentsForm = this.formBuilder.group({
      selectedClassIdForStudentList: ['', Validators.required],
    });

    this.selectedClassForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: [''],
      subject: ['', Validators.required],
      selectedCountry: [''],
      projectDuration: ['', Validators.required],
      meetingFrequency: ['', Validators.required],
      level: ['', Validators.required],
      languageLevel: ['', Validators.required],
    });

    this.retrieveClassListOfTeacher();
  }

  get f() {
    return this.selectedClassForm.controls;
  }

  retrieveClassListOfTeacher() {
    this.classService
      .classesGet()
      .toPromise()
      .then((response) => {
        this.classList = response;
      });
  }

  getClassInformation(): void {
    this.getClassLoading = true;
    this.getClassSubmitted = true;
    this.classService
      .classesClassIdGet(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.selectedLanguage = this.languageList.find(item=>item.value== this.selectedClass.language);
          this.selectedLanguageLevel = this.selectedClass.languageLevel;
          this.selectedClassCountry = this.countryList.find(item => item.code == this.selectedClass.country);
          this.getClassLoading = false;
          this._snackBar.open('Class information retrieved!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.getClassLoading = false;
          this.getClassSubmitted = false;
        },
      });
  }

  openUpdateConfirmationDialog() : void {
    const message = `Are you sure you want to update class?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true)
        this.updateClassInformation();
    });
  };

  updateClassInformation(): void {
    this.updateClassLoading = true;
    this.updateClassStudentsSubmitted = true;
    this.classService
      .classesClassIdPut({
        name: this.f.name.value,
        language: this.selectedLanguage.value,
        subject: this.f.subject.value,
        country: this.selectedClassCountry.code,
        projectDuration: this.f.projectDuration.value,
        meetingFrequency: this.f.meetingFrequency.value,
        level: this.f.level.value,
        languageLevel: this.selectedLanguageLevel,
      }, this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.updateClassLoading = false;
          this._snackBar.open('Class updated!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.updateClassLoading = false;
        },
      });
  }

  openDeleteConfirmationDialog() : void {
    const message = `Are you sure you want to delete class?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true)
        this.deleteClass();
    });
  }

  deleteClass(): void {
    this.deleteClassLoading = true;
    this.deleteClassStudentsSubmitted = true;
    this.classService
      .classesClassIdDelete(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClass = response;
          this.deleteClassLoading = false;
          this._snackBar.open('Class deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.retrieveClassListOfTeacher();
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.deleteClassLoading = false;
        },
      });
  }

  getStudentsOfClass(): void {
    this.getClassStudentsLoading = true;
    this.getClassStudentsSubmitted = true;
    this.classService
      .classesClassIdStudentsGet(this.selectedClassInformationId)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.getClassStudentsLoading = false;
          this._snackBar.open('Students retrieved successfully!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.getClassStudentsLoading = false;
        },
      });
  }

  removeStudentFromClass(): void {
    this.deleteClassStudentsLoading = true;
    this.deleteClassStudentsSubmitted = true;
    this.classService
      .classesClassIdStudentsStudentIdDelete(
        this.selectedClassInformationId,
        this.selectedStudentId
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.deleteClassStudentsLoading = false;
          this._snackBar.open(
            'Student removed from class successfully!',
            'Close',
            {
              duration: 3000,
            }
          );
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.deleteClassStudentsLoading = false;
        },
      });
  }

  addStudentToClass(): void {
    this.updateClassStudentsLoading = true;
    this.updateClassStudentsSubmitted = true;
    this.classService
      .classesClassIdStudentsStudentIdPut(
        this.selectedClassInformationId,
        this.selectedStudentId
      )
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.selectedClassStudentList = response;
          this.updateClassStudentsLoading = false;
          this._snackBar.open(
            'Students added to class successfully!',
            'Close',
            {
              duration: 3000,
            }
          );
        },
        error: (error) => {
          this.error = error;
          this._snackBar.open(this.error, 'Close', {
            duration: 3000,
          });
          this.updateClassStudentsLoading = false;
        },
      });
  }
}
