import { formatDate } from '@angular/common';
export class Teachers {
  id: number;
  img: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  dateOfBirth: string;
  joiningDate: string;
  gender: string;
  mobile: string;
  department: string;
  degree: string;
  address:{
    street: string;
    city:string;
    state:string;
    postalCode:string;
  };
  
  courses:[];
  salary: number;
  about: string;
  constructor(teachers) {
    {
      this.id = teachers.id || this.getRandomID();
      this.img = teachers.avatar || 'assets/images/user/user1.jpg';
      this.name = teachers.name || '';
      this.email = teachers.email || '';
      this.joiningDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.gender = teachers.gender || '';
      this.mobile = teachers.mobile || '';
      this.department = teachers.department || '';
      this.degree = teachers.degree || '';
      this.address = teachers.address || {};
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
