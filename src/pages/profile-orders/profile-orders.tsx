import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchMyOrders } from '../../services/actions/order-actions';
import { getUserName } from '../../services/slices/user-slice';
import { Preloader } from '@ui';
import { listMyOrders } from '../../services/slices/orderList-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserName);
  const orders: TOrder[] = useSelector(listMyOrders);
  /** TODO: взять переменную из стора */
  useEffect(() => {
    if (user) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, user]);

  // Показываем прелоадер при загрузке
  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders || []} />;
};
