import { IPProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({
  children,
  fontSize = 'm',
  className,
  ...props
}: IPProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: fontSize == 's',
        [styles.m]: fontSize == 'm',
        [styles.l]: fontSize == 'l',
      })}
      {...props}
    >
      {children}
    </p>
  );
};
