export class Associate {
    public ID: number;
    get name(): string {
        return this.firstName + " " + this.middleName + " " + this.lastName;
    }

    public firstName: string;
    public middleName: string;
    public lastName: string;
    public gender: string;
    public dateOfJoining: Date;
    public dob: Date;
    public maritalStatus: string;
    public joiningStatusID: number;
    public gradeID: number;
    public designationID: number;
    public designation: string;
    public employmentType: string;
    public technology: string;
    public technologyID: number;
    public deptID: number;
    public department: string;
    public hrAdvisor: string;

    public qualifications: any[];
    public prevEmployerdetails: any[];
    public profReference: any[];
    public certifications: any[];
    public memberships: any[];
    public skills: any[];
    public projects: any[];
    public relationsInfo: any[];
    public emergencyContactsInfoInfo: any[];
    public recruitedBy: string;
    public mobileNo: string;
}