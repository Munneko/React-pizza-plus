import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import Sort, { list } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import {
  setCategoryId,
  setPageCount,
  setFilters,
  selectSort,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlices';
import Error from '../components/Error/';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, pageCount, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  //@ts-ignore
  const sortProperty = useSelector((state) => state.filter.sort.sortProperty);
  const sortType = useSelector(selectSort);
  const [order, setOrder] = React.useState('asc');
  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number:number) => {
    dispatch(setPageCount(number));
  };
  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
// @ts-ignore
    dispatch(fetchPizzas({ category, search, pageCount, sortType, order }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, order, pageCount, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        pageCount,
        sortProperty,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, order, pageCount, sortProperty, navigate]);

  const pizzas = items.map((obj:any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(8)].map((_, index) => <Skeleton key={index} />);
  return (
    
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort onClickOrder={(orderType: string) => setOrder(orderType)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          
          <Error />
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination  onChangePage={onChangePage} pageCount={3}  />
    </div>
  );
};

export default Home;
