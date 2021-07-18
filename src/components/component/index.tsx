import { FC } from 'react';

interface Params {
  [attr: string]: any;
}

const Component: FC<Params> = (props) => {
  const { tag, style, className, text, onClick } = props;

  const getComponentType = () => {
    switch (tag) {
      case 'div':
        return (
          <div style={style} className={className} onClick={onClick}>
            {text}
          </div>
        );
      case 'span':
        return (
          <span style={style} className={className} onClick={onClick}>
            {text}
          </span>
        );
      case 'img':
        return (
          <img style={style} className={className} onClick={onClick}>
            {text}
          </img>
        );
      case 'p':
        return (
          <p style={style} className={className} onClick={onClick}>
            {text}
          </p>
        );
      case 'button':
        return (
          <button style={style} className={className} onClick={onClick}>
            {text}
          </button>
        );
      case 'h1':
        return (
          <h1 style={style} className={className} onClick={onClick}>
            {text}
          </h1>
        );
      case 'h1':
        return (
          <h1 style={style} className={className} onClick={onClick}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 style={style} className={className} onClick={onClick}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 style={style} className={className} onClick={onClick}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 style={style} className={className} onClick={onClick}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 style={style} className={className} onClick={onClick}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 style={style} className={className} onClick={onClick}>
            {text}
          </h6>
        );
      default:
        return (
          <span style={style} className={className} onClick={onClick}>
            {text}
          </span>
        );
    }
  };
  return <>{getComponentType()}</>;
};

export default Component;
