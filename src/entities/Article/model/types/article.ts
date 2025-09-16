import { User } from '@/entities/User';
import { ArticleBlockType, ArticleType } from '../consts/consts';

export type ArticleBlockBase = {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: Array<string>;
  title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleTextBlock | ArticleImageBlock;

export interface Article {
  id: string;
  title: string;
  user: User,
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: Array<ArticleType>;
  blocks: Array<ArticleBlock>;
}
