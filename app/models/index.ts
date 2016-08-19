import { Associate } from './associate.model';
import { EmployeeType } from './employeetype.model';
import { Grade } from './grade.model';
import { IUser, User } from './user.model';

interface ResourceUrl {
    getById?: string;
    getByCode?: string;
    list?: string;
    update?: string;
    delete?: string;
    create?: string;
}

interface Department {

}

interface Technology {

}

interface Designation { }
interface HRAdvisor extends IUser { }

export { IUser }
export { Associate, ResourceUrl, EmployeeType, Grade, User, Department, Technology, Designation, HRAdvisor  }