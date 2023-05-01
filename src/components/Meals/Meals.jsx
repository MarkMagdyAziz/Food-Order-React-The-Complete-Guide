import { Fragment } from 'react';

import MealsSummary from './Summary/Summary';
import AvailableMeals from './Avilable/Avilable';

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
