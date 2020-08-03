// @flow
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Modal from '../index';

const title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

const bodyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis commodo erat quis ipsum sodales condimentum. Vestibulum nec posuere lorem. Nulla condimentum, dui et sagittis hendrerit, enim sapien luctus orci, non vehicula nibh massa vel risus. Nunc vitae aliquam lacus. Donec dolor velit, blandit eu erat luctus, aliquam congue augue. Curabitur interdum leo id orci porttitor, eget dictum nibh gravida. Praesent facilisis, justo non convallis consectetur, tellus est egestas erat, quis commodo risus tellus consequat est. Curabitur quis massa non est pharetra mollis. Proin finibus ipsum massa, et semper ipsum ultricies vel. Mauris dignissim auctor egestas. Aenean elit ante, egestas eu ligula a, tincidunt suscipit diam. Nulla ultrices tempus turpis ac cursus. Suspendisse congue sem nec ex vehicula, in vestibulum leo ultricies. Morbi ac faucibus lorem. Donec vitae tellus id quam aliquet iaculis. Nam aliquet quis ante faucibus convallis.';

const bodyHTML = (
  <div>
    <button type="button">Here is a button</button>
    <p>{bodyText}</p>
  </div>
);

const openListener = () => {
  window.alert("Hey look it's listening");
};

const handleKeyPress = (e: any) => {
  window.alert('Key pressed', e);
};

const handleMouseOver = () => {
  window.alert('Mouse did enter');
};

const handleMouseLeave = () => {
  window.alert('Mouse did enter');
};

const handleOnClick = () => {
  window.alert('Mouse clicked');
};

describe('Modal', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert');
  });

  describe('has open prop as false', () => {
    describe('has text values for element and body', () => {
      const component = <Modal element="Hello" body={bodyText} title={title} />;
      it('toggles correctly', () => {
        const { container, queryByLabelText, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('has text values for element and body with openListener', () => {
      it('toggles correctly', () => {
        const component = (
          <Modal
            element="Hello"
            body={bodyText}
            title={title}
            openListener={openListener}
          />
        );
        const { container, queryByRole, queryByLabelText } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('has HTML values for element and body', () => {
      it('toggles correctly', () => {
        const component = (
          <Modal
            element={<button type="button">Hello</button>}
            body={bodyHTML}
            title={title}
          />
        );
        const {
          container,
          queryByRole,
          queryAllByRole,
          queryByLabelText,
        } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryAllByRole('button')[0];

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('has HTML values for element and body with openListener', () => {
      it('toggles correctly', () => {
        const component = (
          <Modal
            element={<button type="button">Hello</button>}
            body={bodyHTML}
            title={title}
            openListener={openListener}
          />
        );
        const {
          container,
          queryByRole,
          queryAllByRole,
          queryByLabelText,
        } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryAllByRole('button')[0];

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('closes when escape key is pressed', () => {
      const component = (
        <Modal
          element="Hello"
          body={bodyText}
          title={title}
          openListener={openListener}
          onKeyPress={handleKeyPress}
        />
      );
      it('toggles correctly', () => {
        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.keyDown(getModalBackdrop(), {
          key: 'Escape',
        });

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('closes when back drop is clicked', () => {
      const component = (
        <Modal
          element="Hello"
          body={bodyText}
          title={title}
          openListener={openListener}
          onMouseLeave={handleMouseLeave}
          onClick={handleOnClick}
        />
      );
      it('toggles correctly', () => {
        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.mouseLeave(getDialog());
        fireEvent.click(getModalBackdrop());

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('does not close when back drop is clicked', () => {
      const component = (
        <Modal
          element="Hello"
          body={bodyText}
          title={title}
          role="button"
          openListener={openListener}
          onMouseOver={handleMouseOver}
          onFocus={handleMouseOver}
          onClick={handleOnClick}
        />
      );
      it('toggles correctly', () => {
        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.mouseOver(getDialog());
        fireEvent.click(getModalBackdrop());

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });
  });

  describe('has open prop as true', () => {
    describe('has text values for element and body', () => {
      const component = (
        <Modal element="Hello" body={bodyText} title={title} open />
      );
      it('toggles correctly', () => {
        const { container, queryByRole, queryByLabelText } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });

    describe('has text values for element and body with openListener', () => {
      it('toggles correctly', () => {
        const component = (
          <Modal
            element="Hello"
            body={bodyText}
            title={title}
            openListener={openListener}
            open
          />
        );
        const { container, queryByRole, queryByLabelText } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryByRole('button');

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });

    describe('has HTML values for element and body', () => {
      it('toggles correctly', () => {
        const component = (
          <Modal
            element={<button type="button">Hello</button>}
            body={bodyHTML}
            title={title}
            open
          />
        );
        const {
          container,
          queryByRole,
          queryAllByRole,
          queryByLabelText,
        } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryAllByRole('button')[0];

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });

    describe('has HTML values for element and body with openListener', () => {
      it('toggles correctly', () => {
        const component = (
          <Modal
            element={<button type="button">Hello</button>}
            body={bodyHTML}
            title={title}
            openListener={openListener}
            open
          />
        );
        const {
          container,
          queryByRole,
          queryAllByRole,
          queryByLabelText,
        } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getModalElement = () => queryAllByRole('button')[0];

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.click(queryByLabelText('close'));

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();

        fireEvent.click(getModalElement());

        expect(window.alert).toHaveBeenCalled();
        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });

    describe('uses an Avatar component for an element and HTML values for the body', () => {
      it('renders correctly', () => {
        const component = (
          <Modal
            element={{
              component: 'Avatar',
              props: { src: 'https://via.placeholder.com/75x75' },
            }}
            body={bodyHTML}
            title={title}
          />
        );

        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');
        const getAvatar = () => queryByRole('img');

        expect(getAvatar()).toBeInTheDocument();

        fireEvent.click(getAvatar());

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });

    describe('closes when escape key is pressed', () => {
      const component = (
        <Modal
          element="Hello"
          body={bodyText}
          title={title}
          openListener={openListener}
          onKeyPress={handleKeyPress}
          open
        />
      );
      it('toggles correctly', () => {
        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.keyDown(getModalBackdrop(), { key: 'Escape' });

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('closes when back drop is clicked', () => {
      const component = (
        <Modal
          element="Hello"
          body={bodyText}
          title={title}
          role="button"
          openListener={openListener}
          onMouseLeave={handleMouseLeave}
          onBlur={handleMouseLeave}
          onClick={handleOnClick}
          open
        />
      );
      it('toggles correctly', () => {
        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.mouseLeave(getDialog());
        fireEvent.click(getModalBackdrop());

        expect(getModalBackdrop()).not.toBeInTheDocument();
        expect(getDialog()).not.toBeInTheDocument();
      });
    });

    describe('does not close when back drop is not clicked', () => {
      const component = (
        <Modal
          element="Hello"
          role="button"
          body={bodyText}
          title={title}
          openListener={openListener}
          onMouseOver={handleMouseLeave}
          onFocus={handleMouseLeave}
          onClick={handleOnClick}
          open
        />
      );
      it('toggles correctly', () => {
        const { container, queryByRole } = render(component);
        const getModalBackdrop = () => container.querySelector('.modalBackdrop');
        const getDialog = () => queryByRole('dialog');

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();

        fireEvent.mouseOver(getDialog());
        fireEvent.click(getModalBackdrop());

        expect(getModalBackdrop()).toBeInTheDocument();
        expect(getDialog()).toBeInTheDocument();
      });
    });
  });
});
