export interface PagedApiResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  content: T[];
}

export interface Success {
  success: boolean;
}

export interface User {
  id: number;
  nickname: string;
  authority: "관리자" | "졸업생" | "교사" | "학생회" | "신문부" | "방송반" | "재학생";
  email: string;
  grade: number | null;
  class: number | null;
  studentId: number | null;
  phone: number;
  name: string;
  isApproved: boolean;
}

export interface Popup {
  key: string;
}

export interface PopupDetails {
  id: number;
  photoKey: string;
}

export interface Author {
  id: number;
  nickname: number;
  authority: "관리자" | "졸업생" | "교사" | "학생회" | "신문부" | "방송반" | "재학생";
  grade: null | number;
  class: null | number;
}

export interface Article {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  board: { id: number; title: string };
  likeCount: number;
}

export interface ArticleDetails extends Article {
  isLiked: boolean;
  content: string;
  fileKeys: string[];
}

export interface Board {
  id: number;
  title: string;
  isApproved: boolean;
  introduction: null | string;
}

export interface BoardDetails extends Board {
  applicant: Author;
}

export interface Talking {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}

export interface File {
  id: number;
  key: string;
  type: string;
  name: string;
  createdAt: Date;
  articleId: number | undefined;
  popupId: number | undefined;
}

export interface Comment {
  id: number;
  content: string;
  articleId: number;
  createdAt: Date;
  isDeleted: boolean;
  author: Author;
}
