export interface PostResponseOwnerDto {
  id: string;
  title: string;
  previewDescription: string;
  description: string;
  enrollments: number;
  maxEnrolls: number;
  isPersonal: boolean;
  place: string;
  enrolledStudents: UserPostResponseDto[];
}

export interface UserPostResponseDto {
  id:string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}
