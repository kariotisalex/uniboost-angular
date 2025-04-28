export interface UserPostResponseDto {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone:string;
}

export interface PostResponseDto {
  id: string;
  title: string;
  previewDescription: string;
  maxEnrolls: number;
  isPersonal: boolean;
  place: string;
  userOwner: UserPostResponseDto;
  enrollments: number;
}

export interface PostResponseContainerDto {
  content: PostResponseDto[];
  total: number;
}
