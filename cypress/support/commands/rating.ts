export const setRate = (startsCount = 5, feedback = 'feedback') => {
  cy.getByTestId(`StarRating.${startsCount}`).click();
  cy.getByTestId('RatingCard.Input').type(feedback);
  cy.getByTestId('RatingCard.Send').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(startsCount: number, feedback: string): Chainable<void>;
    }
  }
}
