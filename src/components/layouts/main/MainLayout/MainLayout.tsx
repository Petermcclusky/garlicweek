import React, {useEffect, useState} from 'react';
import {Header} from '../../../header/Header';
import MainContent from '../MainContent/MainContent';
import {MainHeader} from '../MainHeader/MainHeader';
import * as S from './MainLayout.styles';
import * as L from '@app/pages/GarlicWeekPages/ListViewPage/ListView.styles';
import {Outlet, useLocation} from 'react-router-dom';
import {References} from '@app/components/common/References/References';

import {ListViewHeader} from '@app/pages/GarlicWeekPages/ListViewPage/ListViewHeader/ListViewHeader';
import {ListViewFilter} from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFilters/ListViewFilter';
import {useResponsive} from '@app/hooks/useResponsive';
import {GarlicEvents, getEvents, GetSortFunction, SortBy} from '@app/api/events.api';
import {BaseRow} from '@app/components/common/BaseRow/BaseRow';
import {BaseCol} from '@app/components/common/BaseCol/BaseCol';
import {changeEvents, setCityFilter} from '@app/store/slices/filterSlice';
import {useDispatch} from 'react-redux';

export interface ListViewFilterState {
  category: string[];
  city: string[];
  sort: SortBy,
}

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const {  mobileOnly } = useResponsive();

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  const [activity, setActivity] = useState<GarlicEvents[]>([]);
  const [firstFilteredActivity, setFirstFilteredActivity] = useState<GarlicEvents[]>([]);
  const [secondFilteredActivity, setSecondFilteredActivity] = useState<GarlicEvents[]>([]);
  const [thirdFilteredActivity, setThirdFilteredActivity] = useState<GarlicEvents[]>([]);

  const [filters, setFilters] = useState<ListViewFilterState>({
    category: [],
    city: [],
    sort: SortBy.ALPHABETIC,
  });

  useEffect(() => {
    getEvents().then((res) => {
      setActivity(res);
      setFirstFilteredActivity(res);
      setSecondFilteredActivity(res);
      setThirdFilteredActivity(res);
    });
  }, []);

  const next = () => {
    getEvents().then((newActivity) => setActivity(activity.concat(newActivity)));
  };

  dispatch(setCityFilter([...new Set(activity.map((obj) => obj.city))]));

  useEffect(() => {
    if (filters.category.length > 0) {
      setFirstFilteredActivity(
        activity.filter((item) => filters.category.some((filter) => item.category.split(', ').includes(filter))),
      );
    } else setFirstFilteredActivity(activity);
  }, [filters.category, activity]);

  useEffect(() => {
    if (filters.city.length > 0) {
      setSecondFilteredActivity(
        firstFilteredActivity.filter((item) => filters.city.some((filter) => filter === item.city)),
      );
    } else setSecondFilteredActivity(firstFilteredActivity);
  }, [filters.city, firstFilteredActivity]);

  useEffect(() => {
    setThirdFilteredActivity(
        secondFilteredActivity.slice().sort(GetSortFunction(filters.sort)),
    );
  }, [filters.sort, secondFilteredActivity]);

  dispatch(changeEvents(thirdFilteredActivity));
  const { isTablet } = useResponsive();

  return (
    <S.LayoutMaster>
      {/* <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} /> */}
      <S.LayoutMain>
        <MainHeader isTwoColumnsLayout={false}>
          <Header toggleSider={toggleSider} isSiderOpened={!siderCollapsed} isTwoColumnsLayout={false} />
        </MainHeader>
        <MainContent id="main-content" $isTwoColumnsLayout={false}>
          <div>{/* <Outlet /> */}</div>
          <BaseRow gutter={[30, 0]}>
            <BaseCol span={24}>
              <ListViewHeader filters={filters} setFilters={setFilters} />
            </BaseCol>

            <BaseCol xs={24} sm={24} md={18} xl={18}>
              <Outlet />
               {/*<ListViewFeed activity={filteredActivity} hasMore={hasMore} next={next} />*/}
            </BaseCol>

            {!mobileOnly && (
              <L.FilterCol span={6}>
                <ListViewFilter filters={filters} setFilters={setFilters} withWrapper />
              </L.FilterCol>
            )}
          </BaseRow>
          <References />
        </MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};

export default MainLayout;
