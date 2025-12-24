import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'Testing article',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2015/03/kotlinlang.png',
  views: 1000,
  createdAt: '26.02.2022',
  userId: '1',
  type: [
    'IT',
  ],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: { authorization: 'Bearer token' },
    body: article ?? defaultArticle,
  }).then((response) => response.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { authorization: 'Bearer token' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;

      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
