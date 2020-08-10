import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import Gallery from './Gallery';

afterEach(cleanup);

const setup = () => {
    const utils = render(<Gallery />);
    const AddButton = utils.getByText(/Add/i);
    const AddInput = utils.getByLabelText('add-image-input');
    return {
       AddButton,
       AddInput,
       utils,
    }
}

test('Rendering Gallery', () => {
    const { AddInput, AddButton } = setup();
    expect(AddButton).toBeInTheDocument();
    expect(AddInput).toBeInTheDocument();
});

test('AddImageForm updates value correctly', () => {
    const { AddInput } = setup();
    fireEvent.change(AddInput, { target: { value: 'Hey' } });
    expect(AddInput.value).toBe('Hey');
});

test('AddImageForm adds image to DOM', async () => {
    const { utils, AddInput, AddButton } = setup();

    fireEvent.change(AddInput, { target: { value: 'https://robbreportedit.files.wordpress.com/2020/04/1-6.jpg?w=1000' } });
    fireEvent.click(AddButton);

    const Image = await utils.getByAltText('Custom');
    expect(Image).toBeInTheDocument();
});

test('Clicking thumbnail shows preview image', async () => {
    const { utils, AddInput, AddButton } = setup();

    fireEvent.change(AddInput, { target: { value: 'https://robbreportedit.files.wordpress.com/2020/04/1-6.jpg?w=1000' } });
    fireEvent.click(AddButton);

    const Image = await utils.getByAltText('Custom');
    expect(Image).toBeInTheDocument();

    fireEvent.click(Image);

    const NextButton = await utils.getByLabelText('next-image');
    const PreviousButton = await utils.getByLabelText('previous-image');
    const CloseButton = await utils.getByLabelText('close-preview');

    expect(NextButton).toBeInTheDocument();
    expect(PreviousButton).toBeInTheDocument();
    expect(CloseButton).toBeInTheDocument();
});

test('Clicking Preview Image Next Button loops through thumbnails', async () => {
    const { utils, AddInput, AddButton } = setup();

    // Add image
    fireEvent.change(AddInput, { target: { value: 'https://robbreportedit.files.wordpress.com/2020/04/1-6.jpg?w=1000' } });
    fireEvent.click(AddButton);

    // Add another image
    fireEvent.change(AddInput, { target: { value: 'https://cdn.motor1.com/images/mgl/Q0QyB/s3/2021-porsche-macan-ev-rendering.jpg' } });
    fireEvent.click(AddButton);

    // Verify DOM has two images
    const images = await utils.getAllByAltText('Custom');
    expect(images.length).toBe(2);

    // Click first image
    fireEvent.click(images[0]);

    // Get Preview Controls
    const NextButton = await utils.findByLabelText('next-image');
    const CloseButton = await utils.findByLabelText('close-preview');

    // Make sure Preview is in DOM
    expect(await utils.findByLabelText('preview-image-src')).toBeInTheDocument();

    // Make sure Preview is first image
    expect(await utils.findByLabelText('preview-image-src'))
        .toHaveAttribute('src','https://robbreportedit.files.wordpress.com/2020/04/1-6.jpg?w=1000');

    // Make sure Preview is second image
    fireEvent.click(NextButton);
    expect(await utils.findByLabelText('preview-image-src'))
        .toHaveAttribute('src','https://cdn.motor1.com/images/mgl/Q0QyB/s3/2021-porsche-macan-ev-rendering.jpg');

    // Make sure Preview is first image (again)
    fireEvent.click(NextButton);
    expect(await utils.findByLabelText('preview-image-src'))
        .toHaveAttribute('src','https://robbreportedit.files.wordpress.com/2020/04/1-6.jpg?w=1000');

    // Close Image Preview
    fireEvent.click(CloseButton);

    // Make sure Preview is NOT in DOM
    expect(await utils.queryByLabelText('preview-image-src')).not.toBeInTheDocument();
});
