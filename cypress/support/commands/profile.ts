export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('ProfilePageCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
    cy.getByTestId('ProfilePageCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { authorization: 'Bearer token' },
        body: {
            id: '4',
            first: 'test sypress',
            lastname: 'user',
            age: 22,
            currency: 'RUB',
            country: 'Russia',
            city: 'Moscow-2',
            username: 'test sypress',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;

            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
