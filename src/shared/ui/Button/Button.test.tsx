import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import { Button, ButtonTheme } from '../Button/Button';

import '@testing-library/jest-dom';

describe('Button', () => {
    test('render Button', () => {
        render(<Button>Test</Button>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('render Button with theme', () => {
        render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);
        expect(screen.getByText('Test')).toHaveClass('clear');
        // screen.debug();
    });
});
