import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Sort, { list } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/pizzaSlices';

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, pageCount } = useSelector((state) => state.filter);
  const items = useSelector((state) => state.pizza.items);
  const sortProperty = useSelector((state) => state.filter.sort.sortProperty);
  const sortType = useSelector((state) => state.filter.sort);
  // const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [order, setOrder] = React.useState('asc');

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };
  const getPizzas = async () => {
    setLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      dispatch(fetchPizzas({ category, search, pageCount, sortType, order }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
  }, [categoryId, sortType, order, searchValue, pageCount]);

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

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(8)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort onClickOrder={(orderType) => setOrder(orderType)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
