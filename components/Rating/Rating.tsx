import { IRatingProps } from './Rating.props';
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from 'react';
import cn from 'classnames';

import StarIcon from './star.svg';
import styles from './Rating.module.css';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      error,
      setRating,
      tabIndex,
      ...props
    }: IRatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (r == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedRatingArray = ratingArray.map(
        (ratingEl: JSX.Element, index: number) => {
          return (
            <span
              className={cn(styles.star, {
                [styles.filled]: index < currentRating,
                [styles.editable]: isEditable,
              })}
              onMouseEnter={() => changeDisplayRating(index + 1)}
              onMouseLeave={() => changeDisplayRating(rating)}
              onClick={() => onClickRating(index + 1)}
              tabIndex={computeFocus(rating, index)}
              onKeyDown={handleKey}
              ref={(r) => ratingArrayRef.current?.push(r)}
              role={isEditable ? 'slider' : ''}
              aria-invalid={error ? true : false}
              aria-valuenow={rating}
              aria-valuemax={5}
              aria-label={isEditable ? 'укажите рейтинг ' : 'рейтинг' + rating}
              aria-valuemin={1}
            >
              <StarIcon />
            </span>
          );
        }
      );
      setRatingArray(updatedRatingArray);
    };

    const changeDisplayRating = (index: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(index);
    };

    const onClickRating = (index: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(index);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }

      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, { [styles.error]: error })}
      >
        {ratingArray.map((ratingEl, index) => (
          <span key={index}>{ratingEl}</span>
        ))}
        {error && (
          <span role="alert" className={styles.erorrMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
