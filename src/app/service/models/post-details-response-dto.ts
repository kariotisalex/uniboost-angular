export interface UserPostResponseDto {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface PostDetailsResponseDto {
  id: string;
  title: string;
  previewDescription: string;
  description: string;
  maxEnrolls: number;
  isPersonal: boolean;
  place: string;
  userOwner: UserPostResponseDto | null;
  enrollments: number;
  owner: boolean;
  enrolled: boolean;
}
