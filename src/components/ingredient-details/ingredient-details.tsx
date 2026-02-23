import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { clearIngredient } from '../../services/slices/ingridients-slice';
import { useParams } from 'react-router-dom';
import { fetchIngredientById } from '../../services/actions/ingredients-actions';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredientData = useSelector((state) => state.ingredients.item);

  useEffect(() => {
    if (id) {
      dispatch(fetchIngredientById(id));
    }
    return () => {
      if (ingredientData) {
        dispatch(clearIngredient());
      }
    };
  }, [dispatch, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
