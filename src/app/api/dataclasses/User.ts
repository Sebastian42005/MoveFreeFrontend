export interface User {
  id: number;
  username: string;
  description: string;
  spotsAmount: number;
  averageRating: number;
  isFollowed: boolean;
  follower: number;
  follows: number;
}

