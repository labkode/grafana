import { PureComponent, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';

export interface Props {
  onClick: () => void;
  onOutsideClick?: (event: SyntheticEvent) => boolean;
}

interface State {
  hasEventListener: boolean;
}

export class ClickOutsideWrapper extends PureComponent<Props, State> {
  state = {
    hasEventListener: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.onOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onOutsideClick, false);
  }

  onOutsideClick = (event: any) => {
    const { onOutsideClick } = this.props;
    const domNode = ReactDOM.findDOMNode(this) as Element;

    if (!domNode || !domNode.contains(event.target) || (onOutsideClick && onOutsideClick(event))) {
      this.props.onClick();
    }
  };

  render() {
    return this.props.children;
  }
}
